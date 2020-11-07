import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NameAndEmailModalComponent } from './name-and-email-modal/name-and-email-modal.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  // Initialize total count with zero
  goodDeeds = {};
  personalGoodDeeds = {};
  goodDeedsTmp = {};
  personalGoodDeedsTmp = {};

  deedHighlight = {
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

  name: string;
  email: string;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    public dialog: MatDialog,
  ) { }

	ngOnInit() {
    if (this.cookieService.check('name')) {
      this.name = this.cookieService.get('name');
    }
    if (this.cookieService.check('email')) {
      this.email = this.cookieService.get('email');
    }
    this.fetchDeeds();
	}

  recordDeed(deedType: number) {
    if ( ! (this.name || this.email) ) {
      console.log('required data not set');
      this.askForInput();
    } else {
      // Record good deeds
      this.apiService.create(this.name, this.email, deedType).subscribe((data: any[])=>{
        this.deedHighlight[deedType] = '3px solid blueviolet;'; // For highlighting deed
        this.fetchDeeds(); // Update counts
      });
    }
  }

  resetCookies() {
    this.cookieService.deleteAll();
    this.name = '';
    this.email = '';
    this.askForInput();
    this.fetchDeeds();
  }

  askForInput() {
    const dialogRef = this.dialog.open(NameAndEmailModalComponent, {
      width: '350px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if ( typeof(result) !== 'undefined' ){
        this.name = result.name;
        this.email = result.email;
        this.cookieService.set('name', this.name);
        this.cookieService.set('email', this.email);
      }
    });
  }

  fetchDeeds() {
    // reset counts
    this.goodDeedsTmp = {
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
    // copy by value
    this.personalGoodDeedsTmp = { ...this.goodDeedsTmp };

    // Get good deeds counts
		this.apiService.get().subscribe((data: any[])=>{
      data.forEach(deed => {
        this.goodDeedsTmp[deed['deedType']]++;

        if ( this.name && this.email ) {
          if ( this.name === deed.name && this.email === deed.email ) {
            this.personalGoodDeedsTmp[deed['deedType']]++;
          }
        }
      });
      this.goodDeeds = { ...this.goodDeedsTmp };
      this.personalGoodDeeds = { ...this.personalGoodDeedsTmp };
		})
  }
}
