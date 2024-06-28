import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {StudentService} from "../../../services/student.service";

@Component({
  selector: 'app-dean-users',
  templateUrl: './dean-users.component.html',
  styleUrls: ['./dean-users.component.css']
})
export class DeanUsersComponent implements OnInit {
  students: any[] = [];
  searchTerm: string = '';
  assignments: number[] = [1, 2, 3]; // Здесь можно указать количество заданий
  selectedStudent: number | null = null;

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.students = this.studentService.getStudents();
  }

  filteredStudents() {
    if (!this.searchTerm) {
      return this.students;
    }
    return this.students.filter(student =>
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getAssignmentStatus(assignments: any[], assignmentNumber: number) {
    const assignment = assignments.find(a => a.number === assignmentNumber);
    return assignment ? assignment.status : 'not_submitted';
  }

  getAssignmentGrade(assignments: any[], assignmentNumber: number) {
    const assignment = assignments.find(a => a.number === assignmentNumber);
    return assignment && assignment.grade ? assignment.grade : '';
  }

  getGradeClass(assignments: any[], assignmentNumber: number) {
    const grade = this.getAssignmentGrade(assignments, assignmentNumber);
    if (grade === 2) {
      return 'table-danger';
    } else if (grade === 3) {
      return 'table-warning';
    } else if (grade === 4) {
      return 'table-info';
    } else if (grade === 5) {
      return 'table-success';
    }
    return '';
  }

  goToStudent(studentId: number) {
    this.selectedStudent = studentId;
    this.router.navigate([`/dean/student/${studentId}`]).then();
  }
}
