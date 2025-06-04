import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { EmployeeService } from '../employee-master/employee.service';
import { UserMasterService } from '../user-master/user-master.service';
import { SessionService } from '../login/session.service';
import { DesignationService } from '../designation-master/designation.service';
import { MatSelect } from '@angular/material/select';
import { LeaveService } from '../leave-master/leave.service';
import { MatOption } from '@angular/material/core';
declare var $: any;

@Component({
  selector: 'app-announcement-master',
  templateUrl: './announcement-master.component.html',
  styleUrl: './announcement-master.component.css'
})
export class AnnouncementMasterComponent {


    
  @ViewChild('select') select: MatSelect | undefined;

  allSelected=false;

      
  @ViewChild('selectEmp') selectEmp: MatSelect | undefined;

  allSelectedEmp=false;

  Branches: any[] = []; // Array to store schema names
  

  hasAddPermission: boolean = false;
  hasDeletePermission: boolean = false;
  hasViewPermission: boolean =false;
  hasEditPermission: boolean = false;

  
  title: any = '';
  message: any = '';
  schedule_at: any = '';
  expires_at: any = '';
  specific_employees: any = '';
  branches: any = '';

  created_by: any = '';
 
  

  is_sticky:  boolean = false;
  allow_comments:  boolean = false;
  send_email:  boolean = false;

  attachment: File | null = null;




  Users:any []=[];
  LoanTypes:any []=[];


  Employees:any []=[];


  userId: number | null | undefined;
  userDetails: any;
  userDetailss: any[] = [];
  username: any;

  schemas: string[] = []; // Array to store schema names




  registerButtonClicked = false;


  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private employeeService: EmployeeService,
    private userService: UserMasterService,
    private el: ElementRef,
    private sessionService: SessionService,
    private DesignationService: DesignationService,
    private leaveService: LeaveService,


    


) {}

ngOnInit(): void {
 
  this.loadUsers();
  this.loadLoanTypes();

this.LoadEmployees();

const selectedSchema = this.authService.getSelectedSchema();
if (selectedSchema) {
  this.LoadBranch(selectedSchema);

}

  this.userId = this.sessionService.getUserId();
  
  if (this.userId !== null) {
    this.authService.getUserData(this.userId).subscribe(
      async (userData: any) => {
        this.userDetails = userData; // Store user details in userDetails property
        this.created_by = this.userId; // Automatically set the owner to logged-in user ID
  
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
  
                 
                  this.hasAddPermission = this.checkGroupPermission('add_requesttype', groupPermissions);
                  console.log('Has add permission:', this.hasAddPermission);
                  
                  this.hasEditPermission = this.checkGroupPermission('change_requesttype', groupPermissions);
                  console.log('Has edit permission:', this.hasEditPermission);
    
                 this.hasDeletePermission = this.checkGroupPermission('delete_requesttype', groupPermissions);
                 console.log('Has delete permission:', this.hasDeletePermission);
    
  
                  this.hasViewPermission = this.checkGroupPermission('view_requesttype', groupPermissions);
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
//   const requiredPermission = 'add_requesttype' ||'change_requesttype' ||'delete_requesttype' ||'view_requesttype';
  
  
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


          LoadEmployees() {
            const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
          
            console.log('schemastore',selectedSchema )
            // Check if selectedSchema is available
            if (selectedSchema) {
              this.employeeService.getemployees(selectedSchema).subscribe(
                (result: any) => {
                  this.Employees = result;
                  console.log(' fetching Employees:');
          
                },
                (error) => {
                  console.error('Error fetching Companies:', error);
                }
              );
            }
            }
          


            
    toggleAllSelection(): void {
      if (this.select) {
        if (this.allSelected) {
          
          this.select.options.forEach((item: MatOption) => item.select());
        } else {
          this.select.options.forEach((item: MatOption) => item.deselect());
        }
      }
    }



    toggleAllSelectionEmp(): void {
      if (this.selectEmp) {
        if (this.allSelectedEmp) {
          
          this.selectEmp.options.forEach((item: MatOption) => item.select());
        } else {
          this.selectEmp.options.forEach((item: MatOption) => item.deselect());
        }
      }
    }

    
    LoadBranch(selectedSchema: string) {
      this.leaveService.getBranches(selectedSchema).subscribe(
        (data: any) => {
          this.Branches = data;
        
          console.log('employee:', this.Branches);
        },
        (error: any) => {
          console.error('Error fetching categories:', error);
        }
      );
    }


       
    registerAnnouncement(): void {
      this.registerButtonClicked = true;
      
      const companyData = {
        title: this.title,
      
        message:this.message,
        send_email: this.send_email,
  
        is_sticky: this.is_sticky,
      
        schedule_at: this.schedule_at,

        expires_at: this.expires_at,

        allow_comments: this.allow_comments,
        specific_employees: this.specific_employees,
        branches: this.branches,

        created_by: this.created_by,

        // Add other form field values to the companyData object
      };
    
  
      this.employeeService.registerAnnouncement(companyData).subscribe(
        (response) => {
          console.log('Registration successful', response);
        
              alert('Approvel Level Assigned ');
              window.location.reload();
              // window.location.reload();
         
  
        },
        (error) => {
          console.error('Added failed', error);
          alert('enter all field!')
          // Handle the error appropriately, e.g., show a user-friendly error message.
        }
      );
    }
  


    onFileChange(event: any) {
      const file = event.target.files[0];
      if (file) {
        this.attachment = file;
      }
    }

      
          loadLoanTypes(): void {
    
            const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
          
            console.log('schemastore',selectedSchema )
            // Check if selectedSchema is available
            if (selectedSchema) {
              this.employeeService.getAnnouncement(selectedSchema).subscribe(
                (result: any) => {
                  this.LoanTypes = result;
                  console.log(' fetching Loantypes:');
          
                },
                (error) => {
                  console.error('Error fetching Companies:', error);
                }
              );
            }
            }
        



               iscreateLoanApp: boolean = false;




      openPopus():void{
        this.iscreateLoanApp = true;

      }
    
      closeapplicationModal():void{
        this.iscreateLoanApp = false;

      }





      

}
