import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AboutComponent} from './pages/about/about.component';
import {PartnersComponent} from "./partners/partners.component";
import {PartnerDetailComponent} from "./partner-detail/partner-detail.component";
import {CalendarComponent} from "./pages/calendar/calendar.component";
import {LoginComponent} from "./pages/login/login.component";
import {MainComponent} from "./pages/main/main.component";
import {DeanComponent} from "./pages/dean/dean.component";
import {StudentComponent} from "./pages/student/student.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'main', component: MainComponent},
  {path: 'dean', component: DeanComponent},
  {path: 'student', component: StudentComponent},
  {path: 'main/home', component: HomeComponent},
  {path: 'main/about', component: AboutComponent},
  {path: 'main/calendar', component: CalendarComponent},
  {path: 'main/partners', component: PartnersComponent},
  {path: 'main/partners/:id', component: PartnerDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
