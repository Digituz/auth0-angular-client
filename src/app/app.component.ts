import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  clientId = 'lOWZ0gU498mVSsn40hKLesEJDQbcfQ8A';
  domain = 'bk-samples.auth0.com';
  audience = 'http://spring-boot-aside.auth0samples.com/';
  scope = 'read:contacts';

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        const {clientId, domain, audience, scope} = val.state.root.queryParams;

        this.clientId = clientId || this.clientId;
        this.domain = domain || this.domain;
        this.audience = audience || this.audience;
        this.scope = scope || this.scope;

        this.auth.configure(clientId, domain, audience, scope);
        this.auth.handleAuth();
      }
    });
  }

}
