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

  login(user: User): Observable<object> {
    return this.httpClient.post<User>(this.baseUrl, user);
  }

  signUp(user: User): Observable<object> {
    return this.httpClient.post<User>(this.baseUrl + '/register', user);
  }
}
