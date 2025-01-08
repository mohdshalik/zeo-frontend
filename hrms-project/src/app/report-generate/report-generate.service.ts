import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse  } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReportGenerateService {


  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local

  

  private baseUrl = 'http://localhost:8000/employee/api';
  
 
  

  constructor(private http: HttpClient) {}

 
 





  getEmployeeFields(): Observable<{ value: string, displayName: string }[]> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
    const url = `${this.apiUrl}/employee/api/emp-report/select_employee_fields/?schema=${selectedSchema}`;

    const token = localStorage.getItem('authToken'); // Use appropriate token logic
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<{ available_fields: { [key: string]: string } }>(url, { headers }).pipe(
      map(response => {
        return Object.keys(response.available_fields).map(key => ({
          value: key,
          displayName: response.available_fields[key]
        }));
      })
    );
  }
    getReportDetails(ReportId:number): Observable<any> {
      const url = `${this.apiUrl}/employee/api/emp-report/${ReportId}/`;
      return this.http.get(url);
   
  }


  getdocumentFields(): Observable<{ value: string, displayName: string }[]> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
    const url = `${this.apiUrl}/employee/api/doc-report/select_document_fields/?schema=${selectedSchema}`;

    const token = localStorage.getItem('authToken'); // Use appropriate token logic
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<{ available_fields: { [key: string]: string } }>(url, { headers }).pipe(
      map(response => {
        return Object.keys(response.available_fields).map(key => ({
          value: key,
          displayName: response.available_fields[key]
        }));
      })
    );
  }
  


  getGeneralRequestFields(): Observable<{ value: string, displayName: string }[]> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
    const url = `${this.apiUrl}/employee/api/report-general-request/select_generalreport_fields/?schema=${selectedSchema}`;

    const token = localStorage.getItem('authToken'); // Use appropriate token logic
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<{ available_fields: { [key: string]: string } }>(url, { headers }).pipe(
      map(response => {
        return Object.keys(response.available_fields).map(key => ({
          value: key,
          displayName: response.available_fields[key]
        }));
      })
    );
  }


  getLeaveRequestFields(): Observable<{ value: string, displayName: string }[]> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
    const url = `${this.apiUrl}/calendars/api/leave-report/select_leavereport_fields/?schema=${selectedSchema}`;

    const token = localStorage.getItem('authToken'); // Use appropriate token logic
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<{ available_fields: { [key: string]: string } }>(url, { headers }).pipe(
      map(response => {
        return Object.keys(response.available_fields).map(key => ({
          value: key,
          displayName: response.available_fields[key]
        }));
      })
    );
  }
 
  
  getReportContent(reportUrl: string): Observable<string> {
    return this.http.get(reportUrl, { responseType: 'text' });
  }
  








  // leave report service----------------

  getEmployeeFieldsLeave(): Observable<{ value: string, displayName: string }[]> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
    const url = `${this.apiUrl}/calendars/api/leave-report/select_leavereport_fields/?schema=${selectedSchema}`;

    const token = localStorage.getItem('authToken'); // Use appropriate token logic
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<{ available_fields: { [key: string]: string } }>(url, { headers }).pipe(
      map(response => {
        return Object.keys(response.available_fields).map(key => ({
          value: key,
          displayName: response.available_fields[key]
        }));
      })
    );
  }
}
