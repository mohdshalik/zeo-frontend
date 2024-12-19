import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {



  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local


  private baseUrl = 'http://127.0.0.1:8000/organisation/api';

  constructor(private http: HttpClient) {}

  getDepartment(): Observable<any> {
    const url = `${this.baseUrl}/Department/`;
    return this.http.get(url);
 
  }

  getDepartments(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/organisation/api/Department/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }
  

  getDeptNames(): Observable<any> {
    const url = `${this.baseUrl}/Department/`;

    return this.http.get(url);
  }
  getDeptDescription(): Observable<any> {
    const url = `${this.baseUrl}/Department/`;

    return this.http.get(url);
  }

  getDeptBranch(): Observable<any> {
    const url = `${this.baseUrl}/Branch/`;

    return this.http.get(url);

    
  }

    getDeptBranchList(selectedSchema: string): Observable<any> {
      const Url = `${this.apiUrl}/organisation/api/Branch/?schema=${selectedSchema}`;
    
      // Fetch employees from the API
      return this.http.get(Url);

      
    }

    getBranchPolicies(branchId: string,selectedSchema: string): Observable<any> {
      const apiUrl = `${this.apiUrl}/organisation/api/Branch/${branchId}/companypolicies/?schema=${selectedSchema}`;
      return this.http.get(apiUrl);
    }

  

  getReqType(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/employee/api/request-type/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);

    
  }

  getUserforPermission(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/users/tenant-users/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  }


  getUserforPermissionGroupSelection(selectedSchema: string): Observable<any> {
    const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/Group/`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  }



  getCategoryById(departmentId: number): Observable<any> {
    // const url = `${this.baseUrl}/Department/${departmentId}/`;
    // return this.http.get(url);

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   
    const Url = `${this.apiUrl}/organisation/api/Department/${departmentId}/?schema=${selectedSchema}`;
   
    return this.http.get(Url);

  }

  openEditPopuss(departmentId: number): Observable<any> {
    const url = `${this.baseUrl}/Department/${departmentId}/`;
    return this.http.get(url);
  }


  updateCategory(departmentId: number, categoryData: any): Observable<any> {
    // const url = `${this.baseUrl}/Department/${departmentId}/`;
    // return this.http.put(url, categoryData);


    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   

    
    const apiUrl = `${this.apiUrl}/organisation/api/Department/${departmentId}/?schema=${selectedSchema}`;
   
    return this.http.put(apiUrl, categoryData);
  }







  registerDepartment(companyData: any): Observable<any> {
    // const url = `${this.baseUrl}/Department/`; // Adjust the URL if needed

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   

    
    const apiUrl = `${this.apiUrl}/organisation/api/Department/?schema=${selectedSchema}`;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
    }


    registerUserAssgnedPer(companyData: any): Observable<any> {
      // const url = `${this.baseUrl}/Department/`; // Adjust the URL if needed
  
      const selectedSchema = localStorage.getItem('selectedSchema');
      if (!selectedSchema) {
        console.error('No schema selected.');
        return throwError('No schema selected.'); // Return an error observable if no schema is selected
      }
     
  
      
      const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/permissions/`;
  
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
      return this.http.post(apiUrl, companyData, { headers }).pipe(
        catchError((error) => {
          // Handle errors here (you can log, show a user-friendly message, etc.)
          console.error('Error during company registration:', error);
          return throwError(error);
  
        })
      );
      }


    deleteDept(DeptId: number): Observable<any> {
      // const url = `${this.baseUrl}/Department/${DeptId}`;
      // return this.http.delete(url);



      const selectedSchema = localStorage.getItem('selectedSchema');
      if (!selectedSchema) {
        console.error('No schema selected.');
        return throwError('No schema selected.'); // Return an error observable if no schema is selected
      }
     
      const apiUrl = `${this.apiUrl}/organisation/api/Department/${DeptId}/?schema=${selectedSchema}`;
     
      return this.http.delete(apiUrl);
  }
   

  getDesignationsPermission(selectedSchema: string): Observable<any> {
    const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/permissions/`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }


  getEmailTemplates(selectedSchema: string): Observable<any> {
    const apiUrl = `http://${selectedSchema}.localhost:8000/employee/api/email-template/`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);

    
  }

  
}
