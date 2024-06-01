import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  streams = [
    { name: 'Поток 1' },
    { name: 'Поток 2' },
    { name: 'Поток 3' }
  ];
  newStreamName: string = '';

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
      this.streams.push({ name: this.newStreamName });
      this.newStreamName = '';
      const addStreamModal = bootstrap.Modal.getInstance(document.getElementById('addStreamModal')!);
      if (addStreamModal) {
        addStreamModal.hide();
      }
    }
  }
}
