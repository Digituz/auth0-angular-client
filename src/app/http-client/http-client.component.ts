import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-http-client',
  templateUrl: './http-client.component.html',
  styleUrls: ['./http-client.component.css']
})
export class HttpClientComponent implements OnInit {
  httpResponse: string;

  constructor(public router: Router, private http: HttpClient, private auth: AuthService) {
  }

  ngOnInit() {
  }

}
