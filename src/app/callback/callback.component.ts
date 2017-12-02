import {Component, OnInit} from '@angular/core';
import {AuthService} from './../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.auth.handleAuth();
    this.auth.subscribe(
      signedIn => {
        if (signedIn) {
          this.router.navigate(['/http-client']);
        }
      }
    )
  }

}
