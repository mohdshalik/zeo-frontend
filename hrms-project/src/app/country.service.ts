import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';



@Injectable({
  providedIn: 'root',
})
export class CountryService {

  private baseUrl = 'http://80.65.208.178:8000/core/api/';

  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local


  // private apiUrl = 'http://one.localhost:8000/calendars/api/weekend/';


  constructor(private http: HttpClient) {}


  // getWeekendCalendars(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }

  getWeekendCalendars(): Observable<any> {
    // const url = `${this.baseUrl}/permissions/`;
    // return this.http.get(url);
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
    const Url = `${this.apiUrl}/calendars/api/weekend/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(Url);

    

  }

  getWeekendCalendarList(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/permissions/`;
    // return this.http.get(url);
    const Url = `${this.apiUrl}/calendars/api/weekend/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(Url);

    

  }
  

  
  getComapies(): Observable<any> {
    const url = `${this.baseUrl}/Company/`;
    return this.http.get(url);
 
  }

  getCompanyNames(): Observable<any> {
    const url = `${this.baseUrl}/Company/`;

    return this.http.get(url);
  }
  getCompanyCity(): Observable<any> {
    const url = `${this.baseUrl}/Company/`;

    return this.http.get(url);
  }

  getCompanyEmail(): Observable<any> {
    const url = `${this.baseUrl}/Company/`;

    return this.http.get(url);
  }

  getCompanyNumber(): Observable<any> {
    const url = `${this.baseUrl}/Company/`;

    return this.http.get(url);
  }
 

  updateCompany(company: any): Observable<any> {
    const url = `${this.baseUrl}/Company/`; // Adjust the URL if needed
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, company, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
  }

 

  deleteCompany(companyId: number): Observable<any> {
    const url = `${this.baseUrl}/Company/${companyId}`;

    // Add necessary headers
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Add any other headers required by your server
      }),
      observe: 'response' as 'response',  
      responseType: 'json' as 'json',
    };

    return this.http.delete(url, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  

  private handleError(error: HttpErrorResponse) {
    console.error('API request failed:', error);
    return throwError('Something bad happened; please try again later.');
  }

  

  
  getCountries(): Observable<any> {
    const url = `${this.apiUrl}/core/api/Country/`;
    return this.http.get(url);
  }

  getCountriesList(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/Branch/`;
    // return this.http.get(url);

    const Url = `${this.apiUrl}/core/api/Country/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(Url);
  }

  getReligionList(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/Branch/`;
    // return this.http.get(url);

    const Url = `${this.apiUrl}/core/api/religion/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(Url);
  }


  getstatescreated(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/Branch/`;
    // return this.http.get(url);

    const Url = `${this.apiUrl}/core/api/State/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(Url);
  }



  getholidayCalendars(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/Branch/`;
    // return this.http.get(url);

    const Url = `${this.apiUrl}/calendars/api/holiday-calendar/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(Url);
  }


  getDocumentTypes(): Observable<any> {
    


    const url = `${this.baseUrl}/Documents/`;
    return this.http.get(url);


  }

  
  getLanguages(): Observable<any> {
    const url = `${this.baseUrl}/language/`;
    return this.http.get(url);
  }

  getLanguagesList(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/Branch/`;
    // return this.http.get(url);

    const Url = `${this.apiUrl}/core/api/language/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(Url);
  }

  

  registerState(companyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   

    
    const Url = `${this.apiUrl}/core/api/State/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(Url, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
    }


    registerWeekCalendar(companyData: any): Observable<any> {
      const selectedSchema = localStorage.getItem('selectedSchema');
      if (!selectedSchema) {
        console.error('No schema selected.');
        return throwError('No schema selected.'); // Return an error observable if no schema is selected
      }
     
  
      
      const apiUrl = `${this.apiUrl}/calendars/api/weekend/?schema=${selectedSchema}`;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
      return this.http.post(apiUrl, companyData, { headers }).pipe(
        catchError((error) => {
          // Handle errors here (you can log, show a user-friendly message, etc.)
          console.error('Error during company registration:', error);
          return throwError(error);
  
        })
      );
      }


      registerHolidayCalendar(companyData: any): Observable<any> {
        const selectedSchema = localStorage.getItem('selectedSchema');
        if (!selectedSchema) {
          console.error('No schema selected.');
          return throwError('No schema selected.'); // Return an error observable if no schema is selected
        }
       
    
        
        const Url = `${this.apiUrl}/calendars/api/holiday/?schema=${selectedSchema}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
        return this.http.post(Url, companyData, { headers }).pipe(
          catchError((error) => {
            // Handle errors here (you can log, show a user-friendly message, etc.)
            console.error('Error during company registration:', error);
            return throwError(error);
    
          })
        );
        }

        registerHolidayCalendarYear(companyData: any): Observable<any> {
          const selectedSchema = localStorage.getItem('selectedSchema');
          if (!selectedSchema) {
            console.error('No schema selected.');
            return throwError('No schema selected.'); // Return an error observable if no schema is selected
          }
         
      
          
          const apiUrl = `${this.apiUrl}/calendars/api/holiday-calendar/?schema=${selectedSchema}`;
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      
          return this.http.post(apiUrl, companyData, { headers }).pipe(
            catchError((error) => {
              // Handle errors here (you can log, show a user-friendly message, etc.)
              console.error('Error during company registration:', error);
              return throwError(error);
      
            })
          );
          }


      registerWeekCalendarDays(companyData: any): Observable<any> {
        const selectedSchema = localStorage.getItem('selectedSchema');
        if (!selectedSchema) {
          console.error('No schema selected.');
          return throwError('No schema selected.'); // Return an error observable if no schema is selected
        }
       
    
        
        const apiUrl = `http://${selectedSchema}.localhost:8000/calendars/api/assign-days/`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
        return this.http.post(apiUrl, companyData, { headers }).pipe(
          catchError((error) => {
            // Handle errors here (you can log, show a user-friendly message, etc.)
            console.error('Error during company registration:', error);
            return throwError(error);
    
          })
        );
        }


    registerDocumentType(companyData: any): Observable<any> {
      const selectedSchema = localStorage.getItem('selectedSchema');
      if (!selectedSchema) {
        console.error('No schema selected.');
        return throwError('No schema selected.'); // Return an error observable if no schema is selected
      }
     
  
      
      const apiUrl = `${this.apiUrl}/core/api/Documents/?schema=${selectedSchema}`;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
      return this.http.post(apiUrl, companyData, { headers }).pipe(
        catchError((error) => {
          // Handle errors here (you can log, show a user-friendly message, etc.)
          console.error('Error during company registration:', error);
          return throwError(error);
  
        })
      );
      }

      updateDocNum(docId: number, payload: any): Observable<any> {
        const selectedSchema = localStorage.getItem('selectedSchema');
        if (!selectedSchema) {
          console.error('No schema selected.');
          return throwError('No schema selected.');
        }
        const url = `${this.apiUrl}/core/api/Documents/${docId}/?schema=${selectedSchema}`;
        return this.http.put(url, payload);
      }

      deleteAssignedPermission(permissionId: number,selectedSchema: string): Observable<any> {
        const apiUrl = `${this.apiUrl}/core/api/Documents/${permissionId}/?schema=${selectedSchema}`;
        return this.http.delete(apiUrl);
      }
    
    

      getAllDocsList(selectedSchema: string): Observable<any> {
        // const url = `${this.baseUrl}/Branch/`;
        // return this.http.get(url);
    
        const Url = `${this.apiUrl}/core/api/Documents/?schema=${selectedSchema}`;
    
        // Fetch employees from the API
        return this.http.get(Url);
      }



      getHolidayendcalendar(selectedSchema: string): Observable<any> {
        const apiUrl = `http://${selectedSchema}.localhost:8000/calendars/api/holiday/`;
      
        // Fetch employees from the API
        return this.http.get(apiUrl);
      
      }
  

  getAllStates(): Observable<any> {
    const url = `${this.apiUrl}/core/api/State/`;
    return this.http.get(url);
  }

  getAllStatesList(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/Branch/`;
    // return this.http.get(url);

    const Url = `${this.apiUrl}/core/api/State/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(Url);
  }

  getAllStatesListss(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/Branch/`;
    // return this.http.get(url);

    const Url = `${this.apiUrl}/core/api/State/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(Url);
  }


  getStatesByCountryId(countryId: number): Observable<any> {
 

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   
    const apiUrl = `${this.apiUrl}/core/api/Country/${countryId}/states/?schema=${selectedSchema}`;
   
    return this.http.get(apiUrl);
  }

  

  getStatesByCountryIds(countryId: number): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError(() => new Error('No schema selected.'));
    }

    const apiUrl = `${this.apiUrl}/core/api/Country/${countryId}/states/?schema=${selectedSchema}`;
    return this.http.get(apiUrl);
  }


  
  getDocument(selectedSchema:string): Observable<any> {
    // const url = `${this.baseUrl}/Group/`;
    // return this.http.get(url);

    const Url = `${this.apiUrl}/core/api/Documents/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(Url);


  }


  getShifts(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/Branch/`;
    // return this.http.get(url);

    const apiUrl = `${this.apiUrl}/calendars/api/shifts/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(apiUrl);
  }


  getEmployeeShifts(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/Branch/`;
    // return this.http.get(url);

    const apiUrl = `${this.apiUrl}/calendars/api/employee-shift/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(apiUrl);
  }

  getShiftsPattern(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/Branch/`;
    // return this.http.get(url);

    const apiUrl = `${this.apiUrl}/calendars/api/shiftpattern/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(apiUrl);
  }


  
}