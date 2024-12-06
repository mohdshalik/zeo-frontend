import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BranchServiceService {

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
   
    const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/Branch/${employeeId}/`;
   
    return this.http.get(apiUrl);
    
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
    const url = `${this.baseUrl}/Branch/${employeeId}/`;
    return this.http.put(url, empData);
    
  }
    
  getCompany(): Observable<any> {
    const url = `${this.baseUrl}/Company/`;
    return this.http.get(url);
  }


  getBranches(selectedSchema: string): Observable<any> {
    const url = `http://${selectedSchema}.localhost:8000/organisation/api/Branch/`;
    return this.http.get(url);
  }

  
  getDepartment(selectedSchema: string): Observable<any> {
    const url = `http://${selectedSchema}.localhost:8000/organisation/api/Department/`;
    return this.http.get(url);
  }

  getCategory(selectedSchema: string): Observable<any> {
    const url = `http://${selectedSchema}.localhost:8000/organisation/api/Catogory/`;
    return this.http.get(url);
  }
  








    registerpolicy(formData: FormData): Observable<any> {
      const selectedSchema = localStorage.getItem('selectedSchema');
      if (!selectedSchema) {
        console.error('No schema selected.');
        return throwError('No schema selected.');
      }
    
      const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/policies/`;
    
      return this.http.post(apiUrl, formData).pipe(
        catchError((error) => {
          console.error('Error during leave type registration:', error);
          return throwError(error);
        })
      );
    }
  
}
