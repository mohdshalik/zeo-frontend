import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local


  constructor(private http: HttpClient) {}


  
  registerLeaveType(formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `${this.apiUrl}/calendars/api/leave-type/?schema=${selectedSchema}`;
  
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
  
    const apiUrl = `${this.apiUrl}/calendars/api/leave-entitlement/?schema=${selectedSchema}`;
  
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during leave type registration:', error);
        return throwError(error);
      })
    );
  }


  requestLeaveResetPolicy(formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `${this.apiUrl}/calendars/api/leave-reset-policy/?schema=${selectedSchema}`;
  
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during leave type registration:', error);
        return throwError(error);
      })
    );
  }

  getAllLeaveEntitlements(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/calendars/api/leave-entitlement/?schema=${selectedSchema}`;
    return this.http.get(apiUrl);
  }


  getAllLeaveResetValues(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/calendars/api/leave-reset-policy/?schema=${selectedSchema}`;
    return this.http.get(apiUrl);
  }
  

  registerLeaveapplicable(formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `${this.apiUrl}/calendars/api/applicable_to/?schema=${selectedSchema}`;
  
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
  
    const apiUrl = `${this.apiUrl}/calendars/api/emp-leave-request/?schema=${selectedSchema}`;
  
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
  
    const apiUrl = `${this.apiUrl}/calendars/api/CompensatoryLeaveRequest/?schema=${selectedSchema}`;
  
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
  
    const apiUrl = `${this.apiUrl}/calendars/api/emp-cmpnstry-lv-transaction/?schema=${selectedSchema}`;
  
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
  
    const apiUrl = `${this.apiUrl}/calendars/api/leave-approval-levels/?schema=${selectedSchema}`;
  
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during leave type registration:', error);
        return throwError(error);
      })
    );
  }




  CreateLeaveBalance(formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `${this.apiUrl}/calendars/api/Leave_balance/?schema=${selectedSchema}`;
  
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during leave type registration:', error);
        return throwError(error);
      })
    );
  }


  
  CreateEmployeeOvertime(formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `${this.apiUrl}/calendars/api/Emp-overtime/?schema=${selectedSchema}`;
  
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during leave type registration:', error);
        return throwError(error);
      })
    );
  }


  CreateEmployeeattendance(formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError(() => new Error('No schema selected.'));
    }

    const apiUrl = `${this.apiUrl}/calendars/api/monthly-attendance/generate/?schema=${selectedSchema}`;
    
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during employee overtime creation:', error);
        return throwError(() => error);
      })
    );
  }

  registerEmailTemplateLeave(companyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   

    
    const apiUrl = `${this.apiUrl}/calendars/api/leave-template/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
    }



    registerEmailNotification(companyData: any): Observable<any> {
      const selectedSchema = localStorage.getItem('selectedSchema');
      if (!selectedSchema) {
        console.error('No schema selected.');
        return throwError('No schema selected.'); // Return an error observable if no schema is selected
      }
     
  
      
      const apiUrl = `${this.apiUrl}/employee/api/notification-settings/?schema=${selectedSchema}`;
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
  
    const apiUrl = `${this.apiUrl}/calendars/api/leave-template/${updatedTemplate.id}/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.put(apiUrl, updatedTemplate, { headers }).pipe(
      catchError((error) => {
        console.error('Error updating template:', error);
        return throwError(error);
      })
    );
  }
  

//   getApprovalslistLeave(selectedSchema: string, userId: number): Observable<any> {
//     const apiUrl = `${this.apiUrl}/users/api/user/${userId}/lvapprovals/?schema=${selectedSchema}`;

//     // Fetch approvals for the user from the API
//     return this.http.get(apiUrl);
// }

getApprovalslistLeave(selectedSchema: string, userId: number): Observable<any> {
  const apiUrl = `${this.apiUrl}/calendars/api/leave-approvals/?schema=${selectedSchema}`;

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
      const apiUrl = `${this.apiUrl}/calendars/api/leave-template/?schema=${selectedSchema}`;
    
      // Fetch employees from the API
      return this.http.get(apiUrl);
  
      
    }


  getLeaveType(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/calendars/api/leave-type/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }


  getLeaveBalanceAll(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/calendars/api/Leave_balance/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }


  getEmployeeOvertime(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/calendars/api/Emp-overtime/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }

  getLeaveApprovalLevel(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/calendars/api/leave-approval-levels/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }


  getLeaveBalance(employeeId: number) {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
  return this.http.get(`${this.apiUrl}/employee/api/Employee/${employeeId}/leave_balance/?schema=${selectedSchema}`);
}


  getLeaveRequest(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/calendars/api/emp-leave-request/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }

  rejectLeaveRequest(payload: any, schema: string): Observable<any> {
  const apiUrl = `${this.apiUrl}/calendars/api/immediate-reject/?schema=${schema}`;
  return this.http.post(apiUrl, payload);
}
  getEmployee(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/employee/api/Employee/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }

  getUsers(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/users/api/user/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }
  getApproverUsers(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/users/tenant-non-ess-users/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }

  // leave.service.ts
