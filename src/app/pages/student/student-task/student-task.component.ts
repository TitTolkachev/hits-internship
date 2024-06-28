import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StudentTaskService} from "../../../services/student-task.service";
import {jwtDecode} from "jwt-decode";
import {Jwt} from "../../../models/jwt";
import {ACCESS_TOKEN_KEY} from "../../../constants";
import {S3Service} from "../../../services/s3.service";

declare var bootstrap: any;

interface UploadingFile {
  name: string;
  progress: number;
  url?: string;
}

@Component({
  selector: 'app-student-task',
  templateUrl: './student-task.component.html',
  styleUrls: ['./student-task.component.css']
})
export class StudentTaskComponent implements OnInit {
  taskId!: number;
  userId!: number;
  answer: any = null;
  isLoading = true;

  uploadingFiles: UploadingFile[] = [];
  uploadedFiles: [] = [];
  isUploading = false;
  currentTaskText: string = '';

  constructor(
    private route: ActivatedRoute,
    private studentTaskService: StudentTaskService,
    private s3Service: S3Service
  ) {
  }

  ngOnInit(): void {
    this.taskId = +this.route.snapshot.paramMap.get('id')!;
    let token = localStorage.getItem(ACCESS_TOKEN_KEY)
    if (token != null) {
      let id = jwtDecode<Jwt>(token).sub
      this.userId = Number(id)
    }
    this.getLastAnswer();
  }

  getLastAnswer(): void {
    this.studentTaskService.getLastAnswer(this.taskId, this.userId).subscribe(
      (data) => {
        this.answer = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching last answer', error);
        this.isLoading = false;
      }
    );
  }

  openModal(): void {
    this.uploadedFiles = []
    if (this.answer.files != null) {
      this.uploadedFiles = this.answer.files.slice()
    }
    this.currentTaskText = this.answer.text
    const modal = new bootstrap.Modal(document.getElementById('answerModal'));
    modal.show();
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

  saveAnnouncement() {
    const files = this.uploadingFiles
      .map(file => file.url)
      .filter(url => url !== null)
      .concat(this.uploadedFiles)

    this.studentTaskService.createAnswer(
      this.taskId,
      this.currentTaskText,
      files
    ).subscribe(() => {
      this.closeModal('answerModal')
      this.getLastAnswer();
    });
  }

  closeModal(modalId: string) {
    const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
    modal.hide();
  }

  formatMark(mark: number) {
    if (mark == 0)
      return "Оценка отсутствует"
    else
      return `Оценка - ${mark}`
  }

  formatStatus(status: number) {
    if (status == 0)
      return "Необходимо отправить задание"
    if (status == 1)
      return "Ожидает проверки"
    if (status == 2)
      return "Требует доработок"
    if (status == 3)
      return "Задание выполнено"
    return "Статус не распознан"
  }
}
