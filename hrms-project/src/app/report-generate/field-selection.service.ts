// field-selection.service.ts 
import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
 
@Injectable({ 
  providedIn: 'root' 
}) 
export class FieldSelectionService { 
  private apiUrl = 'http://127.0.0.1:8000/employee/api/emp-report'; // Replace with your actual backend API URL 
 
  constructor(private http: HttpClient) {} 
 
  getFields(reportId: string): Observable<any> { 
    return this.http.get(`${this.apiUrl}/select_filter_fields?report_id=${reportId}`); 
  } 
 
  saveSelectedFields(fields: string[], reportId: string): Observable<any> { 
    return this.http.post(`${this.apiUrl}/generate_employee_filter_table`, { 
      selected_fields: fields, 
      report_id: reportId 
    }); 
  } 
}