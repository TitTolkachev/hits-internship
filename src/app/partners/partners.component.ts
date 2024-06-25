import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {PartnerService} from "../services/partner.service";
import {SELECTED_STREAM_KEY} from "../constants";

declare var bootstrap: any;

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
  partners: any[] = [];
  loading = true;
  newPartnerName = '';
  error = '';

  constructor(private partnerService: PartnerService, private router: Router) {
  }

  ngOnInit(): void {
    const streamName = localStorage.getItem(SELECTED_STREAM_KEY);
    if (streamName) {
      this.partnerService.getAllPartners(streamName).subscribe({
        next: (data) => {
          this.partners = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Error fetching partners';
          this.loading = false;
        }
      });
    } else {
      this.error = 'Stream name not found in local storage';
      this.loading = false;
    }
  }

  openModal(): void {
    const modalElement = document.getElementById('partnerModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  addPartner(): void {
    const streamName = localStorage.getItem(SELECTED_STREAM_KEY);
    if (this.newPartnerName && streamName) {
      this.partnerService.createPartner({name: this.newPartnerName, streamName}).subscribe({
        next: () => {
          this.ngOnInit();
          this.newPartnerName = '';
          bootstrap.Modal.getInstance(document.getElementById('partnerModal')).hide();
        },
        error: () => {
          this.error = 'Error adding partner';
        }
      });
    }
  }

  viewPartner(partnerId: number): void {
    this.router.navigate([`/admin/partners/${partnerId}`]).then();
  }

  formatTime(time: number): string {
    return time ? moment.unix(time).format('DD.MM.YYYY, HH:mm') : 'Встреча не запланирована';
  }
}
