import { Component, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../employee-master/employee.service';
import { CountryService } from '../country.service';
import { environment } from '../../environments/environment';
import { SessionService } from '../login/session.service';

@Component({
  selector: 'app-employee-family',
  templateUrl: './employee-family.component.html',
  styleUrl: './employee-family.component.css'
})
export class EmployeeFamilyComponent {

  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local

  selectedDeparmentsecId:any | undefined;

  registerButtonClicked = false;
  registerButtonClicked1 = false;

  registerButtonClicked2 = false;

  registerButtonClicked3 = false;

  // Departments: any[] = [];
  companies: any[] = [];
  DocumentTypes: any[] = [];


  ef_member_name: string = '';
  emp_relation:string ='';
  ef_company_expence:any ='';
  ef_date_of_birth:any='';
  // emp_id:any='';


  emp_qualification:string='';
  emp_qf_instituition:string='';
  emp_qf_year:string='';
  emp_qf_subject  :string='';

  emp_jh_from_date:string='';
  emp_jh_end_date:string='';
  emp_jh_company_name:string='';
  emp_jh_designation:string='';
  emp_jh_leaving_salary_permonth:string='';
  emp_jh_reason:string='';
  emp_jh_years_experiance:string='';


  start_date:string='';
  end_date:string='';
  status:string='';
  reason:string='';
  employee:string='';


  emp_doc_name: any
  emp_doc_number: any;
  emp_doc_issued_date: string = '';
  emp_doc_expiry_date: string = '';
  // emp_id: string = '';
  document_type:any='';
  selectedFile!: File;
  emp_id: number;
  created_by:any='';


  constructor(private EmployeeService: EmployeeService ,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private countryService: CountryService,
    private sessionService: SessionService,

   private ref:MatDialogRef<EmployeeFamilyComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any,
   ) {
    this.emp_id = data.emp_id;
    
   }

   CreateEmployeeFamily(): void {
    this.registerButtonClicked = true;
    const familyData = {
      ef_member_name: this.ef_member_name,
      emp_relation: this.emp_relation,
      ef_company_expence: this.ef_company_expence,
      ef_date_of_birth: this.ef_date_of_birth,
    };

    this.EmployeeService.registerEmpFamilyz(this.emp_id, familyData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        alert('Employee Family added!');
        window.location.reload();
        // Optionally close the dialog or reset the form
      },
      (error) => {
        console.error('Registration failed', error);
        alert('Enter all fields!');
      }
    );
  }

createEmployeeQual():void{

  this.registerButtonClicked1 = true;
    const familyData = {
      emp_qualification: this.emp_qualification,
      emp_qf_instituition:this.emp_qf_instituition,
      emp_qf_year:this.emp_qf_year,
      emp_qf_subject:this.emp_qf_subject,
      emp_id:this.emp_id,


   

      // Add other form field values to the companyData object
    };


    this.EmployeeService.registerEmpQualificationz(this.emp_id, familyData).subscribe(
      (response) => {
        this.step++;
        console.log('Registration successful', response);
        // this.authService.login(this.cmpny_mail, this.cmpny_pincode).subscribe(
        //   (loginResponse) => {
        //     console.log('Login successful after registration', loginResponse);
        //     // Optionally, you can navigate to another page or perform other actions upon successful login.
            alert('Employee Qualification uploaded!');
            window.location.reload();

       

      },
      (error) => {
        console.error('Registration failed', error);
        alert('enter all field!')
        // Handle the error appropriately, e.g., show a user-friendly error message.
      }
    );

}


createEmployeeJonHistory():void{

  this.registerButtonClicked2 = true;
    const familyData = {
      emp_jh_from_date: this.emp_jh_from_date,
      emp_jh_end_date:this.emp_jh_end_date,
      emp_jh_company_name:this.emp_jh_company_name,
      emp_jh_designation:this.emp_jh_designation,
      emp_jh_leaving_salary_permonth:this.emp_jh_leaving_salary_permonth,

      emp_jh_reason:this.emp_jh_reason,
      emp_jh_years_experiance:this.emp_jh_years_experiance,

     emp_id:this.emp_id,


   

      // Add other form field values to the companyData object
    };


    this.EmployeeService.registerEmpJobHisz(this.emp_id,familyData).subscribe(
      (response) => {
        this.step++;
        console.log('Registration successful', response);
        // this.authService.login(this.cmpny_mail, this.cmpny_pincode).subscribe(
        //   (loginResponse) => {
        //     console.log('Login successful after registration', loginResponse);
        //     // Optionally, you can navigate to another page or perform other actions upon successful login.
            alert('Employee Job History uploaded');
            window.location.reload();

            // window.location.reload();
        //   },
        //   (loginError) => {
        //     console.error('Login failed after registration', loginError);
        //     // Handle login error after registration
        //   }
        // );
        // Optionally, you can navigate to another page or perform other actions upon successful registration.
        // alert('Company has been Register!')
        // window.location.reload();

      },
      (error) => {
        console.error('Registration failed', error);
        alert('enter all field!')
        // Handle the error appropriately, e.g., show a user-friendly error message.
      }
    );

}

createEmployeeLeaveReq():void{

  this.registerButtonClicked3 = true;
    const companyData = {
      start_date: this.start_date,
      end_date:this.end_date,
      status:this.status,
      reason:this.reason,
      employee:this.employee,


   

      // Add other form field values to the companyData object
    };


    this.EmployeeService.registerEmpLeaveReq(companyData).subscribe(
      (response) => {
        this.step++;
        console.log('Registration successful', response);
        // this.authService.login(this.cmpny_mail, this.cmpny_pincode).subscribe(
        //   (loginResponse) => {
        //     console.log('Login successful after registration', loginResponse);
        //     // Optionally, you can navigate to another page or perform other actions upon successful login.
            alert('Company has been Registered and logged in!');
            window.location.reload();

            // window.location.reload();
        //   },
        //   (loginError) => {
        //     console.error('Login failed after registration', loginError);
        //     // Handle login error after registration
        //   }
        // );
        // Optionally, you can navigate to another page or perform other actions upon successful registration.
        // alert('Company has been Register!')
        // window.location.reload();

      },
      (error) => {
        console.error('Registration failed', error);
        alert('enter all field!')
        // Handle the error appropriately, e.g., show a user-friendly error message.
      }
    );

}


onFileSelected(event: any): void {
  this.selectedFile = event.target.files[0];
}
uploadEmployeeDocument(): void {
  this.registerButtonClicked3 = true;
  const formData = new FormData();
  formData.append('emp_doc_document', this.selectedFile);
  formData.append('emp_doc_number', this.emp_doc_number);
  formData.append('emp_doc_issued_date', this.emp_doc_issued_date);
  formData.append('emp_doc_expiry_date', this.emp_doc_expiry_date);
  formData.append('document_type', this.document_type);

  this.EmployeeService.uploadEmployeeDocument(this.emp_id, formData)
    .subscribe(
      (response) => {
        const createdEmployeeId = response.id; // Adjust based on your API response
        this.EmployeeService.setEmployeeId(createdEmployeeId);
        this.postCustomFieldValues(createdEmployeeId);

        console.log('Document upload successful', response);
        alert('Document upload successful');
        // window.location.reload();
      },
      (error) => {
        console.error('Document upload failed', error);
        alert('Document upload failed');
      }
    );
}

file:any ='';
visibilitys:boolean=false;
visibles:boolean=true;
ReadMore:boolean=false;
selectedFiles: File | null = null;

onFileChange(event: any){
  // this.file = event.target.files[0];
  // console.log(this.file);

  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    const validExtensions = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'text/csv'];

    if (!validExtensions.includes(file.type)) {
      alert('Please upload a valid Excel file (e.g., .xls, .xlsx, or .csv)');
      this.selectedFiles = null;
      return;
    }

    this.selectedFiles = file;
  }
  
}

