import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVER_URL} from "../constants";
import {InviteLink} from "../models/inviteLink";
import {StreamByInviteCodeDto} from "../models/streamByInviteCode.dto";
import {StudentDto} from "../models/student.dto";

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

  getStreamByInviteCode(code: string): Observable<StreamByInviteCodeDto> {
    return this.http.get<StreamByInviteCodeDto>(`${SERVER_URL}/stream/get/${code}`);
  }

  registerByInviteCode(code: string, userData: StudentDto): Observable<VoidFunction> {
    return this.http.post<VoidFunction>(`${SERVER_URL}/stream/register/${code}`, userData);
  }

}
