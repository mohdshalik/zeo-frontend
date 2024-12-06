import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { EmployeeService } from '../employee-master/employee.service';
import { UserMasterService } from '../user-master/user-master.service';
import { DepartmentServiceService } from '../department-master/department-service.service';

declare var $: any;
import 'summernote'; // Ensure you have summernote imported
import { EmailTemplateEditComponent } from '../email-template-edit/email-template-edit.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrl: './email-template.component.css'
})
export class EmailTemplateComponent {


  template_type: any = '';
  subject: any = '';
  body: string = '';


  request_type: any = '';


  registerButtonClicked = false;



  RequestType:any []=[];
  tempEmails:any []=[];

  EmailPlaceHolders: string[] = []; // Initialize as an empty array

  selectedPlaceholder: string | null = null; // To keep track of the selected placeholder



  constructor(
    private el:ElementRef,
    private http: HttpClient,
    private authService: AuthenticationService,
    private employeeService: EmployeeService,
    private userService: UserMasterService,
    private DepartmentServiceService: DepartmentServiceService,
    private dialog:MatDialog,



) {}

ngOnInit(): void {
 
  this.loadRequestType();
  this.loadEmailPlaceholders(); // Call the method on component init

  this.loadtemp();

this.ngAfterViewInit();

 
}


  // ngAfterViewInit(): void {
  //   $(this.el.nativeElement).find('#summernote').summernote({
  //     height: 150,  // Set editor height
  //     placeholder: 'Type your text here...',
  //     toolbar: [
  //       ['style', ['bold', 'italic', 'underline']],
  //       ['fontsize', ['fontsize']],  // Make sure fontsize is added here
  //       ['color', ['color']],
  //       ['para', ['ul', 'ol', 'paragraph']],
  //       ['insert', ['link', 'picture', 'video']],
  //       ['view', ['fullscreen', 'codeview', 'help']]
  //     ],
  //     fontsize: ['8', '9', '10', '11', '12', '14', '16', '18', '24', '36', '48', '64', '82', '150'],  // Font sizes to choose from
  //     fontsizeUnit: 'px',  // Font size unit, you can also use 'pt' or other units
  //     hint: {
  //       mentions: ['Jayden Smith', 'Peter Pan', 'Lorca', 'David Summer'],
  //       match: /\B@(\w*)$/,
  //       search: function (keyword: string, callback: Function) {
  //         callback($.grep(this.mentions, function (item: string | string[]) {
  //           return item.indexOf(keyword) === 0;
  //         }));
  //       },
  //       content: function (item: string) {
  //         return '@' + item;
  //       }
  //     }
  //   });
  // }
  


 
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
    
    // Method to track content changes
    onContentChange(): void {
      const currentContent = $(this.el.nativeElement).find('#summernote').summernote('code');
      if (this.selectedPlaceholder && !currentContent.includes(this.selectedPlaceholder)) {
        this.selectedPlaceholder = null; // Reset if placeholder is not found
      }
    }
  
    // Method to get the content of Summernote
    getTextContent(): void {
      this.body = $(this.el.nativeElement).find('#summernote').summernote('code');
      console.log(this.body); // Debugging: log the content
    }
  

    onclickEmailTemplate(): void {
      this.registerButtonClicked = true;

      this.getTextContent();
      
      const companyData = {
        template_type: this.template_type,
      
        subject:this.subject,
        body: this.body,  // Use the captured Summernote content here
  
        request_type: this.request_type,
      
    

     
  
        // Add other form field values to the companyData object
      };
    
  
      this.employeeService.registerEmailTemplate(companyData).subscribe(
        (response) => {
          console.log('Registration successful', response);
        
              alert('Email Template has been Added ');
              // window.location.reload();
         
  
        },
        (error) => {
          console.error('Added failed', error);
          alert('enter all field!')
          // Handle the error appropriately, e.g., show a user-friendly error message.
        }
      );
    }
  


    loadtemp(): void {
    
      const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
    
      console.log('schemastore',selectedSchema )
      // Check if selectedSchema is available
      if (selectedSchema) {
        this.DepartmentServiceService.getEmailTemplates(selectedSchema).subscribe(
          (result: any) => {
            this.tempEmails = result;
            console.log(' fetching Companies:');
    
          },
          (error) => {
            console.error('Error fetching Companies:', error);
          }
        );
      }
      }
  

      selectedTemplate: any = null; // Object to hold the selected template details


      isAddFieldsModalOpen:boolean=false;

        
        
        
          


             // Method to update the template
  updateTemplate(): void {
    // Ensure Summernote content is captured
    this.onContentChange();
    this.body = $('#summernote').summernote('code'); // Get the content from Summernote before sending


    // Prepare the updated data
    const updatedTemplate = {
      id: this.selectedTemplate.id, // Include the ID for updating the specific template
      template_type: this.template_type,
      subject: this.subject,
      body: this.body,
      request_type: this.request_type
    };

    // Send updated data to backend API
    this.employeeService.updateEmailTemplate(updatedTemplate).subscribe(
      (response) => {
        console.log('Template updated successfully', response);
        alert('Email Template has been updated');
        this.loadtemp(); // Refresh the list of templates
      },
      (error) => {
        console.error('Error updating template:', error);
        alert('Update failed');
      }
    );
  }


  openEditPopuss(selectedTemplate: any): void {
    this.dialog.open(EmailTemplateEditComponent, {
      width: '80%',
      height: '700px',
      data: { template: selectedTemplate } // Passing the selected template data to the modal component
    });
  }
       

}
