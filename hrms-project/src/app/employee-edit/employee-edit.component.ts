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
import { EmployeeAddMoreFieldComponent } from '../employee-add-more-field/employee-add-more-field.component';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css'
})
export class EmployeeEditComponent {


  selectedFile: File | undefined;
  selectedDeparmentsecId:any | undefined;
  countries: any[] = [];
  states: any[] = [];
  companies: any[] = [];
  branches:any[] = [];
  departments:any[] = [];
  designations:any[] = [];
  catogories:any[] =[];
  languages:any[] = [];
  Fields:any[] = [];

  empCodeFieldName: string = 'Employee Code';
  firstNameFieldName: string = 'First Name';
  lastNameFieldName: string = 'First Name';
  emailFieldName: string = 'Email';
  dobFieldName: string = 'Date Of Birth';
  cmpnoFieldName: string = 'Company Number';
  pernoFieldName: string = 'Personal Number';
  peraddressFieldName: string = 'Permanent Address';
  preaddressFieldName: string = 'Present Address';
  cityFieldName: string = 'City';
  nationFieldName: string = 'Nationality';
  fatherFieldName: string = 'Father Name';
  motherFieldName: string = 'Mother Name';
  genderFieldName: string = 'Gender';  // Initial Gender field name
  maritalFieldName: string = 'Marital Status';
  religionFieldName: string = 'Religion';
  bloodFieldName: string = 'Blood Group';
  locationFieldName: string = 'Location';
  cntryFieldName: string = 'Country';
  brchFieldName: string = 'Branch';
  deptFieldName: string = 'Department';
  desFieldName: string = 'Designation';
  catFieldName: string = 'Catogory';

  hiredFieldName: string = 'Hired Date';

  joinFieldName: string = 'Joining Date';

  registerButtonClicked = false;

  Emp: any = {};
  EmpD: any = {};
  field: any = {};


  emp_code:string = '';
  emp_first_name: string = '';
  emp_last_name:string ='';
  emp_gender:any ='';

  emp_date_of_birth:any ='';
  emp_personal_email:any ='';
  emp_company_email:any ='';

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
  emp_active_date:any='';
  emp_hired_date:any=''; 
  emp_date_of_confirmation:any='';
  emp_joined_date:any=''; 


  is_ess: boolean = false;

  emp_status: boolean = false;
  emp_id: number;

  selectedCustomField: any = {}; // To hold the selected custom field
  customFieldValues: { [key: number]: any } = {}; // Holds custom field values

  constructor(
    private ref:MatDialogRef<EmployeeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: number },
    private EmployeeService: EmployeeService,
    private CountryService: CountryService,
    private CompanyRegistrationService: CompanyRegistrationService,


