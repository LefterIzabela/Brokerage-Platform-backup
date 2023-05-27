export class User {
  userId?: bigint;
  email!: string;
  username!: string;
  password!: string;
  passwordConfirm?: string;
  role!: string;
}
