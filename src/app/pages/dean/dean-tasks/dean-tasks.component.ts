import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {S3Service} from "../../../services/s3.service";
import {ACCESS_TOKEN_KEY, SELECTED_STREAM_KEY, SERVER_URL} from "../../../constants";
import {jwtDecode} from "jwt-decode";
import {Jwt} from "../../../models/jwt";
import {Router} from "@angular/router";

declare var bootstrap: any;

interface UploadingFile {
  name: string;
  progress: number;
  url?: string;
}

@Component({
  selector: 'app-dean-tasks',
  templateUrl: './dean-tasks.component.html',
  styleUrls: ['./dean-tasks.component.css']
})
export class DeanTasksComponent implements OnInit {
  uploadingFiles: UploadingFile[] = [];
  uploadedFiles: [] = [];
  isUploading = false;

  tasks: any[] = [];
  newCommentText: { [key: number]: string } = {};
  currentTaskText: string = '';
  currentUserId: number = 1;
  isEditingAnnouncement: boolean = false;
  currentAnnouncementId: number | null = null;
  streamName: string = localStorage.getItem(SELECTED_STREAM_KEY) || '';

  selectedDate: string = '';
  selectedTime: string = '';

  constructor(private http: HttpClient, private s3Service: S3Service, private router: Router) {
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

  openCreateAnnouncementModal() {
    this.isEditingAnnouncement = false;
    this.currentTaskText = '';
    this.selectedDate = '';
    this.selectedTime = '';
    this.uploadingFiles = []
    this.uploadedFiles = [];
    const myModal = new bootstrap.Modal(document.getElementById('announcementModal'));
    myModal.show();
  }

  openEditAnnouncementModal(announcement: any) {
    this.isEditingAnnouncement = true;
    this.currentAnnouncementId = announcement.id;
    this.currentTaskText = announcement.text;
    this.selectedDate = announcement.deadlineDate;
    this.selectedTime = announcement.deadlineDate;
    this.uploadedFiles = announcement.attachments.slice();
    const myModal = new bootstrap.Modal(document.getElementById('announcementModal'));
    myModal.show();
  }

  saveAnnouncement() {
    let epochTime = 0;
    if (this.selectedDate != '' && this.selectedTime != ''){
      const dateTime = new Date(`${this.selectedDate}T${this.selectedTime}:00`);
      epochTime = Math.floor(dateTime.getTime() / 1000);
    }

    const attachments = this.uploadingFiles
      .map(file => file.url)
      .filter(url => url !== null)
      .concat(this.uploadedFiles)

    if (this.isEditingAnnouncement) {
      this.http.patch(`${SERVER_URL}/task/update/${this.currentAnnouncementId}`, {
        text: this.currentTaskText,
        deadlineDate : epochTime,
        attachments: attachments,
      }).subscribe(() => {
        this.closeModal('announcementModal')
        this.loadAnnouncements();
      });
    } else {
      this.http.post(`${SERVER_URL}/task/create/${this.streamName}`, {
        text: this.currentTaskText,
        deadlineDate : epochTime,
        attachments: attachments,
      }).subscribe(() => {
        this.closeModal('announcementModal')
        this.loadAnnouncements();
      });
    }
  }

  confirmDeleteAnnouncement(id: number) {
    this.currentAnnouncementId = id;
    const myModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
    myModal.show();
  }

  addComment(announcementId: number) {
    this.http.post(`${SERVER_URL}/task/create/comment/${announcementId}`, {
      text: this.newCommentText[announcementId]
    }).subscribe(() => {
      this.loadAnnouncements();
      this.newCommentText[announcementId] = '';
    });
  }

  deleteAnnouncement() {
    this.http.delete(`${SERVER_URL}/task/delete/${this.currentAnnouncementId}`).subscribe(() => {
      this.loadAnnouncements();
      this.closeModal('deleteConfirmationModal')
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

  openTask(taskId: string) {
    this.router.navigateByUrl(`/dean/task/${taskId}`).then()
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.uploadFile(files[i]).then();
    }
  }

  async uploadFile(file: File) {
    const upload: UploadingFile = {
      name: file.name,
      progress: 0
    };
    this.uploadingFiles.push(upload);
    this.isUploading = true;

    try {
      await this.s3Service.uploadFile(file);
      upload.progress = 100;
      upload.url = `https://s3.timeweb.cloud/${this.s3Service.bucketName}/${file.name}`;
      this.isUploading = false;
    } catch (error) {
      console.error();
      this.isUploading = false;
    }
  }

  openFile(file: any): void {
    if (file.progress === 100 && file.url) {
      window.open(file.url, '_blank');
    }
  }

  openFileByUrl(url: any): void {
    window.open(url, '_blank');
  }

  removeFile(index: number): void {
    this.uploadingFiles.splice(index, 1);
  }

  removeUploadedFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
  }
}
