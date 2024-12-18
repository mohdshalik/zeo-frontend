import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root',
})
export class CountryService {

  private baseUrl = 'http://80.65.208.178:8000/core/api/';

  private apiUrl = 'http://one.localhost:8000/calendars/api/weekend/';


  constructor(private http: HttpClient) {}


  getWeekendCalendars(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getWeekendCalendarList(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/permissions/`;
    // return this.http.get(url);
    const apiUrl = `http://${selectedSchema}.localhost:8000/calendars/api/weekend/`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);

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
    const url = `${this.baseUrl}Country/`;
    return this.http.get(url);
  }

  getCountriesList(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/Branch/`;
    // return this.http.get(url);

    const apiUrl = `http://${selectedSchema}.localhost:8000/core/api/Country/`;

    // Fetch employees from the API
    return this.http.get(apiUrl);
  }


  getholidayCalendars(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/Branch/`;
    // return this.http.get(url);

    const apiUrl = `http://${selectedSchema}.localhost:8000/calendars/api/holiday-calendar/`;

    // Fetch employees from the API
    return this.http.get(apiUrl);
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

    const apiUrl = `http://${selectedSchema}.localhost:8000/core/api/language/`;

    // Fetch employees from the API
    return this.http.get(apiUrl);
  }

  

  registerState(companyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   

    
    const apiUrl = `http://${selectedSchema}.localhost:8000/core/api/State/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
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
     
  
      
      const apiUrl = `http://${selectedSchema}.localhost:8000/calendars/api/weekend/`;
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
       
    
        
        const apiUrl = `http://${selectedSchema}.localhost:8000/calendars/api/holiday/`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
        return this.http.post(apiUrl, companyData, { headers }).pipe(
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
         
      
          
          const apiUrl = `http://${selectedSchema}.localhost:8000/calendars/api/holiday-calendar/`;
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
     
  
      
      const apiUrl = `http://${selectedSchema}.localhost:8000/core/api/Documents/`;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
      return this.http.post(apiUrl, companyData, { headers }).pipe(
        catchError((error) => {
          // Handle errors here (you can log, show a user-friendly message, etc.)
          console.error('Error during company registration:', error);
          return throwError(error);
  
        })
      );
      }

      getAllDocsList(selectedSchema: string): Observable<any> {
        // const url = `${this.baseUrl}/Branch/`;
        // return this.http.get(url);
    
        const apiUrl = `http://${selectedSchema}.localhost:8000/core/api/Documents/`;
    
        // Fetch employees from the API
        return this.http.get(apiUrl);
      }



      getHolidayendcalendar(selectedSchema: string): Observable<any> {
        const apiUrl = `http://${selectedSchema}.localhost:8000/calendars/api/holiday/`;
      
        // Fetch employees from the API
        return this.http.get(apiUrl);
      
      }
  

  getAllStates(): Observable<any> {
    const url = `${this.baseUrl}State/`;
    return this.http.get(url);
  }

  getAllStatesList(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/Branch/`;
    // return this.http.get(url);

    const apiUrl = `http://${selectedSchema}.localhost:8000/core/api/State/`;

    // Fetch employees from the API
    return this.http.get(apiUrl);
  }

  getStatesByCountryId(countryId: number): Observable<any> {
 

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   
    const apiUrl = `http://${selectedSchema}.localhost:8000/core/api/Country/${countryId}/states/`;
   
    return this.http.get(apiUrl);
  }

  


  
  getDocument(selectedSchema:string): Observable<any> {
    // const url = `${this.baseUrl}/Group/`;
    // return this.http.get(url);

    const apiUrl = `http://${selectedSchema}.localhost:8000/core/api/Documents/`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);


  }


  
}