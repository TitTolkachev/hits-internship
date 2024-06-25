import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVER_URL} from "../constants";
import {InviteLink} from "../models/inviteLink";

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(private http: HttpClient) {
  }

  getStreams(): Observable<string[]> {
    return this.http.get<string[]>(`${SERVER_URL}/stream/get`);
  }

  createInviteLink(streamName: string): Observable<InviteLink> {
    return this.http.post<InviteLink>(`${SERVER_URL}/stream/create/${streamName}`, "");
  }
}
