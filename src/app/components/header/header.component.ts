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
  newStreamName = '';

  selectStream(stream: any) {
    console.log('Selected stream:', stream);
    // Здесь можно добавить логику для обработки выбранного потока
  }

  openAddStreamModal() {
    const modalElement = document.getElementById('addStreamModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement, {
        keyboard: false
      });
      modal.show();
    }
  }

  addStream() {
    if (this.newStreamName) {
      this.streams.push({ name: this.newStreamName });
      this.newStreamName = '';
      const modalElement = document.getElementById('addStreamModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
    }
  }
}
