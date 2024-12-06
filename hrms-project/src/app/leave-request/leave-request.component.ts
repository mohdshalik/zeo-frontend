import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { SessionService } from '../login/session.service';
import { LeaveService } from '../leave-master/leave.service';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.css'
})
export class LeaveRequestComponent {


  start_date:any='';
  end_date:any='';
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



  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private leaveService:LeaveService
  
    ) {}

    ngOnInit(): void {
      const selectedSchema = this.authService.getSelectedSchema();
      if (selectedSchema) {


        this.LoadLeavetype(selectedSchema);
      this.LoadEmployee(selectedSchema);
      this.LoadUsers(selectedSchema);




      
      
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
    // formData.append('approved_by', this.approved_by);
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
      
        console.log('employee:', this.LeaveTypes);
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
      
        console.log('employee:', this.Employees);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }


  LoadUsers(selectedSchema: string) {
    this.leaveService.getUsers(selectedSchema).subscribe(
      (data: any) => {
        this.Users = data;
      
        console.log('employee:', this.LeaveTypes);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }


}
