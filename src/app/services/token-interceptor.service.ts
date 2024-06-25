import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from "rxjs";
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isLogged()) {
      req = this.addToken(req, localStorage.getItem(ACCESS_TOKEN_KEY));
    }

    return next.handle(req).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return this.handle401Error(req, next);
        } else {
          return throwError(() => err);
        }
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string | null) {
    if (token) {
      return req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return req;
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

      if (refreshToken) {
        return this.authService.refreshToken(refreshToken).pipe(
          switchMap((response: HttpResponse<any>) => {
            if (response.status === 200) {
              const token = response.body;
              localStorage.setItem(ACCESS_TOKEN_KEY, token.accessToken);
              localStorage.setItem(REFRESH_TOKEN_KEY, token.refreshToken);
              this.isRefreshing = false;
              this.refreshTokenSubject.next(token.accessToken);
              return next.handle(this.addToken(req, token.accessToken));
            } else {
              this.isRefreshing = false;
              this.authService.signOut();
              this.router.navigateByUrl("").then();
              return throwError(() => new Error('Failed to refresh token'));
            }
          }),
          catchError((error) => {
            if (this.isRefreshing) {
              this.isRefreshing = false;
              this.authService.signOut();
              this.router.navigateByUrl("").then();
            }
            return throwError(() => error);
          })
        );
      } else {
        this.isRefreshing = false;
        this.authService.signOut();
        this.router.navigateByUrl("").then();
        return throwError(() => new Error('No refresh token available'));
      }
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap((token) => next.handle(this.addToken(req, token)))
      );
    }
  }
}
