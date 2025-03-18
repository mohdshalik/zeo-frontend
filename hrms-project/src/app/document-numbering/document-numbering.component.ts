import { Component } from '@angular/core';
import { DepartmentServiceService } from '../department-master/department-service.service';
import { CompanyRegistrationService } from '../company-registration.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../login/authentication.service';
import { EmployeeService } from '../employee-master/employee.service';
import { UserMasterService } from '../user-master/user-master.service';
import { CatogaryService } from '../catogary-master/catogary.service';
import { SessionService } from '../login/session.service';
import { DesignationService } from '../designation-master/designation.service';
import { LeaveService } from '../leave-master/leave.service';

@Component({
  selector: 'app-document-numbering',
  templateUrl: './document-numbering.component.html',
  styleUrl: './document-numbering.component.css'
})
export class DocumentNumberingComponent {

  prefix: any = '';
  suffix: any = '';
  year: any = '';
  start_number: any = '';
  current_number: any = '';
  end_number: any = '';
  branch_id: any = '';
  category: any = '';
  user: any = '';
  type:any = '';
  leave_type:any = '';


  automatic_numbering:  boolean = false;

  branches:any []=[];
  Users:any []=[];
  Categories:any []=[];

  docsNumbers:any []=[];

  LeaveTypes:any []=[];


  registerButtonClicked = false;

  
  schemas: string[] = []; // Array to store schema names

  
  userId: number | null | undefined;
  userDetails: any;
  userDetailss: any[] = [];
  username: any;
  hasAddPermission: boolean = false;
  hasDeletePermission: boolean = false;
  hasViewPermission: boolean =false;
  hasEditPermission: boolean = false;


  // Variable to hold the selected document for editing
selectedDoc: any = {};
isDocumentnumbereditModalOpen: boolean = false;
  
