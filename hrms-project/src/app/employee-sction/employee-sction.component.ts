import { Component,OnInit, ElementRef, Renderer2, ViewChild,  EventEmitter, Output } from '@angular/core';
import { CountryService } from '../country.service';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CompanySelectionComponent } from '../company-selection/company-selection.component';
import { MatDialog } from '@angular/material/dialog';
import { DesignationCreationComponent } from '../designation-creation/designation-creation.component';
import { Router } from '@angular/router';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { ChangeDetectorRef } from '@angular/core';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { SessionService } from '../login/session.service';
import { IdleService } from '../idle.service';
import { EmployeeService } from '../employee-master/employee.service';

@Component({
  selector: 'app-employee-sction',
  templateUrl: './employee-sction.component.html',
  styleUrl: './employee-sction.component.css'
})
export class EmployeeSctionComponent {

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
  employee: any;
  employeesec: any = {}; // Initialize an empty object for employee details

  emp_family_details: any[] | undefined;



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
     
     
         handleImageError(event: any): void {
          // console.error('Error loading image:', event);
        }
    
    
    
        // isImage(src: string): boolean {
        //   return src.toLowerCase().endsWith('.jpg') || src.toLowerCase().endsWith('.jpeg') || src.toLowerCase().endsWith('.png') || src.toLowerCase().endsWith('.gif');
        // }
         
     
        isPDF(url: string): boolean {
          return url.toLowerCase().endsWith('.pdf');
        }

        
        checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
         return groupPermissions.some(permission => permission.codename === codeName);
       }
     
       fetchDesignations(selectedSchema: string) {
         this.EmployeeService.getemployees(selectedSchema).subscribe(
           (data: any) => {
             this.employees = data;
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


        

         calculateDaysLeft(startDate: string): string {
          const today = new Date();
          const start = new Date(startDate);
          const diffTime = start.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
          if (diffDays > 0) {
            return `${diffDays} days left`;
          } else if (diffDays === 0) {
            return 'Today';
          } else {
            return 'Expired';
          }
        }



         




}
