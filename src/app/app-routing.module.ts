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
import {InviteComponent} from "./pages/invite/invite.component";
import {AdminAnnouncementsComponent} from "./pages/admin/admin-announcements/admin-announcements.component";
import {DeanStudentComponent} from "./pages/dean/dean-student/dean-student.component";
import {StudentTaskComponent} from "./pages/student/student-task/student-task.component";
import {DeanUserComponent} from "./pages/dean/dean-user/dean-user.component";
import {StudentDeanComponent} from "./pages/student/student-dean/student-dean.component";
import {AdminUsersComponent} from "./pages/admin/admin-users/admin-users.component";
import {AdminUserComponent} from "./pages/admin/admin-user/admin-user.component";
import {
  StudentPartnerDetailComponentComponent
} from "./pages/student/student-partner-detail-component/student-partner-detail-component.component";
import {StudentAdminComponent} from "./pages/student/student-admin/student-admin.component";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'invite/:code', component: InviteComponent},
  {
    path: 'dean', component: DeanLayoutComponent, children: [
      {path: 'announcements', component: DeanAnnouncementsComponent},
      {path: 'tasks', component: DeanTasksComponent},
      {path: 'users', component: DeanUsersComponent},
      {path: 'partners', component: PartnersComponent},
      {path: 'partners/:id', component: PartnerDetailComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'task/:id', component: DeanTasksComponent},
      {path: 'student/:studentId', component: DeanStudentComponent},
      {path: 'user/:studentId', component: DeanUserComponent},
    ]
  },
  {
    path: 'student', component: StudentLayoutComponent, children: [
      {path: 'announcements', component: StudentAnnouncementsComponent},
      {path: 'calendar', component: StudentCalendarComponent},
      {path: 'partners', component: StudentPartnersComponent},
      {path: 'partners/:id', component: StudentPartnerDetailComponentComponent},
      {path: 'tasks', component: StudentTasksComponent},
      {path: 'task/:id', component: StudentTaskComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'dean', component: StudentDeanComponent},
      {path: 'admin', component: StudentAdminComponent},
    ]
  },
  {
    path: 'admin', component: AdminLayoutComponent, children: [
      {path: 'announcements', component: AdminAnnouncementsComponent},
      {path: 'calendar', component: CalendarComponent},
      {path: 'partners', component: PartnersComponent},
      {path: 'students', component: AdminUsersComponent},
      {path: 'student/:studentId', component: AdminUserComponent},
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
