import { Component , OnInit, Renderer2} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CountryService } from '../country.service';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Route,ActivatedRoute } from '@angular/router';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatogaryService } from '../catogary-master/catogary.service'; 
import { EmployeeService } from '../employee-master/employee.service'; 
import { SuccesModalComponent } from '../succes-modal/succes-modal.component';
import { UserMasterService } from '../user-master/user-master.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {

  companies: any[] = [];
  branches:any[] = [];

  group:any[]=[];
  user_permission:any[]=[];


  registerButtonClicked = false;

  Emp: any;



  username:any ='';

  first_name:any ='';
  last_name:any ='';
  date_joined:any ='';
  last_login: any = '';
  email:any ='';
  CompanyRole:any ='';

  ContactNumber:any ='';
  password:any='';
  groups:any='';
  user_permissions:any='';
  tenants:any='';

  constructor(
    private ref:MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: number },
    private UserMasterService: UserMasterService,
    private CompanyRegistrationService: CompanyRegistrationService,
    private renderer: Renderer2,
    private http: HttpClient,
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private dialogRef: MatDialogRef<UserEditComponent>

  ) {
    this.UserMasterService.getEmpById(data.employeeId).subscribe(Emp => {
      this.Emp = Emp;
    });
  }


  ngOnInit(): void {
    this.UserMasterService.getEmpById(this.data.employeeId).subscribe(
      (Emp) => {
        this.Emp = Emp;
        this.Emp.password = ''; 
      },
      (error) => {
        console.error('Error fetching category:', error);
      }
    );




    this.loadCompanies();
    // this.loadbranches();

    // this.loadGrouping();
    // this.loadPermission();
  

  }

  updateEmp(): void {
    // Update category

     // Basic validation
     if (!this.Emp.username || !this.Emp.email  || !this.Emp.tenants) {
      if (!this.Emp.username) {
        alert('User field is blank.');
      }
      if (!this.Emp.email) {
        alert('Email field is blank.');
      }
      // if (!this.Emp.password) {
      //   alert('Password field is blank.');
      // }
    }
    
    this.UserMasterService.updateEmp(this.data.employeeId, this.Emp).subscribe(
      (response) => {
        console.log('USER updated successfully:', response);
        // Close the dialog when category is updated
        alert('User has been Updated');
        window.location.reload();
      },
      (error) => {
        console.error('Error updating USER:', error);
      }
    );
  }
 


  loadCompanies(): void { 
    this.CompanyRegistrationService.getCompany().subscribe(
      (result: any) => {
        this.companies = result;
        console.log(' fetching Companies:');

      },
      (error) => {
        console.error('Error fetching Companies:', error);
      }
    );
  }

  


ClosePopup(){
  this.ref.close('Closed using function')
}
 


}