    private renderer: Renderer2,
    private http: HttpClient,
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private dialogRef: MatDialogRef<EmployeeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: any,
  ) {
    this.emp_id = datas.emp_id;

    this.EmployeeService.getEmpById(data.employeeId).subscribe(Emp => {
      this.Emp = Emp;
    });
  }



  ngOnInit(): void {
    this.EmployeeService.getEmpById(this.data.employeeId).subscribe(
      (Emp) => {
        this.Emp = Emp;
         this.EmpD.emp_master = Emp.id; // Assuming `Emp.id` corresponds to the employee ID

            this.Emp.custom_fields.forEach((field: any) => {
                this.customFieldValues[field.id] = field.field_value;
            });
         // Initialize selectedCustomField with the first custom field
    if (this.Emp.custom_fields && this.Emp.custom_fields.length > 0) {
      this.selectedCustomField = this.Emp.custom_fields[0]; // Initialize with the first field or as needed
    } else {
      console.error('No custom fields available');
    }

          console.log('Selected Custom Field after initialization:', this.selectedCustomField);

        
      },
      (error) => {
        console.error('Error fetching category:', error);
      }
    );

    
    this.loadEmployeeDetails(this.data.employeeId);

    // this.loadEmployeeDetailsFeilds(this.data.employeeId);

    this.loadCountries();

    this.loadCompanies();
    this.loadbranches();
    this.loadDepartments();
    this.loadDesignation();
    this.loadcatg();
    this.loadLanguages();
    this.loadEmployee();
    this.loadEmployeecust_value();
    this.loadFieldNames();
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
}


 
  updateEmp(): void {
    // Create FormData object
    const formData = new FormData();
    
    // Append profile picture file if selected
    if (this.selectedFile) {
        formData.append('emp_profile_pic', this.selectedFile, this.selectedFile.name);
    }
            // Basic validation for username and password fields
//   if (!this.emp_code || !this.emp_date_of_birth || this.emp_gender ||this.emp_personal_email||this.emp_mobile_number_1 ||this.emp_country_id || this.emp_state_id|| this.emp_company_id||
//     this.emp_branch_id||this.emp_dept_id ||this.emp_desgntn_id||this.emp_ctgry_id) {
//    if (!this.emp_code) {
//      alert('Employee code field is blank.');
//    }
//    if (!this.emp_date_of_birth) {
//      alert('Date Of birth field is blank.');
//    }
//    if (!this.emp_gender) {
//      alert('Gender field is blank.');
//    }
//    if (!this.emp_personal_email) {
//      alert('Email id field is blank.');
//    }
//    if (!this.emp_mobile_number_1) {
//      alert('Contact field is blank.');
//    }

//    if (!this.emp_country_id) {
//      alert('Country field is blank.');
//    }

//    if (!this.emp_state_id) {
//      alert('State field is blank.');
//    }

//    if (!this.emp_company_id) {
//      alert('Company field is blank.');
//    }
//    if (!this.emp_branch_id) {
//      alert('Branch field is blank.');
//    }

//    if (!this.emp_dept_id) {
//      alert('Department field is blank.');
//    }

//    if (!this.emp_desgntn_id) {
//      alert('Designation field is blank.');
//    }

//    if (!this.emp_ctgry_id) {
//      alert('Category field is blank.');
//    }
//    // return; // Exit the function if validation fails
//  }
   
const selectedDate = new Date(this.emp_date_of_confirmation);
const formattedDate = selectedDate.toISOString().split('T')[0]; // Converts to "YYYY-MM-DD"

const joinedDate = new Date(this.emp_joined_date);
const formattedJoinedDate = joinedDate.toISOString().split('T')[0];
    
    // Append other employee details
    formData.append('emp_code', this.Emp.emp_code);

    formData.append('emp_first_name', this.Emp.emp_first_name);
    formData.append('emp_last_name', this.Emp.emp_last_name); 
    formData.append('emp_gender', this.Emp.emp_gender);
    formData.append('emp_date_of_birth', this.Emp.emp_date_of_birth);
    formData.append('emp_personal_email', this.Emp.emp_personal_email);
    formData.append('emp_company_email', this.emp_company_email);

    formData.append('emp_mobile_number_1', this.Emp.emp_mobile_number_1);
    formData.append('emp_mobile_number_2', this.Emp.emp_mobile_number_2);
    formData.append('emp_city', this.Emp.emp_city);
    formData.append('emp_permenent_address', this.Emp.emp_permenent_address);
    formData.append('emp_present_address', this.Emp.emp_present_address);
    formData.append('emp_relegion', this.Emp.emp_relegion);
    formData.append('emp_blood_group', this.Emp.emp_blood_group);
    formData.append('emp_nationality', this.Emp.emp_nationality);
    formData.append('emp_marital_status', this.Emp.emp_marital_status);
    formData.append('emp_father_name', this.Emp.emp_father_name);
    formData.append('emp_mother_name', this.Emp.emp_mother_name);
    formData.append('emp_posting_location', this.Emp.emp_posting_location);
    formData.append('emp_country_id', this.emp_country_id);
    formData.append('emp_state_id', this.emp_state_id);
    formData.append('emp_company_id', this.Emp.emp_company_id);
    formData.append('emp_branch_id', this.Emp.emp_branch_id);
    formData.append('emp_dept_id', this.Emp.emp_dept_id);
    formData.append('emp_desgntn_id', this.Emp.emp_desgntn_id);
    formData.append('emp_ctgry_id', this.Emp.emp_ctgry_id);
    // formData.append('emp_languages', JSON.stringify(this.Emp.emp_languages)); // Assuming emp_languages is an array of strings
       // formData.append('emp_date_of_confirmation', this.emp_date_of_confirmation);
       formData.append('emp_date_of_confirmation', formattedDate);

       // formData.append('emp_joined_date', this.emp_joined_date);
       formData.append('emp_joined_date', formattedJoinedDate);
    formData.append('is_ess', this.Emp.is_ess ? '1' : '0');
    formData.append('emp_status', this.Emp.emp_status ? '1' : '0');

    // Update employee details
    this.EmployeeService.updateEmp(this.data.employeeId, formData).subscribe(
        (response) => {
            console.log('Employee updated successfully:', response);
            alert('Employee Details Edited  ');
            // Close the dialog when employee is updated
            this.updateCustomFieldValues();
            this.dialogRef.close();
            const dialogRef = this.dialog.open(SuccesModalComponent, {
                width: '300px',
                data: { message: 'Employee updated successfully!' }
            });
            dialogRef.afterClosed().subscribe(() => {
                console.log('The success modal was closed');
                // Handle any actions after the modal is closed, if needed
            });

    
         
        },
        (error) => {
          alert('Enter all fields correctly');
            console.error('Error updating employee:', error);
        }
    );
}
 