  constructor(private DepartmentServiceService: DepartmentServiceService ,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private categoryService: CatogaryService,
    private userService: UserMasterService,
    private employeeService: EmployeeService,
    private sessionService: SessionService,
    private DesignationService: DesignationService,
    private leaveService: LeaveService,



    


) {}

ngOnInit(): void {
  this.loadDeparmentBranch();
  this.loadCAtegory();
  this.loadUsers();
  this.loaddocNumers();
  this.loadLeaveTypes();


  this.userId = this.sessionService.getUserId();

  
  if (this.userId !== null) {
    this.authService.getUserData(this.userId).subscribe(
      async (userData: any) => {
        this.userDetails = userData; // Store user details in userDetails property
        this.user = this.userId; // Automatically set the owner to logged-in user ID
     
  
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
  
                 
                  this.hasAddPermission = this.checkGroupPermission('add_document_numbering', groupPermissions);
                  console.log('Has add permission:', this.hasAddPermission);
                  
                  this.hasEditPermission = this.checkGroupPermission('change_document_numbering', groupPermissions);
                  console.log('Has edit permission:', this.hasEditPermission);
    
                 this.hasDeletePermission = this.checkGroupPermission('delete_document_numbering', groupPermissions);
                 console.log('Has delete permission:', this.hasDeletePermission);
    
  
                  this.hasViewPermission = this.checkGroupPermission('view_document_numbering', groupPermissions);
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

// checkViewPermission(permissions: any[]): boolean {
//   const requiredPermission = 'add_document_numbering' ||'change_document_numbering' ||'delete_document_numbering' ||'view_document_numbering';
  
  
//   // Check user permissions
//   if (permissions.some(permission => permission.codename === requiredPermission)) {
//     return true;
//   }
  
//   // Check group permissions (if applicable)
//   // Replace `// TODO: Implement group permission check`
//   // with your logic to retrieve and check group permissions
//   // (consider using a separate service or approach)
//   return false; // Replace with actual group permission check
//   }
  
  
  
  
  checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
  return groupPermissions.some(permission => permission.codename === codeName);
  }
  

  loadDeparmentBranch(): void {
    
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
  
    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
      this.DepartmentServiceService.getDeptBranchList(selectedSchema).subscribe(
        (result: any) => {
          this.branches = result;
          console.log(' fetching Companies:');
  
        },
        (error) => {
          console.error('Error fetching Companies:', error);
        }
      );
    }
    }


    

     

        loadUsers(): void {
    
          const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
        
          console.log('schemastore',selectedSchema )
          // Check if selectedSchema is available
          if (selectedSchema) {
            this.userService.getSChemaUsers(selectedSchema).subscribe(
              (result: any) => {
                this.Users = result;
                console.log(' fetching Companies:');
        
              },
              (error) => {
                console.error('Error fetching Companies:', error);
              }
            );
          }
          }

          loadCAtegory(): void {
    
            const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
          
            console.log('schemastore',selectedSchema )
            // Check if selectedSchema is available
            if (selectedSchema) {
              this.categoryService.getcatogarys(selectedSchema).subscribe(
                (result: any) => {
                  this.Categories = result;
                  console.log(' fetching Companies:');
          
                },
                (error) => {
                  console.error('Error fetching Companies:', error);
                }
              );
            }
            }
  



            registerGeneralreq(): void {
              this.registerButtonClicked = true;
              
              // Convert the date string to an integer year.
              const yearInt = this.year ? new Date(this.year).getFullYear() : null;
              
              const companyData = {
                prefix: this.prefix,
                suffix: this.suffix,
                year: yearInt, // now a number, e.g. 2025
                current_number: this.current_number,
                branch_id: this.branch_id,
                category: this.category,
                user: this.user,
                // automatic_numbering: this.automatic_numbering,
                type: this.type,
                leave_type: this.leave_type,
              };
            
              this.employeeService.registerDocNum(companyData).subscribe(
                (response) => {
                  console.log('Registration successful', response);
                  alert('Document number has been Added');
                  window.location.reload();
                },
                (error) => {
                  console.error('Add failed', error);
                  console.log('Full error response:', error);
                  const errorMessage = error.error?.error || 'An error occurred while adding the document number. Please try again.';
                  alert(errorMessage);
                }
              );
            }
            





          loaddocNumers(): void { 
            const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
        
            console.log('schemastore',selectedSchema )
            // Check if selectedSchema is available
            if (selectedSchema) {
            this.employeeService.getAllDocnumbers(selectedSchema).subscribe(
              (result: any) => {
                console.log(result); // Log the API response
                this.docsNumbers = result; // Assuming the data is directly in the result without a 'data' property
              },
              (error) => {
                console.error('Error fetching states:', error);
              }
            );
            }
          }
        

          loadLeaveTypes(): void {
    
            const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
          
            console.log('schemastore',selectedSchema )
            // Check if selectedSchema is available
            if (selectedSchema) {
              this.leaveService.getLeaveType(selectedSchema).subscribe(
                (result: any) => {
                  this.LeaveTypes = result;
                  console.log(' fetching LeaveTypes:');
          
                },
                (error) => {
                  console.error('Error fetching LeaveTypes:', error);
                }
              );
            }
            }
        


            openEditDocModal(doc: any): void {
              // Clone the document (to avoid modifying the original before saving)
              this.selectedDoc = { ...doc };
              this.isDocumentnumbereditModalOpen = true;
            }
            
            closeEditDocModal(): void {
              this.isDocumentnumbereditModalOpen = false;
            }
            
            // Method to update the document number via API
            updateDocumentNumber(): void {
              // Optionally convert the date input to a year integer if needed:
              // Example: this.selectedDoc.year = new Date(this.selectedDoc.year).getFullYear();
              
              this.employeeService.updateDocNum(this.selectedDoc.id, this.selectedDoc).subscribe(
                (response) => {
                  console.log('Document updated successfully', response);
                  alert('Document number updated successfully.');
                  // Optionally, refresh your list or reload the page
                  this.closeEditDocModal();
                  this.loaddocNumers(); // re-fetch the list if needed
                },
                (error) => {
                  console.error('Error updating document number', error);
                  const errorMessage = error.error?.error || 'Error updating document number.';
                  alert(errorMessage);
                }
              );
            }
        


}
