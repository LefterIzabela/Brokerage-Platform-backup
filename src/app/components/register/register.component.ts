import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";
import {matchValidator} from "../../validators/form.validators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signUpFormGroup: FormGroup = new FormGroup({});
  user: User = new User();
  private subscriptionList: Subscription[] = [];
  correctCredentials: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.signUpFormGroup = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z][A-Za-z0-9_]*$'),
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$')
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$'),
        matchValidator('passwordConfirm', true)
      ])],
      passwordConfirm: ['', Validators.compose([
        Validators.required,
        matchValidator('password')
      ])]
    });
  }

  Submit() {
    if (this.signUpFormGroup.valid) {
      this.user = Object.assign({}, this.signUpFormGroup.value);
      this.user.role = "user";
      this.subscriptionList.push(this.userService.signUp(this.user).subscribe(
        () => {
          this.correctCredentials = true;
          if (this.correctCredentials) {
            this.router.navigate(['/home']);
          }
        },
      (error) => {
        console.error(error);
        if (error.status === 409) {
          const errorMessage = "User with this email already exists.";
          console.log(errorMessage);
        } else if (error.status === 400) {
          const errorMessage = "Invalid request. Please check your input.";
          console.log(errorMessage);
        } else {
          const errorMessage = "An error occurred. Please try again later.";
          console.log(errorMessage);
          }
        }
      ));
    }
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach(subscription => subscription.unsubscribe());
  }
}
