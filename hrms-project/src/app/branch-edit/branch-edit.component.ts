import { Component, Inject , Renderer2} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA ,MatDialog} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../country.service';
import { CompanyRegistrationService } from '../company-registration.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../login/authentication.service';
import { Route,ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee-master/employee.service';
import { BranchServiceService } from '../branch-master/branch-service.service';
import { DepartmentServiceService } from '../department-master/department-service.service';
import { SessionService } from '../login/session.service';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrl: './branch-edit.component.css'
})
export class BranchEditComponent {

  countries: any[] = [];
  states: any[] = [];
  companies: any[] = [];


  registerButtonClicked = false;

  Emp: any;


  branch_name: string = '';
  br_city:string ='';
  br_pincode:any ='';

  br_branch_nmbr_1:any ='';
  br_branch_nmbr_2:any ='';
  br_branch_mail:any ='+';
  br_company_id:any ='';
  br_state_id:any ='';
  br_country:any ='';
  branch_code:any='';
  probation_period_days:any='';

  branch_users:any='';
  // branch_logo: File | null = null;
  branch_logo: string | undefined;


  selectedFile!: File | null;


  schemas: string[] = []; // Array to store schema names

  
  userId: number | null | undefined;
  userDetails: any;
  userDetailss: any[] = [];
  username: any;

  constructor(
    private ref:MatDialogRef<BranchEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: number },
    private BranchServiceService: BranchServiceService,
    private CountryService: CountryService,
    private DepartmentServiceService: DepartmentServiceService,


    private EmployeeService : EmployeeService,
  private sessionService: SessionService,

    private renderer: Renderer2,
    private http: HttpClient,
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private dialogRef: MatDialogRef<BranchEditComponent>

  ) {
    this.BranchServiceService.getEmpById(data.employeeId).subscribe(Emp => {
      this.Emp = Emp;
    });
  }



  
  ngOnInit(): void {
    this.BranchServiceService.getEmpById(this.data.employeeId).subscribe(
      (Emp) => {
        this.Emp = Emp;
        console.log('emp',Emp)
      },
      (error) => {
        console.error('Error fetching Branches:', error);
      }
    );


    this.loadCountries();
this. loadBranchUser();



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


 

  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files.length > 0 ? event.target.files[0] : null;
  }
  
  updateBranch(): void {
    // Update category

      // Create a FormData object to handle file uploads
  const formData = new FormData();

  // Append the profile picture only if it's selected
  if (this.selectedFile) {
    formData.append('branch_logo', this.selectedFile);
  } else {
    // Append a null or empty value to indicate no file was selected
    formData.append('branch_logo', '');
  }
  

    this.BranchServiceService.updateBranch(this.data.employeeId, this.Emp,).subscribe(
      (response) => {
        console.log('Branches updated successfully:', response);
        // Close the dialog when category is updated
        this.dialogRef.close();
        window.location.reload();
 
      },
      (error) => {
        console.error('Error updating Branchesng:', error);
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
    if (this.Emp.br_country !== undefined) {
      this.loadStatesByCountry();
    }
  }

  loadStatesByCountry(): void {
    this.CountryService.getStatesByCountryId(this.Emp.br_state_id!).subscribe(
      (result: any) => {
        console.log(result);
        this.states = result; // Assuming the data is directly in the result without a 'data' property
      },
      (error) => {
        console.error('Error fetching states:', error);
      }
    );
  }
  

  // loadCompanies(): void {
  //   this.BranchServiceService.getCompany().subscribe(
  //     (result: any) => {
  //       this.companies = result;
  //     },
  //     (error: any) => {
  //       console.error('Error fetching countries:', error);
  //     }
  //   );
  // }


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
  
 

ClosePopup(){
  this.ref.close('Closed using function')
}

}
