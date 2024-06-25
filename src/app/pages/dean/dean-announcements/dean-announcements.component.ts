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
    this.announcementService.getAnnouncements(this.streamName).subscribe((data: any[]) => {
      this.announcements = data;
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

  // Additional methods for editing and deleting comments will be similar to above
}
