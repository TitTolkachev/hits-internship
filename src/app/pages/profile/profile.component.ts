import {Component, OnInit} from '@angular/core';
import {Role, UserGetDto} from "../../models/user-get.dto";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {UserUpdateDto} from "../../models/user-update.dto";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  currentUser: UserGetDto | null = null;
  roles = Object.values(Role);

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.closeDeleteAccountModal()
  }

  loadCurrentUser(): void {
    this.userService.getCurrentUser().subscribe((data) => {
      this.currentUser = data;
    });
  }

  updateUser(): void {
    if (this.currentUser) {
      const userUpdateModel: UserUpdateDto = {
        login: this.currentUser.login,
        name: this.currentUser.name,
        surname: this.currentUser.surname,
      }
      this.userService.updateUser(this.currentUser.login, userUpdateModel).subscribe(() => {
        // Опционально: Добавить уведомление о успешном обновлении
        console.log("update success")
      });
    }
  }

  openDeleteAccountModal(): void {
    const exitModal = document.getElementById('deleteAccountModal');
    if (exitModal) {
      exitModal.style.display = 'flex';
    }
  }

  closeDeleteAccountModal(): void {
    const modal = document.getElementById('deleteAccountModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  deleteUser(): void {
    if (this.currentUser) {
      this.userService.deleteUser(this.currentUser.streamName).subscribe(() => {
        this.authService.signOut().subscribe(() => {
          this.router.navigateByUrl("").then()
        })
      });
    }
  }

  protected readonly Role = Role;
}
