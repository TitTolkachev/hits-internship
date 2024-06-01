import { Component } from '@angular/core';
import {Modal} from "bootstrap";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  streams = [{ name: 'Поток 1' }, { name: 'Поток 2' }, { name: 'Поток 3' }];
  newStreamName = '';

  openAddStreamModal() {
    const modalElement = document.getElementById('addStreamModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  addStream() {
    if (this.newStreamName.trim()) {
      this.streams.push({ name: this.newStreamName });
      this.newStreamName = '';
      const modalElement = document.getElementById('addStreamModal');
      if (modalElement) {
        const modal = Modal.getInstance(modalElement);
        modal?.hide();
      }
    }
  }
}
