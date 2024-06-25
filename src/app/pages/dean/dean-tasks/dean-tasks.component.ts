import * as bootstrap from 'bootstrap';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {S3Service} from "../../../services/s3.service";

interface Task {
  id: number;
  text: string;
  createdAt: Date;
}

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
  tasks: Task[] = [];
  newTaskText = '';
  uploadingFiles: UploadingFile[] = [];
  isUploading = false;
  addTaskModal: bootstrap.Modal | undefined;

  constructor(private http: HttpClient, private s3Service: S3Service) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.http.get<Task[]>('/api/tasks').subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }

  openAddTaskModal() {
    const modalElement = document.getElementById('addTaskModal');
    if (modalElement) {
      this.addTaskModal = new bootstrap.Modal(modalElement);
      this.addTaskModal.show();
    }
  }

  closeAddTaskModal() {
    if (this.addTaskModal) {
      this.addTaskModal.hide();
    }
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.uploadFile(files[i]);
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
      const data = await this.s3Service.uploadFile(file);
      upload.progress = 100;
      upload.url = `https://s3.timeweb.cloud/${this.s3Service.bucketName}/${file.name}`;
      this.isUploading = false;
    } catch (error) {
      console.error();
      this.isUploading = false;
    }
  }

  addTask() {
    const task = {
      text: this.newTaskText,
      files: this.uploadingFiles.map(file => file.url)
    };

    this.http.post('/api/tasks', task).subscribe(() => {
      this.loadTasks();
      this.newTaskText = '';
      this.uploadingFiles = [];
      this.closeAddTaskModal();
    });
  }
}
