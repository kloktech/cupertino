import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NameAndEmailModalComponent } from './name-and-email-modal/name-and-email-modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { DatePipe } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { PersonalDashboardComponent } from './personal-dashboard/personal-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NameAndEmailModalComponent,
    DashboardComponent,
    PersonalDashboardComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    // BrowserAnimationsModule,
    // MatToolbarModule,
    // MatIconModule,
    // MatButtonModule,
    // MatCardModule,
    // MatProgressSpinnerModule
  ],
  providers: [CookieService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
