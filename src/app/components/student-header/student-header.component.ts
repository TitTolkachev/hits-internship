import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrl: './student-header.component.css'
})
export class StudentHeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.closeExitModal()
  }

  openExitModal(): void {
    const modal = document.getElementById('logoutModal');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  closeExitModal(): void {
    const modal = document.getElementById('logoutModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  logout(): void {
    this.userService.logout().subscribe(result => {
      this.authService.signOut()
      this.router.navigateByUrl("").then();
    })
    this.closeExitModal();
  }
}
