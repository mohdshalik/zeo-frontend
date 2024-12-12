import { Component,OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CountryService } from '../country.service';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CompanySelectionComponent } from '../company-selection/company-selection.component';
import { MatDialog } from '@angular/material/dialog';
import { UserMasterService } from './user-master.service';
import { DesignationCreationComponent } from '../designation-creation/designation-creation.component';
import { UserCreationComponent } from '../user-creation/user-creation.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { Router } from '@angular/router';
import { SessionService } from '../login/session.service';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrl: './user-master.component.css'
})
export class UserMasterComponent {
  Users: any[] = [];
  selectedDepartment: any;

  username: string = '';
  email:string = '';
  CompanyRole:string = '';
  contact_number:string = '';
 

  selectedEmployee: any;

  hasAddPermission: boolean = false;
  hasDeletePermission: boolean = false;
  hasViewPermission: boolean =false;
  hasEditPermission: boolean = false;

  userId: number | null | undefined;
  userDetails: any;


  filteredEmployees: any[] = [];
  searchQuery: string = '';


  constructor(private UserMasterService:UserMasterService,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private dialog:MatDialog,
    private renderer: Renderer2,
    private router:Router
    ) {}



    ngOnInit(): void {
    
      this.loadUsers();

      
// Retrieve user ID
this.userId = this.sessionService.getUserId();

// Fetch user details using the obtained user ID
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
        this.fetchDesignations(selectedSchema);
      } else {
        console.log('User is not superuser');

        const selectedSchema = this.authService.getSelectedSchema();
        if (selectedSchema) {
          // try {
          //   const userData: any = await this.UserMasterService.getDesignationsPermission(selectedSchema).toPromise();
          //   console.log('permissions:', userData);
        
          //   if (userData && userData.length > 0 && userData[0].groups) {
          //     const groupPermissions = userData[0].groups.flatMap((group: any) => group.permissions);
          //     console.log('Group Permissions:', groupPermissions);
        
          //     this.hasViewPermission = this.checkGroupPermission('view_customuser', groupPermissions);
          //     console.log('Has view permission:', this.hasViewPermission);
        
          //     this.hasAddPermission = this.checkGroupPermission('add_customuser', groupPermissions);
          //     console.log('Has add permission:', this.hasAddPermission);
        
          //     this.hasDeletePermission = this.checkGroupPermission('delete_customuser', groupPermissions);
          //     console.log('Has delete permission:', this.hasDeletePermission);
        
          //     this.hasEditPermission = this.checkGroupPermission('change_customuser', groupPermissions);
          //     console.log('Has edit permission:', this.hasEditPermission);
          //   } else {
          //     console.error('No groups found in data or data format is incorrect.', userData);
          //   }
        
          //   // Fetching designations after checking permissions
          //   this.fetchDesignations(selectedSchema);
          // } 
          

          try {
            const permissionsData: any = await this.UserMasterService.getDesignationsPermission(selectedSchema).toPromise();
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

               this.hasViewPermission = this.checkGroupPermission('view_customuser', groupPermissions);
              console.log('Has view permission:', this.hasViewPermission);
        
              this.hasAddPermission = this.checkGroupPermission('add_customuser', groupPermissions);
              console.log('Has add permission:', this.hasAddPermission);
        
             this.hasDeletePermission = this.checkGroupPermission('delete_customuser', groupPermissions);
              console.log('Has delete permission:', this.hasDeletePermission);
        
             this.hasEditPermission = this.checkGroupPermission('change_customuser', groupPermissions);
              console.log('Has edit permission:', this.hasEditPermission);
              } else {
                console.error('No groups found in data or groups array is empty.', firstItem);
              }
            } else {
              console.error('Permissions data is not an array or is empty.', permissionsData);
            }

            // Fetching designations after checking permissions
            this.fetchDesignations(selectedSchema);
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
} else {
  console.error('User ID is null.');
}


      this.UserMasterService.getUsername().subscribe(username => {
        this.username = username;
      });
      
      this.UserMasterService.getEmail().subscribe(email => {
        this.email = email;
        
      });
           
      this.UserMasterService.getCompanyroll().subscribe(CompanyRole => {
        this.CompanyRole = CompanyRole;
        
      });
           
