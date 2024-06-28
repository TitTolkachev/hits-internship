import {Component, OnInit} from '@angular/core';
import {SELECTED_STREAM_KEY} from "../../../constants";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-dean-student-layout',
  templateUrl: './dean-student-layout.component.html',
  styleUrl: './dean-student-layout.component.css'
})
export class DeanStudentLayoutComponent implements OnInit {

  ids: any[] = []

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    let streamName = localStorage.getItem(SELECTED_STREAM_KEY)
    this.ids = [1,2,3]
    // this.http.get<any[]>(`/${streamName}`).subscribe((ids) => this.ids = ids)
  }
}
