import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentService} from "../../../services/student.service";

declare var bootstrap: any;

@Component({
  selector: 'app-dean-student',
  templateUrl: './dean-student.component.html',
  styleUrls: ['./dean-student.component.css']
})
export class DeanStudentComponent implements OnInit {
  studentId: number;
  assignments: number[] = [];
  selectedAssignment: number | null = null;
  currentResponse: any;
  chatMessages: any[] = [];
  newMessageText: string = '';
  currentUserId: number = 1; // Замените на реальный ID текущего пользователя
  editingMessage: any;

  constructor(private studentService: StudentService, private route: ActivatedRoute, private router: Router) {
    this.studentId = this.route.snapshot.params['studentId'];
  }

  ngOnInit(): void {
    this.assignments = this.studentService.getAssignments();
    // Загрузите данные студента по его ID
    this.loadStudentData();
  }

  loadStudentData() {
    // Получите данные студента и назначьте их текущему ответу и чату
    const student = this.studentService.getStudentById(this.studentId);
    if (student) {
      // TODO
      // TODO
      // TODO
      // TODO
      this.chatMessages = [];//student.chatMessages;
    }
  }

  selectAssignment(assignment: number) {
    this.selectedAssignment = assignment;
    // Загрузите данные ответа на выбранное задание
    this.currentResponse = this.getAssignmentResponse(this.studentId, assignment);
  }

  getAssignmentResponse(studentId: number, assignment: number) {
    // Реализуйте получение данных ответа студента на задание
    return {
      text: 'Текст ответа студента',
      files: [
        {name: 'file1.pdf', url: '#'},
        {name: 'file2.docx', url: '#'}
      ],
      grade: 4,
      status: 'submitted'
    };
  }

  openGradeModal() {
    const gradeModal = new bootstrap.Modal(document.getElementById('gradeModal'));
    gradeModal.show();
  }

  saveGrade() {
// Реализуйте сохранение оценки и статуса работы студента
// Закройте модальное окно
    const gradeModal = new bootstrap.Modal(document.getElementById('gradeModal'));
    gradeModal.hide();
  }

  sendMessage() {
// Реализуйте отправку сообщения в чат
  }

  editMessage(message: any) {
    this.editingMessage = {...message};
    const editMessageModal = new bootstrap.Modal(document.getElementById('editMessageModal'));
    editMessageModal.show();
  }

  saveEditedMessage() {
// Реализуйте сохранение отредактированного сообщения
// Закройте модальное окно
    const editMessageModal = new bootstrap.Modal(document.getElementById('editMessageModal'));
    editMessageModal.hide();
  }

  deleteMessage(message: any) {
// Реализуйте удаление сообщения
  }
}
