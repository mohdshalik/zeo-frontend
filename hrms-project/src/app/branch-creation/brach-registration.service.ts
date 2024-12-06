import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrachRegistrationService {
  getBranchCity() {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://127.0.0.1:8000/organisation/api'; // Update this URL according to your backend API

  constructor(private http: HttpClient) {}

  // Function to register a new company
  registerBranch(companyData: any): Observable<any> {
    // const url = `${this.baseUrl}/Branch/`; // Adjust the URL if needed
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   

    
    const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/Branch/`;

    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);
        
      })
    );
}

getBranches(): Observable<any> {
  const url = `${this.baseUrl}/Branch/`;
  return this.http.get(url);

}

getBranchess(selectedSchema: string): Observable<any> {
  const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/Branch/`;

  // Fetch employees from the API
  return this.http.get(apiUrl);

}

getDesignationsPermission(selectedSchema: string): Observable<any> {
  const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/permissions/`;

  // Fetch employees from the API
  return this.http.get(apiUrl);

}


//  getEmployees(selectedSchema: string): Observable<any> {
//     // Construct the API URL with the selected schema
//     const apiUrl = `http://${selectedSchema}.localhost:8000/employee/api/Employee/`;

//     // Fetch employees from the API
//     return this.http.get(apiUrl);
//   }


getBranchNames(): Observable<any> {
  const url = `${this.baseUrl}/Branch/`;

  return this.http.get(url);
}

// getBranchCity(): Observable<any> {
//   const url = `${this.baseUrl}/`;

//   return this.http.get(url);
// }

getBranchEmail(): Observable<any> {
  const url = `${this.baseUrl}/Branch/`;

  return this.http.get(url);
}

getBranchNumber(): Observable<any> {
  const url = `${this.baseUrl}/Branch/`;

  return this.http.get(url);
}


deleteBranch(categoryId: number): Observable<any> {


  // const url = `${this.baseUrl}/Branch/${categoryId}`;
  // return this.http.delete(url);

  const selectedSchema = localStorage.getItem('selectedSchema');
  if (!selectedSchema) {
    console.error('No schema selected.');
    return throwError('No schema selected.'); // Return an error observable if no schema is selected
  }
 
  const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/Branch/${categoryId}/`;
 
  return this.http.delete(apiUrl);
}



}
