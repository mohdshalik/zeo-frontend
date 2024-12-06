import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { SessionService } from '../login/session.service';
import { LeaveService } from './leave.service';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-leave-master',
  templateUrl: './leave-master.component.html',
  styleUrl: './leave-master.component.css'
})
export class LeaveMasterComponent {

// Define months with both full and short forms
months: { short: string, full: string }[] = [
  { short: 'Jan', full: 'January' },
  { short: 'Feb', full: 'February' },
  { short: 'Mar', full: 'March' },
  { short: 'Apr', full: 'April' },
  { short: 'May', full: 'May' },
  { short: 'Jun', full: 'June' },
  { short: 'Jul', full: 'July' },
  { short: 'Aug', full: 'August' },
  { short: 'Sep', full: 'September' },
  { short: 'Oct', full: 'October' },
  { short: 'Nov', full: 'November' },
  { short: 'Dec', full: 'December' }
];




  LeaveTypes: any[] = [];
  Branches: any[] = [];
  Departments: any[] = [];
  Designation: any[] = [];
  Category: any[] = [];




  effective_after:any='';
  effective_after_unit:any='';
  effective_after_from:any='';
  accrual_rate:any='';
  accrual_frequency:any='';
  accrual_month:any='';
  accrual_day:any='';
  round_of:any='';
  frequency:any='';
  month:any='';
  day:any='';
  carry_forward_choice:any='';
  cf_value:any='';
  cf_unit_or_percentage:any='';
  cf_max_limit:any='';
  cf_expires_in_value:any='';
  cf_time_choice:any='';
  encashment_value:any='';
  encashment_unit_or_percentage:any='';
  encashment_max_limit:any='';
  leave_type:any='' ;

  accrual: boolean = false;

  reset: boolean = false;
  registerButtonClicked: boolean = false;



  gender:any='';
  branch:any='';
  designation:any='';
  department:any='';
  role:any='';

  @ViewChild('select') select: MatSelect | undefined;


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
        this.LoadBranch(selectedSchema);
        this.LoadDepartment(selectedSchema);
        this.LoadDesignation(selectedSchema);
        this.LoadCategory(selectedSchema);



      
      
      }
   
    }

    registerleaveEntitlement(): void {
      this.registerButtonClicked = true;
      // if (!this.name || !this.code || !this.valid_to) {
      //   return;
      // }
    
      const formData = new FormData();
      formData.append('effective_after', this.effective_after);
      formData.append('effective_after_from', this.effective_after_from);

      formData.append('effective_after_unit', this.effective_after_unit);
      formData.append('accrual_rate', this.accrual_rate);
      formData.append('accrual_frequency', this.accrual_frequency);
      formData.append('accrual_month', this.accrual_month);
      formData.append('accrual_day', this.accrual_day);
      formData.append('round_of', this.round_of);
      formData.append('frequency', this.frequency);
      formData.append('month', this.month);
      formData.append('day', this.day);
      formData.append('carry_forward_choice', this.carry_forward_choice);
      formData.append('cf_value', this.cf_value);
      formData.append('cf_unit_or_percentage', this.cf_unit_or_percentage);
      formData.append('cf_max_limit', this.cf_max_limit);
      formData.append('cf_expires_in_value', this.cf_expires_in_value);
      formData.append('cf_time_choice', this.cf_time_choice);
      formData.append('encashment_value', this.encashment_value);
      formData.append('encashment_unit_or_percentage', this.encashment_unit_or_percentage);
      formData.append('encashment_max_limit', this.encashment_max_limit);
      formData.append('leave_type', this.leave_type);

      formData.append('reset', this.reset.toString());
      formData.append('accrual', this.accrual.toString());
        // Append the profile picture only if it's selected
    // if (this.selectedFile) {
    //   formData.append('image', this.selectedFile);
    // } else {
    //   // Append a null or empty value to indicate no file was selected
    //   formData.append('image', '');
    // }
    
    
      this.leaveService.registerLeaveEntitlement(formData).subscribe(
        (response) => {
          console.log('Registration successful', response);
          alert('Leave Entitlement has been added');
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
        

  LoadBranch(selectedSchema: string) {
    this.leaveService.getBranches(selectedSchema).subscribe(
      (data: any) => {
        this.Branches = data;
      
        console.log('employee:', this.LeaveTypes);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  LoadDepartment(selectedSchema: string) {
    this.leaveService.getDepartments(selectedSchema).subscribe(
      (data: any) => {
        this.Departments = data;
      
        console.log('employee:', this.LeaveTypes);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  LoadDesignation(selectedSchema: string) {
    this.leaveService.getDesignation(selectedSchema).subscribe(
      (data: any) => {
        this.Designation = data;
      
        console.log('employee:', this.LeaveTypes);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  LoadCategory(selectedSchema: string) {
    this.leaveService.getCategory(selectedSchema).subscribe(
      (data: any) => {
        this.Category = data;
      
        console.log('employee:', this.LeaveTypes);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }


  
  registerleaveApplicable(): void {
    this.registerButtonClicked = true;
    // if (!this.name || !this.code || !this.valid_to) {
    //   return;
    // }
  
    const formData = new FormData();
    formData.append('gender', this.gender);
    formData.append('leave_type', this.leave_type);
    formData.append('branch', this.branch);
    formData.append('department', this.department);
    formData.append('designation', this.designation);
    formData.append('role', this.role);
   

  
  
    this.leaveService.registerLeaveapplicable(formData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        alert('Leave Applicable to  has been added');
        window.location.reload();
      },  
      (error) => {
        console.error('Added failed', error);
        alert('Enter all required fields!');
      }
    );
  }

  allSelected=false;
  allSelecteddept=false;
  allSelectedcat=false;
  allSelectedEmp=false;


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
  
}
