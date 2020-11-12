import { Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { interval } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-personal-dashboard',
  templateUrl: './personal-dashboard.component.html',
  styleUrls: ['./personal-dashboard.component.css'],
  host: {
    '[class.modal-content]': 'true'
  }
})
export class PersonalDashboardComponent implements OnInit {

  name: string;
  email: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['date', 'deedType'];
  deedMapping = {
    1: '供燈水花香',
    2: '聽廣海明月',
    3: '心經七遍',
    4: '跟親友介紹',
    5: '捐款',
    6: '誦般若經',
    7: '三十五佛懺',
    8: '背誦經典',
    9: '三多'
  }
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource;

  meritsByDays = {};
  meritsByTypes = {};
  meritsByPeople = {};
  meritsTotal = 0;

  private _date: string;

  typesOptions = {
    title: {
      text: '庫市購買 善行累積: ',
      subtext: 'Rejoice!',
      x: 'center',
      textStyle: {
        fontSize: 30
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      x: 'center',
      y: 'bottom',
      data: []
    },
    calculable: true,
    series: [
      {
        name: '善行',
        type: 'pie',
        radius: [50, 210],
        roseType: 'area',
        data: []
      }
    ]
  };

  daysOptions = {
    title: {
      text: '每日善行量',
      x: 'center'
    },
    xAxis: {
      type: 'category',
      data: [],
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2,
      formatter: function (params) {
        return `<b>${params['name']}</b> = ${params['value']}`;
      }
    },
    series: [
      {
        data: [],
        type: 'line',
        areaStyle: {},
      },
    ],
  };

  peopleOptions = {
    title: {
      text: 'Top 10 排行',
      x: 'center'
    },
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2,
      formatter: function (params) {
        return `<b>${params['name']}</b> = ${params['value']}`;
      }
    },
    series: [
      {
        data: [],
        type: 'bar',
      },
    ],
  };

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
  ) { }

	ngOnInit() {
    if (this.cookieService.check('name')) {
      this.name = this.cookieService.get('name');
    }
    if (this.cookieService.check('email')) {
      this.email = this.cookieService.get('email');
    }
    this.updateData();
	}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateData() {
    // reset
    this.meritsByDays = {};
    this.meritsByTypes = {};
    this.meritsByPeople = {};
    this.meritsTotal = 0;
    this.typesOptions.title.text = '庫市購買 善行累積: ';
    this.typesOptions.legend.data = [];
    this.typesOptions.series[0].data = [];
    this.daysOptions.xAxis.data = [];
    this.daysOptions.series[0].data = [];
    this.peopleOptions.xAxis.data = [];
    this.peopleOptions.series[0].data = [];

    this.apiService.get().subscribe((merits: any[])=>{
      this.dataSource = new MatTableDataSource(merits);
      this.dataSource.paginator = this.paginator;
      // this.sort.sort(({ id: 'date', start: 'desc'}) as MatSortable);
      this.dataSource.sort = this.sort;
      merits.forEach(merit => {

        if ( merit.name === this.name && merit.email === this.email ) {
          this._date = this.datePipe.transform(merit.date, 'yyyy-MM-dd');
          if ( typeof this.meritsByTypes[merit.deedType] === 'undefined' ) {
            this.meritsByTypes[merit.deedType] = 0;
          }
          if ( typeof this.meritsByDays[this._date] === 'undefined' ) {
            this.meritsByDays[this._date] = 0;
          }
          if ( typeof this.meritsByPeople[merit.name] === 'undefined' ) {
            this.meritsByPeople[merit.name] = 0;
          }
          this.meritsByTypes[merit.deedType]++;
          this.meritsByDays[this._date]++;
          this.meritsByPeople[merit.name]++;

          this.meritsTotal++;

        }
      });

      // Adding total to first graph
      this.typesOptions.title.text += this.meritsTotal;

      // Merits By Types
      for (let key in this.meritsByTypes) {
          let count = this.meritsByTypes[key];
          // Use `key` and `value`
          this.typesOptions.legend.data.push(this.deedMapping[key]);
          this.typesOptions.series[0].data.push({
            value: count, name: this.deedMapping[key]
          })
      };
      this.typesOptions = Object.assign({}, this.typesOptions);

      for (let key in this.meritsByDays) {
        let count = this.meritsByDays[key];
        this.daysOptions.xAxis.data.push(key);
        this.daysOptions.series[0].data.push(count);
      };
      // Array push doesn't trigger Angular's change detection
      // So this is doing that assign again to let echart detect change.
      this.daysOptions = Object.assign({}, this.daysOptions);

      // Merits By Days
      var tmp = this.meritsByPeople;
      let items = Object.keys(tmp).map(function(key) {
        return [key, tmp[key]];
      });
      // Sort the array based on the second element
      items.sort(function(first, second) {
        return second[1] - first[1];
      });

      items = items.slice(0, 10);
      items.forEach(item => {
        this.peopleOptions.xAxis.data.push(item[0]);
        this.peopleOptions.series[0].data.push(item[1]);
      });
      this.peopleOptions = Object.assign({}, this.peopleOptions);
    },
    (err) => {
      console.log('Error: ' + err);
    },
    () => {
      console.log('Completed');
    });
  }
}
