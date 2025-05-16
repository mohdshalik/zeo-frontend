import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchServiceService {

  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local


  private baseUrl = 'http://127.0.0.1:8000/organisation/api';

  constructor(private http: HttpClient) {}



  
  // getEmpById(employeeId: number): Observable<any> {
  //   const url = `${this.baseUrl}/Branch/${employeeId}/`;
  //   return this.http.get(url);
  // }

  getEmpById(employeeId: number): Observable<any> {
    // const url = `${this.baseUrl}/Employee/${employeeId}/`;
    // return this.http.get(url);

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   
    const Url = `${this.apiUrl}/organisation/api/Branch/${employeeId}/?schema=${selectedSchema}`;
   
    return this.http.get(Url);
    
  }

  openEditEmpPopuss(employeeId: number): Observable<any> {
    const url = `${this.baseUrl}/Branch/${employeeId}/`;
    return this.http.get(url);
  }


  updateEmp(employeeId: number, empData: any): Observable<any> {
    const url = `${this.baseUrl}/Branch/${employeeId}/`;
    return this.http.put(url, empData);
  }
  

  getBranchById(employeeId: number): Observable<any> {
    const url = `${this.baseUrl}/Branch/${employeeId}/`;
    return this.http.get(url);
  }
  
  updateBranch(employeeId: number, empData: any): Observable<any> {
    
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
    const url = `${this.apiUrl}/organisation/api/Branch/${employeeId}/?schema=${selectedSchema}`;
    return this.http.put(url, empData);
    
  }
    
  getCompany(): Observable<any> {
    const url = `${this.baseUrl}/Company/`;
    return this.http.get(url);
  }


  getBranches(selectedSchema: string): Observable<any> {
    const url = `${this.apiUrl}/organisation/api/Branch/?schema=${selectedSchema}`;
    return this.http.get(url);
  }

  
  getDepartment(selectedSchema: string): Observable<any> {
    const url = `${this.apiUrl}/organisation/api/Department/?schema=${selectedSchema}`;
    return this.http.get(url);
  }

  getCategory(selectedSchema: string): Observable<any> {
    const url = `${this.apiUrl}/organisation/api/Catogory/?schema=${selectedSchema}`;
    return this.http.get(url);
  }
  


  
  getplo(selectedSchema: string): Observable<any> {
    const url = `${this.apiUrl}/organisation/api/policies/?schema=${selectedSchema}`;
    return this.http.get(url);
  }








    registerpolicy(formData: FormData): Observable<any> {
      const selectedSchema = localStorage.getItem('selectedSchema');
      if (!selectedSchema) {
        console.error('No schema selected.');
        return throwError('No schema selected.');
      }
    
      const apiUrl = `${this.apiUrl}/organisation/api/policies/?schema=${selectedSchema}`;
    
      return this.http.post(apiUrl, formData).pipe(
        catchError((error) => {
          console.error('Error during leave type registration:', error);
          return throwError(error);
        })
      );
    }
  
}
