import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, ROLE_KEY} from "../../constants";
import {jwtDecode} from "jwt-decode";
import {Jwt} from "../../models/jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  state: any
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    this.state = 'loading'

    this.authService.login(this.username.trim(), this.password.trim()).subscribe({
      next: e => {
        let role = jwtDecode<Jwt>(e.accessToken).role

        if (role != 'Admin' && role != 'Dean' && role != 'Student') {
          this.state = 'error'
          return;
        }

        localStorage.setItem(ACCESS_TOKEN_KEY, e.accessToken)
        localStorage.setItem(REFRESH_TOKEN_KEY, e.refreshToken)
        localStorage.setItem(ROLE_KEY, role)

        if (role == 'Admin') {
          this.router.navigateByUrl("/admin/home").then()
          return;
        }
        if (role == 'Dean') {
          this.router.navigateByUrl("/dean").then()
          return;
        }
        if (role == 'Student') {
          this.router.navigateByUrl("/student").then()
          return;
        }

        this.state = 'error'
      },
      error: err => {
        this.state = 'error'
      }
    })
  }
}
