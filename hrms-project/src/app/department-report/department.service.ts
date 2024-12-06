import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
    private apiUrl: string = '';
  constructor(private http: HttpClient) {
    this.initializeApiUrl();
   }

  getDepartmentReport(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  private initializeApiUrl(): void {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      throw new Error('No schema selected.');
    }
    this.apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/Department/department_report`;
  }

  getStandardReport(): Observable<any> {
    if (!this.apiUrl) {
      console.error('API URL not initialized.');
      return throwError('API URL not initialized.');
    }
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
 
}
