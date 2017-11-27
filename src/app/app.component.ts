import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Router, RoutesRecognized} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {
    this.auth.configure();
    this.auth.handleAuth();
  }

  ngOnInit(): void {
    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        const {clientID, domain, audience, scope} = val.state.root.queryParams;
        const auth0Config = this.auth.auth0Config;

        auth0Config.clientID = clientID || auth0Config.clientID;
        auth0Config.domain = domain || auth0Config.domain;
        auth0Config.audience = audience || auth0Config.audience;
        auth0Config.scope = scope || auth0Config.scope;

        this.auth.configure();
      }
    });
  }

}
