import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatogaryService {
  isUserInRole(roleToCheck: string | undefined) {
    throw new Error('Method not implemented.');
  }
 
  private baseUrl = 'http://80.65.208.178:8000/organisation/api';

  constructor(private http: HttpClient) {}

  getcatogary(): Observable<any> {
    const url = `${this.baseUrl}/Catogory/`;
    return this.http.get(url);
 
  }
  
  getcatogarys(selectedSchema: string): Observable<any> {
    const apiUrl = `http://${selectedSchema}.80.65.208.178:8000/organisation/api/Catogory/`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }

  getWeekendcalendar(selectedSchema: string): Observable<any> {
    const apiUrl = `http://${selectedSchema}.localhost:8000/calendars/api/weekend/`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }


  getHolidayCalendar(selectedSchema: string): Observable<any> {
    const apiUrl = `http://${selectedSchema}.localhost:8000/calendars/api/holiday-calendar/`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }


  




  


  getCategoryById(categoryId: number): Observable<any> {
    // const url = `${this.baseUrl}/Catogory/${categoryId}/`;
    // return this.http.get(url);


    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   
    const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/Catogory/${categoryId}/`;
   
    return this.http.get(apiUrl);
  }

  openEditPopuss(categoryId: number): Observable<any> {
    const url = `${this.baseUrl}/Catogory/${categoryId}/`;
    return this.http.get(url);
  }


  updateCategory(categoryId: number, categoryData: any): Observable<any> {
    // const url = `${this.baseUrl}/Catogory/${categoryId}/`;
    // return this.http.put(url, categoryData);

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   

    
    const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/Catogory/${categoryId}/`;
   
    return this.http.put(apiUrl, categoryData);
  }
  
  

  deleteCategory(categoryId: number): Observable<any> {
    // const url = `${this.baseUrl}/Catogory/${categoryId}`;
    // return this.http.delete(url);

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   
    const apiUrl = `http://${selectedSchema}.80.65.208.178:8000/organisation/api/Catogory/${categoryId}/`;
   
    return this.http.delete(apiUrl);
}
  


  getcat_job_title(): Observable<any> {
    const url = `${this.baseUrl}/Catogory/`;
    return this.http.get(url);
 
  }

  getcat_description(): Observable<any> {
    const url = `${this.baseUrl}/Catogory/`;

    return this.http.get(url);
  }


  registerCatogary(companyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   

    
    const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/Catogory/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
    }


    

    
}
