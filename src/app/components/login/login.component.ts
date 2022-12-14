import {Component, OnInit} from '@angular/core';
import {UserClass} from "../../models/user.model";
import {FormBuilder, NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users: UserClass[] = [];
  admin: UserClass = new UserClass(
    'admin',
    'pass');
  client: UserClass = new UserClass(
    'client',
    'pass');

  constructor(private formbuilder: FormBuilder, private _router: Router) {}

  ngOnInit():void { }

  submitLoginForm(form: NgForm) {
    this.users.push(this.admin);
    this.users.push(this.client);
    const formValues = form.value;
    const userFromForm: UserClass = new UserClass(
      formValues.emailAddress,
      formValues.password
    );
    // this.users.push(userFromForm);

    if(this.users.find(userInList => userInList.emailAddress == userFromForm.emailAddress)) {
      this._router.navigate(['/home']);
    }
    else
    {
      console.log('Incorrect credentials! Try again or register')
      form.reset();
    }
    console.log('This is the list of users: ', this.users);
  }
}
