import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../../services/student.service";
import {Router} from "@angular/router";
import {SELECTED_STREAM_KEY} from "../../../constants";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit {
  students: any[] = [];
  searchTerm: string = '';
  assignments: number[] = [1, 2, 3];
  selectedStudent: number | null = null;

  constructor(private studentService: StudentService, private router: Router) {
  }

  ngOnInit(): void {
    this.studentService.getStudents(localStorage.getItem(SELECTED_STREAM_KEY) || '').subscribe(data => {
        this.students = data.students;
        this.assignments = Array.from({length: data.taskNum}, (_, i) => i + 1);
      }
    );
  }

  filteredStudents() {
    if (!this.searchTerm) {
      return this.students;
    }
    return this.students.filter(student =>
      `${student.surname} ${student.name}`.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getAssignmentStatus(assignments: any[], assignmentNumber: number) {
    const assignment = assignments[assignmentNumber - 1];
    return assignment ? assignment.completionStatus : 0;
  }

  getAssignmentGrade(assignments: any[], assignmentNumber: number) {
    const assignment = assignments[assignmentNumber - 1];
    return assignment && assignment.mark ? assignment.mark : '';
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
    this.router.navigate([`/admin/student/${studentId}`]).then();
  }
}
