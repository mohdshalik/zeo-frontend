import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { EmployeeService } from '../employee-master/employee.service';
import { environment } from '../../environments/environment';

interface Permission {
  id: number;
  name: string;
  codename: string;
  content_type: number;
}

// Define a Permission interface to represent permission objects
interface Permission {
  codename: string;
  // Add any other properties your permissions might have
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // private apiUrl = 'http://80.65.208.178:8000/users';  // Update with your Django backend URL
  private apiUrl = `${environment.apiBaseUrl}/users`; // Use the correct `apiBaseUrl`

  private tokenKey = 'auth_token';

  private userPermissionsSubject: BehaviorSubject<Permission[]> = new BehaviorSubject<Permission[]>([]);
  public user_permissions$: Observable<Permission[]> = this.userPermissionsSubject.asObservable();

  constructor(private http: HttpClient, private EmployeeService: EmployeeService) {}

  // login(username: string, password: string): Observable<any> {
  //   const url = `${this.apiUrl}/token/`;
  //   const body = { username, password };
  //   return this.http.post(url, body).pipe(
  //     tap((response: any) => {
  //       const token = response.access;
  //       this.setAuthToken(token);
  //     })
  //   );
  // }

  login( password: string,username: string,): Observable<any> {
    const url = `${this.apiUrl}/token/`;
    const body = {  password,username, };
    return this.http.post(url, body).pipe(
      tap((response: any) => {
        const token = response.access;
        this.setAuthToken(token);
      })
    );
  }

  private fetchUserPermissions() {
    this.http.get<string[]>(`${this.apiUrl}/api/user/7/role_grouping/`).pipe(
      map((permissions: string[]) => permissions.map(permission => ({ codename: permission } as Permission)))
    ).subscribe(permissions => {
      this.userPermissionsSubject.next(permissions);
    });
  }


  
  

  getUserPermissions(): Observable<string[]> {
    // Assuming your backend API endpoint for fetching user permissions is '/api/user/permissions'
    return this.http.get<string[]>(`${this.apiUrl}/api/user/9/role_grouping/`);

  }


  
  
  getEmployeeDetails(employeeId: number): Observable<any> {
    const url = `${this.apiUrl}/api/user/${employeeId}/`;
    return this.http.get(url);
  }

  getUserDetails(userId: number): Observable<any> {
    const url = `${this.apiUrl}/api/user/${userId}`; // Assuming your API endpoint to fetch user details is '/users/:userId'
    return this.http.get(url);
  }


  getLoggedInUserId(): number | null {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const decodedToken = this.decodeJwt(token);
      return decodedToken.userId;
    } else {
      return null;
    }
  }

  private decodeJwt(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  getUserData(userId: number): Observable<any> {
    const url = `${this.apiUrl}/api/user/${userId}/`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}`
    });
    return this.http.get(url, { headers });
  }

  getDesignationsPermission(selectedSchema: string): Observable<any> {

    const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/permissions/`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }

  getUserSchema(userId: number): Observable<any> {
    const url = `${this.apiUrl}/api/user/${userId}/tenants`;
    return this.http.get(url);
  }

  fetchSchemaDetails(schemaId: number): Observable<any> {
    const url = `${this.apiUrl}/api/company/${schemaId}`;
    return this.http.get(url);
  }
  
  // getUserSchemas(): Observable<string[]> {
  //   // Replace this with your actual API endpoint
  //   return this.http.get<string[]>('http://localhost:8000/users/api/company');
  // }

  // getSelectedSchema(): string | null {
  //   // Retrieve the selected schema from localStorage
  //   const selectedSchema = localStorage.getItem('selectedSchema');
  //   return selectedSchema ? selectedSchema : null;
  // }

  getSelectedSchema(): string | null {
    // Retrieve the selected schema from localStorage
    const selectedSchema = localStorage.getItem('selectedSchema');
    return selectedSchema ? selectedSchema : null;
  }

  getSelectedSchemaId(): number | null {
    const selectedSchemaId = localStorage.getItem('selectedSchemaId');
    return selectedSchemaId ? parseInt(selectedSchemaId) : null;
  }
  
  getEmployee(): Observable<any> {
    const url = `${this.apiUrl}/api/user/`;
    return this.http.get(url);
 
  }

  // registerUser(username:'',firstname:'', lastname:'',email: string, ContactNumber:'', password: string): Observable<any> {
  //   const url = `${this.apiUrl}/api/user/`;
  //   const body = {username,firstname,lastname, email,ContactNumber, password };
  //   return this.http.post(url, body);
  // }
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/user/`, userData);
  }
  
  

  setAuthToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }


  getAuthToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getAuthToken();
  }

  logout(): Observable<any> {
    localStorage.removeItem(this.tokenKey);
    return of({ success: true });
  }

  handleSessionExpiration(): void {
    alert('Session expired. Please log in again.');
    this.logout();  
  }

  // isAuthenticated(): boolean {
  //   return !!this.getAuthToken();
  // }

    // Remove authentication token from local storage
    // private removeAuthToken(): void {
    //   localStorage.removeItem(this.tokenKey);
    // }


    // getLoggedInUser(): Observable<any> {
    //   // Assuming you have an API endpoint for fetching logged-in user data
    //   return this.http.get<any>('http://localhost:8000/users/api/user/');
    // }
    



}
