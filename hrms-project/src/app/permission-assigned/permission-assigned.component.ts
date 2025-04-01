import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { DepartmentServiceService } from '../department-master/department-service.service';
import { SessionService } from '../login/session.service';
import { DesignationService } from '../designation-master/designation.service';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-permission-assigned',
  templateUrl: './permission-assigned.component.html',
  styleUrl: './permission-assigned.component.css'
})
export class PermissionAssignedComponent {

  @ViewChild('select') select: MatSelect | undefined;

  @ViewChild('selectEdit') selectEdit: MatSelect | undefined;

  profile: number | string | undefined;
  users :any[]=[];
  registerButtonClicked = false;

  registerButtonClickededit = false;


  groups:any='';
  Groups :any[]=[];
  UserPermissions :any[]=[];



  hasAddPermission: boolean = false;
hasDeletePermission: boolean = false;
hasViewPermission: boolean =false;
hasEditPermission: boolean = false;

userId: number | null | undefined;
userDetails: any;
userDetailss: any;
schemas: string[] = []; // Array to store schema names


isUserPereditModalOpen = false;
selectedUserPermission: any = { profile: '', groups: [] };

  constructor(private DepartmentServiceService: DepartmentServiceService ,
    private http: HttpClient,
    private authService: AuthenticationService,
    private DesignationService: DesignationService,
private sessionService: SessionService,
 ) {}


 ngOnInit(): void {
    
  this.loadDeparmentBranch();
  this.loadUserPermissions();
  this.loadAssignedPermissionsForUser();


  this.userId = this.sessionService.getUserId();
if (this.userId !== null) {
  this.authService.getUserData(this.userId).subscribe(
    async (userData: any) => {
      this.userDetails = userData; // Store user details in userDetails property
      // this.username = this.userDetails.username;
   

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

               
                this.hasAddPermission = this.checkGroupPermission('add_permission', groupPermissions);
                console.log('Has add permission:', this.hasAddPermission);
                
                this.hasEditPermission = this.checkGroupPermission('change_permission', groupPermissions);
                console.log('Has edit permission:', this.hasEditPermission);
  
               this.hasDeletePermission = this.checkGroupPermission('delete_permission', groupPermissions);
               console.log('Has delete permission:', this.hasDeletePermission);
  

                this.hasViewPermission = this.checkGroupPermission('view_permission', groupPermissions);
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



 
// checkViewPermission(permissions: any[]): boolean {
//   const requiredPermission = 'add_permission' ||'change_permission' ||'delete_permission' ||'view_permission';
  
  
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
    const selectedSchema = this.authService.getSelectedSchema();
        if (selectedSchema) {
          this.DepartmentServiceService.getApprover(selectedSchema).subscribe(
            (result: any) => {
              this.users = result;
              console.log(' fetching Companies:');
      
            },
            (error) => {
              console.error('Error fetching Companies:', error);
            }
          );
        }
   
  }


  loadUserPermissions(): void {
    const selectedSchema = this.authService.getSelectedSchema();
        if (selectedSchema) {
          this.DepartmentServiceService.getUserforPermissionGroupSelection(selectedSchema).subscribe(
            (result: any) => {
              this.Groups = result;
              console.log(' fetching Companies:');
      
            },
            (error) => {
              console.error('Error fetching Companies:', error);
            }
          );
        }
   
  }



 
  registerUserAssignedPermission(): void {
    this.registerButtonClicked = true;
  
    const companyData = {
      profile: this.profile,
      groups: this.groups,
    };
  
    this.DepartmentServiceService.registerUserAssgnedPer(companyData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        alert('Group Permission has been Assigned');
        window.location.reload();
      },
      (error) => {
        console.error('Registration failed', error);
  
        // Check if the error response contains a profile message
        if (error.error && error.error.profile) {
          alert(error.error.profile[0]); // Show the backend error message
        } else {
          alert('Something went wrong. Please try again!');
        }
      }
    );
  }
  


  loadAssignedPermissionsForUser(): void {
    const selectedSchema = this.authService.getSelectedSchema();
        if (selectedSchema) {
          this.DepartmentServiceService.getassignedPermissionsForUser(selectedSchema).subscribe(
            (result: any) => {
              this.UserPermissions = result;
              console.log(' fetching User Permissions:');
      
            },
            (error) => {
              console.error('Error User Permissions:', error);
            }
          );
        }
   
  }

  
  deleteAssignedPermission(permissionId: number): void {
    if (confirm('Are you sure you want to delete this permission?')) {
      const selectedSchema = this.authService.getSelectedSchema();
      if (selectedSchema) {
      this.DepartmentServiceService.deleteAssignedPermission(permissionId,selectedSchema).subscribe(
        (response) => {
          console.log('Permission deleted successfully', response);
          alert('Permission deleted successfully');
          this.loadAssignedPermissionsForUser(); // Refresh the list after deletion
        },
        (error) => {
          console.error('Error deleting permission:', error);
          alert('Failed to delete permission');
        }
      );
    }
    }
  }





  // Open modal and set selected permission details
openEditPerModal(permission: any): void {
  this.selectedUserPermission = { ...permission }; // Copy the object to avoid binding issues
  this.isUserPereditModalOpen = true;
    // Ensure groups are stored as an array of group IDs
    this.selectedUserPermission.groups = permission.groups.map((group: any) => group.id);

}

// Close modal
closeEditPerModal(): void {
  this.isUserPereditModalOpen = false;
  this.selectedUserPermission = { profile: '', groups: [] };
}

updateUserPermission(): void {
  this.registerButtonClickededit = true;

  if (!this.selectedUserPermission.profile || this.selectedUserPermission.groups.length === 0) {
    return; // Stop if form validation fails
  }

  const selectedSchema = this.authService.getSelectedSchema(); // Get schema name
  if (!selectedSchema) {
    console.error('No schema selected');
    return;
  }

  this.DepartmentServiceService.updateUserPermission(selectedSchema, this.selectedUserPermission.id, this.selectedUserPermission)
    .subscribe(
      (response) => {
        console.log('Permission updated successfully', response);
        alert('Permission updated successfully');
        this.loadAssignedPermissionsForUser(); // Refresh the table
        this.closeEditPerModal();
      },
      (error) => {
        console.error('Error updating permission:', error);
        alert('Failed to update permission');
      }
    );
}

allSelected=false;
allSelectedEdit=false;


toggleAllSelection(): void {
  if (this.select) {
    if (this.allSelected) {
      
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }
}


toggleAllSelectionEdit(): void {
  if (this.selectEdit) {
    if (this.allSelectedEdit) {
      
      this.selectEdit.options.forEach((item: MatOption) => item.select());
    } else {
      this.selectEdit.options.forEach((item: MatOption) => item.deselect());
    }
  }
}

}
