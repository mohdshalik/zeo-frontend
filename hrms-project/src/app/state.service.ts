import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  // private baseUrl = 'http://127.0.0.1:8000/hrms/api/State/';
  

  // constructor(private http: HttpClient) { }

  // getStatesByCountry(countryId: number): Observable<any> {
  //   const url = `${this.baseUrl}?country=${countryId}`;
  //   return this.http.get(url);
  // }
}
