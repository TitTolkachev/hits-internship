import {Component} from '@angular/core';
import * as bootstrap from 'bootstrap'
import {StreamService} from "../../services/stream.service";
import {catchError, Observable, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserLocation} from "../../models/userLocation";
import {FRONT_URL} from "../../constants";
import {InviteLink} from "../../models/inviteLink";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  streams: string[] = [];
  newStreamName: string = '';

  selectedStream: string | undefined = "9721";
  createdLink: string | undefined;

  constructor(
    private streamService: StreamService,
    private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadStrings();
    this.getIpClient()
  }

  loadStrings(): void {
    this.streamService.getStrings().subscribe(
      (data: string[]) => {
        this.streams = data;
      },
      (error) => {
        console.error('Error fetching strings', error);
      }
    );
  }

  selectStream(stream: string) {
    this.selectedStream = stream
    this.createdLink = undefined
  }

  openAddStreamModal() {
    const addStreamModal = new bootstrap.Modal(document.getElementById('addStreamModal')!, {
      keyboard: false
    });
    addStreamModal.show();
  }

  openCreateInviteLinkModal() {
    const createInviteLinkModal = new bootstrap.Modal(document.getElementById('createInviteModal')!, {
      keyboard: false
    });
    createInviteLinkModal.show();
  }



  addStream() {
    if (this.newStreamName) {
      this.streams.push(this.newStreamName);
      this.newStreamName = '';
      const addStreamModal = bootstrap.Modal.getInstance(document.getElementById('addStreamModal')!);
      if (addStreamModal) {
        addStreamModal.hide();
      }
    }
  }

  createInviteLink() {
    if (this.selectedStream != null){
      this.streamService.createInviteLink(this.selectedStream).subscribe((linkModel: InviteLink) => {
        this.createdLink = `${FRONT_URL}/invite/${linkModel.code}`
      })
    }
  }


  private async getIpClient() {
    const resp = await fetch('http://geolocation-db.com/json/', {
      method: 'GET'
    })

    if (!resp.ok) {
      throw new Error(`Error! status: ${resp.status}`);
    }

    const userIpV4 = ((await resp.json()) as UserLocation).IPv4;

    console.log('result is: ', userIpV4);

  }

}
