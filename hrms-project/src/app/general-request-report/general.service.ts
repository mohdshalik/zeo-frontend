import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private baseUrl = 'http://127.0.0.1:8000/employee/api/general-request-report/';
  private apiUrl: string = '';

  constructor(private http: HttpClient) { 
    this.initializeApiUrl();

  }
  fetchSavedReports(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
  // Fetch available fields and selected fields
  fetchAvailableAndSelectedFields(reportId: number): Observable<any> {
    const url = `${this.baseUrl}select_filter_fields/?report_id=${reportId}`;
    return this.http.get<any>(url);
  }

  // Generate employee filter table based on selected fields and report ID
  generateEmployeeFilterTable(reportId: number, selectedFields: string[]): Observable<any> {
    const url = `${this.baseUrl}generate_filter_table/`;
    const body = {
      report_id: reportId,
      selected_fields: selectedFields
    };
    return this.http.post<any>(url, body);
  }

  // Filter existing report based on selected fields and report ID
  filterExistingReport(reportId: number, filterCriteria: any): Observable<any> {
    const url = `${this.baseUrl}general_filter_report/`;
    const formData = new FormData();
    formData.append('report_id', reportId.toString());
    for (const key in filterCriteria) {
      if (filterCriteria.hasOwnProperty(key)) {
        formData.append(key, filterCriteria[key]);
      }
    }
    return this.http.post<any>(url, formData);
  }

  // Generate Excel view for filtered report
  generateExcelView(reportId: number): Observable<Blob> {
    const url = `${this.baseUrl}generate_excel_view/?report_id=${reportId}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  // getStandardReport(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // private handleError(error: HttpErrorResponse) {
  //   console.error('Error fetching standard report:', error);
  //   return throwError('An error occurred while fetching the standard report.');
  // }
  private initializeApiUrl(): void {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      throw new Error('No schema selected.');
    }
    this.apiUrl = `http://${selectedSchema}.localhost:8000/employee/api/report-general-request/std_report/`;
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