updateCustomFieldValues() {
  this.Emp.custom_fields.forEach((field: any) => {
      const fieldData = {
          id: field.id,
          emp_custom_field: field.emp_custom_field,
          field_value: this.customFieldValues[field.id],
          emp_master: this.data.employeeId
      };

      this.EmployeeService.registerEmpAddMoreFeildValues(fieldData).subscribe(
          response => {
              console.log('Custom field value updated successfully:', response);
          },
          error => {
              console.error('Error updating custom field value:', error);
          }
      );
  });
}


addMoreField(employeeId: number): void {
  const dialogRef = this.dialog.open(EmployeeAddMoreFieldComponent, {
      width: '80%',
      height: '500px',
      data: { emp_id: employeeId }
  });

  dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
  });
}

// updateEmp(): void {
//   // Call registerFiledValues() and chain the updateEmp() logic
//   this.registerFiledValues().pipe(
//     // Proceed with the update only if registerFiledValues() succeeds
//     switchMap(() => {
//       // Create FormData object
//       const formData = new FormData();
      
//       // Append profile picture file if selected
//       if (this.selectedFile) {
//         formData.append('emp_profile_pic', this.selectedFile, this.selectedFile.name);
//       }

//       // Append other employee details
//       formData.append('emp_code', this.Emp.emp_first_name);
//       formData.append('emp_first_name', this.Emp.emp_first_name);
//       formData.append('emp_last_name', this.Emp.emp_last_name);
//       formData.append('emp_gender', this.Emp.emp_gender);
//       formData.append('emp_date_of_birth', this.Emp.emp_date_of_birth);
//       formData.append('emp_personal_email', this.Emp.emp_personal_email);
//       formData.append('emp_mobile_number_1', this.Emp.emp_mobile_number_1);
//       formData.append('emp_mobile_number_2', this.Emp.emp_mobile_number_2);
//       formData.append('emp_city', this.Emp.emp_city);
//       formData.append('emp_permenent_address', this.Emp.emp_permenent_address);
//       formData.append('emp_present_address', this.Emp.emp_present_address);
//       formData.append('emp_relegion', this.Emp.emp_relegion);
//       formData.append('emp_blood_group', this.Emp.emp_blood_group);
//       formData.append('emp_nationality', this.Emp.emp_nationality);
//       formData.append('emp_marital_status', this.Emp.emp_marital_status);
//       formData.append('emp_father_name', this.Emp.emp_father_name);
//       formData.append('emp_mother_name', this.Emp.emp_mother_name);
//       formData.append('emp_posting_location', this.Emp.emp_posting_location);
//       formData.append('emp_country_id', this.Emp.emp_country_id);
//       formData.append('emp_state_id', this.Emp.emp_state_id);
//       formData.append('emp_company_id', this.Emp.emp_company_id);
//       formData.append('emp_branch_id', this.Emp.emp_branch_id);
//       formData.append('emp_dept_id', this.Emp.emp_dept_id);
//       formData.append('emp_desgntn_id', this.Emp.emp_desgntn_id);
//       formData.append('emp_ctgry_id', this.Emp.emp_ctgry_id);
//       // formData.append('emp_languages', JSON.stringify(this.Emp.emp_languages)); // Assuming emp_languages is an array of strings
//       formData.append('emp_active_date', this.Emp.emp_active_date);
//       formData.append('emp_hired_date', this.Emp.emp_hired_date);
//       formData.append('is_ess', this.Emp.is_ess ? '1' : '0');
//       formData.append('emp_status', this.Emp.emp_status ? '1' : '0');

