import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { EmployeeService } from '../employee-master/employee.service';
import { UserMasterService } from '../user-master/user-master.service';
import { DepartmentServiceService } from '../department-master/department-service.service';

@Component({
  selector: 'app-attendace-marking',
  templateUrl: './attendace-marking.component.html',
  styleUrl: './attendace-marking.component.css'
})
export class AttendaceMarkingComponent {

  registerButtonClicked = false;

  date: any = '';
  check_in_time: any = '';
  check_out_time: any = '';
  total_hours: any = '';
  employee: any = '';

  shift: any = '';

  Employees: any[] = [];


  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private employeeService: EmployeeService,
    private userService: UserMasterService,
    private DepartmentServiceService: DepartmentServiceService,

    


) {}

ngOnInit(): void {
 
  this.LoadEmployee();
}




  registerApproveLevel(): void {
    this.registerButtonClicked = true;
    
    const companyData = {
      date: this.date   ,
    
      check_in_time:this.check_in_time,
      check_out_time: this.check_out_time,

      total_hours: this.total_hours,
    
      employee: this.employee   ,
      shift: this.shift,
  

   

      // Add other form field values to the companyData object
    };
  

    this.employeeService.registerEmployeeAttendence(companyData).subscribe(
      (response) => {
        console.log('Registration successful', response);
      
            alert('Registration successful ');
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



  LoadEmployee() {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
      this.employeeService.getemployees(selectedSchema).subscribe(
        (result: any) => {
          this.Employees = result;
          console.log(' fetching Employees:');
  
        },
        (error) => {
          console.error('Error fetching Employees:', error);
        }
      );
    }

  }
}
