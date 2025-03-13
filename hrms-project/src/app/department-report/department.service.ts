import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local

    // private apiUrl: string = '';
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
    this.apiUrl = `${this.apiUrl}/organisation/api/Department/department_report/?schema=${selectedSchema}`;
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
 


    // Service method to create a new permission group
    createPermissionGroup(selectedSchema: string, groupData: any): Observable<any> {
      const url = `${this.apiUrl}/organisation/api/Group/?schema=${selectedSchema}`;
      return this.http.post(url, groupData);
    }


}
