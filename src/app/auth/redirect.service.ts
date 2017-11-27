import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class RedirectService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate() {
    if (!this.auth.authenticated) {
      return true;
    }
    this.router.navigate(['/http-client']);
    return false;
  }

}
