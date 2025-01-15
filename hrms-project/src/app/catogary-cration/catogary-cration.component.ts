import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CountryService } from '../country.service';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CatogaryService } from '../catogary-master/catogary.service'; 

@Component({
  selector: 'app-catogary-cration',
  templateUrl: './catogary-cration.component.html',
  styleUrl: './catogary-cration.component.css'
})
export class CatogaryCrationComponent {

  selectedDeparmentsecId:any | undefined;

  registerButtonClicked = false;
  catogaries: any[] = [];

  ctgry_title: string = '';
  ctgry_description:string ='';
  ctgry_code:string ='';



  constructor(private CatogaryService: CatogaryService ,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
   private ref:MatDialogRef<CatogaryCrationComponent>) {}



   copiedCategoryData: { title: string; code: string; description: string } | null = null;



   ngOnInit() {
  // Retrieve the copied data from the service
  this.copiedCategoryData = this.CatogaryService.getCopiedCategoryData();

  }
   // Method to copy the current field values
   copyFields() {
    this.copiedCategoryData = {
      title: this.ctgry_title,
      code: this.ctgry_code,
      description: this.ctgry_description
    };
  
    // Use the service to store the copied data
    this.CatogaryService.setCopiedCategoryData(this.copiedCategoryData);
    console.log('Copied Values:', this.copiedCategoryData);
  }
  // Method to paste the copied field values
  pasteFields() {
    alert('Paste button clicked!');
    if (this.copiedCategoryData) {
      this.ctgry_title = this.copiedCategoryData.title;
      this.ctgry_code = this.copiedCategoryData.code;
      this.ctgry_description = this.copiedCategoryData.description;
  
      console.log('Pasted Values:', this.copiedCategoryData);
    } else {
      console.warn('No data available to paste. Please copy fields first.');
      alert('No data to paste. Please copy fields first.');
    }
  }

   registerCatogary(): void {
    this.registerButtonClicked = true;

    
     // Basic validation for username and password fields
  if (!this.ctgry_title || !this.ctgry_description ||!this.ctgry_code) {
    if (!this.ctgry_title) {
      alert('Category name field is blank.');
    }
    if (!this.ctgry_code) {
      alert('Category name field is blank.');
    }
    if (!this.ctgry_description) {
      alert('Category Description  field is blank.');
    }
    // return; // Exit the function if validation fails
  }

    const companyData = {
      ctgry_title: this.ctgry_title,
      ctgry_description:this.ctgry_description,
      ctgry_code:this.ctgry_code,

  
   

      // Add other form field values to the companyData object
    };
    // if (this.selectedFile) {
    //   const formData = new FormData();
    //   formData.append('logo', this.selectedFile, this.selectedFile.name);

    //   // Replace 'http://localhost:8000/upload-logo' with your backend API endpoint for handling logo uploads
    //   this.http.post<any>('http://localhost:8000/upload-logo', formData).subscribe(
    //     (response) => {
    //       console.log('Logo uploaded successfully', response);
    //       // Optionally, you can handle the response from the server (e.g., get the logo URL)
    //     },
    //     (error) => {
    //       console.error('Logo upload failed', error);
    //       // Handle the error appropriately, e.g., show a user-friendly error message
    //     }
    //   );
    // }

    this.CatogaryService.registerCatogary(companyData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        // this.authService.login(this.cmpny_mail, this.cmpny_pincode).subscribe(
        //   (loginResponse) => {
        //     console.log('Login successful after registration', loginResponse);
        //     // Optionally, you can navigate to another page or perform other actions upon successful login.
            alert('Catagory has been Registered !');
          
            window.location.reload();
         
        //   },
        //   (loginError) => {
        //     console.error('Login failed after registration', loginError);
        //     // Handle login error after registration
        //   }
        // );
        // Optionally, you can navigate to another page or perform other actions upon successful registration.
        // alert('Company has been Register!')
        // window.location.reload();

      },
      (error) => {
        console.error('Registration failed', error);
        alert('enter all field!')
        // Handle the error appropriately, e.g., show a user-friendly error message.
      }
    );
  }

  ClosePopup(){
    this.ref.close('Closed using function')
  }

}
