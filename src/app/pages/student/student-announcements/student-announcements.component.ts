import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ACCESS_TOKEN_KEY, SERVER_URL} from "../../../constants";
import {jwtDecode} from "jwt-decode";
import {Jwt} from "../../../models/jwt";
import {UserService} from "../../../services/user.service";

declare var bootstrap: any;

@Component({
  selector: 'app-student-announcements',
  templateUrl: './student-announcements.component.html',
  styleUrl: './student-announcements.component.css'
})
export class StudentAnnouncementsComponent implements OnInit {
  announcements: any[] = [];
  newCommentText: { [key: number]: string } = {};
  currentCommentText: string = '';
  currentUserId: number = 1;
  isEditingComment: boolean = false;
  currentCommentId: number | null = null;
  streamName: string = '';

  constructor(private http: HttpClient, private userService: UserService) {
    userService.getCurrentUser().subscribe(user => {
        this.streamName = user.streamName;
        this.loadAnnouncements();
      }
    )
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
        this.streamName = user.streamName;
        this.loadAnnouncements();
        let token = localStorage.getItem(ACCESS_TOKEN_KEY)
        if (token != null) {
          let id = jwtDecode<Jwt>(token).sub
          this.currentUserId = Number(id)
        }
      }
    )
  }

  loadAnnouncements() {
    this.http.get(`${SERVER_URL}/announcements/get/${this.streamName}`).subscribe((data: any) => {
      this.announcements = data.reverse();
    });
  }

  addComment(announcementId: number) {
    this.http.post(`${SERVER_URL}/announcements/comments/create`, {
      id: announcementId,
      text: this.newCommentText[announcementId]
    }).subscribe(() => {
      this.loadAnnouncements();
      this.newCommentText[announcementId] = '';
    });
  }

  openEditCommentModal(comment: any) {
    this.isEditingComment = true;
    this.currentCommentId = comment.id;
    this.currentCommentText = comment.text;
    const myModal = new bootstrap.Modal(document.getElementById('commentModal'));
    myModal.show();
  }

  saveComment() {
    if (this.isEditingComment) {
      this.http.patch(`${SERVER_URL}/announcements/comments/update`, {
        id: this.currentCommentId,
        text: this.currentCommentText
      }).subscribe(() => {
        this.loadAnnouncements();
        this.closeModal('commentModal')
      });
    } else {
      this.closeModal('commentModal')
    }
  }

  deleteComment(id: number) {
    this.http.delete(`${SERVER_URL}/announcements/comments/delete`, {
      body: {id}
    }).subscribe(() => {
      this.loadAnnouncements();
    });
  }

  formatDate(timestamp: number, updated: boolean = false): string {

    // Создаем объект Date из переданного timestamp
    const date = new Date(timestamp * 1000);

    // Получаем компоненты даты
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // месяцы от 0 до 11, поэтому добавляем 1
    const year = date.getFullYear();

    // Получаем компоненты времени
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Форматируем в нужный формат
    const formattedDate = `${day}.${month}.${year}, ${hours}:${minutes}`;

    return updated ? `${formattedDate} (изменено)` : formattedDate;
  }

  closeModal(modalId: string) {
    const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
    modal.hide();
  }
}
