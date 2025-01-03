import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CountryService } from '../country.service';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DepartmentServiceService } from '../department-master/department-service.service';
import { environment } from '../../environments/environment';
import { SuccesModalComponent } from '../succes-modal/succes-modal.component';


@Component({
  selector: 'app-department-creation',
  templateUrl: './department-creation.component.html',
  styleUrl: './department-creation.component.css'
})
export class DepartmentCreationComponent {

  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local

  selectedFiles! : File;
  selectedFile!: File;
  file:any ='';
  selectedDeparmentsecId:any | undefined;

  registerButtonClicked = false;
  Departments: any[] = [];

  dept_name: string = '';
  dept_code: string = '';

  dept_description:string ='';
  branch_id:any ='';
  visibilitys:boolean=false;
  visibles:boolean=true;
  ReadMore:boolean=false;
  // dialog: any;
  error: any[]=[];
  errormessage:any;
  errors_Sheet1: any;

  errors_sheet1:any='';

  constructor(private DepartmentServiceService: DepartmentServiceService ,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private dialog: MatDialog,
   private ref:MatDialogRef<DepartmentCreationComponent>) {}

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
  //   formData.append('dept_name', this.dept_name);
  
  //     formData.append('dept_description', this.dept_description);
  //     formData.append('branch_id', this.branch_id);
      
 
  //     this.Flag = false;
  //     const selectedSchema = localStorage.getItem('selectedSchema');
  //     if (!selectedSchema) {
  //       console.error('No schema selected.');
  //       // return throwError('No schema selected.'); // Return an error observable if no schema is selected
  //     }
     
     
  //     // return this.http.put(apiUrl, formData);
  
    
  //     this.http.post(`http://${selectedSchema}.localhost:8000/api/emp-BulkUpload/bulk_upload/`, formData).subscribe(
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
    
    formData.append('dept_name', this.dept_name);
  
    formData.append('dept_description', this.dept_description);
    formData.append('branch_id', this.branch_id);
    
  
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      // return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   
   
    // return this.http.put(apiUrl, formData);

  
    this.http.post(`${this.apiUrl}/organisation/api/Dept-bulkupload/bulk_upload/?schema=${selectedSchema}`, formData)
      .subscribe((response) => {
        // Handle successful upload
        console.log('bulkupload upload successful', response);
  
        const dialogRef = this.dialog.open(SuccesModalComponent, {
          width: '300px', // Adjust width as needed
          data: { message: 'bulkupload Department successfully!' } // Pass any data you want to display in the modal
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
  
   registerDepartment(): void {
    this.registerButtonClicked = true;


     // Basic validation for username and password fields
  if (!this.dept_name || !this.branch_id) {
    if (!this.dept_name) {
      alert('Department name field is blank.');
    }
    if (!this.branch_id) {
      alert('Branch  field is blank.');
    }
    // return; // Exit the function if validation fails
  }


    const companyData = {
      dept_name: this.dept_name,
      dept_description:this.dept_description,
      branch_id:this.branch_id,
      dept_code: this.dept_code,

      // Add other form field values to the companyData object
    };
    

    this.DepartmentServiceService.registerDepartment(companyData).subscribe(
      (response) => {
        console.log('Registration successful', response);
       
            alert('Deaprtment has been Registered ');
            window.location.reload();
            // window.location.reload();
       

      },
      (error) => {
        console.error('Registration failed', error);
        alert('enter all field!')
        // Handle the error appropriately, e.g., show a user-friendly error message.
      }
    );
  }

  ngOnInit(): void {
    this.loadDeparmentBranch();
    // this.loadStates();
    

   
  }


  loadDeparmentBranch(): void {
    
  const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

  console.log('schemastore',selectedSchema )
  // Check if selectedSchema is available
  if (selectedSchema) {
    this.DepartmentServiceService.getDeptBranchList(selectedSchema).subscribe(
      (result: any) => {
        this.Departments = result;
        console.log(' fetching Companies:');

      },
      (error) => {
        console.error('Error fetching Companies:', error);
      }
    );
  }
  }

  ClosePopup(){
    this.ref.close('Closed using function')
  }



}
