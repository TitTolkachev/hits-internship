import {Component} from '@angular/core';
import * as bootstrap from 'bootstrap'
import {StreamService} from "../../services/stream.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  streams: string[] = [];
  newStreamName: string = '';

  constructor(private streamService: StreamService) {
  }

  ngOnInit(): void {
    this.loadStrings();
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

  selectStream(stream: any) {
    console.log('Selected stream:', stream.name);
  }

  openAddStreamModal() {
    const addStreamModal = new bootstrap.Modal(document.getElementById('addStreamModal')!, {
      keyboard: false
    });
    addStreamModal.show();
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
}
