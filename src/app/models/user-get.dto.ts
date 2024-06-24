// src/app/models/user-get.dto.ts

export enum Role {
  Admin = 'Admin',
  Dean = 'Dean',
  Student = 'Student'
}
export interface UserGetDto {
  login: string;
  name: string;
  role: Role;
  streamName: string;
  surname: string;
}
