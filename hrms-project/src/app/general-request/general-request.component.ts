import { Component } from '@angular/core';
import { DepartmentServiceService } from '../department-master/department-service.service';
import { AuthenticationService } from '../login/authentication.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { EmployeeService } from '../employee-master/employee.service';
import { UserMasterService } from '../user-master/user-master.service';
import { environment } from '../../environments/environment';

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







  registerButtonClicked = false;

  // private apiUrl = 'http://one.localhost:8000/organisation/api/fiscal-years/';
  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local


  constructor(private DepartmentServiceService: DepartmentServiceService ,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private employeeService: EmployeeService,
    private userService: UserMasterService,
    


) {}

ngOnInit(): void {
  this.loadDeparmentBranch();
  this.loadRequestType();
  this.loadEmp();
  this.loadUsers();
  this.loadgeneralReq();



  

 
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
        const apiUrl = `${this.apiUrl}/employee/api/general-request/document_numbering_by_branch/?branch_id=${selectedBranchId}/?schema=${selectedSchema}`;
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
