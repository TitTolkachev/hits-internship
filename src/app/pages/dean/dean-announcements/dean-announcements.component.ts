import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AnnouncementService} from "../../../services/announcement.service";

declare var bootstrap: any;

@Component({
  selector: 'app-dean-announcements',
  templateUrl: './dean-announcements.component.html',
  styleUrls: ['./dean-announcements.component.css']
})
export class DeanAnnouncementsComponent implements OnInit {
  announcements: any[] = [];
  streamName: string = '9721';
  isLoading: boolean = false;

  @ViewChild('announcementModal') announcementModal!: ElementRef;
  modalInstance!: any;
  isEditing: boolean = false;
  currentAnnouncement: any = null;
  announcementText: string = '';

  constructor(private announcementService: AnnouncementService) {
  }

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.isLoading = true;
    this.announcementService.getAnnouncements(this.streamName).subscribe((data: any[]) => {
      this.announcements = data.reverse();
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      // handle error
    });
  }

  openAddModal(): void {
    this.isEditing = false;
    this.announcementText = '';
    this.modalInstance = new bootstrap.Modal(this.announcementModal.nativeElement);
    this.modalInstance.show();
  }

  openEditModal(announcement: any): void {
    this.isEditing = true;
    this.currentAnnouncement = announcement;
    this.announcementText = announcement.text;
    this.modalInstance = new bootstrap.Modal(this.announcementModal.nativeElement);
    this.modalInstance.show();
  }

  saveAnnouncement(): void {
    if (this.isEditing) {
      this.announcementService.updateAnnouncement(this.currentAnnouncement.id, this.announcementText).subscribe(() => {
        this.loadAnnouncements();
        this.modalInstance.hide();
      });
    } else {
      this.announcementService.createAnnouncement(this.streamName, this.announcementText).subscribe(() => {
        this.loadAnnouncements();
        this.modalInstance.hide();
      });
    }
  }

  deleteAnnouncement(id: number): void {
    this.announcementService.deleteAnnouncement(id).subscribe(() => {
      this.loadAnnouncements();
    });
  }

  addComment(announcementId: number, text: string): void {
    this.announcementService.createComment(announcementId, text).subscribe(() => {
      this.loadAnnouncements();
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
}
