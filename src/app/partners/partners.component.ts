import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PartnerListItem} from "./model/partner-list-item.model";

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
  partners: PartnerListItem[] = [
    {
      id: '1',
      name: 'Компания 1',
      description: 'Описание компании 1',
      nextMeetingDate: 1717238400000,
    },
    {
      id: '2',
      name: 'Компания 2',
      description: 'Описание компании 2',
      nextMeetingDate: 1717324800000
    },
    {
      id: '3',
      name: 'Компания 3',
      description: 'Описание компании 3',
      nextMeetingDate: 1717411200000
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  formatDate(epochMillis: number): string {
    const date = new Date(epochMillis);
    return date.toLocaleString();
  }

  goToPartnerDetail(partner: PartnerListItem): void {
    this.router.navigate(['/main/partners', partner.id]);
  }
}
