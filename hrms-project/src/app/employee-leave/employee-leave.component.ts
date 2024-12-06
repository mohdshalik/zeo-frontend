import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { SessionService } from '../login/session.service';
import { LeaveService } from '../leave-master/leave.service';
import { EmployeeService } from '../employee-master/employee.service';

@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrl: './employee-leave.component.css'
})
export class EmployeeLeaveComponent {


  
  start_date:any='';
  end_date:any='';
  note:any='';
  reason:any='';

  status:any='';
  applied_on:any='';
  approved_by:any='';
  approved_on:any='';
  half_day_period:any='' ;
  leave_type:any='' ;

  employee:any='' ;


  dis_half_day: boolean = false;

  registerButtonClicked: boolean = false;



  LeaveTypes: any[] = [];
  Employees: any[] = [];

  Users: any[] = [];

  employees:any[]=[];

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private leaveService:LeaveService,
    private EmployeeService:EmployeeService,


  
    ) {}

    ngOnInit(): void {
      const selectedSchema = this.authService.getSelectedSchema();
      if (selectedSchema) {


        this.LoadLeavetype(selectedSchema);
      this.LoadEmployee(selectedSchema);
      this.LoadUsers(selectedSchema);


      this.fetchDesignations(selectedSchema);


      
      
      }

      
     
    }




  requestLeave(): void {
    this.registerButtonClicked = true;
    // if (!this.name || !this.code || !this.valid_to) {
    //   return;
    // }
  
    const formData = new FormData();
    formData.append('start_date', this.start_date);
    formData.append('end_date', this.end_date);
    formData.append('reason', this.reason);
    formData.append('status', this.status);
    formData.append('approved_by', this.approved_by);
    formData.append('approved_on', this.approved_on);

    formData.append('dis_half_day', this.dis_half_day.toString());

    formData.append('half_day_period', this.half_day_period);
    formData.append('leave_type', this.leave_type);
    formData.append('employee', this.employee);

   

    
  
  
    this.leaveService.requestLeaveAdmin(formData).subscribe(
      (response) => {
        console.log('Registration successful', response);


        alert('Leave Request   has been Sent');

        window.location.reload();
      },  
      (error) => {
        console.error('Added failed', error);
        alert('Enter all required fields!');
      }
    );
  }


  
  LoadLeavetype(selectedSchema: string) {
    this.leaveService.getLeaveType(selectedSchema).subscribe(
      (data: any) => {
        this.LeaveTypes = data;
      
        console.log('LeaveTypes:', this.LeaveTypes);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }



  LoadEmployee(selectedSchema: string) {
    this.leaveService.getEmployee(selectedSchema).subscribe(
      (data: any) => {
        this.Employees = data;
        
        // Automatically select the first employee if there are any employees
        if (this.Employees && this.Employees.length > 0) {
          this.employee = this.Employees[0].id;
        }
  
        console.log('employee:', this.Employees);
      },
      (error: any) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
  

  LoadUsers(selectedSchema: string) {
    this.leaveService.getUsers(selectedSchema).subscribe(
      (data: any) => {
        this.Users = data;
      
        console.log('Users:', this.Users);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  fetchDesignations(selectedSchema: string) {
    this.EmployeeService.getemployees(selectedSchema).subscribe(
      (data: any) => {
        this.employees = data;
       console.log('employeeDet:', this.employees);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }



  selectedRequestId: number | null = null; // Property to track the selected leave request ID

selectRequest(requestId: number) {
  this.selectedRequestId = requestId === this.selectedRequestId ? null : requestId; // Toggle the selected request
}

}
