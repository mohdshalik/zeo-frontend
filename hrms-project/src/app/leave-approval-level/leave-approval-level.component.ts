import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../login/authentication.service';
import { SessionService } from '../login/session.service';
import { LeaveService } from '../leave-master/leave.service';

@Component({
  selector: 'app-leave-approval-level',
  templateUrl: './leave-approval-level.component.html',
  styleUrl: './leave-approval-level.component.css'
})
export class LeaveApprovalLevelComponent {

  role:any='';
  level:any='' ;
  request_type:any='' ;

  approver:any='' ;


  is_compensatory: boolean = false;

  registerButtonClicked: boolean = false;



  LeaveTypes: any[] = [];

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
      this.LoadUsers(selectedSchema);




      
      
      }


      
   
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
  




    SetLeaveApprovaLevel(): void {
      this.registerButtonClicked = true;
      // if (!this.name || !this.code || !this.valid_to) {
      //   return;
      // }
    
      const formData = new FormData();
      formData.append('level', this.level);
      formData.append('role', this.role);


  
      formData.append('is_compensatory', this.is_compensatory.toString());
  
      formData.append('approver', this.approver);
      formData.append('request_type', this.request_type);
    
  
     
  
      
    
    
      this.leaveService.CreateLeaveapprovalLevel(formData).subscribe(
        (response) => {
          console.log('Registration successful', response);
  
  
          alert('Leave Approval Level has been Created');
  
          window.location.reload();
        },  
        (error) => {
          console.error('Added failed', error);
          alert('Enter all required fields!');
        }
      );
    }
  

}
