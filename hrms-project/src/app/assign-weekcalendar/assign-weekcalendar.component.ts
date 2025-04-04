import { Component, ViewChild } from '@angular/core';
import { DepartmentServiceService } from '../department-master/department-service.service';
import { CompanyRegistrationService } from '../company-registration.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../login/authentication.service';
import { EmployeeService } from '../employee-master/employee.service';
import { UserMasterService } from '../user-master/user-master.service';
import { CatogaryService } from '../catogary-master/catogary.service';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { DesignationService } from '../designation-master/designation.service';
import { SessionService } from '../login/session.service';

@Component({
  selector: 'app-assign-weekcalendar',
  templateUrl: './assign-weekcalendar.component.html',
  styleUrl: './assign-weekcalendar.component.css'
})
export class AssignWeekcalendarComponent {


  related_to: any = '';
  // branch: any = '';

  // department: any = '';

  // category: any = '';

  weekend_model: any = '';




  branches:any []=[];
  Departments:any []=[];
  Categories:any []=[];
  Employee: any[] = [];


  WeekCalendar:any []=[];

  branch: number[] = [];
  department: number[] = [];
  category: number[] = [];
  employee: number[] = [];

  AssignWeekCalendar: any[] = [];

  





  registerButtonClicked = false;

  allSelected=false;
  allSelecteddept=false;
  allSelectedcat=false;
  allSelectedEmp=false;

  hasAddPermission: boolean = false;
hasDeletePermission: boolean = false;
hasViewPermission: boolean =false;
hasEditPermission: boolean = false;

userId: number | null | undefined;
userDetails: any;
userDetailss: any;
schemas: string[] = []; // Array to store schema names

FilteredEmployees :any[]=[];

filteredDocuments: any[] = [];  // Filtered list


  @ViewChild('select') select: MatSelect | undefined;


  constructor(private DepartmentServiceService: DepartmentServiceService ,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private categoryService: CatogaryService,
    private userService: UserMasterService,
    private employeeService: EmployeeService,
    
private DesignationService: DesignationService,
private sessionService: SessionService,


  

) {}





ngOnInit(): void {
  this.loadBranch();
  this.loadCAtegory();
  this.loadDEpartments();
  this.loadWeekendCalendar();
  this.loadEmployee();

  this.loadAssignedWeekendCalendar();

  this.userId = this.sessionService.getUserId();
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
  
                 
                  this.hasAddPermission = this.checkGroupPermission('add_assign_weekend', groupPermissions);
                  console.log('Has add permission:', this.hasAddPermission);
                  
                  this.hasEditPermission = this.checkGroupPermission('change_assign_weekend', groupPermissions);
                  console.log('Has edit permission:', this.hasEditPermission);
    
                 this.hasDeletePermission = this.checkGroupPermission('delete_assign_weekend', groupPermissions);
                 console.log('Has delete permission:', this.hasDeletePermission);
    
  
                  this.hasViewPermission = this.checkGroupPermission('view_assign_weekend', groupPermissions);
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
//   const requiredPermission = 'add_assign_weekend' ||'change_assign_weekend' ||'delete_assign_weekend' ||'view_assign_weekend';
  
  
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
  
  loadBranch(): void {
    
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





    toggleAllSelection(): void {
      if (this.select) {
        if (this.allSelected) {
          
          this.select.options.forEach((item: MatOption) => item.select());
        } else {
          this.select.options.forEach((item: MatOption) => item.deselect());
        }
      }
    }

    toggleAllSelectiondept(): void {
      if (this.select) {
        if (this.allSelecteddept) {
          this.select.options.forEach((item: MatOption) => item.select());
        } else {
          this.select.options.forEach((item: MatOption) => item.deselect());
        }
      }
    }

    toggleAllSelectioncat(): void {
      if (this.select) {
        if (this.allSelectedcat) {
          this.select.options.forEach((item: MatOption) => item.select());
        } else {
          this.select.options.forEach((item: MatOption) => item.deselect());
        }
      }
    }

    
    toggleAllSelectionEmp(): void {
      if (this.select) {
        if (this.allSelectedEmp) {
          this.select.options.forEach((item: MatOption) => item.select());
        } else {
          this.select.options.forEach((item: MatOption) => item.deselect());
        }
      }
    }


     

        loadDEpartments(): void {
    
          const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
        
          console.log('schemastore',selectedSchema )
          // Check if selectedSchema is available
          if (selectedSchema) {
            this.DepartmentServiceService.getDepartments(selectedSchema).subscribe(
              (result: any) => {
                this.Departments = result;
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

            loadEmployee(): void {
    
              const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
            
              console.log('schemastore',selectedSchema )
              // Check if selectedSchema is available
              if (selectedSchema) {
                this.employeeService.getemployees(selectedSchema).subscribe(
                  (result: any) => {
                    this.Employee = result;
                    this.FilteredEmployees = result;
                    console.log(' fetching Employees:');
            
                  },
                  (error) => {
                    console.error('Error fetching Employees:', error);
                  }
                );
              }
              }


              SearchEmployee  = '';

              FilterEmployee(){
                this.FilteredEmployees = this.Employee.filter(emp =>
                  emp.emp_first_name.toLowerCase().includes(this.SearchEmployee.toLowerCase())

                );

              }

            loadWeekendCalendar(): void {
    
              const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
            
              console.log('schemastore',selectedSchema )
              // Check if selectedSchema is available
              if (selectedSchema) {
                this.categoryService.getWeekendcalendar(selectedSchema).subscribe(
                  (result: any) => {
                    this.WeekCalendar = result;
                    console.log(' fetching Companies:');
            
                  },
                  (error) => {
                    console.error('Error fetching Companies:', error);
                  }
                );
              }
              }

  
              loadAssignedWeekendCalendar(): void {
    
                const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
              
                console.log('schemastore',selectedSchema )
                // Check if selectedSchema is available
                if (selectedSchema) {
                  this.employeeService.getAssignWeekendcalendar(selectedSchema).subscribe(
                    (result: any) => {
                      this.AssignWeekCalendar = result;
                      this.filteredDocuments = result;  // Initialize filtered data

                      console.log(' fetching Companies:');
              
                    },
                    (error) => {
                      console.error('Error fetching Companies:', error);
                    }
                  );
                }
                }



            registerAssignCalendar(): void {
              this.registerButtonClicked = true;
              const companyData = {
                related_to: this.related_to,
              
                branch:this.branch,
                department: this.department,
              
                category:this.category,
                employee: this.employee,
                weekend_model: this.weekend_model,
              
               
  
  
             
          
                // Add other form field values to the companyData object
              };
            
          
              this.employeeService.registerAssignweekCalendar(companyData).subscribe(
                (response) => {
                  console.log('Registration successful', response);
                
                      alert('Weekend Calendar has been Assigned ');
                      window.location.reload();
                      // window.location.reload();
                 
          
                },
                (error) => {
                  console.error('Add failed', error);
                  console.log('Full error response:', error);
      
                  // Check if the error message matches the specific error
                  const errorMessage = error.error?.error || 'An error occurred while Assign the Week Calendar. Please try again.';
                  alert(errorMessage);
              }
              );
            }




            isExpanded = false;
            searchQuery = '';
          
            toggleSearch() {
              this.isExpanded = !this.isExpanded;
            }


                // Filter documents based on searchQuery
    filterDocuments() {
      this.filteredDocuments = this.AssignWeekCalendar.filter(doc =>
        doc.weekend_model.toLowerCase().includes(this.searchQuery.toLowerCase()) 
        // doc.employee.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }


  

}
