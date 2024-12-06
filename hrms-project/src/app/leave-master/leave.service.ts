import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http: HttpClient) {}


  
  registerLeaveType(formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `http://${selectedSchema}.localhost:8000/calendars/api/leave-type/`;
  
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during leave type registration:', error);
        return throwError(error);
      })
    );
  }


  registerLeaveEntitlement(formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `http://${selectedSchema}.localhost:8000/calendars/api/leave-entitlement/`;
  
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during leave type registration:', error);
        return throwError(error);
      })
    );
  }


  registerLeaveapplicable(formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `http://${selectedSchema}.localhost:8000/calendars/api/applicable_to/`;
  
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during leave type registration:', error);
        return throwError(error);
      })
    );
  }


  requestLeaveAdmin(formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `http://${selectedSchema}.localhost:8000/calendars/api/leave-request/`;
  
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during leave type registration:', error);
        return throwError(error);
      })
    );
  }

  requestCompLeaveAdmin(formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `http://${selectedSchema}.localhost:8000/calendars/api/CompensatoryLeaveRequest/`;
  
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during leave type registration:', error);
        return throwError(error);
      })
    );
  }



  requestCompTransLeaveAdmin(formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `http://${selectedSchema}.localhost:8000/calendars/api/emp-cmpnstry-lv-transaction/`;
  
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during leave type registration:', error);
        return throwError(error);
      })
    );
  }




  CreateLeaveapprovalLevel(formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `http://${selectedSchema}.localhost:8000/calendars/api/leave-approval-levels/`;
  
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during leave type registration:', error);
        return throwError(error);
      })
    );
  }


  registerEmailTemplateLeave(companyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   

    
    const apiUrl = `http://${selectedSchema}.localhost:8000/calendars/api/leave-template/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
    }




    
  updateEmailTemplateLeave(updatedTemplate: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `http://${selectedSchema}.localhost:8000/calendars/api/leave-template/${updatedTemplate.id}/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.put(apiUrl, updatedTemplate, { headers }).pipe(
      catchError((error) => {
        console.error('Error updating template:', error);
        return throwError(error);
      })
    );
  }
  

  getApprovalslistLeave(selectedSchema: string, userId: number): Observable<any> {
    const apiUrl = `http://${selectedSchema}.localhost:8000/users/api/user/${userId}/lvapprovals/`;

    // Fetch approvals for the user from the API
    return this.http.get(apiUrl);
}


getApprovalDetailsLeave(apiUrl: string): Observable<any> {
  return this.http.get(apiUrl);
}



approveApprovalRequestLeave(apiUrl: string, approvalData: { note: string; status: string }): Observable<any> {
  // Sending a POST request to approve with note and status
  return this.http.post(apiUrl, approvalData);
}

rejectApprovalRequestLeave(apiUrl: string, approvalData: { note: string; status: string }): Observable<any> {
  // Sending a POST request to approve with note and status
  return this.http.post(apiUrl, approvalData);
}




    getEmailTemplatesLeave(selectedSchema: string): Observable<any> {
      const apiUrl = `http://${selectedSchema}.localhost:8000/calendars/api/leave-template/`;
    
      // Fetch employees from the API
      return this.http.get(apiUrl);
  
      
    }


  getLeaveType(selectedSchema: string): Observable<any> {
    const apiUrl = `http://${selectedSchema}.localhost:8000/calendars/api/leave-type/`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }


  getEmployee(selectedSchema: string): Observable<any> {
    const apiUrl = `http://${selectedSchema}.localhost:8000/employee/api/Employee/`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }

  getUsers(selectedSchema: string): Observable<any> {
    const apiUrl = `http://${selectedSchema}.localhost:8000/users/api/user/`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }

  getLeaverejectionReasons(selectedSchema: string): Observable<any> {
    const apiUrl = `http://${selectedSchema}.localhost:8000/calendars/api/leave-rejection-reason/`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }










  getBranches(selectedSchema: string): Observable<any> {
    const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/Branch/`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }

  
  getDepartments(selectedSchema: string): Observable<any> {
    const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/Department/`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }
  getDesignation(selectedSchema: string): Observable<any> {
    const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/Designation/`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }
  getCategory(selectedSchema: string): Observable<any> {
    const apiUrl = `http://${selectedSchema}.localhost:8000/organisation/api/Catogory/`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }

}
