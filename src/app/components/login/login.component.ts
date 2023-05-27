import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";

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

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  Login() {
    console.log(this.user);
    this.buttonClicked = true;
    this.subscriptionList.push(this.userService.login(this.user).subscribe(data=>{
        this.correctCredentials = true;
        console.log(data);
        setTimeout(() => {
          if (data.role == "user")
            this.router.navigate(['/home']);
          else if (data.role == "admin")
            this.router.navigate(['/users']);
        }, 0);
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
