import { Component } from '@angular/core';
import { CompanyRegistrationService } from '../company-registration.service';
import { HttpClient } from '@angular/common/http';
import { CountryService } from '../country.service';
import { BrachRegistrationService } from './brach-registration.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../login/authentication.service';
import { DepartmentServiceService } from '../department-master/department-service.service';



@Component({
  selector: 'app-branch-creation',
  templateUrl: './branch-creation.component.html',
  styleUrl: './branch-creation.component.css'
})
export class BranchCreationComponent {
  selectedFile!: File;

  registerButtonClicked = false;
  selectedBranchId: any;
branches: any[] = [];
companies:any[]=[];

countries: any[] = [];
states: any[] = [];
br_country: any | undefined;
br_state_id: any | undefined;

selectedBranchsecId:any | undefined;

branch_name: string = '';

br_city:string ='';
br_branch_mail:any ='';
br_branch_nmbr_1:any='';
br_branch_nmbr_2:any='';
br_pincode:any='';
br_company_id:any='';
branch_code:any='';
notification_period_days:any='';
branch_users:any='';
branch_logo: File | null = null;

// formData.append('emp_profile_pic', this.selectedFile);


constructor(private countryService: CountryService ,
  private authService: AuthenticationService ,
  private companyRegistrationService: CompanyRegistrationService, 
  private http: HttpClient,
  private BrachRegistrationService:BrachRegistrationService,
  private DepartmentServiceService:DepartmentServiceService,
  private ref:MatDialogRef<BranchCreationComponent>
  ) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.branch_logo = file;
    }
  }
  
ngOnInit(): void {
 
  // this.loadStates();
  // this.loadBranch();

  this.loadCountries();
  this.loadBranchUser();

 
}

loadBranch(): void {
  this.BrachRegistrationService.getBranches().subscribe(
    (result: any) => {
      this.branches = result;
      console.log(' fetching bracnhes:');

    },
    (error) => {
      console.error('Error fetching Branches:', error);
    }
  );
}



// registerBranch(): void {
//   this.registerButtonClicked = true;


//         // Basic validation for username and password fields
//         if (!this.branch_name || !this.branch_code || !this.br_country ||!this.br_branch_mail||!this.br_branch_nmbr_1  || !this.branch_logo) {
//           if (!this.branch_name) {
//             alert('Branch Name field is blank.');
//           }
//           if (!this.branch_code) {
//             alert('Branch code field is blank.');
//           }
//           if (!this.br_branch_nmbr_1) {
//             alert('Branch Phone Number field is blank.');
//           }
//           if (!this.br_country) {
//             alert('Country field is blank.');
//           }
//           if (!this.br_branch_mail) {
//             alert('Email id field is blank.');
//           }
//           if (!this.branch_logo) {
//             alert('branch_logo field is blank.');
//           }
         
//      // Exit the function if validation fails
//         }

