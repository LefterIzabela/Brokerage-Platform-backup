import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService,
              private tokenService: TokenService) {}


  ngOnInit(): void {}

  logout() {
    this.tokenService.removeToken();
  }
}
