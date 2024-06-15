import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from "rxjs";
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, ROLE_KEY, SERVER_URL} from "../constants";
import {Token} from "../models/token";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private httpClient: HttpClient) {
  }

  login(email: string, password: string): Observable<Token> {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(ROLE_KEY)
    return this.httpClient.post<Token>(
      `${SERVER_URL}/user/login`,
      {
        login: email,
        password: password
      }
    )
  }

  isLogged(): boolean {
    return localStorage.getItem(ACCESS_TOKEN_KEY) != null
  }

  signOut(): Observable<void> {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    return of(undefined)
  }
}
