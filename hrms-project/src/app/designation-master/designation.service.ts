import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local


  
  private baseUrl = 'http://127.0.0.1:8000/organisation/api';

  constructor(private http: HttpClient) {}

  getDesignation(): Observable<any> {
    const url = `${this.baseUrl}/Designation/`;
    return this.http.get(url);
 
  }

  getDesignations(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/organisation/api/Designation/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }

  getPermissionByRoleGrouping(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/permissions/`;
    // return this.http.get(url);
    const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/perm/`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);

  }
  

  getDesignationsPermission(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/organisation/api/permissions/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl) ;
  
  }

  getjob_title(): Observable<any> {
    const url = `${this.baseUrl}/Designation/`;
    return this.http.get(url);
 
  }

  getDescription(): Observable<any> {
    const url = `${this.baseUrl}/Designation/`;

    return this.http.get(url);
  }


  registerDesignation(companyData: any): Observable<any> {
    // const url = `${this.baseUrl}/Designation/`; // Adjust the URL if needed

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   

    
    const apiUrl = `${this.apiUrl}/organisation/api/Designation/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
    }

    deletedesignation(DeptId: number): Observable<any> {
      // const url = `${this.baseUrl}/Designation/${DeptId}`;
      // return this.http.delete(url);
      const selectedSchema = localStorage.getItem('selectedSchema');
      if (!selectedSchema) {
        console.error('No schema selected.');
        return throwError('No schema selected.'); // Return an error observable if no schema is selected
      }
     
      const apiUrl = `${this.apiUrl}/organisation/api/Designation/${DeptId}/?schema=${selectedSchema}`;
     
      return this.http.delete(apiUrl);
      
  }



  getDesgById(desigId: number): Observable<any> {
    // const url = `${this.baseUrl}/Designation/${desigId}/`;
    // return this.http.get(url);


    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   
    const apiUrl = `${this.apiUrl}/organisation/api/Designation/${desigId}/?schema=${selectedSchema}`;
   
    return this.http.get(apiUrl);
  }

  openEditPopuss(desigId: number): Observable<any> {
    const url = `${this.baseUrl}/Designation/${desigId}/`;
    return this.http.get(url);
  }


  updateDesignation(desigId: number, categoryData: any): Observable<any> {
    // const url = `${this.baseUrl}/Designation/${desigId}/`;
    // return this.http.put(url, categoryData);

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   

    
    const apiUrl = `${this.apiUrl}/organisation/api/Designation/${desigId}/?schema=${selectedSchema}`;
   
    return this.http.put(apiUrl, categoryData);
  }
  
}
