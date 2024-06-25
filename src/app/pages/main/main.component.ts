import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ROLE_KEY} from "../../constants";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    let role = localStorage.getItem(ROLE_KEY)
    if (role == null) {
      this.router.navigateByUrl("/login").then()
    }
    switch (role) {
      case "Admin":
        this.router.navigateByUrl("/admin").then()
        break
      case "Dean":
        this.router.navigateByUrl("/dean").then()
        break
      case "Student":
        this.router.navigateByUrl("/student").then()
        break
      default:
        localStorage.removeItem(ROLE_KEY)
        this.router.navigateByUrl("/login").then()
    }
  }
}
