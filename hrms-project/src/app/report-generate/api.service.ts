// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // Replace this with your API URL
  private baseUrl= 'http://127.0.0.1:8000/employee/api/emp-report/';
  private apiUrls = 'http://127.0.0.1:8000/employee/api/emp-report/select_employee_fields/';

  constructor(private http: HttpClient,private https:HttpClient,private sanitizer: DomSanitizer) { }

  getData(filters: string[]): Observable<any> {
    const url = `${this.apiUrl}/data?filters=${filters.join(',')}`;
    return this.http.get<any>(url);
  }
  downloadExcel(reportId: number): Observable<HttpResponse<Blob>> {
    const url = `${this.baseUrl}generate_excel/`;
    const params = new HttpParams().set('report_id', reportId.toString());
    return this.http.get<Blob>(url, {
      params: params,
      responseType: 'blob' as 'json',
      observe: 'response'
    });
  }
  getfilter(): Observable<any> {
    const urls = `${this.baseUrl}`;

    return this.https.get(urls);
  }
  getHtmlContent(): Observable<SafeHtml[]> {
    return this.http.get(this.apiUrls, { responseType: 'text' }).pipe(
      map((response: string) => {
        // Assume response is a list of HTML strings
        const htmlArray = JSON.parse(response) as string[];
        return htmlArray.map(html => this.sanitizer.bypassSecurityTrustHtml(html));
      })
    );
  }

  getEmployeeFields(): Observable<{ value: string, displayName: string }[]> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
    const url = `http://${selectedSchema}.localhost:8000/employee/api/emp-report/select_employee_fields/`;

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
      const url = `${this.baseUrl}/emp-report/${ReportId}/`;
      return this.http.get(url);
   
  }


  getdocumentFields(): Observable<{ value: string, displayName: string }[]> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
    const url = `http://${selectedSchema}.localhost:8000/employee/api/doc-report/select_document_fields/`;

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
    const url = `http://${selectedSchema}.localhost:8000/employee/api/report-general-request/select_generalreport_fields/`;

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
}
