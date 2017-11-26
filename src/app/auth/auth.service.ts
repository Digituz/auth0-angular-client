import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as auth0 from 'auth0-js';
import {UserProfile} from './profile.model';

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  // @TODO: Update AUTH_CONFIG and remove .example extension in src/app/auth/auth0-variables.ts.example
  auth0: any;
  userProfile: UserProfile;

  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  constructor() {
    // If authenticated, set local profile property and update login status subject
    if (this.authenticated) {
      this.userProfile = JSON.parse(localStorage.getItem('profile'));
      this.setLoggedIn(true);
    }
  }

  configure(clientID, domain, audience, scope) {
    this.auth0 = new auth0.WebAuth({
      clientID: clientID,
      domain: domain,
      responseType: 'token id_token',
      redirectUri: 'http://localhost:4200/callback',
      audience: audience,
      scope: scope
    });
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
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this._getProfile(authResult);
      } else if (err) {
        console.error(`Error: ${err.error}`);
      }
    });
  }

  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    console.log('----- 1: ', authResult.accessToken);
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      console.log('----- 2\n', profile);
      console.log('----- 3\n', err);
      this._setSession(authResult, profile);
    });
  }

  private _setSession(authResult, profile) {
    const expTime = authResult.expiresIn * 1000 + Date.now();
    // Save session data and update login status subject
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('expires_at', JSON.stringify(expTime));
    this.userProfile = profile;
    this.setLoggedIn(true);
  }

  logout() {
    // Remove tokens and profile and update login status subject
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');
    this.userProfile = undefined;
    this.setLoggedIn(false);
  }

  get authenticated(): boolean {
    // Check if current date is greater than expiration
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

}
