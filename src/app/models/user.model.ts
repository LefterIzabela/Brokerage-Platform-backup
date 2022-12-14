export class UserClass {
  emailAddress: string;
  password: string;

  constructor(private _emailAddress: string, private _password: string) {
    this.emailAddress = _emailAddress;
    this.password = _password;
  }
}
