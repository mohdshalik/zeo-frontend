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
import { LeaveService } from '../leave-master/leave.service';
import { DesignationService } from '../designation-master/designation.service';
import { SessionService } from '../login/session.service';

@Component({
  selector: 'app-leave-template',
  templateUrl: './leave-template.component.html',
  styleUrl: './leave-template.component.css'
})
export class  LeaveTemplateComponent {

  
  template_type: any = '';
  subject: any = '';
  body: string = '';


  request_type: any = '';


  registerButtonClicked = false;


   

  RequestType:any []=[];
  tempEmails:any []=[];

  EmailPlaceHolders: string[] = []; // Initialize as an empty array

  selectedPlaceholder: string | null = null; // To keep track of the selected placeholder

  hasAddPermission: boolean = false;
  hasDeletePermission: boolean = false;
  hasViewPermission: boolean =false;
  hasEditPermission: boolean = false;
  
  userId: number | null | undefined;
  userDetails: any;
  userDetailss: any;
  schemas: string[] = []; // Array to store schema names

  constructor(
    private el:ElementRef,
    private http: HttpClient,
    private authService: AuthenticationService,
    private employeeService: EmployeeService,
    private userService: UserMasterService,
    private DepartmentServiceService: DepartmentServiceService,
    private dialog:MatDialog,
    private leaveService:LeaveService,
    private DesignationService: DesignationService,
private sessionService: SessionService,



) {}

ngOnInit(): void {
 
  this.loadRequestType();
  this.loadEmailPlaceholders(); // Call the method on component init

  this.loadtemp();

  this.userId = this.sessionService.getUserId();
  if (this.userId !== null) {
    this.authService.getUserData(this.userId).subscribe(
      async (userData: any) => {
        this.userDetails = userData; // Store user details in userDetails property
  
  
        console.log('User ID:', this.userId); // Log user ID
        console.log('User Details:', this.userDetails); // Log user details
  
        // Check if user is_superuser is true or false
        let isSuperuser = this.userDetails.is_superuser || false; // Default to false if is_superuser is undefined
        const selectedSchema = this.authService.getSelectedSchema();
        if (!selectedSchema) {
          console.error('No schema selected.');
          return;
        }
      
      
        if (isSuperuser) {
          console.log('User is superuser or ESS user');
          
          // Grant all permissions
          this.hasViewPermission = true;
          this.hasAddPermission = true;
          this.hasDeletePermission = true;
          this.hasEditPermission = true;
      
          // Fetch designations without checking permissions
          // this.fetchDesignations(selectedSchema);
        } else {
          console.log('User is not superuser');
  
          const selectedSchema = this.authService.getSelectedSchema();
          if (selectedSchema) {
           
            
            
            try {
              const permissionsData: any = await this.DesignationService.getDesignationsPermission(selectedSchema).toPromise();
              console.log('Permissions data:', permissionsData);
  
              if (Array.isArray(permissionsData) && permissionsData.length > 0) {
                const firstItem = permissionsData[0];
  
                if (firstItem.is_superuser) {
                  console.log('User is superuser according to permissions API');
                  // Grant all permissions
                  this.hasViewPermission = true;
                  this.hasAddPermission = true;
                  this.hasDeletePermission = true;
                  this.hasEditPermission = true;
                } else if (firstItem.groups && Array.isArray(firstItem.groups) && firstItem.groups.length > 0) {
                  const groupPermissions = firstItem.groups.flatMap((group: any) => group.permissions);
                  console.log('Group Permissions:', groupPermissions);
  
                 
                  this.hasAddPermission = this.checkGroupPermission('add_lvemailtemplate', groupPermissions);
                  console.log('Has add permission:', this.hasAddPermission);
                  
                  this.hasEditPermission = this.checkGroupPermission('change_lvemailtemplate', groupPermissions);
                  console.log('Has edit permission:', this.hasEditPermission);
    
                 this.hasDeletePermission = this.checkGroupPermission('delete_lvemailtemplate', groupPermissions);
                 console.log('Has delete permission:', this.hasDeletePermission);
    
  
                  this.hasViewPermission = this.checkGroupPermission('view_lvemailtemplate', groupPermissions);
                  console.log('Has view permission:', this.hasViewPermission);
  
  
                } else {
                  console.error('No groups found in data or groups array is empty.', firstItem);
                }
              } else {
                console.error('Permissions data is not an array or is empty.', permissionsData);
              }
  
              // Fetching designations after checking permissions
              // this.fetchDesignations(selectedSchema);
            }
            
            catch (error) {
              console.error('Error fetching permissions:', error);
            }
          } else {
            console.error('No schema selected.');
          }
            
        }
      },
      (error) => {
        console.error('Failed to fetch user details:', error);
      }
    );
  
      // this.fetchingApprovals();
  
  
      this.authService.getUserSchema(this.userId).subscribe(
          (userData: any) => {
              this.userDetailss = userData;
              this.schemas = userData.map((schema: any) => schema.schema_name);
              console.log('scehmas-de',userData)
          },
          (error) => {
              console.error('Failed to fetch user schemas:', error);
          }
      );
  } else {
      console.error('User ID is null.');
  }

 
}

 
  
checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
  return groupPermissions.some(permission => permission.codename === codeName);
  }

 
  loadRequestType(): void {
    
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
  
    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
      this.leaveService.getLeaveType(selectedSchema).subscribe(
        (result: any) => {
          this.RequestType = result;
          console.log(' fetching RequestType:');
  
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
    
  
      this.leaveService.registerEmailTemplateLeave(companyData).subscribe(
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
        this.leaveService.getEmailTemplatesLeave(selectedSchema).subscribe(
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
    this.leaveService.updateEmailTemplateLeave(updatedTemplate).subscribe(
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
