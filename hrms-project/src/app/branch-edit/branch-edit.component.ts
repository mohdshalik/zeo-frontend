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
  br_branch_mail:any ='';
  br_company_id:any ='';
  br_state_id:any ='';
  br_country:any ='';
  branch_code:any='';
  probation_period_days:any='';

  branch_users:any='';
  branch_logo: File | null = null;
  // branch_logo: string | undefined;

  state_label: string = ''; // For dynamically storing state_label


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
    const file = event.target.files[0];
    if (file) {
      this.branch_logo = file;
    }
  }

  onStateChange(event: any): void {
    this.br_state_id = Number(event);
  }


  updateBranch(): void {
    const formData = new FormData();
  
    // Convert date field to 'YYYY-MM-DD' format before appending
    const formattedDate = this.formatDate(this.Emp.br_start_date);
  
    // Append all form fields, ensuring proper type conversion
    for (const key in this.Emp) {
      if (this.Emp.hasOwnProperty(key)) {
        let value = this.Emp[key];
  
        // Ensure primary key values are sent as numbers
        if (key === 'br_state_id' || key === 'br_created_by' || key === 'br_updated_by') {
          value = Number(value) || null;  // Convert to number or set to null if invalid
        }
  
        if (key === 'br_start_date') {
          formData.append(key, formattedDate); // Send the formatted date
        } else {
          formData.append(key, value);
        }
      }
    }
  
    // Append the file only if it's selected
    if (this.branch_logo) {
      formData.append('branch_logo', this.branch_logo);
    } else {
      formData.append('branch_logo', '');
    }
  
    // Automatically set the created and updated user IDs
    const loggedInUserId = this.authService.getLoggedInUserId(); // Replace with your actual method to get the user ID

  

    if (this.userId !== null && this.userId !== undefined) {
      formData.append('br_created_by', this.userId.toString());
      formData.append('br_updated_by', this.userId.toString());
      formData.append('br_state_id', this.userId.toString());


    } else {
      console.error('Logged-in user ID is null or undefined.');
    }
    
    this.BranchServiceService.updateBranch(this.data.employeeId, formData).subscribe(
      (response) => {
        console.log('Branches updated successfully:', response);
        this.dialogRef.close();
        window.location.reload();
      },
      (error) => {
        console.error('Error updating Branch:', error);
      }
    );
  }
  
  // Date format function
  formatDate(date: any): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
    if (this.br_country !== undefined) {
      this.loadStatesByCountry();
    }
  }
  
  loadStatesByCountry(): void {
    this.CountryService.getStatesByCountryId(this.br_country!).subscribe(
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
