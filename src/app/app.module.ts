import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AuthService} from './auth/auth.service';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {CallbackComponent} from './callback/callback.component';
import {HttpClientComponent} from './http-client/http-client.component';
import {RedirectService} from "./auth/redirect.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    HttpClientComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    RedirectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
