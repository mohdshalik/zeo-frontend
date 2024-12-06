import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CountryService } from '../country.service';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-company-selection',
  templateUrl: './company-selection.component.html',
  styleUrl: './company-selection.component.css'
})

export class CompanySelectionComponent implements OnInit {

  registerButtonClicked = false;

  selectedFile!: File;

  countries: any[] = [];
  states: any[] = [];
  Companies: any[] = [];

  cmpny_country: any | undefined;
  cmpny_state_id: any | undefined;
  selectedCompanysecId:any | undefined;

  cmpny_name: string = '';
  cmpny_city:string ='';
  cmpny_mail:any ='';
  cmpny_nmbr_1:any='';
  cmpny_nmbr_2:any='';
  cmpny_pincode:any='';
  cmpny_fax:any='';
  cmpny_gst:any='';



  selectedOption: string | undefined;
  showGSTInput: boolean = false;
  showFaxInput: boolean = false;
  

  constructor(private countryService: CountryService ,
     private companyRegistrationService: CompanyRegistrationService, 
     private http: HttpClient,
     private authService: AuthenticationService,
    private ref:MatDialogRef<CompanySelectionComponent>) {}



  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  registerCompany(): void {
    this.registerButtonClicked = true;
    const companyData = {
      cmpny_name: this.cmpny_name,
      cmpny_city:this.cmpny_city,
      cmpny_mail:this.cmpny_mail,
      cmpny_nmbr_1:this.cmpny_nmbr_1,
      cmpny_nmbr_2:this.cmpny_nmbr_2,
      cmpny_country:this.cmpny_country,
      cmpny_state_id:this.cmpny_state_id,
      cmpny_pincode:this.cmpny_pincode,
      cmpny_fax:this.cmpny_fax,
      cmpny_gst:this.cmpny_gst,


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


    this.companyRegistrationService.registerCompany(companyData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        // this.authService.login(this.cmpny_mail, this.cmpny_pincode).subscribe(
        //   (loginResponse) => {
        //     console.log('Login successful after registration', loginResponse);
        //     // Optionally, you can navigate to another page or perform other actions upon successful login.
            alert('Company has been Registered and logged in!');
            // window.location.reload();
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





  onSelectChange(): void {
    if (this.selectedOption === 'gst') {
      this.showGSTInput = true;
      this.showFaxInput = false;
    } else if (this.selectedOption === 'fax') {
      this.showGSTInput = false;
      this.showFaxInput = true;
    } else {
      this.showGSTInput = false;
      this.showFaxInput = false;
    }
  }


  ngOnInit(): void {
    this.loadCountries();
    // this.loadStates();
    this.loadComapny();

   
  }

  loadComapny(): void {
    this.countryService.getComapies().subscribe(
      (result: any) => {
        this.Companies = result;
        console.log(' fetching Companies:');

      },
      (error) => {
        console.error('Error fetching Companies:', error);
      }
    );
  }


  loadCountries(): void {
    this.countryService.getCountries().subscribe(
      (result: any) => {
        this.countries = result;
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  loadStates(): void {
    this.countryService.getAllStates().subscribe(
      (result: any) => {
        console.log(result); // Log the API response
        this.states = result; // Assuming the data is directly in the result without a 'data' property
      },
      (error) => {
        console.error('Error fetching states:', error);
      }
    );
  }

  onCountryChange(): void {
    if (this.cmpny_country !== undefined) {
      this.loadStatesByCountry();
    }
  }

  loadStatesByCountry(): void {
    this.countryService.getStatesByCountryId(this.cmpny_country!).subscribe(
      (result: any) => {
        console.log(result);
        this.states = result; // Assuming the data is directly in the result without a 'data' property
      },
      (error) => {
        console.error('Error fetching states:', error);
      }
    );
  }
  

  ClosePopup(){
    this.ref.close('Closed using function')
  }


  

}

