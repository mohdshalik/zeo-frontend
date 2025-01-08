import { Injectable } from '@angular/core';
import { Configuration } from './configuration.interface';
import { Observable, catchError, map, pipe, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from '../../environments/environment';


export interface Field {
  id: number;
  name: string;
  display_name: string;
}

interface FieldResponse {
  available_fields: Field[];
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private apiUrl = 'http://127.0.0.1:8000/employee/api/emp-report/select_filter_fields/'; 
  baseUrl = 'http://127.0.0.1:8000/employee/api/emp-report/';
    private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local
  

  private savedConfigurations: Configuration[] = [
    { id: 1, name: 'Configuration 1', filters: ['filter1'], columns: ['column1', 'column2'] },
    { id: 2, name: 'Configuration 2', filters: ['filter2'], columns: ['column3', 'column4'] }
  ];

  private savedReports: { name: string; data: string[] }[] = [];
  private currentReportData: any[] = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    this.initializeApiUrlleave();

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
  
  getSavedConfigurations(): Configuration[] {
    return this.savedConfigurations;
  }
  getConfigurationById(id: number): Configuration | undefined {
    return this.savedConfigurations.find(config => config.id === id);
  }
  getAvailableFields(reportId: number): Observable<FieldResponse> {
    const url = `${this.apiUrl}?report_id=${reportId}`;
    return this.http.get<FieldResponse>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error.message);
    return throwError('Something went wrong; please try again later.');
  }
  saveReport(reportData: any[]): void {
    this.currentReportData = reportData;
  }

  saveReportWithName(name: string, data: string[]): void {
    this.savedReports.push({ name, data });
  }

  getReport(): any[] {
    return this.currentReportData;
  }

  getSavedReports(): { name: string; data: string[] }[] {
    return this.savedReports;
  }
//today code
  fetchDatas(): Observable<any[]> {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos');
  }

  updateDatas(datas: any[]): Observable<any> {
    // For the purpose of this example, we won't actually update the API
    console.log('Updated data:', datas);
    return new Observable(); // Return a dummy observable
  }

  getReportHtmlContent(): Observable<string> {
    return this.http.get<string>(this.apiUrl); // Adjust the endpoint URL and response type as per your API
  }  
  // getAvailableFields(reportId: number): Observable<any> {
  //   const url = `${this.baseUrl}select_filter_fields/?report_id=${reportId}`;
  //   return this.http.get<any>(url);
  // }

  generateFilterTable(formData: FormData): Observable<any> {
    const url = `${this.baseUrl}generate_filter_table/`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(url, formData, { headers });
  }
  
  getHtmlContentFromAPI(): Observable<SafeHtml> {
    return this.http.get('http://127.0.0.1:8000/employee/api/emp-report/select_filter_fields/', { responseType: 'text' })
      .pipe(
        map((response: string) => this.sanitizer.bypassSecurityTrustHtml(response))
      );
  }
  getAvailableFieldss(reportId: number): Observable<any> {
    const url = `${this.baseUrl}select_filter_fields/?report_id=${reportId}`;
    return this.http.get<any>(url);
  }
  // downloadExcel(reportId: number): Observable<HttpResponse<Blob>> {
  //   const url = `${this.baseUrl}generate_excel/`;
  //   const params = new HttpParams().set('report_id', reportId.toString());
  //   return this.http.get<Blob>(url, {
  //     params: params,
  //     responseType: 'blob' as 'json',
  //     observe: 'response'
  //   });
  // }
  // generateFilterTable(formData: FormData): Observable<any> {
  //   const url = `${this.baseUrl}generate_filter_table/`;
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'multipart/form-data');
  //   return this.http.post<any>(url, formData, { headers });
  // }


  private initializeApiUrlleave(): void {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      throw new Error('No schema selected.');
    }
    this.apiUrl = `${this.apiUrl}/calendars/api/leave-report/std_report/?schema=${selectedSchema}`;
  }

  getStandardReportLeave(): Observable<any> {
    if (!this.apiUrl) {
      console.error('API URL not initialized.');
      return throwError('API URL not initialized.');
    }
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }
}
