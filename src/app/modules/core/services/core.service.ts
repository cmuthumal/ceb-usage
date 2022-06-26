import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AppConfig } from 'src/app/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private baseUrl = AppConfig.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  signInBehavior = new BehaviorSubject<boolean>(false);
  signInObserver = this.signInBehavior.asObservable();

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was ${error.error}`
      );
    }
    return throwError('Something bad happened. Please try again later.');
  }
}
