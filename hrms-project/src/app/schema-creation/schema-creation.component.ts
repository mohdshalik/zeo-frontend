import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../login/authentication.service';
import { UserMasterComponent } from '../user-master/user-master.component';
import { UserService } from '../user.service';
import { UserMasterService } from '../user-master/user-master.service';
import { CountryService } from '../country.service';
import { SessionService } from '../login/session.service';


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


  schemas: string[] = []; // Array to store schema names

  
  userId: number | null | undefined;
  userDetails: any;
  userDetailss: any[] = [];
  username: any;

  isLoading: boolean = false;

  constructor(
   
    private http: HttpClient,
    private authService: AuthenticationService,
    private userService: UserMasterService,
    private countryService:CountryService,
    private sessionService: SessionService,

   private ref:MatDialogRef<SchemaCreationComponent>) {}


   ngOnInit(): void {
    
    this.userId = this.sessionService.getUserId();
  
    if (this.userId !== null) {
      this.authService.getUserData(this.userId).subscribe(
        (userData: any) => {
          this.userDetails = userData;
          this.owner = this.userId; // Automatically set the owner to logged-in user ID

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

  
    if (!this.schema_name || !this.name || !this.country) {
      let errorMessage = '';
      if (!this.schema_name) errorMessage += 'Location Name field is blank. ';
      if (!this.name) errorMessage += 'Name field is blank. ';
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

   
    this.isLoading = true;

    // Make API call
    this.userService.getSchema(companyData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        this.isLoading = false;

        alert('Location has been Registered!');
        this.ref.close('Closed using function');

        window.location.reload();
      },
      (error) => {
        this.isLoading = false;

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
