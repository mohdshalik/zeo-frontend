import { Component , Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CountryService } from '../country.service';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../employee-master/employee.service'; 
import { EmployeeFamilyComponent } from '../employee-family/employee-family.component';
import { SuccesModalComponent } from '../succes-modal/succes-modal.component';
import { catchError, map, of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
// import { EmployeeAddMoreFieldComponent } from '../employee-add-more-field/employee-add-more-field.component';
export interface Employee {
  emp_code: string;
  id?: number; // Optional, only if you have an id
}


@Component({
  selector: 'app-uesr-employee',
  templateUrl: './uesr-employee.component.html',
  styleUrl: './uesr-employee.component.css'
})
export class UesrEmployeeComponent {


  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local


  id: string = ''; // Default initializer
  employeeId: number | null = null;  // Ensure this is assigned correctly
  selectedEmp: Employee | null = null;
  empCodeToIdMap: { [key: string]: number } = {}; // Maps emp_code to id

  selectedFile!: File;
  selectedDeparmentsecId:any | undefined;
  public companies: any[] = [];
  public userss: any[] = [];
  public branches: any[] = [];
  public countries: any[] = [];
  public states: any[] = [];
  public departments: any[] = [];
  public designations: any[] = [];
  public catogories: any[] = [];

  languages:any[] = [];

  registerButtonClicked = false;
  employees: Employee[] = [];
  // emp_code: string = ''; // Ensure this is initialized properly

  emp_code: string = ''; // Ensure this is bound correctly
  emp_first_name: string = '';
  emp_last_name:string ='';
  emp_gender:any ='';

  emp_date_of_birth:any ='';
  emp_personal_email:any ='';
  emp_mobile_number_1:any ='';
  emp_mobile_number_2:any ='';
  emp_city:any ='';

  emp_permenent_address:any ='';
  emp_present_address:any ='';
  emp_relegion:any ='';
  emp_blood_group:any ='';
  emp_nationality:any ='';
  emp_marital_status:any ='';
  emp_father_name:any ='';
  emp_mother_name:any ='';
  emp_posting_location:any ='';

  emp_country_id:any='';
  countryService: any='';
  emp_state_id:any='';
  emp_company_id:any='';
  emp_branch_id:any='';
  emp_dept_id:any='';
  emp_desgntn_id:any='';
  emp_ctgry_id:any='';
  // emp_languages: string[] = [];
  emp_languages: any='';
  emp_active_date:any='';
  emp_hired_date:any=''; 
  users:any=''; 
  selectedUser: any; // Declare the selectedUser property
  Emp: any;

  emp_profile_pic: string | undefined;

  is_ess: boolean = false;

  emp_status: boolean = false;

  employee: any;
  // users: string;

  isUserSelectDisabled: boolean = true; // Initially disabled

  // dialog: any;

  constructor(private EmployeeService: EmployeeService ,
    
    private CountryService: CountryService ,
    
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
   private ref:MatDialogRef<UesrEmployeeComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any,
   @Inject(MAT_DIALOG_DATA) public datas: { employeeId: number } // Inject data

  ) {

    // this.EmployeeService.getUserById(datas.employeeId).subscribe(Emp => {
    //   this.Emp = Emp;
    // });
    this.users = data.userId; // Get the passed userId

  }


   onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit(): void {

    console.log('ngOnInit - selectedEmployee:', this.emp_code);

    this.loadCountries();

    this.loadCompanies();
    this.loadbranches();
    this.loadDepartments();
    this.loadDesignation();
    this.loadcatg();
    this.loadLanguages();

    this.loadUsers();


    this.fetchEmployees();
    this.id = '2'; // Example, replace with actual logic

    // if (this.data && this.data.employeeId !== undefined) {
    //   this.employeeId = this.data.employeeId;

    //   if (this.employeeId !== undefined) {
    //     this.EmployeeService.getUserById(this.employeeId).pipe(
    //       map(emp => {
    //         // Transform or handle the data if needed
    //         return emp;
    //       }),
    //       catchError(error => {
    //         console.error('Error fetching employee data:', error);
    //         // Return a fallback value or empty object if needed
    //         return of({});
    //       })
    //     ).subscribe(
    //       emp => {
    //         this.Emp = emp; // Assign fetched data to the component property
    //         console.log('Employee Data:', this.Emp); // Log the data for debugging
    //       },
    //       error => {
    //         console.error('Error subscribing to employee data:', error); // Handle errors in subscription
    //       }
    //     );
    //   } else {
    //     console.error('employeeId is undefined');
    //   }
    // } else {
    //   console.error('No employeeId provided in dialog data.');
    // }
  

    this.route.params.subscribe(params => {
      this.employee = params['id'];
      // this.loadEmployeeDetails();
      // this.loadFamilyDetails();
      // this.loadQualification();
      // this.loadJobHistory();
      // this.loadEmpSkills();
      // this.loadEmpProgramSkills();


      
      // this.fetchEmployeeDocuments();
      // this.loadprogramlang();
      // this.loadMarprogramlang();
      // this.loadEmpMarkSkills();



    });
   
    const employeeIdParam = this.route.snapshot.paramMap.get('id');
    // this.loadFamilyDetails();


    // if (employeeIdParam) {
    //   const employeeId = +employeeIdParam;

    //   // Fetch employee details
    //   this.EmployeeService.getEmployeeDetails(employeeId).subscribe(
    //     (details) => {
    //       this.employee = details;
    //       // this.cdr.detectChanges(); // Manually trigger change detection

    //     },
    //     (error) => {
    //       console.error('Failed to fetch employee details', error);
    //     }
    //   );
    // } else {
    //   console.error('Employee ID parameter is null.');
    // }


  } 

  // fetchEmployees(): void {
  //   const selectedSchema = localStorage.getItem('selectedSchema');
  //   if (!selectedSchema) {
  //     console.error('No schema selected.');
  //   }
  //  const apiUrl = `http://${selectedSchema}.localhost:8000/employee/api/Employee/filter_empty_user_non_ess/`;

  //   this.http.get<any[]>(apiUrl).subscribe(
  //     (data) => {
  //       this.employees = data;
  //     },
  //     (error) => {
  //       console.error('Error fetching employee data', error);
  //     }
  //   );
  // }
//   fetchEmployees(): void {
//     const selectedSchema = this.selectedCompany?.schema_name;

//     if (!selectedSchema) {
//         console.error('No schema selected.');
//         return;
//     }

//     const apiUrl = `http://${selectedSchema}.localhost:8000/employee/api/Employee/filter_empty_user_non_ess/`;

//     this.http.get<any[]>(apiUrl).subscribe(
//         (data) => {
//             this.employees = data;
//             console.log('Employees fetched:', this.employees);
//         },
//         (error) => {
//             console.error('Error fetching employee data', error);
//         }
//     );
// }


// fetchEmployees(): void {
//   const selectedSchema = this.selectedCompany?.schema_name;

//   if (!selectedSchema) {
//     console.error('No schema selected.');
//     return;
//   }

//   const apiUrl = `http://${selectedSchema}.localhost:8000/employee/api/Employee/filter_empty_user_non_ess/`;

//   this.http.get<Employee[]>(apiUrl).subscribe(
//     (data) => {
//       this.employees = data;
//       // Create a mapping for emp_code to a generated ID
//       this.empCodeToIdMap = this.employees.reduce((map, employee, index) => {
//         map[employee.emp_code] = index + 1; // Simulated ID, adjust as needed
//         return map;
//       }, {} as { [key: string]: number });
//       console.log('Employees fetched:', this.employees);
//     },
//     (error) => {
//       console.error('Error fetching employee data', error);
//     }
//   );
// }

fetchEmployees(): void {
  const selectedSchema = this.selectedCompany?.schema_name;

  if (!selectedSchema) {
    console.error('No schema selected.');
    return;
  }

  const apiUrl = `${this.apiUrl}/employee/api/Employee/filter_empty_user_non_ess/?schema=${selectedSchema}`;

  this.http.get<Employee[]>(apiUrl).subscribe(
    (data) => {
      this.employees = data;

      // Ensure employee.id is a number before adding to the map
      this.empCodeToIdMap = this.employees.reduce((map, employee) => {
        if (employee.id != null) { // Check if id is not null or undefined
          map[employee.emp_code] = employee.id;
        } else {
          console.warn(`Employee with code ${employee.emp_code} does not have a valid ID.`);
        }
        return map;
      }, {} as { [key: string]: number });

      console.log('Employees fetched:', this.employees);
      console.log('Employee Code to ID Map:', this.empCodeToIdMap);
    },
    (error) => {
      console.error('Error fetching employee data', error);
    }
  );
}



createEmpCodeToIdMap(employees: Employee[]): { [key: string]: number } {
  const map: { [key: string]: number } = {};
  employees.forEach(employee => {
    if (employee.id) { // Ensure id is available
      map[employee.emp_code] = employee.id;
    }
  });
  return map;
}


  selectedCompany: any; // To hold the selected company object

  



  uploadEmployeeDocument(): void {
    this.registerButtonClicked = true;
    // const companyData = {
    //   emp_languages:this.emp_languages,

    // }

        // Basic validation for username and password fields
  // if (!this.emp_code || !this.emp_date_of_birth || this.emp_gender ||this.emp_personal_email||this.emp_mobile_number_1 ||this.emp_country_id || this.emp_state_id|| 
  //    this.emp_branch_id||this.emp_dept_id ||this.emp_desgntn_id||this.emp_ctgry_id) {
  //   if (!this.emp_code) {
  //     alert('Employee code field is blank.');
  //   }
  //   if (!this.emp_date_of_birth) {
  //     alert('Date Of birth field is blank.');
  //   }
  //   // if (!this.emp_gender) {
  //   //   alert('Gender field is blank.');
  //   // }
  //   // if (!this.emp_personal_email) {
  //   //   alert('Email id field is blank.');
  //   // }
  //   // if (!this.emp_mobile_number_1) {
  //   //   alert('Contact field is blank.');
  //   // }

  //   // if (!this.emp_country_id) {
  //   //   alert('Country field is blank.');
  //   // }

  //   // if (!this.emp_state_id) {
  //   //   alert('State field is blank.');
  //   // }

   
  //   if (!this.emp_branch_id) {
  //     alert('Branch field is blank.');
  //   }

  //   // if (!this.emp_dept_id) {
  //   //   alert('Department field is blank.');
  //   // }

  //   // if (!this.emp_desgntn_id) {
  //   //   alert('Designation field is blank.');
  //   // }

  //   // if (!this.emp_ctgry_id) {
  //   //   alert('Category field is blank.');
  //   // }
  //   // return; // Exit the function if validation fails
  // }
    
    const formData = new FormData();
    formData.append('emp_profile_pic', this.selectedFile);
    
    formData.append('emp_code', this.emp_code);
    formData.append('users', this.users);


    formData.append('emp_first_name', this.emp_first_name);
    formData.append('emp_last_name', this.emp_last_name);
    
  
    formData.append('emp_gender', this.emp_gender);
    formData.append('emp_date_of_birth', this.emp_date_of_birth);
    formData.append('emp_personal_email', this.emp_personal_email);
    formData.append('emp_mobile_number_1', this.emp_mobile_number_1);
    formData.append('emp_mobile_number_2', this.emp_mobile_number_2);
  
    formData.append('emp_city', this.emp_city);
    formData.append('emp_permenent_address', this.emp_permenent_address);
    formData.append('emp_present_address', this.emp_present_address);
    formData.append('emp_relegion', this.emp_relegion);
    formData.append('emp_blood_group', this.emp_blood_group);
  
    formData.append('emp_nationality', this.emp_nationality);
    formData.append('emp_marital_status', this.emp_marital_status);
    formData.append('emp_father_name', this.emp_father_name);
    formData.append('emp_mother_name', this.emp_mother_name);
    formData.append('emp_posting_location', this.emp_posting_location);
  

    formData.append('emp_country_id', this.emp_country_id);
    formData.append('emp_state_id', this.emp_state_id);


    formData.append('emp_branch_id', this.emp_branch_id);
    formData.append('emp_dept_id', this.emp_dept_id);

    formData.append('emp_desgntn_id', this.emp_desgntn_id);
    formData.append('emp_ctgry_id', this.emp_ctgry_id);
    // formData.append('emp_languages', this.emp_languages);

    // formData.append('emp_languages', JSON.stringify(this.emp_languages));
    formData.append('emp_active_date', this.emp_active_date);
    formData.append('emp_hired_date', this.emp_hired_date);
    formData.append('is_ess', this.is_ess ? '1' : '0');
    formData.append('emp_status', this.emp_status ? '1' : '0');

  
   
    console.log('Selected Company:', this.selectedCompany);

  
    if (this.selectedCompany) {
      const companyName = this.selectedCompany.schema_name;
      console.log(`Submitting to: ${this.apiUrl}/employee/api/employees/?schema=${companyName}`);
  
      this.http.post(`${this.apiUrl}/employee/api/employees/?schema=${companyName}`, formData)
        .subscribe({
          next: (response) => {
            console.log('Response:', response);
            window.alert('Form submitted successfully!');
          },
          error: (error) => {
            console.error('Error:', error);
            window.alert('An error occurred while submitting the form. Please try again.');
          }
        });
    } else {
      window.alert('No company selected. Please select a company first.');
    }
  
      
  }

  
//   uploaduserDocument(): void {
  

//     const formData = new FormData();
//     formData.append('emp_code', this.emp_code);
//     formData.append('selectedEmployee', this.emp_code); // Make sure this is needed
//     formData.append('company', JSON.stringify(this.selectedCompany)); // Ensure format is correct

//     console.log('Selected Company:', this.selectedCompany);

  
//     if (this.selectedCompany) {
//       const companyName = this.selectedCompany.schema_name;
//       console.log(`Submitting to: http://${companyName}.localhost:8000/employee/api/employees/`);
  
//       this.http.post(`http://${companyName}.localhost:8000/employee/api/employees/`, formData)
//         .subscribe({
//           next: (response) => {
//             console.log('Response:', response);
//             window.alert('Form submitted successfully!');
//           },
//           error: (error) => {
//             console.error('Error:', error);
//             window.alert('An error occurred while submitting the form. Please try again.');
//           }
//         });
//     } else {
//       window.alert('No company selected. Please select a company first.');
//     }
// }

// uploaduserDocument(): void {
//   if (!this.employeeId || !this.emp_code) {
//     console.error('Employee ID or emp_code is missing.');
//     window.alert('Please ensure all required fields are filled before submitting.');
//     return;
//   }

//   const formData = new FormData();
//   formData.append('emp_code', this.emp_code);
//   formData.append('selectedEmployee', this.emp_code);
//   formData.append('company', JSON.stringify(this.selectedCompany));

//   console.log('Selected Company:', this.selectedCompany);

//   const companyName = this.selectedCompany?.schema_name;
//   if (!companyName) {
//     console.error('No company selected.');
//     window.alert('No company selected. Please select a company before submitting.');
//     return;
//   }

//   const apiUrl = `http://${companyName}.localhost:8000/employee/api/add-employee/${this.employeeId}/`; // Use employeeId

//   console.log(`Submitting to: ${apiUrl}`);

//   this.EmployeeService.updateUser(this.employeeId, formData).subscribe({
//     next: (response) => {
//       console.log('Employee updated successfully:', response);
//       window.alert('Employee Details Edited');
//     },
//     error: (error) => {
//       console.error('Error updating employee:', error);
//       window.alert('An error occurred while updating the employee. Please try again.');
//     }
//   });
// }

uploaduserDocument(): void {
  if (!this.selectedEmp || !this.selectedCompany) {
    console.error('Employee or company details are missing.');
    window.alert('Please ensure all required fields are filled before submitting.');
    return;
  }

  const empCode = this.selectedEmp.emp_code;
  const empId = this.empCodeToIdMap[empCode];

  if (!empId) {
    console.error('Employee ID not found for selected emp_code.');
    window.alert('Invalid employee selected.');
    return;
  }

  const formData = new FormData();
  formData.append('users', this.users);
  formData.append('emp_code', empCode);
  formData.append('selectedEmployee', empCode);
  formData.append('company', JSON.stringify(this.selectedCompany));

  const companyName = this.selectedCompany.schema_name;
  const apiUrl = `${this.apiUrl}/employee/api/add-employee/${empId}/?schema=${companyName}`; // Updated to 'update-employee'

  console.log(`Submitting to: ${apiUrl}`);
 
  this.http.put(apiUrl, formData).subscribe({
    next: (response) => {
      console.log('Form updated successfully:', response);
      window.alert('Employee Details Updated');
    },
    error: (error) => {
      console.error('Error updating the form:', error);
      window.alert('An error occurred while updating the form. Please try again.');
    }
  });
}





onEmployeeChange(): void {
  if (this.selectedEmp) {
    const empCode = this.selectedEmp.emp_code;
    const empId = this.empCodeToIdMap[empCode];
    if (empId) {
      console.log('Selected Employee ID:', empId);
      console.log('Selected Employee Code:', empCode);
    } else {
      console.error('Employee ID not found for selected emp_code.');
    }
  } else {
    console.log('No employee selected.');
  }
}




setEmpCode(code: string): void {
  console.log('Setting emp_code:', code); // Add this line to check what is being set
  this.emp_code = code;
}

  onCompanyChange(): void {
    console.log('Selected Company Name:', this.selectedCompany?.schema_name);
    this.fetchEmployees(); // Fetch employees based on the selected company
    this.emp_code = ''; // Optionally reset or clear the selected employee
}

  
    // Method to enable the select dropdown
    enableUserSelect(): void {
      this.isUserSelectDisabled = false;
    }




 

//   ngOnInit(): void {
   

// }


loadCountries(): void {

  const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

  console.log('schemastore',selectedSchema )
  // Check if selectedSchema is available
  if (selectedSchema) {

  this.CountryService.getCountriesList(selectedSchema).subscribe(
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
  const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

  console.log('schemastore',selectedSchema )
  // Check if selectedSchema is available
  if (selectedSchema) {
  this.CountryService.getAllStatesList(selectedSchema).subscribe(
    (result: any) => {
      console.log(result); // Log the API response
      this.states = result; // Assuming the data is directly in the result without a 'data' property
    },
    (error) => {
      console.error('Error fetching states:', error);
    }
  );
  }
}



onCountryChange(): void {
  if (this.emp_country_id !== undefined) {
    this.loadStatesByCountry();
  }
}

loadStatesByCountry(): void {
  this.CountryService.getStatesByCountryId(this.emp_country_id!).subscribe(
    (result: any) => {
      console.log(result);
      this.states = result; // Assuming the data is directly in the result without a 'data' property
    },
    (error) => {
      console.error('Error fetching states:', error);
    }
  );
}



loadCompanies(): void {
  
  this.companyRegistrationService.getCompany().subscribe(
    (result: any) => {
      this.companies = result;
    },
    (error: any) => {
      console.error('Error fetching countries:', error);
    }
  );
}

loadUsers(): void {
  
  this.companyRegistrationService.getUsers().subscribe(
    (result: any) => {
      this.userss = result;
    },
    (error: any) => {
      console.error('Error fetching countries:', error);
    }
  );
}

loadbranches(): void {
  const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

  console.log('schemastore',selectedSchema )
  // Check if selectedSchema is available
  if (selectedSchema) {
  this.companyRegistrationService.getBranchesList(selectedSchema).subscribe(
    (result: any) => {
      this.branches = result;
    },
    (error: any) => {
      console.error('Error fetching countries:', error);
    }
  );
  }
}

loadDepartments(): void {
  const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

  console.log('schemastore',selectedSchema )
  // Check if selectedSchema is available
  if (selectedSchema) {

  this.companyRegistrationService.getDepartmentsList(selectedSchema).subscribe(
    (result: any) => {
      this.departments = result;
    },
    (error: any) => {
      console.error('Error fetching countries:', error);
    }
  );
  }
}

loadDesignation(): void {

  const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

  console.log('schemastore',selectedSchema )
  // Check if selectedSchema is available
  if (selectedSchema) {
  this.companyRegistrationService.getDesignationList(selectedSchema).subscribe(
    (result: any) => {
      this.designations = result;
    },
    (error: any) => {
      console.error('Error fetching designations:', error);
    }
  );
  }
}

loadcatg(): void {
  const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

  console.log('schemastore',selectedSchema )
  // Check if selectedSchema is available
  if (selectedSchema) {
  this.companyRegistrationService.getcatgoriesList(selectedSchema).subscribe(
    (result: any) => {
      this.catogories = result;
    },
    (error: any) => {
      console.error('Error fetching catogories:', error);
    }
  );
  }
}

loadLanguages(): void {
  const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

  console.log('schemastore',selectedSchema )
  // Check if selectedSchema is available
  if (selectedSchema) {

  this.CountryService.getLanguagesList(selectedSchema).subscribe(
    (result: any) => {
      this.languages = result;
    },
    (error: any) => {
      console.error('Error fetching languages:', error);
    }
  );
  }
}

  ClosePopup(){
    this.ref.close('Closed using function')
    // this.dialog.open(SuccesModalComponent,{
    //   width:'80%',
    //   height:'500px',
    // })
    
    
    
  }

  

}
