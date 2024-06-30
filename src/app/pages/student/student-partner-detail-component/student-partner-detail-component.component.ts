import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {SERVER_URL} from "../../../constants";

@Component({
  selector: 'app-student-partner-detail-component',
  templateUrl: './student-partner-detail-component.component.html',
  styleUrl: './student-partner-detail-component.component.css'
})
export class StudentPartnerDetailComponentComponent implements OnInit {
  companyId: any;
  company: any;
  positions: any[] = [];
  stacks: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.companyId = Number(params.get('id'));
        return this.getCompanyDetails(this.companyId);
      })
    ).subscribe(company => {
      this.company = company;
      this.getInternshipPositions(this.companyId).subscribe(positions => {
        this.positions = positions;
        this.getStacks().subscribe(stacks => {
          this.stacks = stacks;
          this.positions.forEach(position => {
            const stack = this.stacks.find(s => s.id === position.stackId);
            position.stackName = stack ? stack.name : 'Неизвестный стек';
          });
        });
      });
    });
  }

  getCompanyDetails(companyId: number): Observable<any> {
    return this.http.get(`${SERVER_URL}/companies/get/${companyId}`);
  }

  getInternshipPositions(companyId: number): Observable<any[]> {
    return this.http.get<any[]>(`${SERVER_URL}/companies/stack/get/${companyId}`);
  }

  getStacks(): Observable<any[]> {
    return this.http.get<any[]>(`${SERVER_URL}/stack/get`);
  }
}
