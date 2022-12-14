import {Component, OnInit} from '@angular/core';
import {UserClass} from "../../models/user.model";
import {FormBuilder, NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  users: UserClass[] = [];
  admin: UserClass = new UserClass(
    'admin',
    'pass');
  client: UserClass = new UserClass(
    'client',
    'pass');

  constructor(private formbuilder: FormBuilder, private _router: Router) {}

  ngOnInit():void { }

  submitRegisterForm(form: NgForm) {
    this.users.push(this.admin);
    this.users.push(this.client);
    const formValues = form.value;
    const userFromForm: UserClass = new UserClass(
      formValues.emailAddress,
      formValues.password
    );
    // this.users.push(userFromForm);

    if(this.users.find(userInList => userInList.emailAddress == userFromForm.emailAddress)) {
      console.log('Email already used!');
      form.reset();
    }
    else
    {
      this.users.push(userFromForm);
      this._router.navigate(['/home']);
      console.log('Account created!', userFromForm)
    }
    console.log('This is the list of users: ', this.users);
  }
}
