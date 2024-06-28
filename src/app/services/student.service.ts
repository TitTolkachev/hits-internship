import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SERVER_URL} from "../constants";
import {Observable} from "rxjs";
import {MarkListDto} from "../models/markList";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) {
  }

  students = [
    {
      id: 1,
      firstName: 'Иван',
      lastName: 'Иванов',
      assignments: [
        {number: 1, status: 'graded', grade: 4},
        {number: 2, status: 'submitted'},
        {number: 3, status: 'not_submitted'},
      ]
    },
    {
      id: 2,
      firstName: 'Петр',
      lastName: 'Петров',
      assignments: [
        {number: 1, status: 'graded', grade: 5},
        {number: 2, status: 'not_submitted'},
        {number: 3, status: 'submitted'},
      ]
    },
    {
      id: 3,
      firstName: 'Сергей',
      lastName: 'Сергеев',
      assignments: [
        {number: 1, status: 'submitted'},
        {number: 2, status: 'graded', grade: 3},
        {number: 3, status: 'not_submitted'},
      ]
    },
    {
      id: 4,
      firstName: 'Анна',
      lastName: 'Антонова',
      assignments: [
        {number: 1, status: 'graded', grade: 4},
        {number: 2, status: 'submitted'},
        {number: 3, status: 'graded', grade: 5},
      ]
    },
    {
      id: 5,
      firstName: 'Мария',
      lastName: 'Маринова',
      assignments: [
        {number: 1, status: 'not_submitted'},
        {number: 2, status: 'graded', grade: 2},
        {number: 3, status: 'submitted'},
      ]
    },
    {
      id: 6,
      firstName: 'Дмитрий',
      lastName: 'Дмитриев',
      assignments: [
        {number: 1, status: 'graded', grade: 5},
        {number: 2, status: 'submitted'},
        {number: 3, status: 'not_submitted'},
      ]
    },
    {
      id: 7,
      firstName: 'Елена',
      lastName: 'Еленова',
      assignments: [
        {number: 1, status: 'submitted'},
        {number: 2, status: 'graded', grade: 4},
        {number: 3, status: 'not_submitted'},
      ]
    },
    {
      id: 8,
      firstName: 'Алексей',
      lastName: 'Алексеев',
      assignments: [
        {number: 1, status: 'graded', grade: 3},
        {number: 2, status: 'submitted'},
        {number: 3, status: 'graded', grade: 4},
      ]
    },
    {
      id: 9,
      firstName: 'Ольга',
      lastName: 'Ольгова',
      assignments: [
        {number: 1, status: 'not_submitted'},
        {number: 2, status: 'submitted'},
        {number: 3, status: 'graded', grade: 5},
      ]
    },
    {
      id: 10,
      firstName: 'Виктор',
      lastName: 'Викторов',
      assignments: [
        {number: 1, status: 'graded', grade: 4},
        {number: 2, status: 'not_submitted'},
        {number: 3, status: 'submitted'},
      ]
    },
    {
      id: 11,
      firstName: 'Татьяна',
      lastName: 'Татьянова',
      assignments: [
        {number: 1, status: 'submitted'},
        {number: 2, status: 'graded', grade: 3},
        {number: 3, status: 'not_submitted'},
      ]
    },
    {
      id: 12,
      firstName: 'Андрей',
      lastName: 'Андреев',
      assignments: [
        {number: 1, status: 'graded', grade: 5},
        {number: 2, status: 'submitted'},
        {number: 3, status: 'graded', grade: 4},
      ]
    },
    {
      id: 13,
      firstName: 'Светлана',
      lastName: 'Светлова',
      assignments: [
        {number: 1, status: 'not_submitted'},
        {number: 2, status: 'graded', grade: 2},
        {number: 3, status: 'submitted'},
      ]
    },
    {
      id: 14,
      firstName: 'Владимир',
      lastName: 'Владимиров',
      assignments: [
        {number: 1, status: 'graded', grade: 4},
        {number: 2, status: 'not_submitted'},
        {number: 3, status: 'submitted'},
      ]
    },
    {
      id: 15,
      firstName: 'Наталья',
      lastName: 'Натальева',
      assignments: [
        {number: 1, status: 'graded', grade: 5},
        {number: 2, status: 'submitted'},
        {number: 3, status: 'graded', grade: 4},
      ]
    },
    {
      id: 16,
      firstName: 'Михаил',
      lastName: 'Михайлов',
      assignments: [
        {number: 1, status: 'submitted'},
        {number: 2, status: 'not_submitted'},
        {number: 3, status: 'graded', grade: 3},
      ]
    },
    {
      id: 17,
      firstName: 'Екатерина',
      lastName: 'Екатеринова',
      assignments: [
        {number: 1, status: 'graded', grade: 5},
        {number: 2, status: 'submitted'},
        {number: 3, status: 'not_submitted'},
      ]
    },
    {
      id: 18,
      firstName: 'Юрий',
      lastName: 'Юрьев',
      assignments: [
        {number: 1, status: 'not_submitted'},
        {number: 2, status: 'graded', grade: 4},
        {number: 3, status: 'submitted'},
      ]
    },
    {
      id: 19,
      firstName: 'Марина',
      lastName: 'Маринова',
      assignments: [
        {number: 1, status: 'submitted'},
        {number: 2, status: 'graded', grade: 3},
        {number: 3, status: 'not_submitted'},
      ]
    },
    {
      id: 20,
      firstName: 'Григорий',
      lastName: 'Григорьев',
      assignments: [
        {number: 1, status: 'graded', grade: 4},
        {number: 2, status: 'submitted'},
        {number: 3, status: 'not_submitted'},
      ]
    }
  ];

  getStudentById(studentId: number) {
    return this.students.find(student => student.id === studentId)
  }

  getAssignments() {
    return [1, 2, 3];
  }

  getStudents(): Observable<MarkListDto> {
    // return this.students
    return this.http.get<MarkListDto>(`${SERVER_URL}/task/get/students`)
  }
}
