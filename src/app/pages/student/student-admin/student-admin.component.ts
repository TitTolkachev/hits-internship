import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {PartnerService} from "../../../services/partner.service";
import {jwtDecode} from "jwt-decode";
import {Jwt} from "../../../models/jwt";
import {ACCESS_TOKEN_KEY, SELECTED_STREAM_KEY, SERVER_URL} from "../../../constants";
import {StackService} from "../../../services/stack.service";

declare var bootstrap: any;

@Component({
  selector: 'app-student-admin',
  templateUrl: './student-admin.component.html',
  styleUrl: './student-admin.component.css'
})
export class StudentAdminComponent implements OnInit {
  studentId: number = 0;
  studentInfo: any = {};
  messages: any[] = [];
  newMessage: string = '';
  currentUserId: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private partnerService: PartnerService,
    private stackService: StackService) {
  }

  ngOnInit(): void {
    this.currentUserId = Number(jwtDecode<Jwt>(localStorage.getItem(ACCESS_TOKEN_KEY) || '').sub)
    this.studentId = this.currentUserId;
    this.getStudentInfo();
    this.getChatHistory();
    this.loadCompanies();
    this.loadStacks();
  }

  getStudentInfo(): void {
    this.http.get(`${SERVER_URL}/user/${this.studentId}/info`).subscribe(data => {
      this.studentInfo = data;
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

  loadCompanies(): void {
    const streamName = localStorage.getItem(SELECTED_STREAM_KEY) || ''
    this.partnerService.getAllPartners(streamName).subscribe((data: any[]) => {
      this.companies = data;
    });
  }

  loadStacks(): void {
    this.stackService.getStacks().subscribe(data => {
      this.stacks = data;
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

  stacks: any[] = [];
  selectedStacks: { id: number, priority: number, name: '' }[] = [];

  companies: any[] = [];
  selectedCompanies: { id: number, priority: number, name: '' }[] = [];
  selectedOffered: { id: number, priority: number, name: '' }[] = [];

  addStackLine() {
    this.selectedStacks.push({id: 0, priority: this.selectedStacks.length + 1, name: ''});
  }
  addCompanyLine() {
    this.selectedCompanies.push({id: 0, priority: this.selectedCompanies.length + 1, name: ''});
  }
  addOfferedLine() {
    this.selectedOffered.push({id: 0, priority: this.selectedOffered.length + 1, name: ''});
  }
  removeStackLine(index: number) {
    this.selectedStacks.splice(index, 1);
  }
  removeCompanyLine(index: number) {
    this.selectedCompanies.splice(index, 1);
  }
  removeOfferedLine(index: number) {
    this.selectedOffered.splice(index, 1);
  }

  saveEditStacks() {
    this.selectedStacks.sort((a, b) => a.priority - b.priority);
    // @ts-ignore
    const topCompanies = this.studentInfo.topCompanies.map(s => Number(s.id));
    // @ts-ignore
    const topStacks = this.selectedStacks.map(s => Number(s.id));
    // @ts-ignore
    const offered = this.studentInfo.offered.map(s => Number(s.id));
    this.stackService.updateStudentInfo(topCompanies, offered, topStacks).subscribe(() => {
      const modal = bootstrap.Modal.getInstance(document.getElementById('viewMeetingModal'));
      modal.hide();
      this.getStudentInfo();
    });
  }

  saveEditCompanies() {
    this.selectedCompanies.sort((a, b) => a.priority - b.priority);
    // @ts-ignore
    const topCompanies = this.selectedCompanies.map(s => Number(s.id));
    // @ts-ignore
    const offered = this.studentInfo.offered.map(s => Number(s.id));
    // @ts-ignore
    const topStacks = this.studentInfo.topStacks.map(s => Number(s.id));
    this.stackService.updateStudentInfo(topCompanies, offered, topStacks).subscribe(() => {
      const modal = bootstrap.Modal.getInstance(document.getElementById('editCompaniesModal'));
      modal.hide();
      this.getStudentInfo();
    });
  }

  saveEditOffered() {
    this.selectedOffered.sort((a, b) => a.priority - b.priority);
    // @ts-ignore
    const topCompanies = this.studentInfo.topCompanies.map(s => Number(s.id));
    // @ts-ignore
    const offered = this.selectedOffered.map(s => Number(s.id));
    // @ts-ignore
    const topStacks = this.studentInfo.topStacks.map(s => Number(s.id));
    this.stackService.updateStudentInfo(topCompanies, offered, topStacks).subscribe(() => {
      const modal = bootstrap.Modal.getInstance(document.getElementById('editOfferedModal'));
      modal.hide();
      this.getStudentInfo();
    });
  }

  openEditStacksModal() {
    const stacks = this.studentInfo.topStacks as any[]
    this.selectedStacks = stacks.map((element, index) => {
      return {id: element.id, priority: index + 1, name: element.name}
    })
    const modal = new bootstrap.Modal(document.getElementById('viewMeetingModal'));
    modal.show();
  }

  openEditCompaniesModal() {
    const companies = this.studentInfo.topCompanies as any[]
    this.selectedCompanies = companies.map((element, index) => {
      return {id: element.id, priority: index + 1, name: element.name}
    })
    const modal = new bootstrap.Modal(document.getElementById('editCompaniesModal'));
    modal.show();
  }

  openEditOfferedModal() {
    const offered = this.studentInfo.offered as any[]
    this.selectedOffered = offered.map((element, index) => {
      return {id: element.id, priority: index + 1, name: element.name}
    })
    const modal = new bootstrap.Modal(document.getElementById('editOfferedModal'));
    modal.show();
  }

  openNewStackModal() {
    const modal = new bootstrap.Modal(document.getElementById('addStackModal'));
    modal.show();
  }

  newStack: any = {
    name: ''
  };

  addStack(): void {
    const body = {
      name: this.newStack.name
    };
    this.http.post(`${SERVER_URL}/stack/create`, body).subscribe(() => {
      this.stackService.getStacks().subscribe(stacks => {
        this.stacks = stacks;
      });
    });
    const modalElement = document.getElementById('addStackModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  }
}
