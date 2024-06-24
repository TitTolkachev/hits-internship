import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./pages/home/home.component";
import {AboutComponent} from "./pages/about/about.component";
import {HeaderComponent} from './components/header/header.component';
import {FormsModule} from "@angular/forms";
import {PartnersComponent} from './partners/partners.component';
import {PartnerDetailComponent} from './partner-detail/partner-detail.component';
import {CalendarComponent} from './pages/calendar/calendar.component';
import {LoginComponent} from './pages/login/login.component';
import {CookieService} from "ngx-cookie-service";
import { MainComponent } from './pages/main/main.component';
import {TokenInterceptorService} from "./services/token-interceptor.service";
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { StudentLayoutComponent } from './pages/student-layout/student-layout.component';
import { DeanLayoutComponent } from './pages/dean-layout/dean-layout.component';
import {StreamService} from "./services/stream.service";
import { StudentHeaderComponent } from './components/student-header/student-header.component';
import { DeanHeaderComponent } from './components/dean-header/dean-header.component';
import { StudentAnnouncementsComponent } from './pages/student/student-announcements/student-announcements.component';
import { StudentCalendarComponent } from './pages/student/student-calendar/student-calendar.component';
import { StudentTasksComponent } from './pages/student/student-tasks/student-tasks.component';
import { StudentPartnersComponent } from './pages/student/student-partners/student-partners.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DeanMarksComponent } from './pages/dean/dean-marks/dean-marks.component';
import { DeanAnnouncementsComponent } from './pages/dean/dean-announcements/dean-announcements.component';
import { DeanTasksComponent } from './pages/dean/dean-tasks/dean-tasks.component';
import { DeanUsersComponent } from './pages/dean/dean-users/dean-users.component';
import { InviteComponent } from './pages/invite/invite.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    AppComponent,
    HeaderComponent,
    CalendarComponent,
    PartnersComponent,
    PartnerDetailComponent,
    LoginComponent,
    MainComponent,
    AdminLayoutComponent,
    StudentLayoutComponent,
    DeanLayoutComponent,
    StudentHeaderComponent,
    DeanHeaderComponent,
    StudentAnnouncementsComponent,
    StudentCalendarComponent,
    StudentTasksComponent,
    StudentPartnersComponent,
    ProfileComponent,
    DeanMarksComponent,
    DeanAnnouncementsComponent,
    DeanTasksComponent,
    DeanUsersComponent,
    InviteComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    provideHttpClient(withInterceptorsFromDi()), CookieService, StreamService]
})
export class AppModule {
}
