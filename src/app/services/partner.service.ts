import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {SERVER_URL} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private baseUrl = `${SERVER_URL}/companies`;

  constructor(private http: HttpClient) {}

  getAllPartners(streamName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/all/${streamName}`);
  }

  createPartner(partner: { name: string, streamName: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, partner);
  }
}