//       // Update employee details
//       return this.EmployeeService.updateEmp(this.data.employeeId, formData);
//     })
//   ).subscribe(
//     (response) => {
//       console.log('Employee updated successfully:', response);
//       alert('Employee Details Edited');
//       // Close the dialog when employee is updated
//       this.dialogRef.close();
//       const dialogRef = this.dialog.open(SuccesModalComponent, {
//         width: '300px',
//         data: { message: 'Employee updated successfully!' }
//       });
//       dialogRef.afterClosed().subscribe(() => {
//         console.log('The success modal was closed');
//         // Handle any actions after the modal is closed, if needed
//       });
//     },
//     (error) => {
//       alert('Enter all fields correctly');
//       console.error('Error updating employee:', error);
//     }
//   );
// }


loadEmployeeDetails(employeeId: number): void {
  this.EmployeeService.getEmpById(employeeId).subscribe(
      (Emp) => {
          this.Emp = Emp;
      },
      (error) => {
          console.error('Error fetching employee:', error);
      }
  );
}



field_value:any="";
emp_custom_field:any="";
emp_master:any="";




registerFiledValues(): Observable<any> {
  this.registerButtonClicked = true;

  // Ensure selectedCustomField is not null or undefined
  if (!this.selectedCustomField || !this.selectedCustomField.emp_custom_field) {
    console.error('Selected custom field is not set');
    return of(null); // Return an Observable that completes immediately if validation fails
  }

  console.log('EmpD.emp_master:', this.EmpD.emp_master); // Debugging log

  // Prepare the data as a JSON object
  const requestData = {
    field_value: this.Emp.field_value,
    emp_master: this.EmpD.emp_master, // Assuming `emp_master` is the employee ID
    emp_custom_field: this.selectedCustomField.emp_custom_field,
  };

  console.log('Selected Custom Field:', this.selectedCustomField);
  console.log('Request Data:', requestData);

  // Send the data as JSON
  return this.EmployeeService.registerEmpAddMoreFeildValues(requestData).pipe(
    tap((response) => {
      console.log('Registration successful', response);
      alert('Field values have been registered successfully.');
    }),
    catchError((error) => {
      console.error('Registration failed', error);
      alert('Please fill in all fields!');
      return of(null); // Return an Observable that completes immediately if an error occurs
    })
  );
}



