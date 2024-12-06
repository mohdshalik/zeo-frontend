import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  register() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  // user register

  registerNewUser(userData: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/hrms/api/user/' ,userData);
  }



  // user login

  // loginUser(userData: any): Observable<any> {
  //   return this.http.post('http://127.0.0.1:8000/hrms/api/token/' ,userData);
  // }

  

  // register(userData: any): Observable<any> {
  //   return this.http.post('http://127.0.0.1:8000/hrms/api/token/' ,userData);
  // }


}


