import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {UsersComponent} from "./components/users/users.component";

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'users', component: UsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
