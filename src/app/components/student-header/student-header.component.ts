import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

declare var bootstrap: any;

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrl: './student-header.component.css'
})
export class StudentHeaderComponent {

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {
  }

  openExitModal(): void {
    const myModal = new bootstrap.Modal(document.getElementById('logoutModal'));
    myModal.show();
  }

  logout(): void {
    this.userService.logout().subscribe(() => {
      this.authService.signOut()
      this.router.navigateByUrl("").then();
    })
    const modal = bootstrap.Modal.getInstance(document.getElementById('logoutModal'));
    modal.hide();
  }
}