addMoreFields(employeeId: number): void {

  this.registerButtonClicked = true;

  // Ensure selectedCustomField is not null or undefined
  if (!this.selectedCustomField || !this.selectedCustomField.emp_custom_field) {
    console.error('Selected custom field is not set');
    alert('Please select a custom field!');
    return;
  }

  console.log('EmpD.emp_master:', this.EmpD.emp_master); // Debugging log

  // Prepare the data as a JSON object
  const requestData = {
    field_value: this.Emp.field_value,
    emp_master: this.EmpD.emp_master, // Assuming `emp_master` is the employee ID
    emp_custom_field: this.selectedCustomField.emp_custom_field,

  };
  console.log('Selected Custom Field:', this.selectedCustomField);
console.log('Request Data:', requestData);

  // Send the data as JSON
  this.EmployeeService.registerEmpAddMoreFeildValues(requestData).subscribe(
    (response) => {
      console.log('Registration successful', response);
      alert('Field values have been registered successfully.');
      
      const dialogRef = this.dialog.open(EmployeeAddMoreFieldComponent,{
        width: '80%',
        height: '500px',
        data: { emp_id: employeeId },
      
    });
  
  
    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
    });
      // window.location.reload();
    },
    (error) => {
      console.error('Registration failed', error);
      alert('Please fill in all fields!');
    }
  );




}


