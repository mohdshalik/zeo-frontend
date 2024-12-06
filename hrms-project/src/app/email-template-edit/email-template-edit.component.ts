import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, AfterViewInit ,Inject } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { EmployeeService } from '../employee-master/employee.service';
import { UserMasterService } from '../user-master/user-master.service';
import { DepartmentServiceService } from '../department-master/department-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


declare var $: any;
import 'summernote'; // Ensure you have summernote imported

@Component({
  selector: 'app-email-template-edit',
  templateUrl: './email-template-edit.component.html',
  styleUrl: './email-template-edit.component.css'
})
export class EmailTemplateEditComponent {
  body: any;
  templateData: any;

  RequestType:any []=[];



  constructor(
    private el:ElementRef,
    private http: HttpClient,
    private authService: AuthenticationService,
    private employeeService: EmployeeService,
    private userService: UserMasterService,
    private DepartmentServiceService: DepartmentServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EmailTemplateEditComponent>


) {
  this.templateData = data.template; // Get the selected template data

}


EmailPlaceHolders: string[] = []; // Initialize as an empty array

selectedPlaceholder: string | null = null; // To keep track of the selected placeholder


ngOnInit(): void {
 
  this.loadRequestType();
  this.loadEmailPlaceholders(); // Call the method on component init



 
}


  
loadEmailPlaceholders(): void {
  const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
  console.log('schemastore', selectedSchema);
  // Check if selectedSchema is available
  if (selectedSchema) {
    this.employeeService.getEmailPlaceholder(selectedSchema).subscribe(
      (result: any) => {
        this.EmailPlaceHolders = result.employee; // Assuming the response structure
        console.log('EmailPlaceHolders:', this.EmailPlaceHolders);
      },
      (error) => {
        console.error('Error fetching EmailPlaceHolders:', error);
      }
    );
  }
}

// Method to handle placeholder selection
selectPlaceholder(placeholder: string): void {
  const currentContent = $(this.el.nativeElement).find('#summernote').summernote('code');

  // If a placeholder is already selected, replace it with the new one
  if (this.selectedPlaceholder) {
    const updatedContent = currentContent.replace(this.selectedPlaceholder, placeholder);
    $(this.el.nativeElement).find('#summernote').summernote('code', updatedContent);
  } else {
    // If no placeholder is selected yet, just append the new placeholder
    $(this.el.nativeElement).find('#summernote').summernote('code', currentContent + placeholder);
  }

  // Update the selected placeholder
  this.selectedPlaceholder = placeholder; // Store the latest selected placeholder
}


ngAfterViewInit(): void {
  // Initialize Summernote
  $(this.el.nativeElement).find('#summernote').summernote({
    height: 150, // Set editor height
    placeholder: 'Type your text here...',
    toolbar: [
      ['style', ['bold', 'italic', 'underline']],
      ['fontsize', ['fontsize']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture', 'video']],
      ['view', ['fullscreen', 'codeview', 'help']]
    ],
    callbacks: {
      onChange: () => this.onContentChange() // Track content changes
    }
  });
}
// Method to update the selected placeholder whenever the content changes
onContentChange(): void {
  const currentContent = $(this.el.nativeElement).find('#summernote').summernote('code');
  
  // Check if the currently selected placeholder exists in the content
  if (this.selectedPlaceholder && !currentContent.includes(this.selectedPlaceholder)) {
    // If the selected placeholder is not found in the current content, reset it
    this.selectedPlaceholder = null;
  }
}




getTextContent(): void {
  this.body = $(this.el.nativeElement).find('#summernote').summernote('code');
  console.log(this.body); // For debugging, to see what is captured
}

  

  // Method to update the email template
  updateTemplate(): void {
    console.log('Updating template:', this.templateData);
    // Call your update logic here (e.g., API call to save changes)
    
    // After successful update, close the modal
    this.dialogRef.close(this.templateData);
  }


  loadRequestType(): void {
    
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
  
    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
      this.DepartmentServiceService.getReqType(selectedSchema).subscribe(
        (result: any) => {
          this.RequestType = result;
          console.log(' fetching Companies:');
  
        },
        (error) => {
          console.error('Error fetching Companies:', error);
        }
      );
    }
    }

}
