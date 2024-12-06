import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { SessionService } from '../login/session.service';
import { LeaveService } from '../leave-master/leave.service';
@Component({
  selector: 'app-compensatory-leave',
  templateUrl: './compensatory-leave.component.html',
  styleUrl: './compensatory-leave.component.css'
})
export class CompensatoryLeaveComponent {

  
  request_type:any='';
  employee:any='';
  request_date:any='';
  work_date:any='';

  reason:any='';

  transaction_type:any='';
  days:any='';

  registerButtonClicked = false;
  Employees: any[] = [];
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private leaveService:LeaveService
    
    ) {}

    ngOnInit(): void {
      const selectedSchema = this.authService.getSelectedSchema();
      if (selectedSchema) {


      this.LoadEmployee(selectedSchema);
   




      
      
      }
   
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

    requestCompansatoryLeave(): void {
      this.registerButtonClicked = true;
      // if (!this.name || !this.code || !this.valid_to) {
      //   return;
      // }
    
      const formData = new FormData();
      formData.append('request_type', this.request_type);
      formData.append('employee', this.employee);
      formData.append('work_date', this.work_date);
      formData.append('reason', this.reason);
     
  
     
  
      
    
    
      this.leaveService.requestCompLeaveAdmin(formData).subscribe(
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

    requestCompansatoryTransLeave(): void {
      this.registerButtonClicked = true;
      // if (!this.name || !this.code || !this.valid_to) {
      //   return;
      // }
    
      const formData = new FormData();
      formData.append('transaction_type', this.transaction_type);
      formData.append('employee', this.employee);
      formData.append('days', this.days);
      formData.append('reason', this.reason);
     
  
     
  
      
    
    
      this.leaveService.requestCompTransLeaveAdmin(formData).subscribe(
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
  
}
