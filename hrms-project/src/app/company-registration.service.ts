import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyRegistrationService {
  registerBranch(companyData: { branch_name: string; br_city: string; br_branch_mail: any; br_branch_nmbr_1: any; br_branch_nmbr_2: any; br_pincode: any; }) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://127.0.0.1:8000/organisation/api'; // Update this URL according to your backend API

  constructor(private http: HttpClient) {}

  // Function to register a new company
  registerCompany(companyData: any): Observable<any> {
    const url = `${this.baseUrl}/Company/`; // Adjust the URL if needed
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
    }




    getCompany(): Observable<any> {
      const url = `http://localhost:8000/users/api/company/`;
      return this.http.get(url);

      
    }

    getUsers(): Observable<any> {
      const url = `http://localhost:8000/users/api/user/`;
      return this.http.get(url);

      
    }

    getBranches(): Observable<any> {
      const url = `${this.baseUrl}/Branch/`;
      return this.http.get(url);
    }

    getBranchesList(selectedSchema: string): Observable<any> {
      // const url = `${this.baseUrl}/Branch/`;
      // return this.http.get(url);

      const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/Branch/`;
  
      // Fetch employees from the API
      return this.http.get(apiUrl);
    }


    getDepartmentsList(selectedSchema: string): Observable<any> {
      // const url = `${this.baseUrl}/Branch/`;
      // return this.http.get(url);

      const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/Department/`;
  
      // Fetch employees from the API
      return this.http.get(apiUrl);
    }


    getDepartments(): Observable<any> {
      const url = `${this.baseUrl}/Department/`;
      return this.http.get(url);
    }


    getDesignation(): Observable<any> {
      const url = `${this.baseUrl}/Designation/`;
      return this.http.get(url);
    }
    getDesignationList(selectedSchema: string): Observable<any> {
      // const url = `${this.baseUrl}/Branch/`;
      // return this.http.get(url);

      const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/Designation/`;
  
      // Fetch employees from the API
      return this.http.get(apiUrl);
    }



    
    getcatgories(): Observable<any> {
      const url = `${this.baseUrl}/Catogory/`;
      return this.http.get(url);
    }
    getcatgoriesList(selectedSchema: string): Observable<any> {
      // const url = `${this.baseUrl}/Branch/`;
      // return this.http.get(url);

      const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/Catogory/`;
  
      // Fetch employees from the API
      return this.http.get(apiUrl);
    }


 

    getLanguages(): Observable<any> {
      const url = `${this.baseUrl}/emp-Language/`;
      return this.http.get(url);
    }
    


    deleteCompany(categoryId: number): Observable<any> {
      const url = `${this.baseUrl}/${categoryId}`;
      return this.http.delete(url);
  }


  getEmpById(employeeId: number): Observable<any> {
    const url = `${this.baseUrl}/Company/${employeeId}/`;
    return this.http.get(url);
  }

  openEditEmpPopuss(employeeId: number): Observable<any> {
    const url = `${this.baseUrl}/Company/${employeeId}/`;
    return this.http.get(url);
  }


  updateEmp(employeeId: number, empData: any): Observable<any> {
    const url = `${this.baseUrl}/Company/${employeeId}/`;
    return this.http.put(url, empData);
  }
  
    

  getEmployeeDetails(employeeId: number): Observable<any> {
    const url = `${this.baseUrl}/Company/${employeeId}/`;
    return this.http.get(url);
  }


  deleteEmployee(employeeId: number): Observable<any> {
    const url = `${this.baseUrl}/Company/${employeeId}`;
    return this.http.delete(url);
}






    // Inside CompanyRegistrationService
// getBranchesByCompanyId(companyId: any): Observable<any> {
//   const url = `${this.baseUrl}/${companyId}/Branch`; // Adjust the URL if needed
//   return this.http.get(url).pipe(
//     catchError((error) => {
//       console.error('Error fetching branches by company ID:', error);
//       return throwError(error);
//     })
//   );
// }





  }
