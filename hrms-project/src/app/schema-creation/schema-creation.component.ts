import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../login/authentication.service';
import { UserMasterComponent } from '../user-master/user-master.component';
import { UserService } from '../user.service';
import { UserMasterService } from '../user-master/user-master.service';
import { CountryService } from '../country.service';


@Component({
  selector: 'app-schema-creation',
  templateUrl: './schema-creation.component.html',
  styleUrl: './schema-creation.component.css'
})
export class SchemaCreationComponent {
  
  
  registerButtonClicked = false;
  schema_name : string = '';
  name : string = '';
  owner:any='';
  country:any='';
  users:any[]=[];
  countries:any[]=[];
  logo: File | null = null;

  
  constructor(
   
    private http: HttpClient,
    private authService: AuthenticationService,
    private userService: UserMasterService,
    private countryService:CountryService,
   private ref:MatDialogRef<SchemaCreationComponent>) {}


   ngOnInit(): void {

    this.loadUsers();
  this.loadCountries();
   }

   onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.logo = input.files[0];
    } else {
      this.logo = null;
    }
  }
  registerCatogary(): void {
    this.registerButtonClicked = true;
  
    if (!this.schema_name || !this.name || !this.logo || !this.country) {
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
    const companyData = new FormData();
    companyData.append('schema_name', this.schema_name);
    companyData.append('name', this.name);
    companyData.append('owner', this.owner);
    
    companyData.append('country', this.country);

    // if (this.logo) {
    //   companyData.append('logo', this.logo, this.logo.name);
    // }
  
    // Make API call
    this.userService.getSchema(companyData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        alert('Location has been Registered!');
        this.ref.close('Closed using function');
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


  ClosePopup(){
    this.ref.close('Closed using function')
  }


}
