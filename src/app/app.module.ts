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
import {StudentComponent} from './pages/student/student.component';
import {CookieService} from "ngx-cookie-service";
import { DeanComponent } from './pages/dean/dean.component';
import { MainComponent } from './pages/main/main.component';
import {TokenInterceptorService} from "./services/token-interceptor.service";
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { StudentLayoutComponent } from './pages/student-layout/student-layout.component';
import { DeanLayoutComponent } from './pages/dean-layout/dean-layout.component';

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
    StudentComponent,
    DeanComponent,
    MainComponent,
    AdminLayoutComponent,
    StudentLayoutComponent,
    DeanLayoutComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    provideHttpClient(withInterceptorsFromDi()), CookieService]
})
export class AppModule {
}
