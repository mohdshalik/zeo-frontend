import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Permissions } from '../catogary-master/permission';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserMasterService {
 
  // private baseUrl = 'http://127.0.0.1:8000/users/api';

  private baseUrl = 'http://80.65.208.178:8000/users/api';
  
  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local



  private user_permissions: Permissions[] = [];


  constructor(private http: HttpClient) {}


  setUserPermissions(permissions: Permissions[]): void {
    this.user_permissions = permissions;
  }


  
  hasPermission(permission: Permissions): boolean {
    return this.user_permissions.includes(permission);
    // return true;
  }

  getUsers(): Observable<any> {
    
    const url = `${this.apiUrl}/users/api/user/`;
    return this.http.get(url);
 
  }

  getSChemaUsers(selectedSchema: string): Observable<any> {
    // Construct the API URL with the selected schema
    const Url = `${this.apiUrl}/users/tenant-users/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(Url);
  }

  getUsername(): Observable<any> {
    const url = `${this.baseUrl}/user/`;
    return this.http.get(url);
 
  }

  // getSchema(companyData:any): Observable<any> {
  //   const url = `${this.baseUrl}/company/`;
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //   return this.http.post(url, companyData, { headers }).pipe(
  //     catchError((error) => {
  //       // Handle errors here (you can log, show a user-friendly message, etc.)
  //       console.error('Error during company registration:', error);
  //       return throwError(error);

  //     })
  //   );
 
  // }
  getSchema(companyData: FormData): Observable<any> {
    const url = `${this.apiUrl}/users/api/company/`;

    return this.http.post(url, companyData).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);
      })
    );
  }

  getEmail(): Observable<any> {
    const url = `${this.baseUrl}/user/`;

    return this.http.get(url);
  }

  getCompanyroll(): Observable<any> {
    const url = `${this.baseUrl}/user/`;

    return this.http.get(url);
  }

  getContact(): Observable<any> {
    const url = `${this.baseUrl}/user/`;

    return this.http.get(url);
  }

  // getDeptBranch(): Observable<any> {
  //   const url = `${this.baseUrl}/Branch/`;

  //   return this.http.get(url);
  // }

  // getcompanies(): Observable<any> {
  //   const url = `${this.baseUrl}/Company/`;

  //   return this.http.get(url);
  // }

  getGrouping(): Observable<any> {
    const url = `${this.baseUrl}/Role-Grouping/`;

    return this.http.get(url);
  }

  getPermission(): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
    const url = `${this.apiUrl}/users/api/permissions/?schema=${selectedSchema}`;

    return this.http.get(url);
  }

  
 saveGroup(groupData: any): Observable<any> {
    const url = `${this.baseUrl}/Role-Grouping/`;
    return this.http.post(url, groupData);
  }




  

  // getPermissionByRoleGrouping(): Observable<any> {
  //   const url = `${this.baseUrl}/permissions/`;

  //   return this.http.get(url);
  // }

  getPermissionByRoleGrouping(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/permissions/`;
    // return this.http.get(url);
    const apiUrl = `${this.apiUrl}/organisation/api/perm/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);

  }

  getDesignations(selectedSchema: string): Observable<any> {
    const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/Designation/`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }


  // getUsers(): Observable<any>{

  //   const url = `${this.baseUrl}/user/`;

  //   return this.http.get(url);
    
  // }

  getRoleGrouping(selectedSchema:string): Observable<any> {
    // const url = `${this.baseUrl}/Group/`;
    // return this.http.get(url);

    const apiUrl = `${this.apiUrl}/organisation/api/Group/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);


  }

  getDesignationsPermission(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/organisation/api/permissions/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }

  getCategoryById(departmentId: number): Observable<any> {

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   
    const apiUrl = `${this.apiUrl}/organisation/api/Group/${departmentId}/?schema=${selectedSchema}`;
   
    return this.http.get(apiUrl);
  }

  // const apiUrl = `${this.apiUrl}/organisation/api/perm/?schema=${selectedSchema}`;


  openEditPopuss(departmentId: number): Observable<any> {
    const url = `${this.baseUrl}/Role-Grouping/${departmentId}/`;
    return this.http.get(url);
  }


  updateCategory(departmentId: number, categoryData: any): Observable<any> {
    const url = `${this.baseUrl}/Role-Grouping/${departmentId}/`;
    return this.http.put(url, categoryData);
  }

  deleteDept(DeptId: number): Observable<any> {

    const selectedSchema = localStorage.getItem('selectedSchema');
if (!selectedSchema) {
  console.error('No schema selected.');
  return throwError('No schema selected.'); // Return an error observable if no schema is selected
}


const apiUrl = `${this.apiUrl}/organisation/api/Group/${DeptId}/?schema=${selectedSchema}`;

return this.http.delete(apiUrl);
}





  getCompany(): Observable<any> {
    const url = `${this.baseUrl}/Company/`;
    return this.http.get(url);
  }

  getBranches(): Observable<any> {
    const url = `${this.baseUrl}/Branch/`;
    return this.http.get(url);
  }



  
  getEmpById(employeeId: number): Observable<any> {
    const url = `${this.apiUrl}/users/api/user/${employeeId}/`;
    return this.http.get(url);
  }

  openEditEmpPopuss(employeeId: number): Observable<any> {
    const url = `${this.apiUrl}/users/api/user/${employeeId}/`;
    return this.http.get(url);
  }


  updateEmp(employeeId: number, empData: any): Observable<any> {
    // const url = `${this.baseUrl}/user/${employeeId}/`;
    // return this.http.put(url, empData);


    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   
    const apiUrl = `${this.apiUrl}/users/api/user/${employeeId}/`;
   
    return this.http.put(apiUrl, empData );
  }
  
  getEmployeeDetails(employeeId: number): Observable<any> {
    const url = `${this.apiUrl}/users/api/user/${employeeId}/`;
    return this.http.get(url);
  }





  registeruser(companyData: any): Observable<any> {
    const url = `${this.apiUrl}/users/api/user/`; // Adjust the URL if needed
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
    }

    deleteUser(DeptId: number): Observable<any> {


      // const url = `${this.baseUrl}/user/${DeptId}`;
      // return this.http.delete(url);

      const selectedSchema = localStorage.getItem('selectedSchema');
      if (!selectedSchema) {
        console.error('No schema selected.');
        return throwError('No schema selected.'); // Return an error observable if no schema is selected
      }
     
      const apiUrl = `${this.apiUrl}/users/api/user/${DeptId}/`;
     
      return this.http.delete(apiUrl);


  }


 

  registerGroupingRole(companyData: any): Observable<any> {
    const url = `${this.apiUrl}users/api/Role-Grouping/`; // Adjust the URL if needed
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
    }








  
}
