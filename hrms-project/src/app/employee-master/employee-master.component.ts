import { Component,OnInit, ElementRef, Renderer2, ViewChild,  EventEmitter, Output } from '@angular/core';
import { CountryService } from '../country.service';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CompanySelectionComponent } from '../company-selection/company-selection.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from './employee.service'; 
import { DesignationCreationComponent } from '../designation-creation/designation-creation.component';
import { Router } from '@angular/router';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { ChangeDetectorRef } from '@angular/core';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { SessionService } from '../login/session.service';
import { IdleService } from '../idle.service';

@Component({
  selector: 'app-employee-master',
  templateUrl: './employee-master.component.html',
  styleUrl: './employee-master.component.css'
})
export class EmployeeMasterComponent {
  // employeesec: any[] = [];
  Employees: any[] = [];
  // selectedDepartment: any;
  emp_first_name: string = '';
  emp_last_name:string = '';
  id:string = '';
  emp_desgntn_id:string = '';
  isEssUser: boolean | undefined;

  hasAddPermission: boolean = true;
  hasDeletePermission: boolean = true;
  hasViewPermission: boolean =true;
  hasEditPermission: boolean = true;

  userId: number | null | undefined;
  userDetails: any;
  selectedSchema: string | null = null;
  username: any;
  userDetailss: any;
  schemas: string[] = []; // Array to store schema names

  employees: any[] = [];

  filteredEmployees: any[] = [];
  searchQuery: string = '';
  searchType: string = 'name';  // Default search type
  showSearchOptions: boolean = false;  // Flag to toggle search options visibility
  serSubSec: boolean = true;  // Flag to toggle search options visibility

  searchPlaceholder: string = 'Search Employees'; // Default placeholder


  constructor(private EmployeeService:EmployeeService,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private dialog:MatDialog,
    private renderer: Renderer2,
    private router: Router,
       ) {
     
    }


    Delete: boolean = false;
    allSelected: boolean = false;



    hideButton = false;

  toggleCheckboxes() {
    this.Delete = !this.Delete;
  }

  toggleSelectAllEmployees() {
    this.allSelected = !this.allSelected;
    this.employees.forEach(employee => employee.selected = this.allSelected);
  }

  onCheckboxChange(employee:number) {
    // No need to implement any logic here if you just want to change the style.
    // You can add any additional logic if needed.
  }

  deleteSelectedEmployees() { 
    const selectedEmployeeIds = this.employees
      .filter(employee => employee.selected)
      .map(employee => employee.id);

    if (selectedEmployeeIds.length === 0) {
      alert('No employees selected for deletion.');
      return;
    }

    if (confirm('Are you sure you want to delete the selected employees?')) {
      selectedEmployeeIds.forEach(employeeId => {
        this.EmployeeService.deleteEmployee(employeeId).subscribe(
          () => {
            console.log('Employee deleted successfully:', employeeId);
            // Remove the deleted employee from the local list
            this.employees = this.employees.filter(employee => employee.id !== employeeId);
          },
          (error) => {
            console.error('Error deleting employee:', error);
          }
        );
      });
    }
  }

