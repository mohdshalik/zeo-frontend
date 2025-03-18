import { Component } from '@angular/core';
import { CompanyRegistrationService } from '../company-registration.service';
import { HttpClient } from '@angular/common/http';
import { CountryService } from '../country.service';
import { BrachRegistrationService } from './brach-registration.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../login/authentication.service';
import { DepartmentServiceService } from '../department-master/department-service.service';
import { environment } from '../../environments/environment';
import { SessionService } from '../login/session.service';



@Component({
  selector: 'app-branch-creation',
  templateUrl: './branch-creation.component.html',
  styleUrl: './branch-creation.component.css'
})
export class BranchCreationComponent {

  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local

  selectedFile!: File;

  registerButtonClicked = false;
  selectedBranchId: any;
branches: any[] = [];
companies:any[]=[];

countries: any[] = [];
states: any[] = [];
br_country: any | undefined;
br_state_id: any | undefined;
state_label: string = ''; // For dynamically storing state_label


selectedBranchsecId:any | undefined;

branch_name: string = '';

br_city:string ='';
br_branch_mail:any ='';
br_branch_nmbr_1:any='';
br_branch_nmbr_2:any='';
br_pincode:any='';
br_company_id:any='';
branch_code:any='';
probation_period_days:any='';
branch_users:any='';
branch_logo: File | null = null;


schemas: string[] = []; // Array to store schema names

  
userId: number | null | undefined;
userDetails: any;
userDetailss: any[] = [];
username: any;

// formData.append('emp_profile_pic', this.selectedFile);


constructor(private countryService: CountryService ,
  private authService: AuthenticationService ,
  private companyRegistrationService: CompanyRegistrationService, 
  private http: HttpClient,
  private BrachRegistrationService:BrachRegistrationService,
  private DepartmentServiceService:DepartmentServiceService,
  private sessionService: SessionService,

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
  this.userId = this.sessionService.getUserId();

  
  if (this.userId !== null) {
    this.authService.getUserData(this.userId).subscribe(
      (userData: any) => {
        this.userDetails = userData;
        this.branch_users = this.userId; // Automatically set the owner to logged-in user ID

      },
      (error) => {
        console.error('Failed to fetch user details:', error);
      }
    );

    this.authService.getUserSchema(this.userId).subscribe(
      (userData: any) => {
        this.userDetailss = userData; // Store user schemas in userDetailss

        this.schemas = userData.map((schema: any) => schema.schema_name);
      },
      (error) => {
        console.error('Failed to fetch user schemas:', error);
      }
    );
  } else {
    console.error('User ID is null.');
  }


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



registerBranch(): void {
  this.registerButtonClicked = true;

  if (!this.branch_name || !this.branch_code || !this.br_country || !this.br_branch_mail || !this.br_branch_nmbr_1 || !this.branch_logo) {
    // Validation code
    return;
  }

  const formData = new FormData();
  // br_pincode
  formData.append('branch_users', this.branch_users);
  // formData.append('probation_period_days',this.probation_period_days);
  formData.append('br_city',this.br_city);
  formData.append('br_country',this.br_country);
  formData.append('br_company_id',this.br_company_id);
  formData.append('br_branch_nmbr_2',this.br_branch_nmbr_2);
  formData.append('br_pincode', this.br_pincode);
  formData.append('branch_name', this.branch_name);
  formData.append('branch_code', this.branch_code);
  formData.append('br_country', this.br_country);
  formData.append('br_state_id', this.br_state_id);

  formData.append('br_branch_mail', this.br_branch_mail);
  formData.append('br_branch_nmbr_1', this.br_branch_nmbr_1);
  formData.append('branch_logo', this.branch_logo, this.branch_logo.name);
  const selectedSchema = localStorage.getItem('selectedSchema');
      if (!selectedSchema) {
        console.error('No schema selected.');
        // return throwError('No schema selected.'); // Return an error observable if no schema is selected
      }
     
     
      // return this.http.put(apiUrl, formData);
  
    
      this.http.post(`${this.apiUrl}/organisation/api/Branch/?schema=${selectedSchema}`, formData).subscribe(
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



onCountryChange(): void {
  if (this.br_country !== undefined) {
    this.loadStatesByCountry();
  }
}

loadStatesByCountry(): void {
  this.countryService.getStatesByCountryId(this.br_country!).subscribe(
    (result: any) => {
      console.log('State Response:', result);
      this.states = result.states; // Accessing the 'states' array
      this.state_label = result.state_label; // Accessing the dynamic state label
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
