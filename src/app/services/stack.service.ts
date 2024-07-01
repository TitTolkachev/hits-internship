import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SERVER_URL} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class StackService {
  private baseUrl = `${SERVER_URL}/stack`;

  constructor(private http: HttpClient) { }

  getStacks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get`);
  }

  updateStudentInfo(topCompanies: number[], offered: number[], topStacks: number[]): Observable<any> {
    return this.http.patch(`${SERVER_URL}/user/student/update/offers`, { topCompanies: topCompanies, offered: offered, topStacks: topStacks });
  }
}