//           // Validate email format
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(this.br_branch_mail)) {
//     alert('Enter a valid email address.');
//     return; // Exit the function if validation fails
//   }

//   const companyData = {
//     branch_name: this.branch_name,
//     br_city:this.br_city,
//     br_branch_mail:this.br_branch_mail,
//     br_branch_nmbr_1:this.br_branch_nmbr_1,
//     br_branch_nmbr_2:this.br_branch_nmbr_2,
//     br_country:this.br_country,
//     br_state_id:this.br_state_id,
//     br_pincode:this.br_pincode,
//     br_company_id:this.br_company_id,
//     notification_period_days:this.notification_period_days,
//     branch_code:this.branch_code,
//     branch_users:this.branch_users,
//     branch_logo:this.branch_logo
//     // Add other form field values to the companyData object
//   };
//   // if (this.selectedFile) {
//   //   const formData = new FormData();
//   //   formData.append('logo', this.selectedFile, this.selectedFile.name);

//   //   // Replace 'http://localhost:8000/upload-logo' with your backend API endpoint for handling logo uploads
//   //   this.http.post<any>('http://localhost:8000/upload-logo', formData).subscribe(
//   //     (response) => {
//   //       console.log('Logo uploaded successfully', response);
//   //       // Optionally, you can handle the response from the server (e.g., get the logo URL)
//   //     },
//   //     (error) => {
//   //       console.error('Logo upload failed', error);
//   //       // Handle the error appropriately, e.g., show a user-friendly error message
//   //     }
//   //   );
//   // }

//   this.BrachRegistrationService.registerBranch(companyData).subscribe(
//     (response) => {
//       console.log('Registration successful', response);
//       // this.authService.login(this.cmpny_mail, this.cmpny_pincode).subscribe(
//       //   (loginResponse) => {
//       //     console.log('Login successful after registration', loginResponse);
//       //     // Optionally, you can navigate to another page or perform other actions upon successful login.
//           alert('Branch has been Registered successfully Completed');
//           window.location.reload();
//           // window.location.reload();
//       //   },
//       //   (loginError) => {
//       //     console.error('Login failed after registration', loginError);
//       //     // Handle login error after registration
//       //   }
//       // );
//       // Optionally, you can navigate to another page or perform other actions upon successful registration.
//       // alert('Company has been Register!')
//       // window.location.reload();

//     },
//     (error) => {
//       console.error('Registration failed', error);
//       alert('enter all field!')
//       // Handle the error appropriately, e.g., show a user-friendly error message.
//     }
//   );
// }

registerBranch(): void {
  this.registerButtonClicked = true;

  if (!this.branch_name || !this.branch_code || !this.br_country || !this.br_branch_mail || !this.br_branch_nmbr_1 || !this.branch_logo) {
    // Validation code
    return;
  }

  const formData = new FormData();
  // br_pincode
  formData.append('branch_users', this.branch_users);
  formData.append('notification_period_days',this.notification_period_days);
  formData.append('br_city',this.br_city);
  formData.append('br_country',this.br_country);
  formData.append('br_company_id',this.br_company_id);
  formData.append('br_branch_nmbr_2',this.br_branch_nmbr_2);
  formData.append('br_pincode', this.br_pincode);
  formData.append('branch_name', this.branch_name);
  formData.append('branch_code', this.branch_code);
  formData.append('br_country', this.br_country);
  formData.append('br_branch_mail', this.br_branch_mail);
  formData.append('br_branch_nmbr_1', this.br_branch_nmbr_1);
  formData.append('branch_logo', this.branch_logo, this.branch_logo.name);
  const selectedSchema = localStorage.getItem('selectedSchema');
      if (!selectedSchema) {
        console.error('No schema selected.');
        // return throwError('No schema selected.'); // Return an error observable if no schema is selected
      }
     
     
      // return this.http.put(apiUrl, formData);
  
    
      this.http.post(`http://${selectedSchema}.localhost:8000/organisation/api/Branch/`, formData).subscribe(
  // this.http.post('http://abc.localhost:8000/organisation/api/Branch/', formData).subscribe(
    response => {
      console.log('Registration successful', response);
      alert('Branch has been Registered successfully');
      window.location.reload();
    },
    error => {
      console.error('Registration failed', error);
      alert('Registration failed. Please check all fields and try again.');
    }
  );
}

// registerBranch(branchData: FormData): Observable<any> {
//   return this.http.post('http://abc.localhost:8000/organisation/api/Branch/', branchData);
// }




loadCountries(): void {

  const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

  console.log('schemastore',selectedSchema )
  // Check if selectedSchema is available
  if (selectedSchema) {

  this.countryService.getCountriesList(selectedSchema).subscribe(
    (result: any) => {
      this.countries = result;
    },
    (error: any) => {
      console.error('Error fetching countries:', error);
    }
  );
  }
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
  if (this.br_country !== undefined) {
    this.loadStatesByCountry();
  }
}

loadStatesByCountry(): void {
  this.countryService.getStatesByCountryId(this.br_country!).subscribe(
    (result: any) => {
      console.log(result);
      this.states = result; // Assuming the data is directly in the result without a 'data' property
    },
    (error) => {
      console.error('Error fetching states:', error);
    }
  );
}


loadBranchUser(): void {
  const selectedSchema = this.authService.getSelectedSchema();
      if (selectedSchema) {
        this.DepartmentServiceService.getUserforPermission(selectedSchema).subscribe(
          (result: any) => {
            this.companies = result;
            console.log(' fetching Companies:');
    
          },
          (error) => {
            console.error('Error fetching Companies:', error);
          }
        );
      }
 
}

// loadCompanies(): void {
  
//   this.companyRegistrationService.getCompany().subscribe(
//     (result: any) => {
//       this.companies = result;
//     },
//     (error: any) => {
//       console.error('Error fetching countries:', error);
//     }
//   );
// }

ClosePopup(){
  this.ref.close('Closed using function')
}


  

}
