import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { EmployeeService } from '../employee-master/employee.service';
import { UserMasterService } from '../user-master/user-master.service';
import { SessionService } from '../login/session.service';
import { DesignationService } from '../designation-master/designation.service';
@Component({
  selector: 'app-asset-request',
  templateUrl: './asset-request.component.html',
  styleUrl: './asset-request.component.css'
})
export class AssetRequestComponent {


  

  hasAddPermission: boolean = false;
  hasDeletePermission: boolean = false;
  hasViewPermission: boolean =false;
  hasEditPermission: boolean = false;

  
 

 
  reason: any = '';
  status: any = '';
  employee: any = '';
  asset_type: any = '';
  requested_asset: any = '';
  




  Users:any []=[];
  AssetTypes:any []=[];


  Assets:any []=[];
  Employees:any []=[];
  AssetsRequest:any []=[];




  userId: number | null | undefined;
  userDetails: any;
  userDetailss: any[] = [];
  username: any;

  schemas: string[] = []; // Array to store schema names

  use_common_workflow:  boolean = false;



  registerButtonClicked = false;


  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private employeeService: EmployeeService,
    private userService: UserMasterService,
    private el: ElementRef,
    private sessionService: SessionService,
    private DesignationService: DesignationService,


    


) {}

ngOnInit(): void {
 
  this.loadUsers();
  this.loadLAssetType();
this.loadLAsset();
this.loadEmployees();

this.loadLAssetRequest();

  this.userId = this.sessionService.getUserId();
  
  if (this.userId !== null) {
    this.authService.getUserData(this.userId).subscribe(
      async (userData: any) => {
        this.userDetails = userData; // Store user details in userDetails property
        // this.created_by = this.userId; // Automatically set the owner to logged-in user ID
  
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



          CreateAssetType(): void {
            this.registerButtonClicked = true;
            const companyData = {
              reason: this.reason,
            
              // status:this.status,
              employee:this.employee,
              asset_type:this.asset_type,
              requested_asset:this.requested_asset,

              // Add other form field values to the companyData object
            };
          
        
            this.employeeService.registerAssetRequest(companyData).subscribe(
              (response) => {
                console.log('Registration successful', response);
              
                    alert('Asset request has been added ');
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




      
          loadLAssetType(): void {
    
            const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
          
            console.log('schemastore',selectedSchema )
            // Check if selectedSchema is available
            if (selectedSchema) {
              this.employeeService.getAssetType(selectedSchema).subscribe(
                (result: any) => {
                  this.AssetTypes = result;
                  console.log(' fetching Loantypes:');
          
                },
                (error) => {
                  console.error('Error fetching Companies:', error);
                }
              );
            }
            }
        
            loadEmployees(): void {
    
              const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
            
              console.log('schemastore',selectedSchema )
              // Check if selectedSchema is available
              if (selectedSchema) {
                this.employeeService.getemployees(selectedSchema).subscribe(
                  (result: any) => {
                    this.Employees = result;
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




      openEditPopuss(categoryId: number):void{
        
      }
  
  
      showEditBtn: boolean = false;
  
      EditShowButtons() {
        this.showEditBtn = !this.showEditBtn;
      }
  
  
      Delete: boolean = false;
      allSelected: boolean = false;
  
    toggleCheckboxes() {
      this.Delete = !this.Delete;
    }
  
    toggleSelectAllEmployees() {
        this.allSelected = !this.allSelected;
    this.AssetsRequest.forEach(employee => employee.selected = this.allSelected);

    }
  
    onCheckboxChange(employee:number) {
      // No need to implement any logic here if you just want to change the style.
      // You can add any additional logic if needed.
    }



    isEditModalOpen: boolean = false;
editAsset: any = {}; // holds the asset being edited

openEditModal(asset: any): void {
  this.editAsset = { ...asset }; // copy asset data
  this.isEditModalOpen = true;
}

closeEditModal(): void {
  this.isEditModalOpen = false;
  this.editAsset = {};
}


updateAssetType(): void {
  const selectedSchema = localStorage.getItem('selectedSchema');
  if (!selectedSchema || !this.editAsset.id) {
    alert('Missing schema or asset ID');
    return;
  }

  this.employeeService.updateAssetRequest(this.editAsset.id, this.editAsset).subscribe(
    (response) => {
      alert('Asset Request  updated successfully!');
      this.closeEditModal();
      this.loadLAssetType(); // reload updated list
    },
    (error) => {
      console.error('Error updating asset:', error);
      alert('Update failed');
    }
  );
}


deleteSelectedAssetType() { 
  const selectedEmployeeIds = this.AssetsRequest
    .filter(employee => employee.selected)
    .map(employee => employee.id);

  if (selectedEmployeeIds.length === 0) {
    alert('No Asset type selected for deletion.');
    return;
  }

  if (confirm('Are you sure you want to delete the selected Asset ?')) {
    selectedEmployeeIds.forEach(categoryId => {
      this.employeeService.deleteAssetRequest(categoryId).subscribe(
        () => {
          console.log('Asset  deleted successfully:', categoryId);
          // Remove the deleted employee from the local list
          this.AssetsRequest = this.AssetsRequest.filter(employee => employee.id !== categoryId);
          alert(' Asset  deleted successfully');
          window.location.reload();

        },
        (error) => {
          console.error('Error deleting Category:', error);
        }
      );
    });
  }
}

loadLAsset(): void {
    
  const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

  console.log('schemastore',selectedSchema )
  // Check if selectedSchema is available
  if (selectedSchema) {
    this.employeeService.getAsset(selectedSchema).subscribe(
      (result: any) => {
        this.Assets = result;
        console.log(' fetching Loantypes:');

      },
      (error) => {
        console.error('Error fetching Companies:', error);
      }
    );
  }
  }

  loadLAssetRequest(): void {
    
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
  
    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
      this.employeeService.getAssetRequest(selectedSchema).subscribe(
        (result: any) => {
          this.AssetsRequest = result;
          console.log(' fetching Loantypes:');
  
        },
        (error) => {
          console.error('Error fetching Companies:', error);
        }
      );
    }
    }
  


    approveRequest(id: number): void {
      const confirmApproval = confirm('Are you sure you want to approve this asset request?');
      if (!confirmApproval) {
        return; // Exit if user cancels
      }
    
      const selectedSchema = this.authService.getSelectedSchema();
      if (!selectedSchema) {
        alert('Schema not found');
        return;
      }
    
      this.employeeService.approveAssetRequest(id, selectedSchema).subscribe(
        (response) => {
          alert('Asset request approved successfully!');
          this.loadLAssetRequest(); // Refresh list
        },
        (error) => {
          console.error('Approval failed', error);
    
          // Extract backend message if available
          const errorMsg =
            error?.error?.detail || error?.error?.message || 'Error approving asset request';
    
          alert(`Approval failed: ${errorMsg}`);
        }
      );
    }
    



    rejectRequest(id: number): void {
  const selectedSchema = this.authService.getSelectedSchema();
  if (!selectedSchema) {
    alert('Schema not found');
    return;
  }

  this.employeeService.rejectAssetRequest(id, selectedSchema).subscribe(
    (response) => {
      alert('Asset request rejected successfully!');
      this.loadLAssetRequest(); // Refresh list
    },
    (error) => {
      console.error('Approval failed', error);
      alert('Error rejecting asset request');
    }
  );
}

}
