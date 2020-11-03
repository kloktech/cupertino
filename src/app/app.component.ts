import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NameAndEmailModalComponent } from './name-and-email-modal/name-and-email-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  // Initialize total count with zero
  goodDeeds = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0
  };
  personalGoodDeeds = { ...this.goodDeeds };
  name: string;
  email: string;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    public dialog: MatDialog
  ) { }

	ngOnInit() {
    if (this.cookieService.check('name')) {
      this.name = this.cookieService.get('name');
    }
    if (this.cookieService.check('email')) {
      this.email = this.cookieService.get('email');
    }
		this.apiService.get().subscribe((data: any[])=>{
			console.log(data);
      data.forEach(deed => {
        if ( typeof(this.goodDeeds[deed['deedType']]) === 'undefined' ) {
          this.goodDeeds[deed['deedType']] = 0;
        }
        this.goodDeeds[deed['deedType']]++;
      });
      console.log(this.goodDeeds);
      console.log(this.personalGoodDeeds);
		})
	}

  recordDeed(deedType: number) {
    if ( ! (this.name || this.email) ) {
      console.log('required data not set');
      const dialogRef = this.dialog.open(NameAndEmailModalComponent, {
        width: '350px',
        data: {}
      });
      dialogRef.afterClosed().subscribe(result => {
        if ( typeof(result) !== 'undefined' ){
          this.name = result.name;
          this.email = result.email;
        }
      });
    } else {
      this.cookieService.set('name', this.name);
      this.cookieService.set('email', this.email);
    }
  }

  resetCookies() {
    this.cookieService.deleteAll();
    this.name = '';
    this.email = '';
  }
}
