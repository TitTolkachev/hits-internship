import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./pages/home/home.component";
import {AboutComponent} from "./pages/about/about.component";
import {HeaderComponent} from './components/header/header.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    AppComponent,
    HeaderComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ], providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule {
}