bulkUploadDoc() {
  this.ReadMore = !this.ReadMore; //not equal to condition
  this.visibles = !this.visibles;
  this.visibilitys = !this.visibilitys;
}

bulkuploaddocument(): void {
  if (!this.selectedFiles) {
    alert('Please select a valid Excel file before uploading.');
    return;
  }

  const formData = new FormData();
  formData.append('file', this.selectedFiles); // Ensure this matches the backend field name
  formData.append('emp_doc_number', this.emp_doc_number || '');
  formData.append('emp_doc_issued_date', this.emp_doc_issued_date || '');
  formData.append('emp_doc_expiry_date', this.emp_doc_expiry_date || '');
  formData.append('document_type', this.document_type || '');

  const selectedSchema = localStorage.getItem('selectedSchema');
  if (!selectedSchema) {
    alert('No schema selected.');
    return;
  }

  this.http.post(`${this.apiUrl}/employee/api/Bulkupload-Documents/bulk_upload/?schema=${selectedSchema}`, formData)
    .subscribe(
      (response) => {
        console.log('Bulk upload successful', response);
        alert('Bulk upload successful');
        window.location.reload();
      },
      (error) => {
        console.error('Bulk upload failed', error);
        alert(error.error || 'Error during bulk upload.');
      }
    );
}

  
 
