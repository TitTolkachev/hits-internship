import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      this.data = data;
    });
  }
}
