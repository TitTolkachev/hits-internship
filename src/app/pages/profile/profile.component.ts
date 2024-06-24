import {Component, OnInit} from '@angular/core';
import {Role, UserGetDto} from "../../models/user-get.dto";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  currentUser: UserGetDto | null = null;
  roles = Object.values(Role);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    this.userService.getCurrentUser().subscribe((data) => {
      this.currentUser = data;
    });
  }

  updateUser(): void {
    if (this.currentUser) {
      this.userService.updateUser(this.currentUser.login, this.currentUser).subscribe(() => {
        // Опционально: Добавить уведомление о успешном обновлении
      });
    }
  }

  deleteUser(): void{
    if (this.currentUser) {
      this.userService.deleteUser().subscribe(() => {
        // Опционально: Добавить уведомление о успешном обновлении
      });
    }
  }

  protected readonly Role = Role;
}
