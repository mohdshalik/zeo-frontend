import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../login/authentication.service';
import { HttpClient } from '@angular/common/http';
import { LeaveService } from '../leave-master/leave.service';
import { SessionService } from '../login/session.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-create-leavetype',
  templateUrl: './create-leavetype.component.html',
  styleUrl: './create-leavetype.component.css'
})
export class CreateLeavetypeComponent {


  name: any = '';
  code: any = '';
  type: any = '';
  unit: any = '';
  valid_to: any = '';
  valid_from: any = '';

  description: any = '';
  created_by: any = '';


  image: string | undefined;

  negative: boolean = false;

  allow_half_day: boolean = false;
  include_weekend_and_holiday: boolean = false;
  use_common_workflow: boolean = false;


  registerButtonClicked: boolean = false;

  selectedFile!: File | null;


  constructor(
    private http: HttpClient,
    private leaveService: LeaveService,
    private sessionService: SessionService,


    private authService: AuthenticationService,
   private ref:MatDialogRef<CreateLeavetypeComponent>) {}




   onFileSelected(event: any): void {
    this.selectedFile = event.target.files.length > 0 ? event.target.files[0] : null;
  }


   registerleaveType(): void {
    this.registerButtonClicked = true;
  
    if (!this.name || !this.code) {
      alert('Please fill in all required fields.');
      return;
    }
  
    // Convert valid_from and valid_to to 'YYYY-MM-DD'
    const formattedValidFrom = this.valid_from ? formatDate(this.valid_from, 'yyyy-MM-dd', 'en-US') : '';
    const formattedValidTo = this.valid_to ? formatDate(this.valid_to, 'yyyy-MM-dd', 'en-US') : '';
  
    console.log("Formatted valid_from:", formattedValidFrom);  // Debugging
    console.log("Formatted valid_to:", formattedValidTo);  // Debugging
  
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('code', this.code);
    formData.append('type', this.type);
    formData.append('unit', this.unit);
    formData.append('valid_from', formattedValidFrom);  // ✅ Fixing Date Format
    formData.append('valid_to', formattedValidTo);      // ✅ Fixing Date Format
    formData.append('description', this.description);
    formData.append('created_by', this.created_by);
    formData.append('negative', this.negative.toString());
    formData.append('allow_half_day', this.allow_half_day.toString());
    formData.append('include_weekend_and_holiday', this.include_weekend_and_holiday.toString());
    formData.append('use_common_workflow', this.use_common_workflow.toString());
  
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
  
    this.leaveService.registerLeaveType(formData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        alert('Leave type has been added');
        window.location.reload();
      },
      (error) => {
        console.error('Added failed', error);
  
        let errorMessage = 'An unexpected error occurred. Please try again.';
  
        if (error.error) {
          if (typeof error.error === 'string') {
            errorMessage = error.error;
          } else if (error.error.detail) {
            errorMessage = error.error.detail;
          } else if (error.error.non_field_errors) {
            errorMessage = error.error.non_field_errors.join(', ');
          } else {
            errorMessage = Object.keys(error.error)
              .map((field) => `${field}: ${error.error[field].join(', ')}`)
              .join('\n');
          }
        }
  
        alert(errorMessage);
      }
    );
  }
  

}
