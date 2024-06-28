import {Component, OnInit} from '@angular/core';
import {SELECTED_STREAM_KEY} from "../../../constants";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-dean-student-layout',
  templateUrl: './dean-student-layout.component.html',
  styleUrl: './dean-student-layout.component.css'
})
export class DeanStudentLayoutComponent implements OnInit {

  ids: Object = []

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    let streamName = localStorage.getItem(SELECTED_STREAM_KEY)
    this.http.get(`/${streamName}`).subscribe((ids) => this.ids = ids)
  }
}
