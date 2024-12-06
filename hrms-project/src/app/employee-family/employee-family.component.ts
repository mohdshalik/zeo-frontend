import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../employee-master/employee.service';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-employee-family',
  templateUrl: './employee-family.component.html',
  styleUrl: './employee-family.component.css'
})
export class EmployeeFamilyComponent {

  
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


  constructor(private EmployeeService: EmployeeService ,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private countryService: CountryService,
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
        console.log('Document upload successful', response);
        alert('Document upload successful');
        window.location.reload();
      },
      (error) => {
        console.error('Document upload failed', error);
        alert('Document upload failed');
      }
    );
}
 

  ngOnInit(): void {
    this.loadDeparmentBranch();
    // this.loadStates();
    
    this.loadDocumentType();

   
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






}
