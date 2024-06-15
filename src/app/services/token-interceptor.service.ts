import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {catchError, Observable, switchMap, tap, throwError} from "rxjs";
import {ACCESS_TOKEN_KEY} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isLogged()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`
        }
      })
    }

    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 401) {
          return this.authService.signOut().pipe(
            tap(() => this.router.navigateByUrl("").then())
          ).pipe(
            switchMap(() => throwError(err))
          )
        }
        return throwError(err)
      })
    )
  }
}
