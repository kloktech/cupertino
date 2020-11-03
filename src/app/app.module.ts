import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NameAndEmailModalComponent } from './name-and-email-modal/name-and-email-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NameAndEmailModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
    // BrowserAnimationsModule,
    // MatToolbarModule,
    // MatIconModule,
    // MatButtonModule,
    // MatCardModule,
    // MatProgressSpinnerModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
