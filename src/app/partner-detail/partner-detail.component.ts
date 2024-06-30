import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {SERVER_URL} from "../constants";

declare var bootstrap: any;

@Component({
  selector: 'app-partner-detail',
  templateUrl: './partner-detail.component.html',
  styleUrls: ['./partner-detail.component.css']
})
export class PartnerDetailComponent implements OnInit {
  companyId: any;
  company: any;
  positions: any[] = [];
  stacks: any[] = [];
  newPosition: any = {
    stackId: null,
    positionNum: null
  };
  newStack: any = {
    name: ''
  };
  editPosition: any = {
    id: null,
    stackId: null,
    positionNum: null
  };
  editCompany: any = {
    id: null,
    name: '',
    companyContact: '',
    hitsContact: ''
  };

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
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

  openModal(): void {
    const modalElement = document.getElementById('addPositionModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  openAddStackModal(): void {
    const modalElement = document.getElementById('addStackModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  addPosition(): void {
    const body = {
      stackId: Number(this.newPosition.stackId),
      positionNum: Number(this.newPosition.positionNum)
    };
    this.http.post(`${SERVER_URL}/companies/stack/create/${this.companyId}`, body).subscribe(() => {
      // Обновить список позиций после добавления новой
      this.getInternshipPositions(this.companyId).subscribe(positions => {
        this.positions = positions;
        this.positions.forEach(position => {
          const stack = this.stacks.find(s => s.id === position.stackId);
          position.stackName = stack ? stack.name : 'Неизвестный стек';
        });
      });
    });
    const modalElement = document.getElementById('addPositionModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  }

  addStack(): void {
    const body = {
      name: this.newStack.name
    };
    this.http.post(`${SERVER_URL}/stack/create`, body).subscribe(() => {
      this.getStacks().subscribe(stacks => {
        this.stacks = stacks;
      });
    });
    const modalElement = document.getElementById('addStackModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  }

  openEditModal(position: any): void {
    this.editPosition = {...position};
    const modalElement = document.getElementById('editPositionModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  savePosition(): void {
    const body = {
      stackId: this.editPosition.stackId,
      positionNum: this.editPosition.positionNum
    };
    this.http.patch(`${SERVER_URL}/companies/stack/update/${this.editPosition.id}`, body).subscribe(() => {
      // Обновить список позиций после сохранения изменений
      this.getInternshipPositions(this.companyId).subscribe(positions => {
        this.positions = positions;
        this.positions.forEach(position => {
          const stack = this.stacks.find(s => s.id === position.stackId);
          position.stackName = stack ? stack.name : 'Неизвестный стек';
        });
      });
    });
    const modalElement = document.getElementById('editPositionModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  }

  deletePosition(): void {
    this.http.delete(`${SERVER_URL}/companies/stack/delete/${this.editPosition.id}`).subscribe(() => {
      // Обновить список позиций после удаления
      this.getInternshipPositions(this.companyId).subscribe(positions => {
        this.positions = positions;
        this.positions.forEach(position => {
          const stack = this.stacks.find(s => s.id === position.stackId);
          position.stackName = stack ? stack.name : 'Неизвестный стек';
        });
      });
    });
    const modalElement = document.getElementById('editPositionModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  }

  openEditCompanyModal(): void {
    this.editCompany = { ...this.company };
    const modalElement = document.getElementById('editCompanyModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  updateCompany(): void {
    this.http.put(`${SERVER_URL}/companies/update`, this.editCompany).subscribe(() => {
      this.getCompanyDetails(this.companyId).subscribe(company => {
        this.company = company;
      });
    });
    const modalElement = document.getElementById('editCompanyModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  }

  openStudent(studentId: string): void {
    this.router.navigateByUrl(`/admin/student/${studentId}`).then()
  }
}