      this.UserMasterService.getContact().subscribe(contact_number => {
        this.contact_number = contact_number;
        
      });
  
   

  
  
  
    
     
    }


    checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
      return groupPermissions.some(permission => permission.codename === codeName);
    }
  
    fetchDesignations(selectedSchema: string) {

      // Get the selected schema
 const selectedSchemas = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

 console.log('schemastore',selectedSchemas )
 // Check if selectedSchema is available
 if (selectedSchemas) {
      
      this.UserMasterService.getSChemaUsers(selectedSchemas).subscribe(
        (data: any) => {
          this.Users = data;
          this.filteredEmployees = this.Users;

          console.log('users:', this.Users);
        },
        (error: any) => {
          console.error('Error fetching categories:', error);
        }
      );
 }
    }
   
    // checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
    //   return groupPermissions.some(permission => permission.codename === codeName);
    // }
     
    loadUsers(): void {
      this.UserMasterService.getUsers().subscribe(
        (result: any) => {
          this.Users = result;
          console.log(' fetching Companies:');
  
        },
        (error) => {
          console.error('Error fetching Companies:', error);
        }
      );
    }
  

    filterEmployees(): void {
      const query = this.searchQuery.toLowerCase();
      this.filteredEmployees = this.Users.filter(Users =>
        Users.username.toLowerCase().includes(query) ||
        Users.email.toLowerCase().includes(query)
      );
    }
  


    openPopus(){
      this.dialog.open(UserCreationComponent,{
        width:'80%',
        height:'500px',
      })
    }


    Delete: boolean = false;
    allSelected: boolean = false;

  toggleCheckboxes() {
    this.Delete = !this.Delete;
  }

  toggleSelectAllEmployees() {
    this.allSelected = !this.allSelected;
    this.Users.forEach(employee => employee.selected = this.allSelected);
  }

  onCheckboxChange(employee:number) {
    // No need to implement any logic here if you just want to change the style.
    // You can add any additional logic if needed.
  }

  deleteSelectedEmployees() { 
    const selectedEmployeeIds = this.Users
      .filter(employee => employee.selected)
      .map(employee => employee.id);

    if (selectedEmployeeIds.length === 0) {
      alert('No employees selected for deletion.');
      return;
    }

    if (confirm('Are you sure you want to delete the selected employees?')) {
      selectedEmployeeIds.forEach(DeptId => {
        this.UserMasterService.deleteUser(DeptId).subscribe(
          () => {
            console.log('User deleted successfully:', DeptId);
            // Remove the deleted employee from the local list
            this.Users = this.Users.filter(employee => employee.id !== DeptId);
          },
          (error) => {
            console.error('Error deleting employee:', error);
          }
        );
      });
    }
  }


  openEditEmpPopuss(employeeId: number, ):void{
    const dialogRef = this.dialog.open(UserEditComponent, {
      width:'80%',
      height:'500px',
      data: { employeeId: employeeId }
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  showEditBtn: boolean = false;

  EditShowButtons() {
    this.showEditBtn = !this.showEditBtn;
  }

  // show div with selected user details


  showEmployeeDetails(employeeId: number, companysec: any): void {
    this.UserMasterService.getEmployeeDetails(employeeId).subscribe(
        (details: any) => {
            // Update selectedEmployee with the fetched details
            // this.selectedEmployee = details;
            this.selectedEmployee = companysec;
        },
        (error) => {
            console.error('Failed to fetch User details', error);
        }
    );
}


onDeleteEmployee(employeeId: number): void {
  if (confirm('Are you sure you want to delete this User?')) {
      this.UserMasterService.deleteUser(employeeId).subscribe(
          () => {
              console.log('User deleted successfully');

              // this.router.navigate(['/main-sidebar/sub-sidebar/employee-master']);
              // Refresh the employee list after deletion
              // this.loadEmployee();
          },
          (error) => {
              console.error('Error deleting User:', error);
          }
      );
  }
}

showUserDetails(employeeId: number): void {
      
  this.UserMasterService.getEmployeeDetails(employeeId).subscribe(
    (details) => {
      // Navigate to the employee details page with the retrieved details
      this.router.navigate(['/main-sidebar/settings/user-details', employeeId, 'details'], { state: { details } });
    },
    (error) => {
      console.error('Failed to fetch employee details', error);
    }
  );
}




}
