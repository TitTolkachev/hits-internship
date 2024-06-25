import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-dean-header',
  templateUrl: './dean-header.component.html',
  styleUrl: './dean-header.component.css'
})
export class DeanHeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.closeExitModal()
  }

  openExitModal(): void {
    const exitModal = document.getElementById('logoutModal');
    if (exitModal) {
      exitModal.style.display = 'block';
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
