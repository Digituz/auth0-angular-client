import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  authSubscription: { unsubscribe: () => void };

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
    // Subscribe to login status subject
    // If authenticated, subscribe to dragons data observable
    // If not authenticated, unsubscribe from dragons data
    this.authSubscription = this.auth.subscribe(loggedIn => {
      if (loggedIn) {
        console.log('do something');
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe from observables
    this.authSubscription.unsubscribe();
  }
}
