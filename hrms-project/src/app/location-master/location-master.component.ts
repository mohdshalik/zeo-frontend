import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { UserMasterService } from '../user-master/user-master.service';
import { CompanyRegistrationService } from '../company-registration.service';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-location-master',
  templateUrl: './location-master.component.html',
  styleUrl: './location-master.component.css'
})
export class LocationMasterComponent {


  registerButtonClicked = false;
  schema_name : string = '';
  name : string = '';
  owner:any='';
  users:any[]=[];
  logo: File | null = null;
  country:any='';
  countries:any[]=[];

  Schemas:any[]=[];

  
  constructor(
   
    private http: HttpClient,
    private authService: AuthenticationService,
    private userService: UserMasterService,
    private countryService:CountryService,
    private companyRegistrationService: CompanyRegistrationService,
   ) {}


   onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.logo = input.files[0];
    } else {
      this.logo = null;
    }
  }

  ngOnInit(): void {

    this.loadUsers();
    this.loadCompanies();
    this.loadCountries();

    

    
   }

   registerCategory(): void {
    this.registerButtonClicked = true;
  
    if (!this.schema_name || !this.name || !this.logo || !this.country ) {
      let errorMessage = '';
      if (!this.schema_name) errorMessage += 'Location Name field is blank. ';
      if (!this.name) errorMessage += 'Name field is blank. ';
      if (!this.logo) errorMessage += 'Company Logo is blank. ';
      alert(errorMessage.trim());
      return; // Exit the function if validation fails
    }
  
    // Validation for spaces in the schema_name field
    const schemaNameHasSpaces = /\s/.test(this.schema_name);
    if (schemaNameHasSpaces) {
      alert('Schema name should not contain spaces.');
      return; // Exit the function if validation fails
    }
  
    // Prepare FormData
    const formData = new FormData();
    formData.append('schema_name', this.schema_name);
    formData.append('name', this.name);
    formData.append('owner', this.owner);
    formData.append('country', this.country);

    if (this.logo) {
      formData.append('logo', this.logo, this.logo.name);
    }
  
    // Make API call
    this.userService.getSchema(formData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        alert('Location has been Registered!');
        window.location.reload();
      },
      (error) => {
        console.error('Registration failed', error);
        alert('Registration failed! Please ensure all fields are filled out correctly.');
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

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (result: any) => {
        this.users = result;
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }


  loadCompanies(): void { 
    this.companyRegistrationService.getCompany().subscribe(
      (result: any) => {
        this.Schemas = result;
        console.log(' fetching Companies:');

      },
      (error) => {
        console.error('Error fetching Companies:', error);
      }
    );
  }


}
/////////////////////////////////////
