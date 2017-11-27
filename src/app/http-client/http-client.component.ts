import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

export interface Request {
  url: string,
  method: string
  response: object
}

@Component({
  selector: 'app-http-client',
  templateUrl: './http-client.component.html',
  styleUrls: ['./http-client.component.css']
})
export class HttpClientComponent implements OnInit {
  req: Request = {
    url: 'http://localhost:8080/contacts/',
    method: 'get',
    response: null
  };

  constructor(public router: Router, private http: HttpClient, private auth: AuthService) {
  }

  ngOnInit() {
  }

  changeMethod(newMethod: string) {
    this.req.method = newMethod;
  }

  sendRequest() {
    const method = this.http[this.req.method];
    const accessToken = localStorage.getItem('access_token');
    this.http.get(this.req.url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + accessToken),
    }).subscribe(data => {
      this.req.response = data;
    });
    // method(this.req.url).subscribe(data => {
    // });
  }
}
