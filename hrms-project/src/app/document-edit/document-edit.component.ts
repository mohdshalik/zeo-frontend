import { Component,Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Route,ActivatedRoute } from '@angular/router';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentCreationComponent } from '../department-creation/department-creation.component';
import { DepartmentServiceService } from '../department-master/department-service.service';
import { EmployeeFamilyComponent } from '../employee-family/employee-family.component';
import { EmployeeService } from '../employee-master/employee.service';
import { CountryService } from '../country.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent {

  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local


  Departments: any[] = [];
  Employees: any[] = [];
  DocsTypes: any[] = [];


  emp_doc_number:string='';
  emp_doc_issued_date:string='';
  emp_doc_expiry_date:string='';
  emp_id:string='';
  document_type:string='';


  selectedFile: File | undefined; // New file selected by the user


  registerButtonClicked=false;
  

  department: any;
  departmentId: number;
  documentData: any;
  ref: any;
  

  constructor(
    private dialogRef: MatDialogRef<DocumentEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { departmentId: number },
    private departmentService: DepartmentServiceService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthenticationService,
    private countryService: CountryService


  ) {
    this.departmentId = data.departmentId;
  }



  ngOnInit(): void {

// Use the departmentId from dialog data directly
this.retrieveDocumentData();

// Alternatively, if you need to support retrieving id from route parameters as well:
this.route.params.subscribe(params => {
  const paramId = params['id'];
  if (paramId) {
    this.departmentId = +paramId;
    this.retrieveDocumentData();
  }
});

    this.loadDeparmentBranch();
    this.loadEmployee();
    this.loadDocType();
    


  }


  retrieveDocumentData(): void {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema || !this.departmentId) return;

    const apiUrl = `${this.apiUrl}/employee/api/emp-Documents/${this.departmentId}/?schema=${selectedSchema}`;
    
    this.http.get(apiUrl).subscribe(
        (data: any) => {
            this.documentData = data;
            console.log('Fetched Document Data:', this.documentData);

            // Ensure Employees and DocsTypes are loaded before setting values
            this.setDropdownValues();
        },
        (error) => console.error('Error fetching document data:', error)
    );
}

setDropdownValues(): void {
    if (!this.Employees || !this.DocsTypes) return;

    const empExists = this.Employees.some(emp => emp.id === this.documentData.emp_id);
    if (!empExists) console.warn('Employee ID not found in dropdown list.');

    const docTypeExists = this.DocsTypes.some(doc => doc.id === this.documentData.document_type);
    if (!docTypeExists) console.warn('Document Type ID not found in dropdown list.');
}



  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  updateDocument(): void {
    const formData = new FormData();
    formData.append('emp_doc_document', this.selectedFile || ''); // Use new file if selected, otherwise use existing file
  
    // Append other document data
    formData.append('emp_doc_number', this.documentData.emp_doc_number);
    formData.append('emp_doc_issued_date', this.documentData.emp_doc_issued_date);
    formData.append('emp_doc_expiry_date', this.documentData.emp_doc_expiry_date);
    formData.append('document_type', this.documentData.document_type);
    formData.append('emp_id', this.documentData.emp_id);
  
    this.employeeService.updateCategory(this.documentData.id, formData)
      .subscribe((response) => {
        console.log('Document updated successfully', response);
        alert('Document updated successfully ');
        // window.location.reload();
        // Redirect or perform other actions as needed
      }, (error) => {
        console.error('Failed to update document', error);
        alert('Failed to update document Try Again ');
        // Handle error appropriately
      });
  }
  




  loadDeparmentBranch(): void {


    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
    this.employeeService.getDocs(selectedSchema).subscribe(
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

  handleImageError(event: any): void {
    // console.error('Error loading image:', event);

    
  }



  isImage(src: string): boolean {
    return src.toLowerCase().endsWith('.jpg') || src.toLowerCase().endsWith('.jpeg') || src.toLowerCase().endsWith('.png') || src.toLowerCase().endsWith('.gif');
  }

  // updateCategory(): void {
  //   // Update employee document
  //   this.employeeService.updateCategory(this.department.id, this.department).subscribe(
  //     (response) => {
  //       console.log('Document updated successfully:', response);
  //       // Close the dialog when document is updated
  //       alert('Document Updated');
  //       this.dialogRef.close();
  //     },
  //     (error) => {
  //       console.error('Error updating document:', error);
  //     }
  //   );
  // }


  loadEmployee(): void {

    
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
    this.employeeService.getEmployees(selectedSchema).subscribe(
      (result: any) => {
        this.Employees = result;
        console.log(' fetching Companies:');

      },
      (error) => {
        console.error('Error fetching Companies:', error);
      }
    );
  }
}


  
  loadDocType(): void {

    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
    this.countryService.getDocument(selectedSchema).subscribe(
      (result: any) => {
        this.DocsTypes = result;
        console.log(' fetching Companies:');

      },
      (error) => {
        console.error('Error fetching Companies:', error);
      }
    );
    }
  }


 
  ClosePopups(){
    this.ref.close('Closed using function');
  }


}
