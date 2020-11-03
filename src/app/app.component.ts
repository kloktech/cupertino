import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';

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
	constructor(
    private apiService: ApiService,
    private cookieService: CookieService
  ) { }

	ngOnInit() {
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
    if ( ! this.cookieService.check('name') || this.cookieService.check('email') ) {
      console.log('required data not set');
    }
  }

}
