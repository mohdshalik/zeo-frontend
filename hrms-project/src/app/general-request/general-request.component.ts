import { Component } from '@angular/core';
import { DepartmentServiceService } from '../department-master/department-service.service';
import { AuthenticationService } from '../login/authentication.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { EmployeeService } from '../employee-master/employee.service';
import { UserMasterService } from '../user-master/user-master.service';
import { environment } from '../../environments/environment';
import { SessionService } from '../login/session.service';
import { DesignationService } from '../designation-master/designation.service';

@Component({
  selector: 'app-general-request',
  templateUrl: './general-request.component.html',
  styleUrl: './general-request.component.css'
})
export class GeneralRequestComponent {

  // doc_number: any = '';
  doc_number: number | null = null;
  reason: any = '';
  total: any = '';
  branch: any = '';
  request_type: any = '';
  employee: any = '';
  created_by: any = '';
  approved:  boolean = false;


  automaticNumbering: boolean = false;




  
  branches:any []=[];
  RequestType:any []=[];
  employees:any []=[];
  Users:any []=[];
  GeneralReq:any []=[];


  schemas: string[] = []; // Array to store schema names

  
  userId: number | null | undefined;
  userDetails: any;
  userDetailss: any[] = [];
  username: any;



  hasAddPermission: boolean = false;
  hasDeletePermission: boolean = false;
  hasViewPermission: boolean =false;
  hasEditPermission: boolean = false;


  registerButtonClicked = false;

  // private apiUrl = 'http://one.localhost:8000/organisation/api/fiscal-years/';
  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local


  constructor(private DepartmentServiceService: DepartmentServiceService ,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private employeeService: EmployeeService,
    private userService: UserMasterService,
    private sessionService: SessionService,
    private DesignationService: DesignationService,


    


) {}

ngOnInit(): void {
  this.loadDeparmentBranch();
  this.loadRequestType();
  this.loadEmp();
  this.loadUsers();
  this.loadgeneralReq();

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
  
                  this.hasAddPermission = this.checkGroupPermission('add_generalrequest', groupPermissions);
                  console.log('Has add permission:', this.hasAddPermission);
    
                 this.hasDeletePermission = this.checkGroupPermission('delete_generalrequest', groupPermissions);
                 console.log('Has delete permission:', this.hasDeletePermission);
    
                  this.hasEditPermission = this.checkGroupPermission('change_generalrequest', groupPermissions);
                  console.log('Has edit permission:', this.hasEditPermission);
  
                  this.hasViewPermission = this.checkGroupPermission('view_generalrequest', groupPermissions);
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
//   const requiredPermission = 'add_generalrequest' ||'change_generalrequest' ||'delete_generalrequest' ||'view_generalrequest';
  

//   // Check user permissions
//   if (permissions.some(permission => permission.codename === requiredPermission)) {
//     return true;
//   }

//   // Check group permissions (if applicable)
//   // Replace `// TODO: Implement group permission check`
//   // with your logic to retrieve and check group permissions
//   // (consider using a separate service or approach)
//   return false; // Replace with actual group permission check
// }




checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
  return groupPermissions.some(permission => permission.codename === codeName);
}



  loadDeparmentBranch(): void {
    
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

    onBranchChange(event: any): void {
      const selectedBranchId = event.target.value;
      const selectedSchema = localStorage.getItem('selectedSchema'); // Retrieve the selected schema from local storage or any other storage method
  
      if (selectedBranchId && selectedSchema) {
        const apiUrl = `${this.apiUrl}/employee/api/general-request/document_numbering_by_branch/?branch_id=${selectedBranchId}&schema=${selectedSchema}`;
        this.http.get(apiUrl).subscribe(
          (response: any) => {
            this.automaticNumbering = response.automatic_numbering;
            if (this.automaticNumbering) {
              this.doc_number = null; // Clear the document number field if automatic numbering is enabled
            }
          },
          (error) => {
            console.error('Error fetching branch details:', error);
          }
        );
      }
    }
  


    loadRequestType(): void {
    
      const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
    
      console.log('schemastore',selectedSchema )
      // Check if selectedSchema is available
      if (selectedSchema) {
        this.DepartmentServiceService.getReqType(selectedSchema).subscribe(
          (result: any) => {
            this.RequestType = result;
            console.log(' fetching Companies:');
    
          },
          (error) => {
            console.error('Error fetching Companies:', error);
          }
        );
      }
      }

      loadEmp(): void {
    
        const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
      
        console.log('schemastore',selectedSchema )
        // Check if selectedSchema is available
        if (selectedSchema) {
          this.employeeService.getemployees(selectedSchema).subscribe(
            (result: any) => {
              this.employees = result;
              console.log(' fetching Companies:');
      
            },
            (error) => {
              console.error('Error fetching Companies:', error);
            }
          );
        }
        }

        onEmployeeChange(event: any): void {
          const selectedEmployeeId = event.target.value;
          if (selectedEmployeeId) {
              // Fetch employee details including branch_id
              this.employeeService.getEmployeeDetails(selectedEmployeeId).subscribe(
                  (employee: any) => {
                    
                      this.branch = employee.emp_branch_id; // Update branch dropdown with employee's branch
                      console.log('Selected employee branch:', this.branch); // Log selected employee's branch

                  
                    },
                    (error:HttpErrorResponse) => {

                      if (error.status === 401) {
                        // Unauthorized error, typically used for wrong credentials
                        alert('Enter all fileds correctly.');
                      } else {
                        // General error message
                        const errorMessage = error.error?.detail || 'Enter all fields';
                        alert(`Creating error: ${errorMessage}`);
                      }
                         

                      // console.error('Error fetching employee details:', error);
                  }
              );
          }
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



          registerGeneralreq(): void {
            this.registerButtonClicked = true;
            
            const companyData = {
              doc_number: this.doc_number,
            
              reason:this.reason,
              total: this.total,
            
              branch:this.branch,
              request_type: this.request_type,
            
              employee:this.employee,
              created_by:this.created_by,

              approved:this.approved,


           
        
              // Add other form field values to the companyData object
            };
          
        
            this.employeeService.registerGeneralReq(companyData).subscribe(
              (response) => {
                console.log('Registration successful', response);
              
                    alert('General request has been Added ');
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
        

          loadgeneralReq(): void {
    
            const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
          
            console.log('schemastore',selectedSchema )
            // Check if selectedSchema is available
            if (selectedSchema) {
              this.employeeService.getAllgeneralRequest(selectedSchema).subscribe(
                (result: any) => {
                  this.GeneralReq = result;
                  console.log(' fetching  general Request: ', result);
          
                },
                (error) => {
                  console.error('Error fetching general Request:', error);
                }
              );
            }
            }
    
    
  

}