generateAttendanceReport(schema: string, data: any): Observable<any> {
  const url = `${this.apiUrl}/calendars/api/monthly-attendance/generate/?schema=${schema}`;
  return this.http.post<any>(url, data);
}



  getLeaverejectionReasons(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/calendars/api/leave-rejection-reason/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }










  getBranches(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/organisation/api/Branch/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }

  
  getDepartments(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/organisation/api/Department/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }
  getDesignation(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/organisation/api/Designation/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }
  getCategory(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/organisation/api/Catogory/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }






  // pay roll Services here -----------------------------------



  registerSalaryComponent(formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `${this.apiUrl}/payroll/api/salarycomponent/?schema=${selectedSchema}`;
  
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during leave type registration:', error);
        return throwError(error);
      })
    );
  }


  registerEmpSalary(formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `${this.apiUrl}/payroll/api/employeesalary/?schema=${selectedSchema}`;
  
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during leave type registration:', error);
        return throwError(error);
      })
    );
  }



  requestPayrollSettings(formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `${this.apiUrl}/payroll/api/PayrollFormula/?schema=${selectedSchema}`;
  
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during Payroll Formula registration:', error);
        return throwError(error);
      })
    );
  }


  requestPayroll(formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `${this.apiUrl}/payroll/api/PayrollRun/?schema=${selectedSchema}`;
  
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during leave type registration:', error);
        return throwError(error);
      })
    );
  }



  requestPaySlip(formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `${this.apiUrl}/payroll/api/payslip/?schema=${selectedSchema}`;
  
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during leave type registration:', error);
        return throwError(error);
      })
    );
  }


  requestPayslipComponent(formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `${this.apiUrl}/payroll/api/PayslipComponent/?schema=${selectedSchema}`;
  
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during leave type registration:', error);
        return throwError(error);
      })
    );
  }


  updateSalaryComponent(id: number, formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) return throwError('No schema selected.');
  
    const apiUrl = `${this.apiUrl}/payroll/api/salarycomponent/${id}/?schema=${selectedSchema}`;
    return this.http.put(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during update:', error);
        return throwError(error);
      })
    );
  }
  

  updateSalaryComponentEmp(id: number, formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) return throwError('No schema selected.');
  
    const apiUrl = `${this.apiUrl}/payroll/api/employeesalary/${id}/?schema=${selectedSchema}`;
    return this.http.put(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during update:', error);
        return throwError(error);
      })
    );
  }

  getSalaryCom(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/payroll/api/salarycomponent/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }


  getEmployeeSalaryCom(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/payroll/api/employeesalary/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }

  getPayroll(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/payroll/api/PayrollRun/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }


  
  getPayrollSettings(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/payroll/api/PayrollFormula/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }

  getPaySlip(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/payroll/api/payslip/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
    
  }


  getSinglePayslip(id: string): Observable<any> {

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  

    const apiUrl = `${this.apiUrl}/payroll/api/payslip/${id}/?schema=${selectedSchema}`;
    return this.http.get(apiUrl);
  }

  getPayslipComponent(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/payroll/api/PayslipComponent/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }


  
  downloadFile(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }



  getLeaveRequestHistory(employeeId: string, schema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/calendars/api/emp-leave-request/leave-request-history/?employee_id=${employeeId}&schema=${schema}`;
    return this.http.get(apiUrl);
  }






  getLeaveRejoins(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/calendars/api/employee-leave-rejoins/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);
  
  }



  deductLeaveBalance(rejoinId: number, payload: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError(() => new Error('No schema selected.'));
    }
  
    const apiUrl = `${this.apiUrl}/calendars/api/employee-leave-rejoins/${rejoinId}/deduct-leave-balance/?schema=${selectedSchema}`;
  
    return this.http.post(apiUrl, payload).pipe(
      catchError((error) => {
        console.error('Error deducting leave balance:', error);
        return throwError(() => error);
      })
    );
  }






  getAccrualDetails(employeeId: number, schema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/calendars/api/test-monthwise-accrual/?employee_id=${employeeId}&schema=${schema}`;
    return this.http.get(apiUrl);
  }


  getLeaveResetPreview(payload: any, schema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/calendars/api/leave/reset-preview/?schema=${schema}`;
    return this.http.post(apiUrl, payload).pipe(
      catchError((error) => {
        console.error('Error fetching leave reset preview:', error);
        return throwError(() => error);
      })
    );
  }




  updatePayslip(id: string, payload: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `${this.apiUrl}/payroll/api/payslip/${id}/?schema=${selectedSchema}`;
    return this.http.put(apiUrl, payload);
  }




  getAllAttendance(schema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/calendars/api/monthly-attendance/?schema=${schema}`;
    return this.http.get(apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching all attendance', error);
        return throwError(() => error);
      })
    );
  }







  deletePayroll(payrollId: number): Observable<any> {
    const url = `${this.apiUrl}/payroll/api/PayrollRun/${payrollId}/`;
    return this.http.delete(url);
  }
}
