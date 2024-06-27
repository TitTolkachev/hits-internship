import {Component} from '@angular/core';
import * as bootstrap from 'bootstrap'
import {StreamService} from "../../services/stream.service";
import {HttpClient} from "@angular/common/http";
import {FRONT_URL, SELECTED_STREAM_KEY, SERVER_URL} from "../../constants";
import {InviteLink} from "../../models/inviteLink";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  streams: string[] = [];
  newStreamName: string = '';

  selectedStream: string | undefined;
  createdLink: string | undefined;

  constructor(
    private streamService: StreamService,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadStreams();
  }

  loadStreams(): void {
    this.streamService.getStreams().subscribe(
      (data: string[]) => {
        this.streams = data;
        let stream = localStorage.getItem(SELECTED_STREAM_KEY)
        if (stream == null) {
          if (data.length > 0) {
            let selectedStream = data[0]
            localStorage.setItem(SELECTED_STREAM_KEY, selectedStream)
            this.selectedStream = selectedStream
          }
        } else if (data.includes(stream)) {
          this.selectedStream = stream
        } else {
          localStorage.removeItem(SELECTED_STREAM_KEY)
        }
      },
      () => {
        console.error();
      }
    );
  }

  selectStream(stream: string) {
    this.selectedStream = stream
    this.createdLink = undefined
    localStorage.setItem(SELECTED_STREAM_KEY, stream)
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
      this.http.post(`${SERVER_URL}/stream/create`, {name: this.newStreamName}).subscribe({
        next: () => {
          this.streams.push(this.newStreamName);
          this.selectedStream = this.newStreamName;
          localStorage.setItem(SELECTED_STREAM_KEY, this.newStreamName)
          this.newStreamName = '';
          const addStreamModal = bootstrap.Modal.getInstance(document.getElementById('addStreamModal')!);
          if (addStreamModal) {
            addStreamModal.hide();
          }
          this.router.navigateByUrl("").then();
        },
        error: (error) => {
          console.error('There was a problem with the request:', error);
        }
      });
    }
  }


  createInviteLink() {
    if (this.selectedStream != null) {
      this.streamService.createInviteLink(this.selectedStream).subscribe((linkModel: InviteLink) => {
        this.createdLink = `${FRONT_URL}/invite/${linkModel.code}`
      })
    }
  }

  openExitModal(): void {
    const logoutModal = document.getElementById('logoutModal');
    if (logoutModal) {
      logoutModal.style.display = 'flex';
    }
  }

  closeExitModal(): void {
    const logoutModal = document.getElementById('logoutModal');
    if (logoutModal) {
      logoutModal.style.display = 'none';
    }
  }

  logout(): void {
    this.userService.logout().subscribe(() => {
      this.authService.signOut()
      this.router.navigateByUrl("").then();
    })
    this.closeExitModal();
  }
}
