import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8085';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    console.log(body);
    return this.http.post(`${this.apiUrl}`, body);
  }

  logout(): void {
    this.tokenService.removeToken();
  }
}
