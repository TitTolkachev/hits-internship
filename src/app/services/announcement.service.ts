import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVER_URL} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private baseUrl = SERVER_URL;

  constructor(private http: HttpClient) {
  }

  getAnnouncements(streamName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/announcements/get/${streamName}`);
  }

  createAnnouncement(streamName: string, text: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/announcements/create/${streamName}`, {text});
  }

  updateAnnouncement(id: number, text: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/announcements/update`, {id, text});
  }

  deleteAnnouncement(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/announcements/delete`, {id});
  }

  createComment(id: number, text: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/announcements/comments/create`, {id, text});
  }

  updateComment(id: number, text: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/announcements/comments/update`, {id, text});
  }

  deleteComment(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/announcements/comments/delete`, {id});
  }
}
