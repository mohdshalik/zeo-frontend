import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { EmployeeService } from '../employee-master/employee.service';
import { UserMasterService } from '../user-master/user-master.service';
import { DepartmentServiceService } from '../department-master/department-service.service';

@Component({
  selector: 'app-approval-level',
  templateUrl: './approval-level.component.html',
  styleUrl: './approval-level.component.css'
})
export class ApprovalLevelComponent {

  level: any = '';
  role: any = '';
  approver: any = '';
  request_type: any = '';
 
  Users:any []=[];
  RequestType:any []=[];


  registerButtonClicked = false;


  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private employeeService: EmployeeService,
    private userService: UserMasterService,
    private DepartmentServiceService: DepartmentServiceService,

    


) {}

ngOnInit(): void {
 
  this.loadUsers();
  this.loadRequestType();

  

 
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



    registerApproveLevel(): void {
      this.registerButtonClicked = true;
      
      const companyData = {
        level: this.level,
      
        role:this.role,
        approver: this.approver,
  
        request_type: this.request_type,
      
    

     
  
        // Add other form field values to the companyData object
      };
    
  
      this.employeeService.registerApproveLevel(companyData).subscribe(
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
  

}