// loadEmployeeDetailsFeilds(employeeId: number): void {
//   this.EmployeeService.getEmpByIdCustomFeild(employeeId).subscribe(
//       (fields) => {
//           this.Fields = fields.custom_fields; // Ensure you access custom_fields
//       },
//       (error) => {
//           console.error('Error fetching employee:', error);
//       }
//   );
// }



 
loadCountries(): void {

  const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

  console.log('schemastore',selectedSchema );
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

  console.log('schemastore',selectedSchema );
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
  
  this.CompanyRegistrationService.getCompany().subscribe(
    (result: any) => {
      this.companies = result;
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
  this.CompanyRegistrationService.getBranchesList(selectedSchema).subscribe(
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

  this.CompanyRegistrationService.getDepartmentsList(selectedSchema).subscribe(
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
  this.CompanyRegistrationService.getDesignationList(selectedSchema).subscribe(
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
  this.CompanyRegistrationService.getcatgoriesList(selectedSchema).subscribe(
    (result: any) => {
      this.catogories = result;
    },
    (error: any) => {
      console.error('Error fetching catogories:', error);
    }
  );
  }
}

loadFieldNames(): void {
  // Load field names from localStorage
  const savedEmpCodeFieldName = localStorage.getItem('empCodeFieldName');
  const savedFirstNameFieldName = localStorage.getItem('firstNameFieldName');
  const savedLastNameFieldName = localStorage.getItem('lastNameFieldName');
  const savedemailFieldName = localStorage.getItem('emailFieldName');
  const saveddobFieldName = localStorage.getItem('dobFieldName');
  const savedcmpnoFieldName = localStorage.getItem('cmpnoFieldName');
  const savedpernoFieldName = localStorage.getItem('pernoFieldName');

  const savedperaddressFieldName = localStorage.getItem('peraddressFieldName');
  const savedpreaddressFieldName = localStorage.getItem('preaddressFieldName');
  const savedcityFieldName = localStorage.getItem('cityFieldName');

  const savednationFieldName = localStorage.getItem('nationFieldName');


      // Load field names from localStorage
      const savedGenderFieldName = localStorage.getItem('genderFieldName');
      if (savedGenderFieldName) {
          this.genderFieldName = savedGenderFieldName;
      }

           // Load field names from localStorage
           const savedMaritalFieldName = localStorage.getItem('maritalFieldName');
           if (savedMaritalFieldName) {
               this.maritalFieldName = savedMaritalFieldName;
           }
   

  if (savedEmpCodeFieldName) {
    this.empCodeFieldName = savedEmpCodeFieldName;
  }
  if (savedFirstNameFieldName) {
    this.firstNameFieldName = savedFirstNameFieldName;
  }
  if (savedLastNameFieldName) {
    this.lastNameFieldName = savedLastNameFieldName;
  }
  if (savedemailFieldName) {
    this.emailFieldName = savedemailFieldName;
  }
  if (saveddobFieldName) {
    this.dobFieldName = saveddobFieldName;
  }
  if (savedcmpnoFieldName) {
    this.cmpnoFieldName = savedcmpnoFieldName;
  }
  if (savedpernoFieldName) {
    this.pernoFieldName = savedpernoFieldName;
  }
  if (savedperaddressFieldName) {
    this.peraddressFieldName = savedperaddressFieldName;
  }
    
  if (savedpreaddressFieldName) {
    this.preaddressFieldName = savedpreaddressFieldName;
  }

  if (savedcityFieldName) {
    this.cityFieldName = savedcityFieldName;
  }
  
  if (savednationFieldName) {
    this.nationFieldName = savednationFieldName;
  }

  const savedReligionFieldName = localStorage.getItem('religionFieldName');
  if (savedReligionFieldName) {
      this.religionFieldName = savedReligionFieldName;
  }

  const savedBloodFieldName = localStorage.getItem('bloodFieldName');
  if (savedBloodFieldName) {
      this.bloodFieldName = savedBloodFieldName;
  }


  const savedfatherFieldName = localStorage.getItem('fatherFieldName');
  if (savedfatherFieldName) {
    this.fatherFieldName = savedfatherFieldName;
}

   const savedmotherFieldName = localStorage.getItem('motherFieldName');
  if (savedmotherFieldName) {
    this.motherFieldName = savedmotherFieldName;
}

   // Load field names from localStorage
   const savedLocationFieldName = localStorage.getItem('locationFieldName');
   if (savedLocationFieldName) {
       this.locationFieldName = savedLocationFieldName;
   }

     // Load field names from localStorage
     const savedcntryFieldName = localStorage.getItem('cntryFieldName');
     if (savedcntryFieldName) {
         this.cntryFieldName = savedcntryFieldName;
     }

       // Load field names from localStorage
       const savedbrchFieldName = localStorage.getItem('brchFieldName');
       if (savedbrchFieldName) {
           this.brchFieldName = savedbrchFieldName;
       }


         // Load field names from localStorage
         const saveddeptFieldName = localStorage.getItem('deptFieldName');
         if (saveddeptFieldName) {
             this.deptFieldName = saveddeptFieldName;
         }

           // Load field names from localStorage
           const saveddesFieldName = localStorage.getItem('desFieldName');
           if (saveddesFieldName) {
               this.desFieldName = saveddesFieldName;
           }


           
           // Load field names from localStorage
           const savedcatFieldName = localStorage.getItem('catFieldName');
           if (savedcatFieldName) {
               this.catFieldName = savedcatFieldName;
           }


           const savedhiredFieldName = localStorage.getItem('hiredFieldName');
           if (savedhiredFieldName) {
             this.hiredFieldName = savedhiredFieldName;
         }

         const savedjoinFieldName = localStorage.getItem('joinFieldName');
         if (savedjoinFieldName) {
           this.joinFieldName = savedjoinFieldName;
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

employeeList: any[] = []; // Define the employeeList property
employeecusValues: any[] = []; // Define the employeeList property

loadEmployee(): void {
    
  const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

  console.log('schemastore',selectedSchema )
  // Check if selectedSchema is available
  if (selectedSchema) {
    this.EmployeeService.getemployees(selectedSchema).subscribe(
      (result: any) => {
        this.employeeList = result;
        console.log(' fetching Employees:');

      },
      (error) => {
        console.error('Error fetching Employees:', error);
      }
    );
  }
  }


  loadEmployeecust_value(): void {
    
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
  
    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
      this.EmployeeService.getemployeescusValue(selectedSchema).subscribe(
        (result: any) => {
          this.employeecusValues = result;
          console.log(' fetching Employees:');
  
        },
        (error) => {
          console.error('Error fetching Employees:', error);
        }
      );
    }
    }

  
  


  ClosePopup(){
    this.ref.close('Closed using function')
  }

}
