import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVER_URL} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(private http: HttpClient) {
  }

  getStrings(): Observable<string[]> {
    return this.http.get<string[]>(`${SERVER_URL}/stream/get`);
  }
}
