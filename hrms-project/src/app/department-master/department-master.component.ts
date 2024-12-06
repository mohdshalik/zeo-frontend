import { Component,OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CountryService } from '../country.service';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CompanySelectionComponent } from '../company-selection/company-selection.component';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentServiceService } from './department-service.service';
import { DepartmentCreationComponent } from '../department-creation/department-creation.component';
import { DepartmentEditComponent } from '../department-edit/department-edit.component';
import { SessionService } from '../login/session.service';

@Component({
  selector: 'app-department-master',
  templateUrl: './department-master.component.html',
  styleUrl: './department-master.component.css'
})
export class DepartmentMasterComponent {

  Departments: any[] = [];
  selectedDepartment: any;

  dept_name: string = '';
  dept_description:string = '';
  branch_id:string = '';


  hasAddPermission: boolean = false;
  hasDeletePermission: boolean = false;
  hasViewPermission: boolean =false;
  hasEditPermission: boolean = false;

  userId: number | null | undefined;
  userDetails: any;

  filteredDepartment: any[] = [];
  searchQuery: string = '';


  constructor(private DepartmentServiceService:DepartmentServiceService,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private dialog:MatDialog,
    private renderer: Renderer2,
    ) {}

    ngOnInit(): void {
    
      // this.loadDepartment();


      
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
          //   const userData: any = await this.DepartmentServiceService.getDesignationsPermission(selectedSchema).toPromise();
          //   console.log('permissions:', userData);
        
          //   if (userData && userData.length > 0 && userData[0].groups) {
          //     const groupPermissions = userData[0].groups.flatMap((group: any) => group.permissions);
          //     console.log('Group Permissions:', groupPermissions);
        
          //     this.hasViewPermission = this.checkGroupPermission('view_dept_master', groupPermissions);
          //     console.log('Has view permission:', this.hasViewPermission);
        
          //     this.hasAddPermission = this.checkGroupPermission('add_dept_master', groupPermissions);
          //     console.log('Has add permission:', this.hasAddPermission);
        
          //     this.hasDeletePermission = this.checkGroupPermission('delete_dept_master', groupPermissions);
          //     console.log('Has delete permission:', this.hasDeletePermission);
        
          //     this.hasEditPermission = this.checkGroupPermission('change_dept_master', groupPermissions);
          //     console.log('Has edit permission:', this.hasEditPermission);
          //   } else {
          //     console.error('No groups found in data or data format is incorrect.', userData);
          //   }
        
          //   // Fetching designations after checking permissions
          //   this.fetchDesignations(selectedSchema);
          // } 

          try {
            const permissionsData: any = await this.DepartmentServiceService.getDesignationsPermission(selectedSchema).toPromise();
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

                this.hasViewPermission = this.checkGroupPermission('view_dept_master', groupPermissions);
                   console.log('Has view permission:', this.hasViewPermission);
              
                     this.hasAddPermission = this.checkGroupPermission('add_dept_master', groupPermissions);
                    console.log('Has add permission:', this.hasAddPermission);
              
                    this.hasDeletePermission = this.checkGroupPermission('delete_dept_master', groupPermissions);
                    console.log('Has delete permission:', this.hasDeletePermission);
              
                    this.hasEditPermission = this.checkGroupPermission('change_dept_master', groupPermissions);
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
        // this.hasViewPermission = this.checkGroupPermission('view_dept_master', groupPermissions);
        // console.log('Has View Permission:', this.hasViewPermission);

        // this.hasAddPermission = this.checkGroupPermission('add_dept_master', groupPermissions);
        // console.log('Has Add Permission:', this.hasAddPermission);

        // this.hasDeletePermission = this.checkGroupPermission('delete_dept_master', groupPermissions);
        // console.log('Has Delete Permission:', this.hasDeletePermission);

        // this.hasEditPermission = this.checkGroupPermission('change_dept_master', groupPermissions);
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



      // this.DepartmentServiceService.getDeptNames().subscribe(dept_name => {
      //   this.dept_name = dept_name;
      // });
      
      // this.DepartmentServiceService.getDeptDescription().subscribe(description => {
      //   this.description = description;
      // });
  
      // this.DepartmentServiceService.getDeptBranch().subscribe(branch_id => {
      //   this.branch_id = branch_id;
      // });


  
  
    
 // Get the selected schema
 const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

 console.log('schemastore',selectedSchema )
 // Check if selectedSchema is available
 if (selectedSchema) {
   // Construct the API URL with the selected schema
  //  const apiUrl = `http://${selectedSchema}.localhost:8000/employee/api/Employee/`;

   // Fetch employees from the API
   this.DepartmentServiceService.getDepartments(selectedSchema).subscribe(
     (data: any) => {
       this.Departments = data;
       console.log('employee:' ,this.Departments)
     },
     (error: any) => {
       console.error('Error fetching employees:', error);
     }
   );
 } else {
   console.error('No schema selected.');
 }
    
     
    }



    

   checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
    return groupPermissions.some(permission => permission.codename === codeName);
  }

  fetchDesignations(selectedSchema: string) {
    this.DepartmentServiceService.getDepartments(selectedSchema).subscribe(
      (data: any) => {
        this.Departments = data;
        this.filteredDepartment = this.Departments;
        console.log('employee:', this.Departments);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
        


    // loadDepartment(): void {
    //   this.DepartmentServiceService.getDepartment().subscribe(
    //     (result: any) => {
    //       this.Departments = result;
    //       console.log(' fetching Companies:');
  
    //     },
    //     (error) => {
    //       console.error('Error fetching Companies:', error);
    //     }
    //   );
    // }
  


    openPopus(){
      this.dialog.open(DepartmentCreationComponent,{
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
    this.Departments.forEach(employee => employee.selected = this.allSelected);
  }

  onCheckboxChange(employee:number) {
    // No need to implement any logic here if you just want to change the style.
    // You can add any additional logic if needed.
  }

  deleteSelectedEmployees() { 
    const selectedEmployeeIds = this.Departments
      .filter(employee => employee.selected)
      .map(employee => employee.id);

    if (selectedEmployeeIds.length === 0) {
      alert('No Department selected for deletion.');
      return;
    }

    if (confirm('Are you sure you want to delete the selected Department?')) {
      selectedEmployeeIds.forEach(DeptId => {
        this.DepartmentServiceService.deleteDept(DeptId).subscribe(
          () => {
            console.log('Department deleted successfully:', DeptId);
            // Remove the deleted employee from the local list
            this.Departments = this.Departments.filter(employee => employee.id !== DeptId);
          },
          (error) => {
            console.error('Error deleting Department:', error);
          }
        );
      });
    }
  }

  filterEmployees(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredDepartment = this.Departments.filter(Departments =>
      Departments.dept_name.toLowerCase().includes(query) 

    );
  }

  showEditBtn: boolean = false;

  EditShowButtons() {
    this.showEditBtn = !this.showEditBtn;
  }

  openEditPopuss(departmentId: number):void{
    const dialogRef = this.dialog.open(DepartmentEditComponent, {
      width:'80%',
      height:'500px',
      data: { departmentId: departmentId }
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
