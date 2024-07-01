import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {PartnerService} from "../../../services/partner.service";
import {Jwt} from "../../../models/jwt";
import {ACCESS_TOKEN_KEY, SELECTED_STREAM_KEY, SERVER_URL} from "../../../constants";
import {jwtDecode} from "jwt-decode";

declare var bootstrap: any;
@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
export class AdminUserComponent implements OnInit {
  studentId: number = 0;
  studentInfo: any = {};
  messages: any[] = [];
  newMessage: string = '';
  currentUserId: any;

  companies: any[] = [];
  stacks: any[] = [];
  selectedCompanyId!: number;
  selectedStackId!: number;
  selectedOffered: { id: number, priority: number, name: '' }[] = [];
  newComment: string = '';
  newDeactivated: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private partnerService: PartnerService) {
  }

  ngOnInit(): void {
    this.currentUserId = Number(jwtDecode<Jwt>(localStorage.getItem(ACCESS_TOKEN_KEY) || '').sub)
    this.route.params.subscribe(params => {
      this.studentId = +params['studentId'];
      this.getStudentInfo();
      this.getChatHistory();
      this.getTopCompanies();
      this.getTopStacks();
    });
  }

  getStudentInfo(): void {
    this.http.get(`${SERVER_URL}/user/${this.studentId}/info`).subscribe(data => {
      this.studentInfo = data;
      if (this.studentInfo.company != null) {
        this.selectedCompanyId = this.studentInfo.company.id;
      }
      if (this.studentInfo.techStack != null) {
        this.selectedStackId = this.studentInfo.techStack.id;
      }
    });
  }

  getChatHistory(): void {
    this.http.get<any[]>(`${SERVER_URL}/chats/get/admin/${this.studentId}`).subscribe((data: any[]) => {
      this.messages = data;
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const messageData = {
        studentId: this.studentId,
        message: this.newMessage
      };
      this.http.post(`${SERVER_URL}/chats/message/admin`, messageData).subscribe(() => {
        this.getChatHistory();
        this.newMessage = '';
      });
    }
  }

  getTopCompanies(): void {
    const streamName = localStorage.getItem(SELECTED_STREAM_KEY) || ''
    this.partnerService.getAllPartners(streamName).subscribe((data: any[]) => {
      this.companies = data;
    });
  }

  getTopStacks(): void {
    this.http.get<any[]>(`${SERVER_URL}/stack/get`).subscribe((data: any[]) => {
      this.stacks = data;
    });
  }

  openEditModal(): void {
    this.selectedCompanyId = this.studentInfo.company?.id
    this.selectedStackId =this.studentInfo.techStack?.id
    const offered = this.studentInfo.offeredConfirmed as any[]
    this.selectedOffered = offered.map((element, index) => {
      return {id: element.id, priority: index + 1, name: element.name}
    })
    this.newComment = this.studentInfo.comment
    this.newDeactivated = this.studentInfo.deactivated
    const modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
  }

  updateStudentInfo(): void {
    const offered = this.selectedOffered
      .filter(c=>c.id >= 0)
      .sort((a, b) => a.priority - b.priority)
      .map(s => Number(s.id));

    this.http.post(`${SERVER_URL}/user/student/update/${this.studentId}`, {
      deactivated: `${this.newDeactivated}` === "true",
      streamName: this.studentInfo.streamName,
      companyId: Number(this.selectedCompanyId),
      StackId: Number(this.selectedStackId),
      offeredConfirmed: offered,
      comment: this.newComment.trim(),
    }).subscribe(() => {
      this.getStudentInfo();
      const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
      modal.hide();
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

  counter = -1;

  addOfferedLine() {
    this.selectedOffered.push({id: this.counter--, priority: this.selectedOffered.length + 1, name: ''});
  }

  removeOfferedLine(index: number) {
    this.selectedOffered.splice(index, 1);
  }
}
