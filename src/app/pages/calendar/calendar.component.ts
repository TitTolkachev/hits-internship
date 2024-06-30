import {Component} from '@angular/core';
import {Meeting} from '../../models/meeting.model';
import {SELECTED_STREAM_KEY, SERVER_URL} from "../../constants";
import {PartnerService} from "../../services/partner.service";
import {HttpClient} from "@angular/common/http";

declare var bootstrap: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  public year: number;
  public month: number;
  public monthName: string = '';
  public calendar: any[] = [];
  public shortWeekDays: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  public meetings: Meeting[] = [];
  public newMeeting: { time: string, comment: string, audience: string, companyId: number | null } = {
    time: '',
    comment: '',
    audience: '',
    companyId: null
  };
  public selectedMeeting: Meeting | null = null;
  public selectedDate: Date | null = null;

  topCompanies: any[] = [];

  constructor(
    private partnerService: PartnerService,
    private http: HttpClient,
  ) {
    const today = new Date();
    this.year = today.getFullYear();
    this.month = today.getMonth();
    this.updateCalendar();
    this.loadMeetings();
    this.getTopCompanies();
  }

  updateCalendar() {
    const firstDay = new Date(this.year, this.month, 1);
    const lastDay = new Date(this.year, this.month + 1, 0);

    this.monthName = firstDay.toLocaleString('default', {month: 'long'});

    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay() || 7;
    const calendar = [];
    let week = [];

    for (let i = 1; i < startDay; i++) {
      week.push({date: null, meetings: []});
    }

    for (let day = 1; day <= daysInMonth; day++) {
      week.push({date: day, meetings: this.getMeetingsForDay(day)});
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push({date: null, meetings: []});
      }
      calendar.push(week);
    }

    this.calendar = calendar;
  }

  getMeetingsForDay(day: number): Meeting[] {
    return this.meetings.filter(meeting => {
      const meetingDate = new Date(meeting.time * 1000);
      return (
        meetingDate.getFullYear() === this.year &&
        meetingDate.getMonth() === this.month &&
        meetingDate.getDate() === day
      );
    });
  }

  previousMonth() {
    if (this.month === 0) {
      this.month = 11;
      this.year--;
    } else {
      this.month--;
    }
    this.updateCalendar();
    this.loadMeetings()
  }

  nextMonth() {
    if (this.month === 11) {
      this.month = 0;
      this.year++;
    } else {
      this.month++;
    }
    this.updateCalendar();
    this.loadMeetings()
  }

  openCreateMeetingModal(day: any) {  // Явное указание типа any
    if (day.date) {
      this.selectedDate = new Date(this.year, this.month, day.date);
      this.newMeeting = {time: '00:00', comment: '', audience: '', companyId: null};
      const modal = new bootstrap.Modal(document.getElementById('createMeetingModal'));
      modal.show();
    }
  }

  createMeeting() {
    if (this.selectedDate) {
      const [hours, minutes] = this.newMeeting.time.split(':').map(Number);
      const meetingDateTime = new Date(this.selectedDate);
      meetingDateTime.setHours(hours, minutes);

      this.http.post(`${SERVER_URL}/meets/create`, {
        auditorium: this.newMeeting.audience,
        comment: this.newMeeting.comment,
        companyId: Number(this.newMeeting.companyId),
        time: meetingDateTime.getTime() / 1000,
      }).subscribe(() => {
        this.loadMeetings()
        bootstrap.Modal.getInstance(document.getElementById('createMeetingModal')).hide();
      })
    }
  }

  updateMeeting() {
    if (this.selectedDate) {
      const [hours, minutes] = this.newMeeting.time.split(':').map(Number);
      const meetingDateTime = new Date(this.selectedDate);
      meetingDateTime.setHours(hours, minutes);

      this.http.post(`${SERVER_URL}/meets/update/${1}`, {
        auditorium: this.newMeeting.audience,
        comment: this.newMeeting.comment,
        time: meetingDateTime.getTime() / 1000,
      }).subscribe(() => {
        this.loadMeetings()
        bootstrap.Modal.getInstance(document.getElementById('createMeetingModal')).hide();
      })
    }
  }

  deleteMeeting() {
    const meetingId = this.selectedMeeting?.id
    this.http.delete(`${SERVER_URL}/meets/delete`, {body: {id: meetingId}}).subscribe(() => {
      this.loadMeetings()
      bootstrap.Modal.getInstance(document.getElementById('viewMeetingModal')).hide();
    })
  }

  openMeetingModal(meeting: Meeting, event: MouseEvent) {
    event.stopPropagation();
    this.selectedMeeting = meeting;
    const modal = new bootstrap.Modal(document.getElementById('viewMeetingModal'));
    modal.show();
  }

  isToday(day: any): boolean {
    if (!day.date) return false;
    const today = new Date();
    const date = new Date(this.year, this.month, day.date);
    return today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate();
  }

  getTopCompanies(): void {
    const streamName = localStorage.getItem(SELECTED_STREAM_KEY) || ''
    this.partnerService.getAllPartners(streamName).subscribe((data: any[]) => {
      this.topCompanies = data;
    });
  }

  loadMeetings() {
    const year = this.year
    const month = this.month + 1
    const streamName = localStorage.getItem(SELECTED_STREAM_KEY) || ''
    this.http.get<Meeting[]>(`${SERVER_URL}/meets/get/${streamName}/${year}/${month}`).subscribe((data) => {
      this.meetings = data
      this.updateCalendar();
    })
  }
}
