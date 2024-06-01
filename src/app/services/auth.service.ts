import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService, private router: Router) { }

  login(role: string) {
    this.cookieService.set('role', role);
  }

  getRole(): string {
    return this.cookieService.get('role');
  }

  getRedirectUrl(): string {
    const role = this.getRole();
    if (role === 'main') {
      return '/main';
    } else if (role === 'dean') {
      return '/dean';
    } else {
      return '/student';
    }
  }

  checkRoleAndRedirect() {
    const role = this.getRole();
    if (role) {
      this.router.navigate([this.getRedirectUrl()]);
    }
  }
}
