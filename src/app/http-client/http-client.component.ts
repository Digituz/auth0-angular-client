import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import jwt_decode from 'jwt-decode';

export interface Request {
  url: string;
  method: string;
  body?: string;
  contentType?: string;
  response?: object;
}

@Component({
  selector: 'app-http-client',
  templateUrl: './http-client.component.html',
  styleUrls: ['./http-client.component.css']
})
export class HttpClientComponent {
  req: Request = {
    url: 'http://localhost:8080/contacts/',
    method: 'post',
    contentType: 'application/json'
  };
  scope: string;

  constructor(public router: Router, private http: HttpClient,
              public auth: AuthService, @Inject(DOCUMENT) public document: any) {
    this.scope = jwt_decode(localStorage.getItem('access_token')).scope;
  }

  changeMethod(newMethod: string) {
    this.req.method = newMethod;
    this.req.response = null;
  }

  sendRequest() {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken)
      .set('Content-Type', this.req.contentType);
    const requestOptions = {
      headers: headers,
    };
    const {url} = this.req;
    const loadResponse = data => {
      this.req.response = data;
    };

    switch (this.req.method) {
      case 'get':
        this.http.get(url, requestOptions).subscribe(loadResponse, loadResponse);
        break;
      case 'post':
        this.http.post(url, JSON.parse(this.req.body), requestOptions).subscribe(loadResponse, loadResponse);
        break;
      case 'put':
        this.http.put(url, JSON.parse(this.req.body), requestOptions).subscribe(loadResponse, loadResponse);
        break;
      case 'delete':
        this.http.delete(url, requestOptions).subscribe(loadResponse, loadResponse);
        break;
    }
  }

  signOut() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
