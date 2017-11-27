import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';

import {HomeComponent} from './home/home.component';
import {CallbackComponent} from './callback/callback.component';
import {HttpClientComponent} from './http-client/http-client.component';
import {RedirectService} from './auth/redirect.service';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
        canActivate: [
          RedirectService
        ]
      },
      {
        path: 'callback',
        component: CallbackComponent
      },
      {
        path: 'http-client',
        component: HttpClientComponent,
        canActivate: [
          AuthGuard
        ]
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [
    AuthGuard
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
