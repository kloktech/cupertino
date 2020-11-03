import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private SERVICE_URL = 'https://jsonplaceholder.typicode.com/users';
  private SERVICE_URL = environment.goodDeedsApiURL;

  constructor(public httpClient: HttpClient){}

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  public get(){
    return this.httpClient.get(this.SERVICE_URL).pipe(catchError(this.handleError));
  }

  public create(name: string, email: string, deedType: number){
    return this.httpClient.post(this.SERVICE_URL,
      {name: name, email: email, deedType: deedType})
      .pipe(catchError(this.handleError));
  }

}
