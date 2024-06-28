import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVER_URL} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class StudentTaskService {

  private apiUrl = SERVER_URL;

  constructor(private http: HttpClient) {
  }

  getLastAnswer(taskId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/answers/get`, {taskId, userId});
  }

  createAnswer(taskId: number, text: string, files: string[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/answers/create/${taskId}`, {text, files});
  }
}
