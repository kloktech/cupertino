// import { Component, OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { ApiService } from '../api.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['date', 'name', 'deedType'];
  deedMapping = {
    1: '供燈水花香',
    2: '聽廣海明月',
    3: '心經七遍',
    4: '跟親友介紹',
    5: 'iPray',
    6: '誦般若經',
    7: '三十五佛懺',
    8: '背誦廣論',
    9: '三多'
  }
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource;

  meritsAggregated = {};
  meritsByDays = {};
  meritsTotal = 0;

  private _date: string;

  constructor(
    private apiService: ApiService,
    private datePipe: DatePipe
  ) {

  }

  // ngOnInit(): void {
  //   this.apiService.get().subscribe((data: any[])=>{
  //     console.log(data);
  //     this.dataSource = new MatTableDataSource(data);
	// 	})
	// }

  ngAfterViewInit() {
    this.apiService.get().subscribe((merits: any[])=>{
      console.log(merits);
      this.dataSource = new MatTableDataSource(merits);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      merits.forEach(merit => {
        this._date = this.datePipe.transform(merit.date, 'yyyy-MM-dd');
        if ( typeof this.meritsAggregated[merit.deedType] === 'undefined' ) {
          this.meritsAggregated[merit.deedType] = 0;
        }
        if ( typeof this.meritsByDays[this._date] === 'undefined' ) {
          this.meritsByDays[this._date] = 0;
        }
        this.meritsByDays[this._date]++;
        this.meritsAggregated[merit.deedType]++;
        this.meritsTotal++;
      });
      console.log(this.meritsByDays);
		})
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
