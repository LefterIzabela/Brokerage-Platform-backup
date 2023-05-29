import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  readonly baseUrl = "http://localhost:8085";
  readonly httpOptions = {Headers: new HttpHeaders({'Content-Type':'application/json'})};

  constructor(private httpClient: HttpClient) {
  }

  signUp(user: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl + '/register', user);
  }
}
