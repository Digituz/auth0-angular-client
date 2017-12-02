import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {stringify} from 'querystring';
import * as Auth0Web from 'auth0-web';

@Injectable()
export class AuthService {
  auth0Config = {
    clientID: 'lOWZ0gU498mVSsn40hKLesEJDQbcfQ8A',
    domain: 'bk-samples.auth0.com',
    audience: 'https://contacts.mycompany.com/',
    scope: 'openid get:contacts post:contacts',
    redirectUri: `${this.document.location.origin}/callback`
  };

  isAuthenticated = Auth0Web.isAuthenticated;
  handleAuth = Auth0Web.handleAuthCallback;
  subscribe = Auth0Web.subscribe;
  logout = Auth0Web.signOut;

  constructor(private router: Router, @Inject(DOCUMENT) private document: any) {
  }

  configure() {
    const {clientID, domain, audience, scope} = this.auth0Config;
    const redirectUri = this.document.location.origin + '/callback' +
      '?clientID=' + clientID + '&domain=' + domain + '&audience=' + audience + '&scope=' + stringify(scope);
    const updatedConfig = {
      ...this.auth0Config,
      redirectUri
    };
    Auth0Web.configure(updatedConfig);
  }

  login() {
    // Auth0 authorize request
    this.configure();
    Auth0Web.signIn();
  }
}
