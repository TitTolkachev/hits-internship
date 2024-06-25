import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserGetDto } from '../models/user-get.dto';
import {SERVER_URL} from "../constants";
import {scheduleReadableStreamLike} from "rxjs/internal/scheduled/scheduleReadableStreamLike";
import {UserUpdateDto} from "../models/user-update.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userApiPrefix = `${SERVER_URL}/user`;  // Замените на ваш API URL

  constructor(private http: HttpClient) { }

  // Получение текущего пользователя
  getCurrentUser(): Observable<UserGetDto> {
    const url = `${this.userApiPrefix}/profile`; // Предполагается, что API возвращает текущего пользователя по этому URL
    return this.http.get<UserGetDto>(url);
  }

  // Обновление данных пользователя
  updateUser(login: string, user: UserUpdateDto): Observable<VoidFunction> {
    const url = `${this.userApiPrefix}/profile/update`;
    return this.http.put<VoidFunction>(url, user);
  }

  deleteUser(streamName: string): Observable<VoidFunction> {
    const url = `${SERVER_URL}/stream/leave/${streamName}`;
    // @ts-ignore
    return this.http.post(url, "");
  }

  logout(): Observable<Object>{
    const url = `${this.userApiPrefix}/logout`;
    return this.http.post(url, "");
  }
}
