import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentTaskService} from "../../../services/student-task.service";
import {SELECTED_STREAM_KEY, SERVER_URL} from "../../../constants";
import {HttpClient} from "@angular/common/http";

declare var bootstrap: any;

@Component({
  selector: 'app-dean-student',
  templateUrl: './dean-student.component.html',
  styleUrls: ['./dean-student.component.css']
})
export class DeanStudentComponent implements OnInit {
  studentId!: number;
  answer: any = null;
  isLoading = true;

  ids: any[] = [];
  selectedId: any;

  statusOptions = ['Необходимо отправить задание', 'Ожидает проверки', 'Требует доработок', 'Задание выполнено'];
  ratingOptions = ['-', 2, 3, 4, 5];
  selectedStatus: string = '';
  selectedRating: number = 1;

  constructor(
    private route: ActivatedRoute,
    private studentTaskService: StudentTaskService,
    private http: HttpClient,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.studentId = +this.route.snapshot.paramMap.get('studentId')!;

    let streamName = localStorage.getItem(SELECTED_STREAM_KEY)
    this.http.get<any[]>(`${SERVER_URL}/task/get/all/ids/${streamName}`).subscribe((ids) => {
      this.ids = ids.reverse()
      this.selectedId = this.ids[0]
      this.getLastAnswer(this.selectedId)
    })
  }

  getLastAnswer(taskId: number): void {
    this.isLoading = true;
    this.selectedId = taskId
    this.studentTaskService.getLastAnswer(taskId, this.studentId).subscribe(
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
    const modal = new bootstrap.Modal(document.getElementById('markModal'));
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

  openFileByUrl(url: any): void {
    window.open(url, '_blank');
  }

  save() {
    this.http.post(`${SERVER_URL}/answers/mark`, {
      taskId: this.selectedId,
      userId: this.studentId,
      mark: Number(this.selectedRating) || 0,
      completionStatus: this.statusOptions.findIndex((item) => item == this.selectedStatus),
    }).subscribe(() => {
      this.getLastAnswer(this.selectedId)
      const modal = bootstrap.Modal.getInstance(document.getElementById('markModal'));
      modal.hide();
    })
  }

  cancel() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('markModal'));
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

  navigateToStudentProfile() {
    this.router.navigateByUrl(`/dean/user/${this.studentId}`).then()
  }
}
