import { Component } from '@angular/core';
import { CountryService } from '../country.service';
import { AuthenticationService } from '../login/authentication.service';
import { HttpClient } from '@angular/common/http';
import { LeaveService } from '../leave-master/leave.service';

@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrl: './leave-type.component.css'
})
export class LeaveTypeComponent {

  name:any='';
  code:any='';
  type:any='';
  unit:any='';
  valid_to:any='';
  valid_from:any='';

  description:any='';

  image: string | undefined;

  negative: boolean = false;
  
  allow_opening_balance: boolean = false;


  selectedFile!: File | null;

  
  constructor(
    private leaveservice: LeaveService, 
    private authService: AuthenticationService, 

    private http: HttpClient,
    
  ) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files.length > 0 ? event.target.files[0] : null;
  }
  

  registerButtonClicked = false;


  registerleaveType(): void {
    this.registerButtonClicked = true;
    if (!this.name || !this.code || !this.valid_to) {
      return;
    }
  
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('code', this.code);
    formData.append('type', this.type);
    formData.append('unit', this.unit);
    formData.append('valid_to', this.valid_to);
    formData.append('valid_from', this.valid_from);
    formData.append('description', this.description);
    formData.append('negative', this.negative.toString());
    formData.append('allow_opening_balance', this.allow_opening_balance.toString());
    // formData.append('image', this.selectedFile);
      // Append the profile picture only if it's selected
 // Append the image only if it's selected
 if (this.selectedFile) {
  formData.append('image', this.selectedFile);
}

  
    this.leaveservice.registerLeaveType(formData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        alert('Leave type has been added');
        window.location.reload();
      },
      (error) => {
        console.error('Added failed', error);
        alert('Enter all required fields!');
      }
    );
  }

}
