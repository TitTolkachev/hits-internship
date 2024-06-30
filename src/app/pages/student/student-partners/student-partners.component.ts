import {Component, OnInit} from '@angular/core';
import {PartnerService} from "../../../services/partner.service";
import {Router} from "@angular/router";
import {SELECTED_STREAM_KEY} from "../../../constants";
import * as moment from "moment/moment";

@Component({
  selector: 'app-student-partners',
  templateUrl: './student-partners.component.html',
  styleUrl: './student-partners.component.css'
})
export class StudentPartnersComponent implements OnInit {
  partners: any[] = [];
  loading = true;
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

  viewPartner(partnerId: number): void {
    this.router.navigate([`${this.router.url}/${partnerId}`]).then();
  }

  formatTime(time: number): string {
    return time ? moment.unix(time).format('DD.MM.YYYY, HH:mm') : 'Встреча не запланирована';
  }
}
