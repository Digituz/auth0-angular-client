import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as auth0 from 'auth0-js';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';

@Injectable()
export class AuthService {
  auth0: any;
  auth0Config = {
    clientID: 'lOWZ0gU498mVSsn40hKLesEJDQbcfQ8A',
    domain: 'bk-samples.auth0.com',
    audience: 'http://spring-boot-aside.auth0samples.com/',
    scope: 'read:contacts',
    responseType: 'token id_token',
    redirectUri: `${this.document.location.origin}/callback`
  };

  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  constructor(private router: Router,  @Inject(DOCUMENT) private document: any) {
    // If authenticated, update login status subject
    if (this.authenticated) {
      this.setLoggedIn(true);
      this.router.navigate(['/']);
    }
  }

  configure() {
    this.auth0 = new auth0.WebAuth(this.auth0Config);
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login() {
    // Auth0 authorize request
    this.auth0.authorize();
  }

  handleAuth() {
    // When Auth0 hash parsed, clear it
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this._setSession(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        console.error(err);
      }
    });
  }

  private _setSession(authResult) {
    const expTime = authResult.expiresIn * 1000 + Date.now();
    // Save session data and update login status subject
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expTime));
    this.setLoggedIn(true);
  }

  logout() {
    // Remove tokens and update login status subject
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.setLoggedIn(false);
  }

  get authenticated(): boolean {
    // Check if current date is greater than expiration
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

}
