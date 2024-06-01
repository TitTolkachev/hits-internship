import { Component, OnInit } from '@angular/core';
import { Meeting } from '../../models/meeting.model';

declare var bootstrap: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  public year: number;
  public month: number;
  public monthName: string = '';  // Инициализация пустой строкой
  public calendar: any[] = [];
  public shortWeekDays: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  public meetings: Meeting[] = [];
  public newMeeting: Meeting = { id: '', dateTimeEpochMs: 0, comment: '', audience: '', company: '' };  // Инициализация пустым объектом
  public selectedMeeting: Meeting | null = null;

  constructor() {
    const today = new Date();
    this.year = today.getFullYear();
    this.month = today.getMonth();
    this.updateCalendar();
  }

  ngOnInit(): void {
    // Initialize demo data
    this.meetings = [
      {
        id: '1',
        dateTimeEpochMs: new Date(this.year, this.month, 5, 10, 0).getTime(),
        comment: 'Встреча с клиентом',
        audience: 'Комната 101',
        company: 'Компания А'
      },
      {
        id: '2',
        dateTimeEpochMs: new Date(this.year, this.month, 15, 14, 0).getTime(),
        comment: 'Обсуждение проекта',
        audience: 'Комната 202',
        company: 'Компания Б'
      }
    ];
    this.updateCalendar();
  }

  updateCalendar() {
    const firstDay = new Date(this.year, this.month, 1);
    const lastDay = new Date(this.year, this.month + 1, 0);

    this.monthName = firstDay.toLocaleString('default', { month: 'long' });

    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    const calendar = [];
    let week = [];

    for (let i = 1; i < startDay; i++) {
      week.push({ date: null, meetings: [] });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      week.push({ date: day, meetings: this.getMeetingsForDay(day) });
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push({ date: null, meetings: [] });
      }
      calendar.push(week);
    }

    this.calendar = calendar;
  }

  getMeetingsForDay(day: number): Meeting[] {
    const date = new Date(this.year, this.month, day).getTime();
    return this.meetings.filter(meeting => {
      const meetingDate = new Date(meeting.dateTimeEpochMs);
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
  }

  nextMonth() {
    if (this.month === 11) {
      this.month = 0;
      this.year++;
    } else {
      this.month++;
    }
    this.updateCalendar();
  }

  openCreateMeetingModal(day: any) {  // Явное указание типа any
    if (day.date) {
      const date = new Date(this.year, this.month, day.date).toISOString().slice(0, 16);
      this.newMeeting = { id: '', dateTimeEpochMs: new Date(date).getTime(), comment: '', audience: '', company: '' };
      const modal = new bootstrap.Modal(document.getElementById('createMeetingModal'));
      modal.show();
    }
  }

  createMeeting() {
    this.newMeeting.id = (this.meetings.length + 1).toString();
    this.meetings.push(this.newMeeting);
    this.updateCalendar();
    bootstrap.Modal.getInstance(document.getElementById('createMeetingModal')).hide();
  }

  openMeetingModal(meeting: Meeting, event: MouseEvent) {
    event.stopPropagation();
    this.selectedMeeting = meeting;
    const modal = new bootstrap.Modal(document.getElementById('viewMeetingModal'));
    modal.show();
  }
}
