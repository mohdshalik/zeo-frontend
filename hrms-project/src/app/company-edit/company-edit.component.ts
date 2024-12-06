import { Component, Inject , Renderer2} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA ,MatDialog} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../country.service';
import { CompanyRegistrationService } from '../company-registration.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../login/authentication.service';
import { Route,ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee-master/employee.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.css'
})
export class CompanyEditComponent {
  
  countries: any[] = [];
  states: any[] = [];
  companies: any[] = [];

  registerButtonClicked = false;

  Emp: any;


  cmpny_name: string = '';
  cmpny_city:string ='';
  cmpny_pincode:any ='';

  cmpny_nmbr_1:any ='';
  cmpny_nmbr_2:any ='';
  cmpny_mail:any ='+';
  cmpny_state_id:any ='';
  cmpny_country:any ='';
  cmpny_fax:any='';
  cmpny_gst:any='';



  constructor(
    private ref:MatDialogRef<CompanyEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: number },
    private CompanyRegistrationService: CompanyRegistrationService,
    private CountryService: CountryService,

    private EmployeeService : EmployeeService,

    private renderer: Renderer2,
    private http: HttpClient,
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private dialogRef: MatDialogRef<CompanyEditComponent>

  ) {
    this.CompanyRegistrationService.getEmpById(data.employeeId).subscribe(Emp => {
      this.Emp = Emp;
    });
  }





  

  ngOnInit(): void {
    this.CompanyRegistrationService.getEmpById(this.data.employeeId).subscribe(
      (Emp) => {
        this.Emp = Emp;
      },
      (error) => {
        console.error('Error fetching category:', error);
      }
    );


    this.loadCountries();

 

  }



  updateEmp(): void {
    // Update category
    this.CompanyRegistrationService.updateEmp(this.data.employeeId, this.Emp).subscribe(
      (response) => {
        console.log('employee updated successfully:', response);
        // Close the dialog when category is updated
        this.dialogRef.close();
 
      },
      (error) => {
        console.error('Error updating category:', error);
      }
    );
  }
 




 


  loadCountries(): void {
    this.CountryService.getCountries().subscribe(
      (result: any) => {
        this.countries = result;
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  loadStates(): void {
    this.CountryService.getAllStates().subscribe(
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
    if (this.Emp.cmpny_country !== undefined) {
      this.loadStatesByCountry();
    }
  }

  loadStatesByCountry(): void {
    this.CountryService.getStatesByCountryId(this.Emp.cmpny_country!).subscribe(
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
