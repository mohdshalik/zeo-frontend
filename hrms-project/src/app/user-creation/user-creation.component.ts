import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CountryService } from '../country.service';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserMasterService } from '../user-master/user-master.service'; 
import { UserService } from '../user.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { UesrEmployeeComponent } from '../uesr-employee/uesr-employee.component';



@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrl: './user-creation.component.css'
})
export class UserCreationComponent {

  Branches: any[] = [];
  companys:any[] = [];

  group:any[]=[];
  user_permission:any[]=[];

  createdUserId: any ='';



  selectedDeparmentsecId:any | undefined;
  selectedBranchsecId:string | undefined;
  selectedCompanysecId:string | undefined;



  registerButtonClicked = false;
  Departments: any[] = [];

  username: string = '';
  first_name:string ='';
  last_name:any ='';
  email:any ='';
  CompanyRole:any ='';
  contact_number
:any ='';
  // companies:string ='';
  // branches:string ='';
  password:any='';
  last_login:any='';
  date_joined:any='';
  groups:any='';
  user_permissions:any='';

  is_ess: boolean = false;
  is_superuser: boolean = false;
  is_staff: boolean = false;

  tenants:any='';
  branches:any='';


  toppings = this._formBuilder.group({
    pepperoni: false,
    extracheese: false,
    mushroom: false,
  });

  constructor(private UserMasterService: UserMasterService ,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private dialog:MatDialog,

    private _formBuilder: FormBuilder,
   private ref:MatDialogRef<UserCreationComponent>) {}


   registeruser(): void {
    this.registerButtonClicked = true;


         // Basic validation for username and password fields
  if (!this.username || !this.password ||this.email) {
    if (!this.username) {
      alert('Username field is blank.');
    }
    if (!this.password) {
      alert('Password field is blank.');
    }
    if (!this.email) {
      alert('Password field is blank.');
    }

  }
    

    const companyData = {
      username: this.username,
     
      email:this.email,
  
      tenants:this.tenants,
      password:this.password,
      
      is_ess: this.is_ess,
      is_superuser: this.is_superuser,
      is_staff: this.is_staff,

     
    };
    

    this.UserMasterService.registeruser(companyData).subscribe(
      (response) => {
        console.log('Registration successful', response);
       
            alert('User has been Registered and logged in!');
            const createdUserId = response.id; // Assume `response` contains the new user ID

            
              // Store the created user ID and open the modal
            this.createdUserId = createdUserId;
             this.isAddFieldsModalOpen = true;

      },
      (error) => {
        console.error('Registration failed', error);
        alert('enter all field!')
        // Handle the error appropriately, e.g., show a user-friendly error message.
      }
    );
  }

  ngOnInit(): void {
   
    this.loadCompanies();
    // this.loadGrouping();
    // this.loadPermission();
    // this.loadStates();
    // this.loadDeparmentBranch();

   
  }

  loadCompanies(): void { 
    this.companyRegistrationService.getCompany().subscribe(
      (result: any) => {
        this.companys = result;
        console.log(' fetching Companies:');

      },
      (error) => {
        console.error('Error fetching Companies:', error);
      }
    );
  }


  // openUserToEmployee():void{

  //   this.isAddFieldsModalOpen=false;

  // }




  ClosePopup(){
    this.ref.close('Closed using function')
  }
  
  isAddFieldsModalOpen:boolean=false;


  
  closeAddFieldsModal(){
    this.isAddFieldsModalOpen=false;
    window.location.reload();
  }

  openPopus(userId: string): void {
    this.isAddFieldsModalOpen = false; // Close the modal

    this.dialog.open(UesrEmployeeComponent, {
      width: '80%',
      height: '500px',
      data: { userId: userId } // Pass the created user ID to the component
    });
  }

}
