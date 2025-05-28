import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  CreateEmployeeWithPicture(formData: FormData, companyData: {
    emp_first_name: string; emp_last_name: string; emp_gender: any; emp_date_of_birth: any; emp_personal_email: any; emp_mobile_number_1: any; emp_mobile_number_2: any; emp_city: any; emp_permenent_address: any; emp_present_address: any; emp_relegion: any; emp_blood_group: any; emp_nationality: any; emp_marital_status: any; emp_father_name: any; // Handle errors here (you can log, show a user-friendly message, etc.)
    // Handle errors here (you can log, show a user-friendly message, etc.)
    emp_mother_name: any; emp_posting_location: any;
  }) {
    throw new Error('Method not implemented.');
  }


  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local


  private baseUrl = 'http://localhost:8000/employee/api';

  private hideButtonSubject = new BehaviorSubject<boolean>(false);
  hideButton$ = this.hideButtonSubject.asObservable();

  private hideButtonKey = 'hideButtonState';
  private hideButton = false;

  private selectedSchema: string = ''; // Variable to store the selected schema




  constructor(private http: HttpClient) { }

  setHideButton(condition: boolean) {
    this.hideButton = condition;
  }

  getHideButton(): boolean {
    return this.hideButton;
  }

  getEmployee(): Observable<any> {
    const url = `${this.apiUrl}/employee/api/Employee/`;
    return this.http.get(url);

  }

  // getEmployees(apiUrl: string): Observable<any> {
  //   return this.http.get(apiUrl);
  // }

  getEmployees(selectedSchema: string): Observable<any> {
    // Construct the API URL with the selected schema
    const Url = `${this.apiUrl}/employee/api/Employee/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(Url);
  }

  getemployees(selectedSchema: string): Observable<any> {
    const url = `${this.apiUrl}/employee/api/Employee/?schema=${selectedSchema}`;
    return this.http.get(url);
  }

  getemployeesMaster(selectedSchema: string): Observable<any> {
    const url = `${this.apiUrl}/employee/api/emplist/?schema=${selectedSchema}`;
    return this.http.get(url);
  }


  getemployeescusValue(selectedSchema: string): Observable<any> {
    const url = `${this.apiUrl}/employee/api/emp-custom-field/?schema=${selectedSchema}`;
    return this.http.get(url);
  }


  registerGeneralReq(companyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }



    const apiUrl = `${this.apiUrl}/employee/api/general-request/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
  }


  getAllgeneralRequest(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/employee/api/general-request/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(apiUrl);

  }


  registerDocNum(companyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }



    const apiUrl = `${this.apiUrl}/organisation/api/document-numbering/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
  }



  getAllDocnumbers(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/organisation/api/document-numbering/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(apiUrl);

  }


  updateDocNum(docId: number, payload: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
    const url = `${this.apiUrl}/organisation/api/document-numbering/${docId}/?schema=${selectedSchema}`;
    return this.http.put(url, payload);
  }



  registerReqType(companyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }



    const apiUrl = `${this.apiUrl}/employee/api/request-type/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
  }

  
  // get method for loans

  getGenReqType(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/employee/api/request-type/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);

    
  }




  registerAssignweekCalendar(companyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }



    const Url = `${this.apiUrl}/calendars/api/assign-weekend/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(Url, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
  }



  registerEmaiCong(companyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }



    const Url = `${this.apiUrl}/employee/api/email-config/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(Url, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
  }


  registerHolidacalendar(companyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }



    const apiUrl = `${this.apiUrl}/calendars/api/assign-holiday/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
  }



  getDesignationsPermission(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/organisation/api/permissions/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(apiUrl);

  }


  setSelectedSchema(schema: string): void {
    this.selectedSchema = schema;
  }

  // getEmployeess(): Observable<any> {
  //   if (!this.selectedSchema) {
  //     console.error("No schema selected.");
  //     return of(null); // Return an empty observable
  //   }

  //   const url = `http://${this.selectedSchema}.localhost:8000/employee/api/Employee/`;
  //   return this.http.get(url);
  // }




  updateCategory(departmentId: number, updateData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }

    const apiUrl = `${this.apiUrl}/employee/api/emp-Documents/${departmentId}/?schema=${selectedSchema}`;

    // Send only the required fields
    return this.http.patch(apiUrl, updateData);
  }

  getExpiredDocuments(selectedSchema: string): Observable<any> {

    // const url = `${this.baseUrl}/notification/`;
    // return this.http.get(url);

    const apiUrl = `${this.apiUrl}/employee/api/notification/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(apiUrl);



  }



  refreshDocumentList(notiId: number): Observable<any> {
    const url = `${this.baseUrl}/notification/${notiId}`;
    return this.http.delete(url);
  }

  getExpiredDocumentsCount(): Observable<any> {
    const url = `${this.baseUrl}/notification/count`;
    return this.http.get(url);
  }


  deleteEmployee(employeeId: number): Observable<any> {
    // const url = `${this.baseUrl}/Employee/${employeeId}`;
    // return this.http.delete(url);

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }

    const Url = `${this.apiUrl}/employee/api/Employee/${employeeId}/?schema=${selectedSchema}`;

    return this.http.delete(Url);
  }





  getEmpFirstName(): Observable<any> {
    const url = `${this.baseUrl}/Employee/`;
    return this.http.get(url);

  }
  getEmpSecondName(): Observable<any> {
    const url = `${this.baseUrl}/Employee/`;
    return this.http.get(url);

  }


  getEmpId(): Observable<any> {
    const url = `${this.baseUrl}/Employee/`;

    return this.http.get(url);
  }

  getEmpDesignation(): Observable<any> {
    const url = `${this.baseUrl}/Employee/`;

    return this.http.get(url);
  }


  //   getemployees(selectedSchema: string): Observable<any> {
  //   const url = `http://${selectedSchema}.localhost:8000/employee/api/Employee/`;
  //   return this.http.get(url);
  // }

  getEmployeeDetails(employeeId: number): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }

    const apiUrl = `${this.apiUrl}/employee/api/Employee/${employeeId}/?schema=${selectedSchema}
`;

    return this.http.get(apiUrl);
  }



  getEmployeeLeavetypes(employeeId: number): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }

    const apiUrl = `${this.apiUrl}/employee/api/Employee/${employeeId}/leave_balance/?schema=${selectedSchema}`;

    return this.http.get(apiUrl);
  }


  getEmployeeData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Employee/`);
  }

  getFirtnameByID(employeeId: number): Observable<any> {
    const url = `${this.baseUrl}/Employee/${employeeId}/`;
    return this.http.get(url);
  }






  getDocById(departmentId: number): Observable<any> {
    // const url = `${this.baseUrl}/emp-Documents/${departmentId}/`;
    // return this.http.get(url);

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }

    const apiUrl = `http://${selectedSchema}.localhost:8000/employee/api/Employee/${departmentId}/emp_family/`;

    return this.http.get(apiUrl);
  }

  getDocs(selectedSchema: string): Observable<any> {


    // const url = `${this.baseUrl}/emp-Documents/`;

    // return this.http.get(url);
    const apiUrl = `${this.apiUrl}/core/api/Documents/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(apiUrl);

  }



  getemailCong(selectedSchema: string): Observable<any> {


    // const url = `${this.baseUrl}/emp-Documents/`;

    // return this.http.get(url);
    const apiUrl = `${this.apiUrl}/employee/api/email-config/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(apiUrl);

  }

  getFamilyDetails(employeeId: number): Observable<any> {
    // return this.http.get<any>(`http://localhost:8000/api/Employee/${employeeId}/emp_family/`);

    // const url = `${this.baseUrl}/Employee/${employeeId}/emp_family/`;
    // return this.http.get(url);


    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }

    const apiUrl = `${this.apiUrl}/employee/api/Employee/${employeeId}/emp_family/?schema=${selectedSchema}`;

    return this.http.get(apiUrl);
  }


  getSalary(employeeId: number): Observable<any> {
    // return this.http.get<any>(`http://localhost:8000/api/Employee/${employeeId}/emp_family/`);

    // const url = `${this.baseUrl}/Employee/${employeeId}/emp_family/`;
    // return this.http.get(url);


    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }

    const apiUrl = `${this.apiUrl}/employee/api/Employee/${employeeId}/emp_payslip/?schema=${selectedSchema}`;

    return this.http.get(apiUrl);
  }

  getFamilyDetailss(employeeId: number): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }

    const apiUrl = `http://${selectedSchema}.localhost:8000/employee/api/Employee/${employeeId}/emp_family/`;

    return this.http.get(apiUrl);
  }


  getEmpSkills(employeeId: number): Observable<any> {
    // return this.http.get<any>(`http://localhost:8000/api/Employee/${employeeId}/emp_family/`);

    // const url = `${this.baseUrl}/Employee/${employeeId}/emp_family/`;
    // return this.http.get(url);


    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }

    const apiUrl = `http://${selectedSchema}.localhost:8000/employee/api/Employee/${employeeId}/EmployeeSkill/`;

    return this.http.get(apiUrl);
  }


  getempLangaugeSkill(employeeId: number): Observable<any> {



    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }

    const apiUrl = `${this.apiUrl}/employee/api/Employee/${employeeId}/emp_languageskill/?schema=${selectedSchema}`;

    return this.http.get(apiUrl);
  }


  deleteEmployeeLanguageSkill(skillId: number): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }

    const apiUrl = `${this.apiUrl}/employee/api/emp-language-skill/${skillId}/?schema=${selectedSchema}`; // Adjust the URL as needed
    return this.http.delete(apiUrl);
  }

  deleteEmployeeProgramLanguageSkill(skillId: number): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }

    const apiUrl = `${this.apiUrl}/employee/api/emp-program-skill/${skillId}/?schema=${selectedSchema}`; // Adjust the URL as needed
    return this.http.delete(apiUrl);
  }

  deleteEmployeeMarketanguageSkill(skillId: number): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }

    const apiUrl = `${this.apiUrl}/employee/api/emp-market-skill/${skillId}/?schema=${selectedSchema}`; // Adjust the URL as needed
    return this.http.delete(apiUrl);
  }



  deleteEmployeeLangague(employeeId: number): Observable<any> {
    // const url = `${this.baseUrl}/Employee/${employeeId}`;
    // return this.http.delete(url);

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }

    const apiUrl = `${this.apiUrl}/employee/api/Employee/${employeeId}/emp_languageskill/?schema=${selectedSchema}`;

    return this.http.delete(apiUrl);
  }

  getEmpPgmSkills(employeeId: number): Observable<any> {



    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }

    const apiUrl = `${this.apiUrl}/employee/api/Employee/${employeeId}/emp_programlangskill/?schema=${selectedSchema}`;

    return this.http.get(apiUrl);
  }


  getEmpMarkSkills(employeeId: number): Observable<any> {



    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }

    const apiUrl = `${this.apiUrl}/employee/api/Employee/${employeeId}/emp_market_skills/?schema=${selectedSchema}`;

    return this.http.get(apiUrl);
  }



  getLangaugeSkill(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/core/api/language_skill/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(apiUrl);


  }

  getPrgmLangaugeSkill(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/core/api/programming-skill/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(apiUrl);


  }


  getMarLangaugeSkill(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/core/api/marketing-skill/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(apiUrl);


  }


  registerLanguage(companyData: any): Observable<any> {
    // const url = `${this.baseUrl}/Department/`; // Adjust the URL if needed

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }



    const apiUrl = `${this.apiUrl}/employee/api/emp-language-skill/?schema=${selectedSchema}`;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
  }

  registerPrgmLanguage(companyData: any): Observable<any> {
    // const url = `${this.baseUrl}/Department/`; // Adjust the URL if needed

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }



    const apiUrl = `${this.apiUrl}/employee/api/emp-program-skill/?schema=${selectedSchema}`;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
  }

  registerMarPrgmLanguage(companyData: any): Observable<any> {
    // const url = `${this.baseUrl}/Department/`; // Adjust the URL if needed

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }



    const apiUrl = `${this.apiUrl}/employee/api/emp-market-skill/?schema=${selectedSchema}`;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
  }


  // getDocument(employeeId: number): Observable<any> {



  //   const selectedSchema = localStorage.getItem('selectedSchema');
  //   if (!selectedSchema) {
  //     console.error('No schema selected.');
  //     return throwError('No schema selected.'); // Return an error observable if no schema is selected
  //   }

  //   const apiUrl = `${this.apiUrl}/employee/api/Employee/${employeeId}/emp_documents/?schema=${selectedSchema}`;

  //   return this.http.get(apiUrl);
  // }

  getDocument(employeeId: number): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Handle error if no schema is selected
    }

    const apiUrl = `${this.apiUrl}/employee/api/Employee/${employeeId}/emp_documents/?schema=${selectedSchema}`;
    return this.http.get(apiUrl);
  }

  getApiUrl(): string {
    return this.apiUrl;
  }


  getUserData(): Observable<any> {
    const url = `${this.baseUrl}/Employee/`;  // Assuming your backend has an endpoint to fetch user data
    return this.http.get(url);
  }
  getQualificationById(employeeId: number): Observable<any> {
    // return this.http.get<any>(`http://localhost:8000/api/Employee/${employeeId}/emp-Qualification/`);
    // const url = `${this.baseUrl}/Employee/${employeeId}/emp_qualification/`;
    // return this.http.get(url);


    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }

    const apiUrl = `${this.apiUrl}/employee/api/Employee/${employeeId}/emp_qualification/?schema=${selectedSchema}`;

    return this.http.get(apiUrl);
  }

  getJobHistoryById(employeeId: number): Observable<any> {
    // return this.http.get<any>(`http://localhost:8000/api/Employee/${employeeId}/emp-JobHistory/`);

    // const url = `${this.baseUrl}/Employee/${employeeId}/emp_job_history/`;
    // return this.http.get(url);

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }

    const apiUrl = `${this.apiUrl}/employee/api/Employee/${employeeId}/emp_job_history/?schema=${selectedSchema}`;

    return this.http.get(apiUrl);
  }

  getLeaveRequestById(employeeId: number): Observable<any> {
    // return this.http.get<any>(`http://localhost:8000/api/Employee/${employeeId}/emp-leave-request/`);
    // const url = `${this.baseUrl}/Employee/${employeeId}/emp_leave/`;
    // return this.http.get(url);

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }

    const apiUrl = `${this.apiUrl}/employee/api/Employee/${employeeId}/emp_leave/?schema=${selectedSchema}`;

    return this.http.get(apiUrl);
  }


  getProfilePicture(employeeId: number): Observable<Blob> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
    const url = `${this.apiUrl}/employee/api/Employee/${employeeId}/profile-picture/?schema=${selectedSchema}`;
    return this.http.get(url, { responseType: 'blob' });
  }




  // employee creation services

  getDeptBranch(): Observable<any> {
    const url = `${this.baseUrl}/Branch/`;

    return this.http.get(url);
  }



  CreateEmployeeupdate(formData: FormData): Observable<any> {
    return this.http.post('/Employee/', formData);
  }




  CreateEmployee(employeeData: any, formData: FormData): Observable<any> {
    const url = `${this.baseUrl}/Employee/`; // Adjust the URL if needed
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, employeeData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);
      })
    );
  }



  getCountries(): Observable<any> {
    const url = `${this.baseUrl}/Country/`;
    return this.http.get(url);
  }

  getAllStates(): Observable<any> {
    const url = `${this.baseUrl}/State/`;
    return this.http.get(url);
  }
  getStatesByCountryId(countryId: number): Observable<any> {
    const url = `${this.baseUrl}/Country/${countryId}/states/`;
    return this.http.get(url);
  }

  getCompany(): Observable<any> {
    const url = `${this.baseUrl}/Company/`;
    return this.http.get(url);
  }

  getBranches(): Observable<any> {
    const url = `${this.baseUrl}/Branch/`;
    return this.http.get(url);
  }




  // getBranchByCompanyId(countryId: number): Observable<any> {
  //   const url = `${this.baseUrl}/Company/${countryId}/Branch/`;
  //   return this.http.get(url);
  // }



  getDepartments(): Observable<any> {
    const url = `${this.baseUrl}/Department/`;
    return this.http.get(url);
  }


  getDesignation(): Observable<any> {
    const url = `${this.baseUrl}/Designation/`;
    return this.http.get(url);
  }

  getcatgories(): Observable<any> {
    const url = `${this.baseUrl}/Catogory/`;
    return this.http.get(url);
  }

  getLanguages(): Observable<any> {
    const url = `${this.baseUrl}/emp-Language/`;
    return this.http.get(url);
  }






  getEmpById(employeeId: number): Observable<any> {


    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }

    const apiUrl = `${this.apiUrl}/employee/api/Employee/${employeeId}/?schema=${selectedSchema}`;

    return this.http.get(apiUrl);

  }

  getEmpByIdCustomFeild(employeeId: number): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }

    const apiUrl = `http://${selectedSchema}.localhost:8000/employee/api/Employee/${employeeId}/custom_fields`;

    return this.http.get(apiUrl);
  }
  openEditEmpPopuss(employeeId: number): Observable<any> {
    const url = `${this.baseUrl}/Employee/${employeeId}/`;
    return this.http.get(url);
  }


  updateEmp(employeeId: number, empData: any): Observable<any> {
    // const url = `${this.baseUrl}/Employee/${employeeId}/`;
    // return this.http.put(url, empData);

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }



    const apiUrl = `${this.apiUrl}/employee/api/Employee/${employeeId}/?schema=${selectedSchema}`;

    return this.http.put(apiUrl, empData);
  }




  registerEmpFamily(companyData: any): Observable<any> {


    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }



    const apiUrl = `http://${selectedSchema}.localhost:8000/employee/api/emp-Family/`;

    // const url = `${this.baseUrl}/emp-Family/`; // Adjust the URL if needed
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
  }

  private createdEmployeeId: number | null = null;

  setEmployeeId(id: number) {
    this.createdEmployeeId = id;
  }

  getEmployeeId(): number | null {
    return this.createdEmployeeId;
  }

  registerEmpFamilyz(employeeId: number, familyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }

    const apiUrl = `${this.apiUrl}/employee/api/Employee/${employeeId}/emp_family/?schema=${selectedSchema}
`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, familyData, { headers }).pipe(
      catchError((error) => {
        console.error('Error during family registration:', error);
        return throwError(error);
      })
    );
  }




  registerEmpQualification(companyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }



    const apiUrl = `http://${selectedSchema}.localhost:8000/employee/api/emp-Qualification/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
  }



  registerEmpQualificationz(employeeId: number, familyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }

    const apiUrl = `${this.apiUrl}/employee/api/Employee/${employeeId}/emp_qualification/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, familyData, { headers }).pipe(
      catchError((error) => {
        console.error('Error during family registration:', error);
        return throwError(error);
      })
    );
  }

  registerEmpJobHis(companyData: any): Observable<any> {
    // const url = `${this.baseUrl}/emp-JobHistory/`; // Adjust the URL if needed

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }



    const apiUrl = `http://${selectedSchema}.localhost:8000/employee/api/emp-JobHistory/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
  }

  registerEmpJobHisz(employeeId: number, familyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }

    const apiUrl = `${this.apiUrl}/employee/api/Employee/${employeeId}/emp_job_history/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, familyData, { headers }).pipe(
      catchError((error) => {
        console.error('Error during family registration:', error);
        return throwError(error);
      })
    );
  }


  registerEmpDocs(employeeId: number, formData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }

    const apiUrl = `http://${selectedSchema}.localhost:8000/employee/api/Employee/${employeeId}/emp_documents/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, formData, { headers }).pipe(
      catchError((error) => {
        console.error('Error during family registration:', error);
        return throwError(error);
      })
    );
  }



  registerEmpLeaveReq(companyData: any): Observable<any> {

    // const url = `${this.baseUrl}/emp-leave-request/`; // Adjust the URL if needed


    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }



    const apiUrl = `${this.apiUrl}/employee/api/emp-leave-request/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
  }


  uploadEmployeeDocument(employeeId: number, formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }

    const apiUrl = `${this.apiUrl}/employee/api/Employee/${employeeId}/emp_documents/?schema=${selectedSchema}`;
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during document upload:', error);
        return throwError(error);
      })
    );
  }


  // registerEmpLanguage(companyData: any): Observable<any> {
  //   const url = `${this.baseUrl}/emp-JobHistory/`; // Adjust the URL if needed
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //   return this.http.post(url, companyData, { headers }).pipe(
  //     catchError((error) => {
  //       // Handle errors here (you can log, show a user-friendly message, etc.)
  //       console.error('Error during company registration:', error);
  //       return throwError(error);

  //     })
  //   );
  //   }
  // getEmp(): Observable<any> {
  //   const url = `${this.baseUrl}/Employee/`;

  //   return this.http.get(url);
  // }




  getBranchById(employeeId: number): Observable<any> {
    const url = `${this.baseUrl}/Employee/${employeeId}/`;
    return this.http.get(url);
  }

  updateBranch(employeeId: number, empData: any): Observable<any> {
    const url = `${this.baseUrl}/Employee/${employeeId}/`;
    return this.http.put(url, empData);
  }



  registerEmpAddMoreFeild(familyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }

    const apiUrl = `${this.apiUrl}/employee/api/emp-custom-field/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, familyData, { headers }).pipe(
      catchError((error) => {
        console.error('Error during family registration:', error);
        return throwError(error);
      })
    );
  }


  registerEmpAddMoreFeildDoc(familyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }

    const apiUrl = `${this.apiUrl}/employee/api/emp-Documents-UDF/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, familyData, { headers }).pipe(
      catchError((error) => {
        console.error('Error during family registration:', error);
        return throwError(error);
      })
    );
  }

  registerEmpAddMoreFeildValues(familyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }

    const apiUrl = `${this.apiUrl}/employee/api/emp-custom-field-value/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, familyData, { headers }).pipe(
      catchError((error) => {
        console.error('Error during family registration:', error);
        return throwError(error);
      })
    );
  }



  registerEmpAddMoreFeildFam(familyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }

    const apiUrl = `${this.apiUrl}/employee/api/empfamily-UDF/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, familyData, { headers }).pipe(
      catchError((error) => {
        console.error('Error during family registration:', error);
        return throwError(error);
      })
    );
  }



  registerEmpAddMoreFeildQual(familyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }

    const apiUrl = `${this.apiUrl}/employee/api/empQualification-UDF/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, familyData, { headers }).pipe(
      catchError((error) => {
        console.error('Error during family registration:', error);
        return throwError(error);
      })
    );
  }


  registerEmpAddMoreFeildJob(familyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }

    const apiUrl = `${this.apiUrl}/employee/api/empjob-history-UDF/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, familyData, { headers }).pipe(
      catchError((error) => {
        console.error('Error during family registration:', error);
        return throwError(error);
      })
    );
  }

  updateEmpCustomField(field: any): Observable<any> {

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }


    const apiUrl = `${this.apiUrl}/employee/api/emp-custom-field/${field.id}/?schema=${selectedSchema}`; // Replace with your actual API URL
    return this.http.put(apiUrl, field);
  }


  submitCustomFieldValues(fieldValues: any[]): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }

    const Url = `${this.apiUrl}/employee/api/emp-custom-field-value/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(Url, fieldValues, { headers }).pipe(
      catchError((error) => {
        console.error('Error submitting custom field values:', error);
        return throwError(error);
      })
    );
  }




  getFormField(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/Branch/`;
    // return this.http.get(url);

    const apiUrl = `${this.apiUrl}/employee/api/emp-custom-field/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(apiUrl);
  }


  getFormFieldDoc(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/Branch/`;
    // return this.http.get(url);

    const apiUrl = `${this.apiUrl}/employee/api/emp-Documents-UDF/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(apiUrl);
  }

  getFormFieldFam(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/Branch/`;
    // return this.http.get(url);

    const apiUrl = `${this.apiUrl}/employee/api/empfamily-UDF/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(apiUrl);
  }


  getFormFieldQual(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/Branch/`;
    // return this.http.get(url);

    const apiUrl = `${this.apiUrl}/employee/api/empQualification-UDF/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(apiUrl);
  }


  getFormFieldJob(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/Branch/`;
    // return this.http.get(url);

    const apiUrl = `${this.apiUrl}/employee/api/empjob-history-UDF/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(apiUrl);
  }


  deleteEmpCustomField(fieldId: number): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
    const url = `${this.apiUrl}/employee/api/emp-custom-field/${fieldId}/?schema=${selectedSchema}`;
    return this.http.delete(url);
  }


  deleteEmpCustomFieldDoc(fieldId: number): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
    const url = `${this.apiUrl}/employee/api/emp-Documents-UDF/${fieldId}/?schema=${selectedSchema}`;
    return this.http.delete(url);
  }


  deleteEmpCustomFieldFam(fieldId: number): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
    const url = `${this.apiUrl}/employee/api/empfamily-UDF/${fieldId}/?schema=${selectedSchema}`;
    return this.http.delete(url);
  }


  deleteEmpCustomFieldQual(fieldId: number): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
    const url = `${this.apiUrl}/employee/api/empQualification-UDF/${fieldId}/?schema=${selectedSchema}`;
    return this.http.delete(url);
  }


  deleteEmpCustomFieldJob(fieldId: number): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
    const url = `${this.apiUrl}/employee/api/empjob-history-UDF/${fieldId}/?schema=${selectedSchema}`;
    return this.http.delete(url);
  }


  registerApproveLevel(companyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }



    const apiUrl = `${this.apiUrl}/employee/api/request-approvals-levels/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
  }




  // post email template to  backend api

  registerEmailTemplate(companyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }



    const apiUrl = `${this.apiUrl}/employee/api/email-template/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
  }


  registerEmailTemplateDocExp(companyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }



    const apiUrl = `${this.apiUrl}/employee/api/doc-exp-emailtemplate/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
  }

  registerEmployeeAttendence(companyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }



    const apiUrl = `${this.apiUrl}/calendars/api/attendance/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
  }


  //   getApprovalslist(selectedSchema: string, userId: number): Observable<any> {
  //     const apiUrl = `${this.apiUrl}/users/api/user/${userId}/approvals/?schema=${selectedSchema}`;

  //     // Fetch approvals for the user from the API
  //     return this.http.get(apiUrl);
  // }

  getApprovalslist(selectedSchema: string, userId: number): Observable<any> {
    const apiUrl = `${this.apiUrl}/employee/api/request-approvals/?schema=${selectedSchema}`;

    // Fetch approvals for the user from the API
    return this.http.get(apiUrl);
  }

  getSChemadatas(selectedSchema: string): Observable<any> {
    const url = `${this.apiUrl}/organisation/api/schema-data/?schema=${selectedSchema}`;

    // Fetch approvals for the user from the API
    return this.http.get(url);
  }
  getApprovalDetails(apiUrl: string): Observable<any> {
    return this.http.get(apiUrl);
  }

  approveApprovalRequest(apiUrl: string, approvalData: { note: string; status: string }): Observable<any> {
    // Sending a POST request to approve with note and status
    return this.http.post(apiUrl, approvalData);
  }

  rejectApprovalRequest(apiUrl: string, approvalData: { note: string; status: string }): Observable<any> {
    // Sending a POST request to approve with note and status
    return this.http.post(apiUrl, approvalData);
  }



  getEmailPlaceholder(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/employee/api/email-template/placeholders/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(apiUrl);


  }


  updateEmailTemplate(updatedTemplate: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }

    const apiUrl = `${this.apiUrl}/employee/api/email-template/${updatedTemplate.id}/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put(apiUrl, updatedTemplate, { headers }).pipe(
      catchError((error) => {
        console.error('Error updating template:', error);
        return throwError(error);
      })
    );
  }


  // employee.service.ts
  getLoggedInEmployee() {
    return this.http.get<{ employee_id: number; emp_code: string }>('/api/employee/by_user');
  }




  registerShifts(payload: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }

    const apiUrl = `${this.apiUrl}/calendars/api/shifts/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, JSON.stringify(payload), { headers }).pipe(
      catchError((error) => {
        // Handle errors here
        console.error('Error during email configuration registration:', error);
        return throwError(error);
      })
    );
  }


  registerEmployeeShifts(payload: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }

    const apiUrl = `${this.apiUrl}/calendars/api/employee-shift/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, JSON.stringify(payload), { headers }).pipe(
      catchError((error) => {
        // Handle errors here
        console.error('Error during email configuration registration:', error);
        return throwError(error);
      })
    );
  }

  registerWeeklyShifts(payload: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }

    const apiUrl = `${this.apiUrl}/calendars/api/shiftpattern/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, JSON.stringify(payload), { headers }).pipe(
      catchError((error) => {
        // Handle errors here
        console.error('Error during email configuration registration:', error);
        return throwError(error);
      })
    );
  }

  registerweekpaternassign(payload: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }

    const apiUrl = `${this.apiUrl}/calendars/api/weekpattern-assignment/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, JSON.stringify(payload), { headers }).pipe(
      catchError((error) => {
        // Handle errors here
        console.error('Error during email configuration registration:', error);
        return throwError(error);
      })
    );
  }


  registerShiftOverride(payload: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }

    const apiUrl = `${this.apiUrl}/calendars/api/shift-overrides/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, JSON.stringify(payload), { headers }).pipe(
      catchError((error) => {
        // Handle errors here
        console.error('Error during email configuration registration:', error);
        return throwError(error);
      })
    );
  }


  getDesignations(selectedSchema: string): Observable<any> {
    // const url = `${this.baseUrl}/Branch/`;
    // return this.http.get(url);

    const apiUrl = `${this.apiUrl}/organisation/api/Designation/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(apiUrl);
  }







  getAssignWeekendcalendar(selectedSchema: string): Observable<any> {
    const Url = `${this.apiUrl}/calendars/api/assign-weekend/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(Url);

  }

  getAssignHolcalendar(selectedSchema: string): Observable<any> {
    const Url = `${this.apiUrl}/calendars/api/assign-holiday/?schema=${selectedSchema}`;

    // Fetch employees from the API
    return this.http.get(Url);

  }



  saveLeaveOpening(payload: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      return throwError(() => new Error('No schema selected.'));
    }
  
    const apiUrl = `${this.apiUrl}/calendars/api/leave-balance/apply-openings/?schema=${selectedSchema}`;
    return this.http.post(apiUrl, payload);
  }
  



  // loan module post method services code here

  registerLoanType(companyData: any): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }



    const apiUrl = `${this.apiUrl}/payroll/api/loan-type/?schema=${selectedSchema}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, companyData, { headers }).pipe(
      catchError((error) => {
        // Handle errors here (you can log, show a user-friendly message, etc.)
        console.error('Error during company registration:', error);
        return throwError(error);

      })
    );
  }


  registerLoanApplication(formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `${this.apiUrl}/payroll/api/loan-application/?schema=${selectedSchema}`;
  
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during leave type registration:', error);
        return throwError(error);
      })
    );
  }



  registerLoanrepayment(formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `${this.apiUrl}/payroll/api/loan-repayment/?schema=${selectedSchema}`;
  
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during leave type registration:', error);
        return throwError(error);
      })
    );
  }



  registerLoanApproverLevel(formData: FormData): Observable<any> {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return throwError('No schema selected.');
    }
  
    const apiUrl = `${this.apiUrl}/payroll/api/loan-approval-levels/?schema=${selectedSchema}`;
  
    return this.http.post(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error during leave type registration:', error);
        return throwError(error);
      })
    );
  }



  // get method for loans

  getLoanTypes(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/payroll/api/loan-type/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);

    
  }


  getLoanApplications(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/payroll/api/loan-application/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);

    
  }

  getLoanRepayments(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/payroll/api/loan-repayment/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);

    
  }


  getLoanapprover(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/users/api/user/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);

    
  }

  getLoanApprovalLevels(selectedSchema: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/payroll/api/loan-approval-levels/?schema=${selectedSchema}`;
  
    // Fetch employees from the API
    return this.http.get(apiUrl);

    
  }








  // loan approval services


  getApprovalslistLeave(selectedSchema: string, userId: number): Observable<any> {
    const apiUrl = `${this.apiUrl}/payroll/api/loan-approval/?schema=${selectedSchema}`;
  
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






pauseLoanApplication(id: number, data: any): Observable<any> {
  const selectedSchema = localStorage.getItem('selectedSchema');
  if (!selectedSchema) return throwError('No schema selected');

  const apiUrl = `${this.apiUrl}/payroll/api/loan-application/${id}/pause/?schema=${selectedSchema}`;
  return this.http.post(apiUrl, data).pipe(
    catchError((error) => {
      console.error('Pause loan error:', error);
      return throwError(error);
    })
  );
}

resumeLoanApplication(id: number, data: any): Observable<any> {
  const selectedSchema = localStorage.getItem('selectedSchema');
  if (!selectedSchema) return throwError('No schema selected');

  const apiUrl = `${this.apiUrl}/payroll/api/loan-application/${id}/resume/?schema=${selectedSchema}`;
  return this.http.post(apiUrl, data).pipe(
    catchError((error) => {
      console.error('Resume loan error:', error);
      return throwError(error);
    })
  );
}



  

}