    ngOnInit(): void {

   

 // Get the selected schema
 const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

 console.log('schemastore',selectedSchema )
 // Check if selectedSchema is available
 if (selectedSchema) {
   // Construct the API URL with the selected schema
  //  const apiUrl = `http://${selectedSchema}.localhost:8000/employee/api/Employee/`;

   // Fetch employees from the API
   this.EmployeeService.getEmployees(selectedSchema).subscribe(
     (data: any) => {
       this.employees = data;
       console.log('employee:' ,this.employees)
     },
     (error: any) => {
       console.error('Error fetching employees:', error);
     }
   );
 } else {
   console.error('No schema selected.');
 }
      
      
   // Extract schema name from the URL
   const urlParts = window.location.href.split('.');
   if (urlParts.length >= 2) {
     this.selectedSchema = urlParts[0].replace('http://', '');
     console.log(urlParts)
   } else {
     console.error("No schema selected.");
   }

      
      this.hideButton = this.EmployeeService.getHideButton();
      
      // this.loadEmployee();

   
  // Retrieve user ID
this.userId = this.sessionService.getUserId();

// Fetch user details using the obtained user ID
if (this.userId !== null) {
  this.authService.getUserData(this.userId).subscribe(
    async (userData: any) => {
      this.userDetails = userData; // Store user details in userDetails property
      console.log('User ID:', this.userId); // Log user ID
      console.log('User Details:', this.userDetails); // Log user details

      this.username = this.userDetails.username;
      // Check if user is_superuser is true or false
      let isSuperuser = this.userDetails.is_superuser || false;
      const isEssUser = this.userDetails.is_ess || false; // Default to false if is_superuser is undefined
      const selectedSchema = this.authService.getSelectedSchema();
  if (!selectedSchema) {
    console.error('No schema selected.');
    return;
  }

      if (isSuperuser || isEssUser) {
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
          //   const userData: any = await this.EmployeeService.getDesignationsPermission(selectedSchema).toPromise();
          //   console.log('permissions:', userData);
        
          //   if (userData && userData.length > 0 && userData[0].groups) {
          //     const groupPermissions = userData[0].groups.flatMap((group: any) => group.permissions);
          //     console.log('Group Permissions:', groupPermissions);
        
          //     this.hasViewPermission = this.checkGroupPermission('view_emp_master', groupPermissions);
          //     console.log('Has view permission:', this.hasViewPermission);
        
          //     this.hasAddPermission = this.checkGroupPermission('add_emp_master', groupPermissions);
          //     console.log('Has add permission:', this.hasAddPermission);
        
          //     this.hasDeletePermission = this.checkGroupPermission('delete_emp_master', groupPermissions);
          //     console.log('Has delete permission:', this.hasDeletePermission);
        
          //     this.hasEditPermission = this.checkGroupPermission('change_emp_master', groupPermissions);
          //     console.log('Has edit permission:', this.hasEditPermission);
          //   } else {
          //     console.error('No groups found in data or data format is incorrect.', userData);
          //   }
        
          //   // Fetching designations after checking permissions
          //   this.fetchDesignations(selectedSchema);
          // } 
          
          

          
          // try {
          //   const permissionsData: any = await this.EmployeeService.getDesignationsPermission(selectedSchema).toPromise();
          //   console.log('Permissions data:', permissionsData);
  
          //   if (permissionsData && permissionsData.length > 0 && permissionsData[0].groups) {
          //     // Check if user is superuser according to the permissions API
          //     isSuperuser = permissionsData[0].is_superuser || false;
              
          //     if (isSuperuser) {
          //       console.log('User is superuser according to permissions API');
          //       // Grant all permissions
          //       this.hasViewPermission = true;
          //       this.hasAddPermission = true;
          //       this.hasDeletePermission = true;
          //       this.hasEditPermission = true;
            
          //     } else {
          //       const groupPermissions = userData[0].groups.flatMap((group: any) => group.permissions);
          //     console.log('Group Permissions:', groupPermissions);
        
          //      this.hasViewPermission = this.checkGroupPermission('view_emp_master', groupPermissions);
          //      console.log('Has view permission:', this.hasViewPermission);
        
          //     this.hasAddPermission = this.checkGroupPermission('add_emp_master', groupPermissions);
          //     console.log('Has add permission:', this.hasAddPermission);
        
          //    this.hasDeletePermission = this.checkGroupPermission('delete_emp_master', groupPermissions);
          //     console.log('Has delete permission:', this.hasDeletePermission);
        
          //    this.hasEditPermission = this.checkGroupPermission('change_emp_master', groupPermissions);
          //     console.log('Has edit permission:', this.hasEditPermission);
          //     }
          //   } else {
          //     console.error('No groups found in data or data format is incorrect.', permissionsData);
          //   }
  
          //   // Fetching designations after checking permissions
          //   this.fetchDesignations(selectedSchema);
          // }
          

          try {
            const permissionsData: any = await this.EmployeeService.getDesignationsPermission(selectedSchema).toPromise();
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

                  this.hasViewPermission = this.checkGroupPermission('view_emp_master', groupPermissions);
             console.log('Has view permission:', this.hasViewPermission);
        
               this.hasAddPermission = this.checkGroupPermission('add_emp_master', groupPermissions);
              console.log('Has add permission:', this.hasAddPermission);
        
             this.hasDeletePermission = this.checkGroupPermission('delete_emp_master', groupPermissions);
          console.log('Has delete permission:', this.hasDeletePermission);
        
              this.hasEditPermission = this.checkGroupPermission('change_emp_master', groupPermissions);
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

  this.authService.getUserSchema(this.userId).subscribe(
    (userData:any)=>{
      this.userDetailss=userData;
      console.log('Schema :',this.userDetailss);
         // Extract schema names from userData and add them to the schemas array
    this.schemas = userData.map((schema: any) => schema.schema_name);

    }
    

  );
} else {
  console.error('User ID is null.');
}




   
  
   

  
  
  
    
     
    }



    

   checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
    return groupPermissions.some(permission => permission.codename === codeName);
  }

  fetchDesignations(selectedSchema: string) {
    this.EmployeeService.getemployees(selectedSchema).subscribe(
      (data: any) => {
        this.employees = data;
        this.filteredEmployees = this.employees;
        console.log('employee:', this.employees);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }


  toggleSearchOptions(): void {
    this.showSearchOptions = !this.showSearchOptions;
  }

  filterEmployees(): void {
    // this.showSearchOptions = false;
    this.showSearchOptions = !this.showSearchOptions;

    const query = this.searchQuery.toLowerCase();

    if (this.searchType === 'name') {
      this.filteredEmployees = this.employees.filter(employee =>
        employee.emp_first_name.toLowerCase().includes(query) ||
        employee.emp_last_name.toLowerCase().includes(query)
      );
    } else if (this.searchType === 'code') {
      this.filteredEmployees = this.employees.filter(employee =>
        employee.emp_code.toLowerCase().includes(query)
      );
    } else if (this.searchType === 'Designation') {
      this.filteredEmployees = this.employees.filter(employee =>
        employee.emp_desgntn_id.toLowerCase().includes(query)
      );
    } else if (this.searchType === 'Branch') {
      this.filteredEmployees = this.employees.filter(employee =>
        employee.emp_branch_id.toLowerCase().includes(query)
      );
    } else if (this.searchType === 'Department') {
      this.filteredEmployees = this.employees.filter(employee =>
        employee.emp_dept_id.toLowerCase().includes(query)
      );
    }
  }

  filterEmployee(): void {
    this.showSearchOptions = !this.showSearchOptions;

  }

    onSearchTypeChange(): void {
      // this.serSubSec = !this.serSubSec;

      switch (this.searchType) {
        case 'name':
          this.searchPlaceholder = 'Search by Name';
          break;
        case 'code':
          this.searchPlaceholder = 'Search by Code';
          break;
        case 'Branch':
          this.searchPlaceholder = 'Search by Branch';
          break;
        case 'Department':
          this.searchPlaceholder = 'Search by Department';
          break;
        case 'Designation':
          this.searchPlaceholder = 'Search by Designation';
          break;
        default:
          this.searchPlaceholder = 'Search Employees';
          break;
      }
    // this.serSubSec = false;
    this.filterEmployees();  // Optionally, you can filter employees immediately after selecting the search type
  }
  
        
// checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
//   return groupPermissions.some(permission => permission.codename === codeName);
// }
 

    loadEmployee(): void {
      this.EmployeeService.getEmployee().subscribe(
        (result: any) => {
          this.Employees = result;
          console.log(' fetching employees:');
  
        },
        (error) => {
          console.error('Error fetching employees:', error);
        }
      );
    }

    onDeleteEmployee(employeeId: number): void {
      if (confirm('Are you sure you want to delete this employee?')) {
          this.EmployeeService.deleteEmployee(employeeId).subscribe(
              () => {
                  console.log('Employee deleted successfully');
                  // Refresh the employee list after deletion
                  this.loadEmployee();
              },
              (error) => {
                  console.error('Error deleting employee:', error);
              }
          );
      }
  }


    
    showEmployeeDetails(employeeId: number): void {
      
      this.EmployeeService.getEmployeeDetails(employeeId).subscribe(
        (details) => {
          // Navigate to the employee details page with the retrieved details
          this.router.navigate(['/main-sidebar/sub-sidebar/employee-details', employeeId, 'details'], { state: { details } });
        },
        (error) => {
          console.error('Failed to fetch employee details', error);
        }
      );
    }


    

    
    openPopus(){
      this.dialog.open(CreateEmployeeComponent,{
        width:'80%',
        height:'500px',
      })
    }

    openEditEmpPopuss(employeeId: number):void{
      const dialogRef = this.dialog.open(EmployeeEditComponent, {
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


    // handleImageError(event: any): void {
    //   console.error('Error loading image:', event);
    // }


}
