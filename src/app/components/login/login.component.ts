import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  subscriptionList: Subscription[] = [];
  correctCredentials: boolean = false;
  buttonClicked: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router,
              private authService: AuthService,
              private tokenService: TokenService) {}

  ngOnInit(): void {}

  Login() {
    console.log(this.user);
    this.buttonClicked = true;
    this.subscriptionList.push(this.authService.login(this.user.email, this.user.password).subscribe(data=>{
        this.tokenService.setToken(data.token);
        console.log(data.token);
        if (data && data.role) {
          this.correctCredentials = true;
          console.log(data);
          setTimeout(() => {
            if (data.role === "user")
              this.router.navigate(['/home']);
            else if (data.role === "admin")
              this.router.navigate(['/users']);
          }, 0);
        } else {
          this.errorMessage = 'Invalid response from the server.';
          console.error('Invalid response:', data);
        }
      },
      error => {
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
        console.error(error);
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach(subscription => subscription.unsubscribe());
  }
}
