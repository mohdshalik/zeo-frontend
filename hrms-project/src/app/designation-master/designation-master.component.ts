import { Component,OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CountryService } from '../country.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CompanySelectionComponent } from '../company-selection/company-selection.component';
import { MatDialog } from '@angular/material/dialog';
import { DesignationService } from './designation.service';
import { DesignationCreationComponent } from '../designation-creation/designation-creation.component';
import { DesignationEditComponent } from '../designation-edit/designation-edit.component';
import { SessionService } from '../login/session.service';


@Component({
  selector: 'app-designation-master',
  templateUrl: './designation-master.component.html',
  styleUrl: './designation-master.component.css'
})
export class DesignationMasterComponent {

  Designations: any[] = [];
  selectedDepartment: any;

  job_title: string = '';
  description:string = '';
  branch_id:string = '';

  hasAddPermission: boolean = false;
  hasDeletePermission: boolean = false;
  hasViewPermission: boolean =false;
  hasEditPermission: boolean = false;

  userId: number | null | undefined;
  userDetails: any;
  user_permissions: any;

  filteredEmployees: any[] = [];
  searchQuery: string = '';

  constructor(private DesignationService:DesignationService,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService : SessionService,

    private dialog:MatDialog,
    private renderer: Renderer2,
    ) {}



    async  ngOnInit(): Promise<void> {
    
      // this.loadDesignation();

      
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
          //   const userData: any = await this.DesignationService.getDesignationsPermission(selectedSchema).toPromise();
          //   console.log('permissions:', userData);
        
          //   if (userData && userData.length > 0 && userData[0].groups) {
          //     const groupPermissions = userData[0].groups.flatMap((group: any) => group.permissions);
          //     console.log('Group Permissions:', groupPermissions);
        
          //     this.hasViewPermission = this.checkGroupPermission('view_desgntn_master', groupPermissions);
          //     console.log('Has view permission:', this.hasViewPermission);
        
          //     this.hasAddPermission = this.checkGroupPermission('add_desgntn_master', groupPermissions);
          //     console.log('Has add permission:', this.hasAddPermission);
        
          //     this.hasDeletePermission = this.checkGroupPermission('delete_desgntn_master', groupPermissions);
          //     console.log('Has delete permission:', this.hasDeletePermission);
        
          //     this.hasEditPermission = this.checkGroupPermission('change_desgntn_master', groupPermissions);
          //     console.log('Has edit permission:', this.hasEditPermission);
          //   } else {
          //     console.error('No groups found in data or data format is incorrect.', userData);
          //   }
        
          //   // Fetching designations after checking permissions
          //   this.fetchDesignations(selectedSchema);
          // }


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

                this.hasViewPermission = this.checkGroupPermission('view_desgntn_master', groupPermissions);
              console.log('Has view permission:', this.hasViewPermission);
        
             this.hasAddPermission = this.checkGroupPermission('add_desgntn_master', groupPermissions);
             console.log('Has add permission:', this.hasAddPermission);
        
               this.hasDeletePermission = this.checkGroupPermission('delete_desgntn_master', groupPermissions);
              console.log('Has delete permission:', this.hasDeletePermission);
        
              this.hasEditPermission = this.checkGroupPermission('change_desgntn_master', groupPermissions);
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








    }

    // checkViewPermission(user_permissions: any[]): boolean {
    //   const requiredPermission = 'view_desgntn_master';
    
    //   // Check user permissions
    //   return user_permissions.some(permission => {
    //     // Check if permission codename matches the required permission
    //     return permission.codename === requiredPermission;
    //   });
    // }


    checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
      return groupPermissions.some(permission => permission.codename === codeName);
    }
  
    fetchDesignations(selectedSchema: string) {
      this.DesignationService.getDesignations(selectedSchema).subscribe(
        (data: any) => {
          this.Designations = data;
          this.filteredEmployees = this.Designations;

          console.log('employee:', this.Designations);
        },
        (error: any) => {
          console.error('Error fetching categories:', error);
        }
      );
    }
    // checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
    //   return groupPermissions.some(permission => permission.codename === codeName);
    // }
     


    

    // loadDesignation(): void {
    //   this.DesignationService.getDesignation().subscribe(
    //     (result: any) => {
    //       this.Designations = result;
    //       console.log(' fetching Companies:');
  
    //     },
    //     (error) => {
    //       console.error('Error fetching Companies:', error);
    //     }
    //   );
    // }
  


    openPopus(){
      this.dialog.open(DesignationCreationComponent,{
        width:'80%',
        height:'700px',
      })
    }

    Delete: boolean = false;
    allSelected: boolean = false;

  toggleCheckboxes() {
    this.Delete = !this.Delete;
  }

  toggleSelectAllEmployees() {
    this.allSelected = !this.allSelected;
    this.Designations.forEach(employee => employee.selected = this.allSelected);
  }

  onCheckboxChange(employee:number) {
    // No need to implement any logic here if you just want to change the style.
    // You can add any additional logic if needed.
  }

    deleteSelectedEmployees() { 
      const selectedEmployeeIds = this.Designations
        .filter(employee => employee.selected)
        .map(employee => employee.id);
  
      if (selectedEmployeeIds.length === 0) {
        alert('No Designation selected for deletion.');
        return;
      }
  
      if (confirm('Are you sure you want to delete the selected Designation?')) {
        selectedEmployeeIds.forEach(DeptId => {
          this.DesignationService.deletedesignation(DeptId).subscribe(
            () => {
              console.log('Designation deleted successfully:', DeptId);
              // Remove the deleted employee from the local list
              this.Designations = this.Designations.filter(employee => employee.id !== DeptId);
              alert(' Designation deleted successfully');
              window.location.reload();
            },
            (error: HttpErrorResponse) => {
              console.error('Error deleting Designation:', error);
              alert(`Error deleting Designation: ${error.statusText}`);
            }
          );
        });
      }
    }


    showEditBtn: boolean = false;

    EditShowButtons() {
      this.showEditBtn = !this.showEditBtn;
    }
  
    openEditPopuss(desigId: number):void{
      const dialogRef = this.dialog.open(DesignationEditComponent, {
        width:'80%',
        height:'500px',
        data: { desigId: desigId }
        
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }


    filterEmployees(): void {
      const query = this.searchQuery.toLowerCase();
      this.filteredEmployees = this.Designations.filter(Designations =>
        Designations.job_title.toLowerCase().includes(query) 
      );
    }
    



}
