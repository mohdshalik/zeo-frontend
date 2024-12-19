import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CountryService } from '../country.service';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DesignationService } from '../designation-master/designation.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-designation-creation',
  templateUrl: './designation-creation.component.html',
  styleUrl: './designation-creation.component.css'
})
export class DesignationCreationComponent {


  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local

  selectedFiles! : File;
  selectedFile!: File;
  file:any ='';
  selectedDeparmentsecId:any | undefined;

  registerButtonClicked = false;
  Departments: any[] = [];

  desgntn_job_title: string = '';
  desgntn_description:string ='';
  desgntn_code:string ='';

  visibilitys:boolean=false;
  visibles:boolean=true;
  ReadMore:boolean=false;
  // dialog: any;
  error: any[]=[];
  errormessage:any;
  errors_Sheet1: any;

  errors_sheet1:any='';


  constructor(private DesignationService: DesignationService ,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private dialog: MatDialog,
   private ref:MatDialogRef<DesignationCreationComponent>) {}

   onFileChange(event: any){
    this.file = event.target.files[0];
    console.log(this.file);
    
  }
   onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  bulkUploadDoc() {
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visibles = !this.visibles;
    this.visibilitys = !this.visibilitys;
  }
  // uploadFile(){
  //   let formData = new FormData();
  //   formData.append('file',this.file);
  //   formData.append('desgntn_job_title', this.desgntn_job_title);
  
  //     formData.append('desgntn_description', this.desgntn_description);
  //     this.Flag = false;
  //     const selectedSchema = localStorage.getItem('selectedSchema');
  //     if (!selectedSchema) {
  //       console.error('No schema selected.');
  //       // return throwError('No schema selected.'); // Return an error observable if no schema is selected
  //     }
     
     
  //     // return this.http.put(apiUrl, formData);
  
    
  //     this.http.post(`http://${selectedSchema}.localhost:8000/organisation/api/Desigtn-bulkupload/bulk_upload/`, formData).subscribe(
  //       (data) => {
  //         console.log(data);
  //         this.Flag = true;
  //         alert('Excel Uploaded Successfully');
  //       },
  //       (error: any) => {
  //         console.log('Error:', error); // Log the entire error object for debugging
      
  //         this.errormessage = error;
  //         alert('File upload failed. Check console for error details.');
      
  //         // Safely access the error details
  //         if (error && error.error && error.error.errors_sheet1) {
  //           const errorsSheet1 = error.error.errors_sheet1;
      
  //           // Check if errors_sheet1 is an array
  //           if (Array.isArray(errorsSheet1)) {
  //             // Extract and format error details
  //             const formattedErrors = errorsSheet1.map((err: any) => {
  //               return `Row ${err.row}: ${err.error}`;
  //             }).join('\n');
      
  //             alert(`Error details:\n${formattedErrors}`);
  //             this.errors_sheet1 = JSON.stringify(errorsSheet1); // Assigning the error to consoleError variable
  //           } else {
  //             alert('Unexpected error format.');
  //           }
  //         } else {
  //           alert('Error details are not available.');
  //         }
      
  //         console.log('Error fetching bulk list:', error);
      
  //         // Fetch bulk list
  //         this.EmployeeService.getBulkList().subscribe(
  //           (bulkListError) => {
  //             alert('Error fetching bulk list: ' + JSON.stringify(bulkListError));
  //           }
  //         );
  //       }
  //     );
      
  // }
  bulkuploaddocument(): void {
    this.registerButtonClicked = true;
  
  
    const formData = new FormData();
    formData.append('file',this.selectedFiles);
  
    formData.append('file',this.file)
    
    formData.append('desgntn_job_title', this.desgntn_job_title);
  
    formData.append('desgntn_description', this.desgntn_description);
  
    
  
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      // return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   
   
    // return this.http.put(apiUrl, formData);

  
    this.http.post(`${this.apiUrl}/organisation/api/Desigtn-bulkupload/bulk_upload/?schema=${selectedSchema}`, formData)
      .subscribe((response) => {
        // Handle successful upload
        console.log('bulkupload upload successful', response);
  
         const dialogRef = this.dialog.open(DesignationCreationComponent, {
              width: '300px', // Adjust width as needed
              data: { message: 'bulkupload employee successfully!' } // Pass any data you want to display in the modal
            });
        
            dialogRef.afterClosed().subscribe(() => {
              console.log('The success modal was closed');
              // Handle any actions after the modal is closed, if needed
            });
      }, (error) => {
        // Handle upload error
        console.error('Document upload failed', error);
        alert('enter all fields correctly');
      });
  
  }
   registerDesignation(): void {
    this.registerButtonClicked = true;

     // Basic validation for username and password fields
     if (!this.desgntn_job_title || !this.desgntn_description) {
      if (!this.desgntn_job_title) {
        alert('Job  Title field is blank.');
      }
      if (!this.desgntn_description) {
        alert('Job Description  field is blank.');
      }
      // return; // Exit the function if validation fails
    }
  


    const companyData = {
      desgntn_job_title: this.desgntn_job_title,
      desgntn_description:this.desgntn_description,
      desgntn_code:this.desgntn_code,
   

      // Add other form field values to the companyData object
    };
    // if (this.selectedFile) {
    //   const formData = new FormData();
    //   formData.append('logo', this.selectedFile, this.selectedFile.name);

    //   // Replace 'http://localhost:8000/upload-logo' with your backend API endpoint for handling logo uploads
    //   this.http.post<any>('http://localhost:8000/upload-logo', formData).subscribe(
    //     (response) => {
    //       console.log('Logo uploaded successfully', response);
    //       // Optionally, you can handle the response from the server (e.g., get the logo URL)
    //     },
    //     (error) => {
    //       console.error('Logo upload failed', error);
    //       // Handle the error appropriately, e.g., show a user-friendly error message
    //     }
    //   );
    // }

    this.DesignationService.registerDesignation(companyData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        // this.authService.login(this.cmpny_mail, this.cmpny_pincode).subscribe(
        //   (loginResponse) => {
        //     console.log('Login successful after registration', loginResponse);
        //     // Optionally, you can navigate to another page or perform other actions upon successful login.
            alert('Designation has been Registered ');
            window.location.reload();
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

  ClosePopup(){
    this.ref.close('Closed using function')
  }


}
