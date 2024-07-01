import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../../services/student.service";
import {Router} from "@angular/router";
import {SELECTED_STREAM_KEY, SERVER_URL} from "../../../constants";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit {
  students: any[] = [];
  searchTerm: string = '';
  selectedStudent: number | null = null;

  constructor(private studentService: StudentService, private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
    const streamName = localStorage.getItem(SELECTED_STREAM_KEY) || ''
    this.http.get<any[]>(`${SERVER_URL}/stream/${streamName}/students`).subscribe(data => {
        this.students = data;
      }
    );
  }

  filteredStudents() {
    var students = []
    if (!this.searchTerm) {
      students = this.students;
    } else {
      students = this.students.filter(student =>
        `${student.surname} ${student.name}`.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    if (this.selectedCriterion === 'name') {
      return students.sort((a, b) => {
          if (a.deactivated == b.deactivated) {
            if ((a.companyName != '') == (b.companyName != '')){
              if (a.isOffered == b.isOffered){
                return b.name - a.name
              } else if (a.isOffered){
                return -1
              } else {
                return 1
              }
            } else if (a.companyName != '') {
              return -1
            } else {
              return 1
            }
          } else if (a.deactivated) {
            return 1
          } else {
            return -1
          }
        }
      )
    } else {
      return students.sort((a, b) => b.lastMessageTime - a.lastMessageTime)
    }
  }

  getGradeClass(student: any) {
    if (student.deactivated) {
      return 'table-info';
    } else if (student.companyName != '') {
      return 'table-success';
    } else if (student.isOffered) {
      return 'table-warning';
    }
    return 'table-danger';
  }

  goToStudent(studentId: number) {
    this.selectedStudent = studentId;
    this.router.navigate([`/admin/student/${studentId}`]).then();
  }

  formatDate(timestamp: number, updated: boolean = false): string {

    if (timestamp == 0)
      return ''

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

  sortCriteria = [
    {label: 'Статус', value: 'name'},
    {label: 'Чат', value: 'date'},
  ];

  selectedCriterion = 'name';

  onSelectionChange(value: string) {
    this.selectedCriterion = value;
  }
}
