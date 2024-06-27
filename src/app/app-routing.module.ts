import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PartnersComponent} from "./partners/partners.component";
import {PartnerDetailComponent} from "./partner-detail/partner-detail.component";
import {CalendarComponent} from "./pages/calendar/calendar.component";
import {LoginComponent} from "./pages/login/login.component";
import {MainComponent} from "./pages/main/main.component";
import {AdminLayoutComponent} from "./pages/admin-layout/admin-layout.component";
import {StudentLayoutComponent} from "./pages/student-layout/student-layout.component";
import {DeanLayoutComponent} from "./pages/dean-layout/dean-layout.component";
import {StudentAnnouncementsComponent} from "./pages/student/student-announcements/student-announcements.component";
import {StudentCalendarComponent} from "./pages/student/student-calendar/student-calendar.component";
import {StudentPartnersComponent} from "./pages/student/student-partners/student-partners.component";
import {StudentTasksComponent} from "./pages/student/student-tasks/student-tasks.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {DeanUsersComponent} from "./pages/dean/dean-users/dean-users.component";
import {DeanTasksComponent} from "./pages/dean/dean-tasks/dean-tasks.component";
import {DeanAnnouncementsComponent} from "./pages/dean/dean-announcements/dean-announcements.component";
import {DeanMarksComponent} from "./pages/dean/dean-marks/dean-marks.component";
import {InviteComponent} from "./pages/invite/invite.component";
import {AdminStudentsComponent} from "./pages/admin/admin-students/admin-students.component";
import {AdminAnnouncementsComponent} from "./pages/admin/admin-announcements/admin-announcements.component";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'invite/:code', component: InviteComponent},
  {
    path: 'dean', component: DeanLayoutComponent, children: [
      {path: 'announcements', component: DeanAnnouncementsComponent},
      {path: 'tasks', component: DeanTasksComponent},
      {path: 'users', component: DeanUsersComponent},
      {path: 'marks', component: DeanMarksComponent},
      {path: 'profile', component: ProfileComponent},
    ]
  },
  {
    path: 'student', component: StudentLayoutComponent, children: [
      {path: 'announcements', component: StudentAnnouncementsComponent},
      {path: 'calendar', component: StudentCalendarComponent},
      {path: 'partners', component: StudentPartnersComponent},
      {path: 'tasks', component: StudentTasksComponent},
      {path: 'profile', component: ProfileComponent},
    ]
  },
  {
    path: 'admin', component: AdminLayoutComponent, children: [
      {path: 'announcements', component: AdminAnnouncementsComponent},
      {path: 'calendar', component: CalendarComponent},
      {path: 'partners', component: PartnersComponent},
      {path: 'students', component: AdminStudentsComponent},
      {path: 'partners/:id', component: PartnerDetailComponent},
      {path: 'profile', component: ProfileComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