schemas: string[] = []; // Array to store schema names

  
userId: number | null | undefined;
userDetails: any;
userDetailss: any[] = [];
username: any;

  ngOnInit(): void {
    this.loadDeparmentBranch();
    // this.loadStates();
    
    this.loadDocumentType();
    this.loadFormFields();
    this.userId = this.sessionService.getUserId();
  
    if (this.userId !== null) {
      this.authService.getUserData(this.userId).subscribe(
        (userData: any) => {
          this.userDetails = userData;
          this.created_by = this.userId; // Automatically set the owner to logged-in user ID

        },
        (error) => {
          console.error('Failed to fetch user details:', error);
        }
      );

      this.authService.getUserSchema(this.userId).subscribe(
        (userData: any) => {
          this.userDetailss = userData; // Store user schemas in userDetailss

          this.schemas = userData.map((schema: any) => schema.schema_name);
        },
        (error) => {
          console.error('Failed to fetch user schemas:', error);
        }
      );
    } else {
      console.error('User ID is null.');
    }
   
  }
 
  loadDeparmentBranch(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
    this.EmployeeService.getEmployees(selectedSchema).subscribe(
      (result: any) => {
        this.companies = result;
        console.log(' fetching employees:');

      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
    }
  }

  custom_fields :any[] = [];

  loadFormFields(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
  
    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
    this.EmployeeService.getFormFieldDoc(selectedSchema).subscribe(
      (result: any) => {
        this.custom_fields = result;
      },
      (error: any) => {
        console.error('Error fetching countries:', error);
      }
    );
    }
  }
  ClosePopup(){
    this.ref.close('Closed using function');
    window.location.reload();

  }



  loadDocumentType(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

 console.log('schemastore',selectedSchema )
 // Check if selectedSchema is available
 if (selectedSchema) {
    this.countryService.getDocument(selectedSchema).subscribe(
      (result: any) => {
        this.DocumentTypes = result;
        console.log(' fetching Companies:');

      },
      (error) => {
        console.error('Error fetching Companies:', error);
      }
    );
 }
  }
  


  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


  postCustomFieldValues(empMasterId: number): void {
    const customFieldValues = this.custom_fields.map(field => ({
        emp_custom_field: field.emp_custom_field, // Assuming the field has an 'id' property
        field_value: field.field_value, // The value entered by the user
        emp_documents: empMasterId ,// The employee ID from the response
        created_by:this.created_by
    }));

    // Make API calls to post each custom field value
    customFieldValues.forEach(fieldValue => {
      const selectedSchema = localStorage.getItem('selectedSchema');
      if (!selectedSchema) {
        console.error('No schema selected.');
        // return throwError('No schema selected.'); // Return an error observable if no schema is selected
      }
        this.http.post(`${this.apiUrl}/employee/api/Documents-customfieldvalue/?schema=${selectedSchema}`, fieldValue)
            .subscribe(
                (response: any) => {
                    console.log('Custom field value posted successfully', response);
                },
                (error: HttpErrorResponse) => {
                    console.error('Failed to post custom field value', error);
                }
            );
    });
}




}
