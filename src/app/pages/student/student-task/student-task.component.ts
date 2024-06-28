import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StudentTaskService} from "../../../services/student-task.service";
import {jwtDecode} from "jwt-decode";
import {Jwt} from "../../../models/jwt";
import {ACCESS_TOKEN_KEY} from "../../../constants";

declare var bootstrap: any;

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

  constructor(
    private route: ActivatedRoute,
    private studentTaskService: StudentTaskService,
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
    const modal = new bootstrap.Modal(document.getElementById('answerModal'));
    modal.show();
  }

  saveAnswer(text: string, files: string[]): void {
    this.studentTaskService.createAnswer(this.taskId, text, files).subscribe(
      (response) => {
        console.log('Answer saved', response);
        this.getLastAnswer();
      },
      (error) => {
        console.error('Error saving answer', error);
      }
    );
  }
}
