import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CountryService } from '../country.service';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserMasterService } from '../user-master/user-master.service'; 
import { UserService } from '../user.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UserRoleGroupingCreateComponent } from '../user-role-grouping-create/user-role-grouping-create.component';
import { SessionService } from '../login/session.service';
import { UserGroupingEditComponent } from '../user-grouping-edit/user-grouping-edit.component';





@Component({
  selector: 'app-user-grouping-master',
  templateUrl: './user-grouping-master.component.html',
  styleUrl: './user-grouping-master.component.css'
})


export class UserGroupingMasterComponent {

  companies:any[] = [];
  Groups:any[] = [];

  name:any='';
  permissions:any='';
  Rolegroup:any='';

  registerButtonClicked =false;

  hasAddPermission: boolean = false;
  hasDeletePermission: boolean = false;
  hasViewPermission: boolean =false;
  hasEditPermission: boolean = false;

  userId: number | null | undefined;
  userDetails: any;


  Departments: any[] = [];
  selectedDepartment: any;

  constructor(private UserMasterService: UserMasterService ,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private dialog:MatDialog,
   ) {}




   ngOnInit(): void {
  
    this.loadpermissions();
    // this.loadStates();
    this.loadRoleGrouping();

    
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
        
          //     this.hasViewPermission = this.checkGroupPermission('view_group', groupPermissions);
          //     console.log('Has view permission:', this.hasViewPermission);
        
          //     this.hasAddPermission = this.checkGroupPermission('add_group', groupPermissions);
          //     console.log('Has add permission:', this.hasAddPermission);
        
          //     this.hasDeletePermission = this.checkGroupPermission('change_group', groupPermissions);
          //     console.log('Has delete permission:', this.hasDeletePermission);
        
          //     this.hasEditPermission = this.checkGroupPermission('delete_group', groupPermissions);
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

             
               this.hasViewPermission = this.checkGroupPermission('view_group', groupPermissions);
               console.log('Has view permission:', this.hasViewPermission);
        
               this.hasAddPermission = this.checkGroupPermission('add_group', groupPermissions);
              console.log('Has add permission:', this.hasAddPermission);
        
            this.hasDeletePermission = this.checkGroupPermission('change_group', groupPermissions);
              console.log('Has delete permission:', this.hasDeletePermission);
        
              this.hasEditPermission = this.checkGroupPermission('delete_group', groupPermissions);
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

        // // Extract group permissions from user details
        // const groupPermissions = this.userDetails.groups.map((group: { permissions: any; }) => group.permissions).flat();
        // console.log('Group Permissions:', groupPermissions);

        // // Check permissions for various actions
        // this.hasViewPermission = this.checkGroupPermission('view_customusergroup', groupPermissions);
        // console.log('Has View Permission:', this.hasViewPermission);

        // this.hasAddPermission = this.checkGroupPermission('add_customusergroup', groupPermissions);
        // console.log('Has Add Permission:', this.hasAddPermission);

        // this.hasDeletePermission = this.checkGroupPermission('delete_customusergroup', groupPermissions);
        // console.log('Has Delete Permission:', this.hasDeletePermission);

        // this.hasEditPermission = this.checkGroupPermission('change_customusergroup', groupPermissions);
        // console.log('Has Edit Permission:', this.hasEditPermission);
      }
    },
    (error) => {
      console.error('Failed to fetch user details:', error);
    }
  );
} else {
  console.error('User ID is null.');
}


   
  }


  //  loadPermission(): void {
  //   this.UserMasterService.getPermissionByRoleGrouping().subscribe(
  //     (result: any) => {
  //       this.permissions = result;
  //       console.log(' fetching permissions:');

  //     },
  //     (error) => {
  //       console.error('Error fetching permissions:', error);
  //     }
  //   );
  // }



  checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
    return groupPermissions.some(permission => permission.codename === codeName);
  }

  fetchDesignations(selectedSchema: string) {
    this.UserMasterService.getRoleGrouping(selectedSchema).subscribe(
      (data: any) => {
        this.Groups = data;
        console.log('employee:', this.Groups);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

     
// checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
//   return groupPermissions.some(permission => permission.codename === codeName);
// }
 
  loadpermissions(): void {

    // const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    // console.log('schemastore',selectedSchema )
    // this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
    //   (result: any) => {
    //     this.companies = result;
    //   },
    //   (error: any) => {
    //     console.error('Error fetching countries:', error);
    //   }
    // );
  }
  

  loadRoleGrouping(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema );

    if (selectedSchema) {

    this.UserMasterService.getRoleGrouping(selectedSchema).subscribe(
      (result: any) => {
        this.Groups = result;
      },
      (error: any) => {
        console.error('Error fetching countries:', error);
      }
    );
    }
    else {
      console.error('No schema selected.');
    }
  }
  

  openPopus(){
    this.dialog.open(UserRoleGroupingCreateComponent,{
      width:'80%',
      height:'500px',
    })
  }


  showEditBtn: boolean = false;

  EditShowButtons() {
    this.showEditBtn = !this.showEditBtn;
  }

 

  openEditPopuss(departmentId: number):void{
    const dialogRef = this.dialog.open(UserGroupingEditComponent, {
      width:'80%',
      height:'500px',
      data: { departmentId: departmentId }
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  // registerGroupPermission(): void {
  //   this.registerButtonClicked = true;
  //   const companyData = {
  //     name: this.name,
  //     permissions:this.permissions,
  
   

  //     // Add other form field values to the companyData object
  //   };
   

  //   this.UserMasterService.registerGroupingRole(companyData).subscribe(
  //     (response) => {
  //       console.log('Registration successful', response);
     
  //           alert('User Grouping has been Registered ');
  //           window.location.reload();
      
   

  //     },
  //     (error) => {
  //       console.error('Registration failed', error);
  //       alert('enter all field!')
  //       // Handle the error appropriately, e.g., show a user-friendly error message.
  //     }
  //   );
  // }





  Delete: boolean = false;
  allSelected: boolean = false;

toggleCheckboxes() {
  this.Delete = !this.Delete;
}

toggleSelectAllEmployees() {
  this.allSelected = !this.allSelected;
  this.Groups.forEach(employee => employee.selected = this.allSelected);
}

onCheckboxChange(employee:number) {
  // No need to implement any logic here if you just want to change the style.
  // You can add any additional logic if needed.
}

deleteSelectedEmployees() { 
  const selectedEmployeeIds = this.Groups
    .filter(employee => employee.selected)
    .map(employee => employee.id);

  if (selectedEmployeeIds.length === 0) {
    alert('No Group selected for deletion.');
    return;
  }

  if (confirm('Are you sure you want to delete the selected Group?')) {
    selectedEmployeeIds.forEach(DeptId => {
      this.UserMasterService.deleteDept(DeptId).subscribe(
        () => {
          console.log('Group deleted successfully:', DeptId);
          // Remove the deleted employee from the local list
          this.Groups = this.Groups.filter(employee => employee.id !== DeptId);
        },
        (error) => {
          console.error('Error deleting Group:', error);
        }
      );
    });
  }
}

}
