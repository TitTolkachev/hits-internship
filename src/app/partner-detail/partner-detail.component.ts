import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Modal } from 'bootstrap';
import {EditablePartnerInfo} from "./model/editable-partner-info.model";
import {PartnerFullInfo} from "./model/parner-full-info.model";

@Component({
  selector: 'app-partner-detail',
  templateUrl: './partner-detail.component.html',
  styleUrls: ['./partner-detail.component.css']
})
export class PartnerDetailComponent implements OnInit {
  partner: EditablePartnerInfo | undefined;
  editPartnerName: string | undefined;
  editPartnerDescription: string | undefined;
  editNextMeetingDate: string | undefined;
  editCompanyContactEmail: string | undefined;
  editCompanyContactTelegram: string | undefined;
  editFacultyContactFirstName: string | undefined;
  editFacultyContactLastName: string | undefined;
  editStudentOffers: string | undefined;
  editJobPositions: string | undefined;
  editModal: Modal | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const partnerId = this.route.snapshot.paramMap.get('id');
    const mockPartners: PartnerFullInfo[] = [
      {
        id: '1',
        name: 'Компания 1',
        description: 'Описание компании 1',
        nextMeetingDate: 1717238400000,
        studentOffers: ['student1', 'student2'],
        jobPositions: { 'Android-разработчик': 10, 'Frontend': 5, 'ML': 4 },
        companyContact: { email: 'contact@company1.com', telegram: '@company1' },
        facultyContact: { firstName: 'Иван', lastName: 'Иванов' }
      },
      {
        id: '2',
        name: 'Компания 2',
        description: 'Описание компании 2',
        nextMeetingDate: 1717324800000,
        studentOffers: ['student3', 'student4'],
        jobPositions: { 'Android-разработчик': 8, 'Frontend': 6, 'ML': 5 },
        companyContact: { email: 'contact@company2.com', telegram: '@company2' },
        facultyContact: { firstName: 'Пётр', lastName: 'Петров' }
      },
      {
        id: '3',
        name: 'Компания 3',
        description: 'Описание компании 3',
        nextMeetingDate: 1717411200000,
        studentOffers: ['student5', 'student6'],
        jobPositions: { 'Android-разработчик': 12, 'Frontend': 4, 'ML': 3 },
        companyContact: { email: 'contact@company3.com', telegram: '@company3' },
        facultyContact: { firstName: 'Сергей', lastName: 'Сергеев' }
      }
    ];
    this.partner = mockPartners.find(p => p.id === partnerId);

    setTimeout(() => {
      const modalElement = document.getElementById('editPartnerModal');
      if (modalElement) {
        this.editModal = new Modal(modalElement);
        console.log("Modal initialized");
      } else {
        console.error();
      }
    }, 0);
  }

  formatDate(epochMillis: number): string {
    const date = new Date(epochMillis);
    return date.toLocaleString();
  }

  openEditModal(): void {
    if (this.partner) {
      this.editPartnerName = this.partner.name;
      this.editPartnerDescription = this.partner.description;
      this.editNextMeetingDate = this.partner.nextMeetingDate ? this.toDateTimeLocal(new Date(this.partner.nextMeetingDate)) : '';
      this.editCompanyContactEmail = this.partner.companyContact?.email;
      this.editCompanyContactTelegram = this.partner.companyContact?.telegram;
      this.editFacultyContactFirstName = this.partner.facultyContact?.firstName;
      this.editFacultyContactLastName = this.partner.facultyContact?.lastName;
      this.editStudentOffers = this.partner.studentOffers?.join(', ');
      this.editJobPositions = this.partner.jobPositions ? Object.entries(this.partner.jobPositions).map(([key, value]) => `${key}:${value}`).join(', ') : '';
      this.editModal?.show();
    } else {
      console.error();
    }
  }

  saveChanges(): void {
    if (this.partner) {
      if (this.editPartnerName != null) {
        this.partner.name = this.editPartnerName;
      }
      if (this.editPartnerDescription != null) {
        this.partner.description = this.editPartnerDescription;
      }
      // @ts-ignore
      this["partner"]["nextMeetingDate"] = <number>this.editNextMeetingDate ? new Date(this.editNextMeetingDate).getTime() : undefined;
      if (this.partner.companyContact) {
        if (this.editCompanyContactEmail != null) {
          this.partner.companyContact.email = this.editCompanyContactEmail;
        }
        if (this.editCompanyContactTelegram != null) {
          this.partner.companyContact.telegram = this.editCompanyContactTelegram;
        }
      }
      if (this.partner.facultyContact) {
        if (this.editFacultyContactFirstName != null) {
          this.partner.facultyContact.firstName = this.editFacultyContactFirstName;
        }
        if (this.editFacultyContactLastName != null) {
          this.partner.facultyContact.lastName = this.editFacultyContactLastName;
        }
      }
      // @ts-ignore
      this.partner.studentOffers = this.editStudentOffers?.split(',').map(s => s.trim());
      this.partner.jobPositions = this.editJobPositions ? Object.fromEntries(this.editJobPositions.split(',').map(item => item.split(':').map(i => i.trim()))) : {};
      this.editModal?.hide();
    } else {
      console.error();
    }
  }

  toDateTimeLocal(date: Date): string {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - (offset*60*1000));
    return localDate.toISOString().slice(0, 16);
  }
}
