import { Component } from '@angular/core';
import {ACCESS_TOKEN_KEY, SELECTED_STREAM_KEY, SERVER_URL} from "../../../constants";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {Jwt} from "../../../models/jwt";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-student-tasks',
  templateUrl: './student-tasks.component.html',
  styleUrl: './student-tasks.component.css'
})
export class StudentTasksComponent {

  tasks: any[] = [];
  newCommentText: { [key: number]: string } = {};
  currentUserId: number = 1;
  streamName: string = localStorage.getItem(SELECTED_STREAM_KEY) || '';

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
    userService.getCurrentUser().subscribe(user => {
        this.streamName = user.streamName;
        this.loadAnnouncements();
      }
    )
  }

  ngOnInit(): void {
    this.loadAnnouncements();
    let token = localStorage.getItem(ACCESS_TOKEN_KEY)
    if (token != null) {
      let id = jwtDecode<Jwt>(token).sub
      this.currentUserId = Number(id)
    }
  }

  loadAnnouncements() {
    this.http.get(`${SERVER_URL}/task/get/all/${this.streamName}`).subscribe((data: any) => {
      this.tasks = data;
    });
  }

  addComment(announcementId: number) {
    this.http.post(`${SERVER_URL}/task/create/comment/${announcementId}`, {
      text: this.newCommentText[announcementId]
    }).subscribe(() => {
      this.loadAnnouncements();
      this.newCommentText[announcementId] = '';
    });
  }

  formatDate(timestamp: number, updated: boolean = false): string {

    // Создаем объект Date из переданного timestamp
    const date = new Date(timestamp * 1000);

    // Получаем компоненты даты
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    // Получаем компоненты времени
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Форматируем в нужный формат
    const formattedDate = `${day}.${month}.${year}, ${hours}:${minutes}`;

    return updated ? `${formattedDate} (изменено)` : formattedDate;
  }

  openTask(taskId: string) {
    this.router.navigateByUrl(`/student/task/${taskId}`).then()
  }

  openFileByUrl(url: any): void {
    window.open(url, '_blank');
  }
}
