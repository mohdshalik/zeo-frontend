import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CountryService } from '../country.service';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../employee-master/employee.service';
import { EmployeeFamilyComponent } from '../employee-family/employee-family.component';
import { SuccesModalComponent } from '../succes-modal/succes-modal.component';
import { throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeAddMoreFieldComponent } from '../employee-add-more-field/employee-add-more-field.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent implements OnInit {

  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local


  selectedFile!: File | null;

  selectedDeparmentsecId: any | undefined;
  countries: any[] = [];
  states: any[] = [];
  companies: any[] = [];
  branches: any[] = [];
  departments: any[] = [];
  designations: any[] = [];
  catogories: any[] = [];
  languages: any[] = [];
  Religions: any[] = [];


  state_label: string = ''; // For dynamically storing state_label



  registerButtonClicked = false;


  emp_code: any = '';
  temp_emp_code: string | null = null;

  emp_first_name: string = '';
  emp_last_name: string = '';
  emp_gender: any = '';

  emp_date_of_birth: any = '';
  emp_personal_email: any = '';
  emp_company_email: any = '';

  emp_mobile_number_1: any = '';
  emp_mobile_number_2: any = '';
  emp_city: any = '';

  emp_permenent_address: any = '';
  emp_present_address: any = '';
  emp_relegion: any = '';
  emp_blood_group: any = '';
  emp_nationality: any = '';
  emp_marital_status: any = '';
  emp_father_name: any = '';
  emp_mother_name: any = '';
  emp_posting_location: any = '';

  emp_country_id: any = '';
  countryService: any = '';
  emp_state_id: any = '';
  emp_company_id: any = '';
  emp_branch_id: any = '';
  emp_dept_id: any = '';
  emp_desgntn_id: any = '';
  emp_ctgry_id: any = '';
  emp_languages: any = '';
  emp_date_of_confirmation: any = '';
  emp_joined_date: any = '';
  emp_profile_pic: string | undefined;

  is_ess: boolean = false;

  emp_status: boolean = false;

  employee: any;

  custom_fields: any[] = [];

  dropdownOptions: string[] = []; // Property to store the dropdown options




  // Initial field names
  empCodeFieldName: string = 'Employee Code';
  firstNameFieldName: string = 'First Name';
  isFirstNameMandatory: boolean = false; // Property to check if the field is mandatory



  lastNameFieldName: string = 'Last Name';
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

  hiredFieldName: string = 'Hired Date';

  joinFieldName: string = 'Joining Date';




  isLastNameMandatory: boolean = false; // New property to store the checkbox state
  isGenderMandatory: boolean = false; // New property to store the checkbox state
  isEmailMandatory: boolean = false; // New property to store the checkbox state

  isCmpnoMandatory: boolean = false; // New property to store the checkbox state
  isPernoMandatory: boolean = false; // New property to store the checkbox state
  isPeraddMandatory: boolean = false; // New property to store the checkbox state
  isPresaddMandatory: boolean = false; // New property to store the checkbox state
  isCityMandatory: boolean = false; // New property to store the checkbox state
  isRelMandatory: boolean = false; // New property to store the checkbox state
  isBloodMandatory: boolean = false; // New property to store the checkbox state

  isNatMandatory: boolean = false; // New property to store the checkbox state
  isMariMandatory: boolean = false; // New property to store the checkbox state
  isFatherMandatory: boolean = false; // New property to store the checkbox state
  isMotherMandatory: boolean = false; // New property to store the checkbox state
  isLocationMandatory: boolean = false; // New property to store the checkbox state
  isLCountryMandatory: boolean = false; // New property to store the checkbox state
  isLBranchMandatory: boolean = false; // New property to store the checkbox state

  isLDepartmentMandatory: boolean = false; // New property to store the checkbox state
  isLDesignationMandatory: boolean = false; // New property to store the checkbox state
  isLCatogoryMandatory: boolean = false; // New property to store the checkbox state
  isHiringMandatory: boolean = false; // New property to store the checkbox state





  selectedDataType: string = 'Text Box'; // Default data type

  temp_emp_gender: string | null = null;
  temp_religion: string | null = null;


  genderDropdownOptions: string[] = [];

  genderDataType: string = 'Dropdown';   // Default data type for Gender

  genderFieldName: string = 'Gender';  // Initial Gender field name

  religionFieldName: string = 'Religion';
  selectedDataTypereligion: string = 'Text Box'; // Default data type
  dropdownValuesreligion: string = ''; // Property to store dropdown values as a comma-separated string
  ReligionDropdownOptions: string[] = [];  // Property to store the dropdown options

  bloodFieldName: string = 'Blood Group';
  selectedDataTypeblood: string = 'Text Box'; // Default data type
  dropdownValuesblood: string = ''; // Property to store dropdown values as a comma-separated string
  bloodDropdownOptions: string[] = [];  // Property to store the dropdown options
  temp_blood: string | null = null;


  maritalFieldName: string = 'Marital Status';
  temp_emp_marital: string | null = null;
  maritalDropdownOptions: string[] = [];
  maritalDataType: string = 'Dropdown';   // Default data type for Gender


  locationFieldName: string = 'Location';
  temp_emp_location: string | null = null;
  locationDropdownOptions: string[] = [];
  locationDataType: string = 'Dropdown';   // Default data type for Gender


  cntryFieldName: string = 'Country';
  temp_emp_cntry: string | null = null;
  cntryDropdownOptions: string[] = [];
  cntryDataType: string = 'Dropdown';   // Default data type for Gender


  brchFieldName: string = 'Branch';
  temp_emp_brch: string | null = null;
  brchDropdownOptions: string[] = [];
  brchDataType: string = 'Dropdown';   // Default data type for Gender

  deptFieldName: string = 'Department';
  temp_emp_dept: string | null = null;
  deptDropdownOptions: string[] = [];
  deptDataType: string = 'Dropdown';   // Default data type for Gender

  desFieldName: string = 'Designation';
  temp_emp_des: string | null = null;
  desDropdownOptions: string[] = [];
  desDataType: string = 'Dropdown';   // Default data type for Gender


  catFieldName: string = 'Catogory';
  temp_emp_cat: string | null = null;
  catDropdownOptions: string[] = [];
  catDataType: string = 'Dropdown';   // Default data type for Gender

  // dialog: any;


  isFirstNameFieldHidden: boolean = false; // New variable to track if the field is disabled
  isLasstNameFieldHidden: boolean = false;
  isGernderNameFieldHidden: boolean = false;
  isEmailNameFieldHidden: boolean = false;
  isCmpNoNameFieldHidden: boolean = false;
  isPerNoNameFieldHidden: boolean = false;
  isPermaddNameFieldHidden: boolean = false;
  isPresentaddNameFieldHidden: boolean = false;
  isCityFieldHidden: boolean = false;
  isReliFieldHidden: boolean = false;
  isBloodFieldHidden: boolean = false;
  isNationFieldHidden: boolean = false;
  isMaritalFieldHidden: boolean = false;
  isFatherFieldHidden: boolean = false;
  isMotherFieldHidden: boolean = false;
  isLocationFieldHidden: boolean = false;
  isCountryFieldHidden: boolean = false;
  isBranchFieldHidden: boolean = false;
  isDepartFieldHidden: boolean = false;
  isDesignationFieldHidden: boolean = false;
  isCatFieldHidden: boolean = false;
  isHireFieldHidden: boolean = false;



  ReadMore: boolean = true;


  //hiding info box
  visible: boolean = true;
  visibility: boolean = false;
  show: boolean = false;
  createem: boolean = true;


  constructor(private EmployeeService: EmployeeService,
    private CountryService: CountryService,

    private companyRegistrationService: CompanyRegistrationService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private ref: MatDialogRef<CreateEmployeeComponent>) { }


  //  onFileSelected(event: any): void {
  //   this.selectedFile = event.target.files[0];
  // }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files.length > 0 ? event.target.files[0] : null;
  }


  selectedEmployeeId: number | null = null;

  ngOnInit(): void {
    this.loadFieldNames();
    this.loadFieldDisplay();

    // Assuming you fetch the employee ID from a route or service
    const employeeId = this.route.snapshot.params['id'];
    this.loadEmployeeDetails(employeeId);
    this.selectedDataType = localStorage.getItem('selectedDataType') || this.selectedDataType;



    if (this.selectedDataType === 'Dropdown') {
      const savedDropdownValues = localStorage.getItem('dropdownValues');
      if (savedDropdownValues) {
        this.dropdownOptions = savedDropdownValues.split(','); // Convert comma-separated string to array
      }
    }

    this.genderDataType = localStorage.getItem('genderDataType') || this.genderDataType;

    if (this.genderDataType === 'Dropdown') {
      const savedGenderDropdownValues = localStorage.getItem('genderDropdownValues');
      if (savedGenderDropdownValues) {
        this.genderDropdownOptions = savedGenderDropdownValues.split(',');
      }
    }

    this.selectedDataTypereligion = localStorage.getItem('selectedDataTypereligion') || this.selectedDataTypereligion;

    if (this.selectedDataTypereligion === 'Dropdown') {
      const savedRegionDropdownValues = localStorage.getItem('dropdownValuesreligion');
      if (savedRegionDropdownValues) {
        this.ReligionDropdownOptions = savedRegionDropdownValues.split(','); // Convert comma-separated string to array
      }
    }


    this.selectedDataTypeblood = localStorage.getItem('selectedDataTypeblood') || this.selectedDataTypeblood;

    if (this.selectedDataTypeblood === 'Dropdown') {
      const savedBloodDropdownValues = localStorage.getItem('dropdownValuesblood');
      if (savedBloodDropdownValues) {
        this.bloodDropdownOptions = savedBloodDropdownValues.split(','); // Convert comma-separated string to array
      }
    }

    this.maritalDataType = localStorage.getItem('maritalDataType') || this.maritalDataType;

    if (this.maritalDataType === 'Dropdown') {
      const savedMaritalDropdownValues = localStorage.getItem('maritalDropdownValues');
      if (savedMaritalDropdownValues) {
        this.maritalDropdownOptions = savedMaritalDropdownValues.split(',');
      }
    }

    this.locationDataType = localStorage.getItem('locationDataType') || this.locationDataType;

    if (this.locationDataType === 'Dropdown') {
      const savedLocationDropdownValues = localStorage.getItem('locationDropdownValues');
      if (savedLocationDropdownValues) {
        this.locationDropdownOptions = savedLocationDropdownValues.split(',');
      }
    }



    this.cntryDataType = localStorage.getItem('cntryDataType') || this.cntryDataType;

    if (this.cntryDataType === 'Dropdown') {
      const savedcntryDropdownValues = localStorage.getItem('cntryDropdownValues');
      if (savedcntryDropdownValues) {
        this.cntryDropdownOptions = savedcntryDropdownValues.split(',');
      }
    }





    this.brchDataType = localStorage.getItem('brchDataType') || this.brchDataType;

    if (this.brchDataType === 'Dropdown') {
      const savedbrchDropdownValues = localStorage.getItem('brchDropdownValues');
      if (savedbrchDropdownValues) {
        this.brchDropdownOptions = savedbrchDropdownValues.split(',');
      }
    }


    this.deptDataType = localStorage.getItem('deptDataType') || this.deptDataType;

    if (this.deptDataType === 'Dropdown') {
      const saveddeptDropdownValues = localStorage.getItem('deptDropdownValues');
      if (saveddeptDropdownValues) {
        this.deptDropdownOptions = saveddeptDropdownValues.split(',');
      }
    }

    this.desDataType = localStorage.getItem('desDataType') || this.desDataType;

    if (this.desDataType === 'Dropdown') {
      const saveddesDropdownValues = localStorage.getItem('desDropdownValues');
      if (saveddesDropdownValues) {
        this.desDropdownOptions = saveddesDropdownValues.split(',');
      }
    }

    this.catDataType = localStorage.getItem('catDataType') || this.catDataType;

    if (this.catDataType === 'Dropdown') {
      const savedcatDropdownValues = localStorage.getItem('catDropdownValues');
      if (savedcatDropdownValues) {
        this.catDropdownOptions = savedcatDropdownValues.split(',');
      }
    }

    this.loadCountries();
    this.loadReligoin();


    this.loadCompanies();
    this.loadbranches();
    this.loadDepartments();
    this.loadDesignation();
    this.loadcatg();
    this.loadLanguages();

    this.loadFormFields();

    this.loadMandatoryField();


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


    if (employeeIdParam) {
      const employeeId = +employeeIdParam;

      // Fetch employee details
      this.EmployeeService.getEmployeeDetails(employeeId).subscribe(
        (details) => {
          this.employee = details;
          // this.cdr.detectChanges(); // Manually trigger change detection

        },
        (error) => {
          console.error('Failed to fetch employee details', error);
        }
      );
    } else {
      console.error('Employee ID parameter is null.');
    }


  }

  loadEmployeeDetails(employeeId: number): void {
    this.selectedEmployeeId = employeeId;
    // Load employee details using this ID
  }


  syncEmpCode(selectedValue: string): void {
    // Sync the selected value from the dropdown to the emp_code field
    this.emp_code = selectedValue;


  }
  syncGender(selectedValue: string): void {
    // Sync the selected value from the dropdown to the emp_gender field
    this.emp_gender = selectedValue;
  }

  syncReligion(selectedValue: string): void {
    // Sync the selected value from the dropdown to the emp_gender field
    this.emp_relegion = selectedValue;
  }

  syncblood(selectedValue: string): void {
    // Sync the selected value from the dropdown to the emp_gender field
    this.emp_blood_group = selectedValue;
  }

  syncMarital(selectedValue: string): void {
    // Sync the selected value from the dropdown to the emp_gender field
    this.emp_marital_status = selectedValue;
  }

  synclocation(selectedValue: string): void {
    // Sync the selected value from the dropdown to the emp_gender field
    this.emp_posting_location = selectedValue;
  }

  synccntry(selectedValue: string): void {
    // Sync the selected value from the dropdown to the emp_gender field
    this.emp_country_id = selectedValue;
  }

  syncbrch(selectedValue: string): void {
    // Sync the selected value from the dropdown to the emp_gender field
    this.emp_branch_id = selectedValue;
  }

  syncdept(selectedValue: string): void {
    // Sync the selected value from the dropdown to the emp_gender field
    this.emp_dept_id = selectedValue;
  }


  syncdes(selectedValue: string): void {
    // Sync the selected value from the dropdown to the emp_gender field
    this.emp_desgntn_id = selectedValue;
  }

  synccat(selectedValue: string): void {
    // Sync the selected value from the dropdown to the emp_gender field
    this.emp_ctgry_id = selectedValue;
  }


  uploadEmployeeDocument(): void {
    this.registerButtonClicked = true;

    // List of required fields for validation
    const requiredFields = [
      { field: this.emp_code, fieldName: 'Employee Code' },
      { field: this.emp_date_of_birth, fieldName: 'Date of Birth' },
      { field: this.emp_branch_id, fieldName: 'Branch' },
      { field: this.emp_first_name, fieldName: this.firstNameFieldName, condition: this.isFirstNameMandatory },
      { field: this.emp_last_name, fieldName: this.lastNameFieldName, condition: this.isLastNameMandatory },
      { field: this.emp_gender, fieldName: this.genderFieldName, condition: this.isGenderMandatory },
      { field: this.emp_personal_email, fieldName: this.emailFieldName, condition: this.isEmailMandatory },
      { field: this.emp_mobile_number_1, fieldName: this.cmpnoFieldName, condition: this.isCmpnoMandatory },
      { field: this.emp_mobile_number_2, fieldName: this.pernoFieldName, condition: this.isPernoMandatory },
      { field: this.emp_present_address, fieldName: this.preaddressFieldName, condition: this.isPresaddMandatory },
      { field: this.emp_city, fieldName: this.cityFieldName, condition: this.isCityMandatory },
      { field: this.emp_country_id, fieldName: this.cntryFieldName, condition: this.isLCountryMandatory },
      { field: this.emp_dept_id, fieldName: this.deptFieldName, condition: this.isLDepartmentMandatory },
      { field: this.emp_date_of_confirmation, fieldName: this.hiredFieldName, condition: this.isHiringMandatory },
    ];



    // Validate required fields
    for (const field of requiredFields) {
      if (field.condition !== false && !field.field) {
        alert(`${field.fieldName} is required.`);
        return; // Stop execution if validation fails
      }
    }

    // Proceed to create FormData if all validations pass
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('emp_profile_pic', this.selectedFile);
    } else {
      formData.append('emp_profile_pic', '');
    }

    const selectedDate = new Date(this.emp_date_of_confirmation);
    const formattedDate = selectedDate.toISOString().split('T')[0]; // Converts to "YYYY-MM-DD"

    const joinedDate = new Date(this.emp_joined_date);
    const formattedJoinedDate = joinedDate.toISOString().split('T')[0];


    // Add fields to FormData
    formData.append('emp_code', this.emp_code);

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


    formData.append('emp_company_id', this.emp_company_id);
    formData.append('emp_branch_id', this.emp_branch_id);
    formData.append('emp_dept_id', this.emp_dept_id);

    formData.append('emp_desgntn_id', this.emp_desgntn_id);
    formData.append('emp_ctgry_id', this.emp_ctgry_id);
    formData.append('emp_languages', this.emp_languages);

    // formData.append('emp_languages', JSON.stringify(this.emp_languages));
    // formData.append('emp_date_of_confirmation', this.emp_date_of_confirmation);
    formData.append('emp_date_of_confirmation', formattedDate);

    // formData.append('emp_joined_date', this.emp_joined_date);
    formData.append('emp_joined_date', formattedJoinedDate);

    formData.append('is_ess', this.is_ess ? '1' : '0');
    formData.append('emp_status', this.emp_status ? '1' : '0');
    formData.append('emp_ot_applicable', this.emp_ot_applicable.toString());


    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      alert('Please select a schema before proceeding.');
      return;
    }

    // Make the API call
    this.http.post(`${this.apiUrl}/employee/api/Employee/?schema=${selectedSchema}`, formData)
      .subscribe(
        (response: any) => {
          const createdEmployeeId = response.id; // Adjust based on your API response
          this.EmployeeService.setEmployeeId(createdEmployeeId);

          // Post custom field values
          this.postCustomFieldValues(createdEmployeeId);

          // Success modal
          const dialogRef = this.dialog.open(SuccesModalComponent, {
            width: '300px',
            data: { message: 'Employee created successfully!', emp_id: createdEmployeeId },
          });

          dialogRef.afterClosed().subscribe(() => {
            console.log('The success modal was closed');
          });
        },
        (error: HttpErrorResponse) => {
          const errorMessage = error.error?.detail || 'Something went wrong.';
          console.error('Document upload failed', error);
          alert(`Registration failed! ${errorMessage}`);
          alert(123)
        }
      );
  }




  //   uploadEmployeeDocument(): void {
  //     this.registerButtonClicked = true;
  //     // const companyData = {
  //     //   emp_languages:this.emp_languages,

  //     // }

  //         // Basic validation for username and password fields

  //   if (!this.emp_code || !this.emp_date_of_birth ||!this.emp_branch_id ) {
  //     if (!this.emp_code) {
  //       alert('Employee code field is blank.');
  //     }
  //     if (!this.emp_date_of_birth) {
  //       alert('Date Of birth field is blank.');
  //     }


  //     if (!this.emp_branch_id) {
  //       alert('Branch field is blank.');
  //     }


  //     if (this.isFirstNameMandatory && !this.emp_first_name) {
  //       alert(`${this.firstNameFieldName} is required.`);
  //       return; // Stop form submission if the field is mandatory and empty
  //   }

  //   if (this.isLastNameMandatory && !this.emp_last_name) {
  //     alert(`${this.lastNameFieldName} is required.`);
  //     return; // Stop form submission if the field is mandatory and empty
  // }




  // if (this.isGenderMandatory && !this.emp_gender) {
  //   alert(`${this.genderFieldName} is required.`);
  //   return; // Stop form submission if the field is mandatory and empty
  // }


  // if (this.isEmailMandatory && !this.emp_personal_email) {
  //   alert(`${this.emailFieldName} is required.`);
  //   return; // Stop form submission if the field is mandatory and empty
  // }

  // if (this.isCmpnoMandatory && !this.emp_mobile_number_1) {
  //   alert(`${this.cmpnoFieldName} is required.`);
  //   return; // Stop form submission if the field is mandatory and empty
  // }

  // if (this.isPernoMandatory && !this.emp_mobile_number_2) {
  //   alert(`${this.pernoFieldName} is required.`);
  //   return; // Stop form submission if the field is mandatory and empty
  // }


  // if (this.isPeraddMandatory && !this.emp_permenent_address) {
  //   alert(`${this.peraddressFieldName} is required.`);
  //   return; // Stop form submission if the field is mandatory and empty
  // }


  // if (this.isPresaddMandatory && !this.emp_present_address) {
  //   alert(`${this.preaddressFieldName} is required.`);
  //   return; // Stop form submission if the field is mandatory and empty
  // }


  // if (this.isCityMandatory && !this.emp_city) {
  //   alert(`${this.cityFieldName} is required.`);
  //   return; // Stop form submission if the field is mandatory and empty
  // }

  // if (this.isRelMandatory && !this.emp_relegion) {
  //   alert(`${this.religionFieldName} is required.`);
  //   return; // Stop form submission if the field is mandatory and empty
  // }


  // if (this.isBloodMandatory && !this.emp_blood_group) {
  //   alert(`${this.bloodFieldName} is required.`);
  //   return; // Stop form submission if the field is mandatory and empty
  // }



  // if (this.isNatMandatory && !this.emp_nationality) {
  //   alert(`${this.nationFieldName} is required.`);
  //   return; // Stop form submission if the field is mandatory and empty
  // }


  // if (this.isMariMandatory && !this.emp_marital_status) {
  //   alert(`${this.maritalFieldName} is required.`);
  //   return; // Stop form submission if the field is mandatory and empty
  // }


  // if (this.isFatherMandatory && !this.emp_father_name) {
  //   alert(`${this.fatherFieldName} is required.`);
  //   return; // Stop form submission if the field is mandatory and empty
  // }

  // if (this.isMotherMandatory && !this.emp_mother_name) {
  //   alert(`${this.motherFieldName} is required.`);
  //   return; // Stop form submission if the field is mandatory and empty
  // }



  // if (this.isLocationMandatory && !this.emp_posting_location) {
  //   alert(`${this.locationFieldName} is required.`);
  //   return; // Stop form submission if the field is mandatory and empty
  // }


  // if (this.isLCountryMandatory && !this.emp_country_id) {
  //   alert(`${this.cntryFieldName} is required.`);
  //   return; // Stop form submission if the field is mandatory and empty
  // }


  // if (this.isLBranchMandatory && !this.emp_branch_id) {
  //   alert(`${this.brchFieldName} is required.`);
  //   return; // Stop form submission if the field is mandatory and empty
  // }



  // if (this.isLDepartmentMandatory && !this.emp_dept_id) {
  //   alert(`${this.deptFieldName} is required.`);
  //   return; // Stop form submission if the field is mandatory and empty
  // }

  // if (this.isLDesignationMandatory && !this.emp_desgntn_id) {
  //   alert(`${this.desFieldName} is required.`);
  //   return; // Stop form submission if the field is mandatory and empty
  // }



  // if (this.isLCatogoryMandatory && !this.emp_ctgry_id) {
  //   alert(`${this.catFieldName} is required.`);
  //   return; // Stop form submission if the field is mandatory and empty
  // }


  // if (this.isHiringMandatory && !this.emp_joined_date) {
  //   alert(`${this.hiredFieldName} is required.`);
  //   return; // Stop form submission if the field is mandatory and empty
  // }




  //     // if (!this.emp_dept_id) {
  //     //   alert('Department field is blank.');
  //     // }

  //     // if (!this.emp_desgntn_id) {
  //     //   alert('Designation field is blank.');
  //     // }

  //     // if (!this.emp_ctgry_id) {
  //     //   alert('Category field is blank.');
  //     // }
  //     // return; // Exit the function if validation fails
  //   }

  //     const formData = new FormData();

  //   // Append the profile picture only if it's selected
  //   if(this.selectedFile) {
  //     formData.append('emp_profile_pic', this.selectedFile);
  //   } else {
  //     // Append a null or empty value to indicate no file was selected
  //     formData.append('emp_profile_pic', '');
  //   }


  //     formData.append('emp_code', this.emp_code);

  //     formData.append('emp_first_name', this.emp_first_name);
  //     formData.append('emp_last_name', this.emp_last_name);


  //     formData.append('emp_gender', this.emp_gender);
  //     formData.append('emp_date_of_birth', this.emp_date_of_birth);
  //     formData.append('emp_personal_email', this.emp_personal_email);
  //     formData.append('emp_mobile_number_1', this.emp_mobile_number_1);
  //     formData.append('emp_mobile_number_2', this.emp_mobile_number_2);

  //     formData.append('emp_city', this.emp_city);
  //     formData.append('emp_permenent_address', this.emp_permenent_address);
  //     formData.append('emp_present_address', this.emp_present_address);
  //     formData.append('emp_relegion', this.emp_relegion);
  //     formData.append('emp_blood_group', this.emp_blood_group);

  //     formData.append('emp_nationality', this.emp_nationality);
  //     formData.append('emp_marital_status', this.emp_marital_status);
  //     formData.append('emp_father_name', this.emp_father_name);
  //     formData.append('emp_mother_name', this.emp_mother_name);
  //     formData.append('emp_posting_location', this.emp_posting_location);


  //     formData.append('emp_country_id', this.emp_country_id);
  //     formData.append('emp_state_id', this.emp_state_id);


  //     formData.append('emp_branch_id', this.emp_branch_id);
  //     formData.append('emp_dept_id', this.emp_dept_id);

  //     formData.append('emp_desgntn_id', this.emp_desgntn_id);
  //     formData.append('emp_ctgry_id', this.emp_ctgry_id);
  //     // formData.append('emp_languages', this.emp_languages);

  //     // formData.append('emp_languages', JSON.stringify(this.emp_languages));
  //     formData.append('emp_date_of_confirmation', this.emp_date_of_confirmation);
  //     formData.append('emp_joined_date', this.emp_joined_date);
  //     formData.append('is_ess', this.is_ess ? '1' : '0');
  //     formData.append('emp_status', this.emp_status ? '1' : '0');

  //     const selectedSchema = localStorage.getItem('selectedSchema');
  //     if (!selectedSchema) {
  //       console.error('No schema selected.');
  //       // return throwError('No schema selected.'); // Return an error observable if no schema is selected
  //     }


  //     // return this.http.put(apiUrl, formData);


  //     this.http.post(`${this.apiUrl}/employee/api/Employee/?schema=${selectedSchema}`, formData)
  //     .subscribe(
  //       (response: any) => {
  //         // Handle successful upload
  //         console.log('Document upload successful', response);



  //         // Extract employee ID from the response
  //         // const createdEmployeeId = response.id; // Adjust this based on the actual response structure


  //    // Extract employee ID from the response
  //    const createdEmployeeId = response.id; // Adjust this based on the actual response structure

  //    this.EmployeeService.setEmployeeId(createdEmployeeId);
  //    // Now post the custom field values
  //    this.postCustomFieldValues(createdEmployeeId);
  //    const dialogRef = this.dialog.open(SuccesModalComponent, {
  //     width: '300px',
  //     data: { message: 'Employee created successfully!', emp_id: createdEmployeeId }
  // });
  //         dialogRef.afterClosed().subscribe(() => {
  //             console.log('The success modal was closed');

  //             // Open the add more fields modal with the created employee ID
  //             // this.addMoreFields(createdEmployeeId);
  //         });
  //     },
  //     (error: HttpErrorResponse) => {
  //         const errorMessage = error.error?.detail || 'Something went wrong.';
  //         console.error('Document upload failed', error);
  //         alert(`Registration failed! ${errorMessage}`);
  //     }
  // );

  //   }




  postCustomFieldValues(empMasterId: number): void {
    const customFieldValues = this.custom_fields.map(field => ({
      emp_custom_field: field.emp_custom_field, // Assuming the field has an 'id' property
      field_value: field.field_value, // The value entered by the user
      emp_master: empMasterId // The employee ID from the response
    }));

    // Make API calls to post each custom field value
    customFieldValues.forEach(fieldValue => {
      const selectedSchema = localStorage.getItem('selectedSchema');
      if (!selectedSchema) {
        console.error('No schema selected.');
        // return throwError('No schema selected.'); // Return an error observable if no schema is selected
      }

      // this.http.post(`${this.apiUrl}/employee/api/emp-custom-field-value/?schema=${selectedSchema}`, fieldValue)
      this.http.post(`${this.apiUrl}/employee/api/custom-field-value/?schema=${selectedSchema}`, fieldValue)
        .subscribe(
          (response: any) => {
            console.log('Custom field value posted successfully', response);
          },
          (error: HttpErrorResponse) => {
            console.error('Failed to post custom field value', error);
          }
        );
    });
  }


  updateFieldNames(): void {
    // Save updated field names to localStorage
    localStorage.setItem('empCodeFieldName', this.empCodeFieldName);
    localStorage.setItem('firstNameFieldName', this.firstNameFieldName);

    // You can also add logic here to inform the user that the update was successful
    console.log('Field names updated:', this.empCodeFieldName, this.firstNameFieldName);
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

    const savedIsFirstNameMandatory = localStorage.getItem('isFirstNameMandatory');
    if (savedIsFirstNameMandatory) {
      this.isFirstNameMandatory = JSON.parse(savedIsFirstNameMandatory);
    }


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
  loadMandatoryField(): void {

    const savedIsFirstNameMandatory = localStorage.getItem('isFirstNameMandatory');
    if (savedIsFirstNameMandatory) {
      this.isFirstNameMandatory = JSON.parse(savedIsFirstNameMandatory);
    }

    const savedFirstNameFieldVisibility = localStorage.getItem('isFirstNameFieldHidden');
    if (savedFirstNameFieldVisibility) {
      this.isFirstNameFieldHidden = JSON.parse(savedFirstNameFieldVisibility);
    }

    const isLastNameMandatory = localStorage.getItem('isLastNameMandatory');
    if (isLastNameMandatory) {
      this.isLastNameMandatory = JSON.parse(isLastNameMandatory);
    }

    const isGenderMandatory = localStorage.getItem('isGenderMandatory');
    if (isGenderMandatory) {
      this.isGenderMandatory = JSON.parse(isGenderMandatory);
    }

    const isEmailMandatory = localStorage.getItem('isEmailMandatory');
    if (isEmailMandatory) {
      this.isEmailMandatory = JSON.parse(isEmailMandatory);
    }

    const isCmpnoMandatory = localStorage.getItem('isCmpnoMandatory');
    if (isCmpnoMandatory) {
      this.isCmpnoMandatory = JSON.parse(isCmpnoMandatory);
    }

    const isPernoMandatory = localStorage.getItem('isPernoMandatory');
    if (isPernoMandatory) {
      this.isPernoMandatory = JSON.parse(isPernoMandatory);
    }

    const isPeraddMandatory = localStorage.getItem('isPeraddMandatory');
    if (isPeraddMandatory) {
      this.isPeraddMandatory = JSON.parse(isPeraddMandatory);
    }

    const isPresaddMandatory = localStorage.getItem('isPresaddMandatory');
    if (isPresaddMandatory) {
      this.isPresaddMandatory = JSON.parse(isPresaddMandatory);
    }

    const isCityMandatory = localStorage.getItem('isCityMandatory');
    if (isCityMandatory) {
      this.isCityMandatory = JSON.parse(isCityMandatory);
    }

    const isRelMandatory = localStorage.getItem('isRelMandatory');
    if (isRelMandatory) {
      this.isRelMandatory = JSON.parse(isRelMandatory);
    }

    const isBloodMandatory = localStorage.getItem('isBloodMandatory');
    if (isBloodMandatory) {
      this.isBloodMandatory = JSON.parse(isBloodMandatory);
    }


    const isNatMandatory = localStorage.getItem('isNatMandatory');
    if (isNatMandatory) {
      this.isNatMandatory = JSON.parse(isNatMandatory);
    }
    const isMariMandatory = localStorage.getItem('isMariMandatory');
    if (isMariMandatory) {
      this.isMariMandatory = JSON.parse(isMariMandatory);
    }

    const isFatherMandatory = localStorage.getItem('isFatherMandatory');
    if (isFatherMandatory) {
      this.isFatherMandatory = JSON.parse(isFatherMandatory);
    }


    const isMotherMandatory = localStorage.getItem('isMotherMandatory');
    if (isMotherMandatory) {
      this.isMotherMandatory = JSON.parse(isMotherMandatory);
    }

    const isLocationMandatory = localStorage.getItem('isLocationMandatory');
    if (isLocationMandatory) {
      this.isLocationMandatory = JSON.parse(isLocationMandatory);
    }


    const isLCountryMandatory = localStorage.getItem('isLCountryMandatory');
    if (isLCountryMandatory) {
      this.isLCountryMandatory = JSON.parse(isLCountryMandatory);
    }

    const isLBranchMandatory = localStorage.getItem('isLBranchMandatory');
    if (isLBranchMandatory) {
      this.isLBranchMandatory = JSON.parse(isLBranchMandatory);
    }



    const isLDepartmentMandatory = localStorage.getItem('isLDepartmentMandatory');
    if (isLDepartmentMandatory) {
      this.isLDepartmentMandatory = JSON.parse(isLDepartmentMandatory);
    }



    const isLDesignationMandatory = localStorage.getItem('isLDesignationMandatory');
    if (isLDesignationMandatory) {
      this.isLDesignationMandatory = JSON.parse(isLDesignationMandatory);
    }


    const isLCatogoryMandatory = localStorage.getItem('isLCatogoryMandatory');
    if (isLCatogoryMandatory) {
      this.isLCatogoryMandatory = JSON.parse(isLCatogoryMandatory);
    }


    const isHiringMandatory = localStorage.getItem('isHiringMandatory');
    if (isHiringMandatory) {
      this.isHiringMandatory = JSON.parse(isHiringMandatory);
    }



  }

  loadFieldDisplay(): void {
    const savedFirstNameFieldVisibility = localStorage.getItem('isFirstNameFieldHidden');
    if (savedFirstNameFieldVisibility) {
      this.isFirstNameFieldHidden = JSON.parse(savedFirstNameFieldVisibility);
    }

    const isLasstNameFieldHidden = localStorage.getItem('isLasstNameFieldHidden');
    if (isLasstNameFieldHidden) {
      this.isLasstNameFieldHidden = JSON.parse(isLasstNameFieldHidden);
    }

    const isGernderNameFieldHidden = localStorage.getItem('isGernderNameFieldHidden');
    if (isGernderNameFieldHidden) {
      this.isGernderNameFieldHidden = JSON.parse(isGernderNameFieldHidden);
    }

    const isEmailNameFieldHidden = localStorage.getItem('isEmailNameFieldHidden');
    if (isEmailNameFieldHidden) {
      this.isEmailNameFieldHidden = JSON.parse(isEmailNameFieldHidden);
    }

    const isCmpNoNameFieldHidden = localStorage.getItem('isCmpNoNameFieldHidden');
    if (isCmpNoNameFieldHidden) {
      this.isCmpNoNameFieldHidden = JSON.parse(isCmpNoNameFieldHidden);
    }

    const isPerNoNameFieldHidden = localStorage.getItem('isPerNoNameFieldHidden');
    if (isPerNoNameFieldHidden) {
      this.isPerNoNameFieldHidden = JSON.parse(isPerNoNameFieldHidden);
    }

    const isPermaddNameFieldHidden = localStorage.getItem('isPermaddNameFieldHidden');
    if (isPermaddNameFieldHidden) {
      this.isPermaddNameFieldHidden = JSON.parse(isPermaddNameFieldHidden);
    }


    const isPresentaddNameFieldHidden = localStorage.getItem('isPresentaddNameFieldHidden');
    if (isPresentaddNameFieldHidden) {
      this.isPresentaddNameFieldHidden = JSON.parse(isPresentaddNameFieldHidden);
    }


    const isCityFieldHidden = localStorage.getItem('isCityFieldHidden');
    if (isCityFieldHidden) {
      this.isCityFieldHidden = JSON.parse(isCityFieldHidden);
    }

    const isReliFieldHidden = localStorage.getItem('isReliFieldHidden');
    if (isReliFieldHidden) {
      this.isReliFieldHidden = JSON.parse(isReliFieldHidden);
    }

    const isBloodFieldHidden = localStorage.getItem('isBloodFieldHidden');
    if (isBloodFieldHidden) {
      this.isBloodFieldHidden = JSON.parse(isBloodFieldHidden);
    }

    const isNationFieldHidden = localStorage.getItem('isNationFieldHidden');
    if (isNationFieldHidden) {
      this.isNationFieldHidden = JSON.parse(isNationFieldHidden);
    }

    const isMaritalFieldHidden = localStorage.getItem('isMaritalFieldHidden');
    if (isMaritalFieldHidden) {
      this.isMaritalFieldHidden = JSON.parse(isMaritalFieldHidden);
    }



    const isFatherFieldHidden = localStorage.getItem('isFatherFieldHidden');
    if (isFatherFieldHidden) {
      this.isFatherFieldHidden = JSON.parse(isFatherFieldHidden);
    }

    const isMotherFieldHidden = localStorage.getItem('isMotherFieldHidden');
    if (isMotherFieldHidden) {
      this.isMotherFieldHidden = JSON.parse(isMotherFieldHidden);
    }

    const isLocationFieldHidden = localStorage.getItem('isLocationFieldHidden');
    if (isLocationFieldHidden) {
      this.isLocationFieldHidden = JSON.parse(isLocationFieldHidden);
    }

    const isCountryFieldHidden = localStorage.getItem('isCountryFieldHidden');
    if (isCountryFieldHidden) {
      this.isCountryFieldHidden = JSON.parse(isCountryFieldHidden);
    }

    const isDepartFieldHidden = localStorage.getItem('isDepartFieldHidden');
    if (isDepartFieldHidden) {
      this.isDepartFieldHidden = JSON.parse(isDepartFieldHidden);
    }

    const isDesignationFieldHidden = localStorage.getItem('isDesignationFieldHidden');
    if (isDesignationFieldHidden) {
      this.isDesignationFieldHidden = JSON.parse(isDesignationFieldHidden);
    }

    const isCatFieldHidden = localStorage.getItem('isCatFieldHidden');
    if (isCatFieldHidden) {
      this.isCatFieldHidden = JSON.parse(isCatFieldHidden);
    }

    const isHireFieldHidden = localStorage.getItem('isHireFieldHidden');
    if (isHireFieldHidden) {
      this.isHireFieldHidden = JSON.parse(isHireFieldHidden);
    }





  }



  submitForm(): void {
    if (!this.selectedEmployeeId) {
      console.error('No employee selected');
      return;
    }

    const empMasterId = this.selectedEmployeeId;

    const customFieldValues = this.custom_fields.map(field => ({
      emp_custom_field: field.id,
      field_value: field.field_value,
      emp_master: empMasterId
    }));

    // Post the custom field values to the backend
    this.EmployeeService.submitCustomFieldValues(customFieldValues).subscribe(
      response => {
        console.log('Custom field values submitted successfully', response);
        alert('Form submitted successfully');
      },
      error => {
        console.error('Error submitting custom field values', error);
        alert('Failed to submit form');
      }
    );
  }




  //   ngOnInit(): void {


  // }




  loadCountries(): void {

    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore', selectedSchema)
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

    console.log('schemastore', selectedSchema)
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
    if (!this.emp_country_id) {
      console.error('Country ID is null or undefined.');
      return;
    }

    this.CountryService.getStatesByCountryId(this.emp_country_id).subscribe(
      (result: any) => {
        console.log('State Response:', result);
        this.states = result.states;
        this.state_label = result.state_label;
      },
      (error: any) => {
        console.error('Error fetching states:', error);
      }
    );
  }



  loadReligoin(): void {

    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore', selectedSchema)
    // Check if selectedSchema is available
    if (selectedSchema) {

      this.CountryService.getReligionList(selectedSchema).subscribe(
        (result: any) => {
          this.Religions = result;
        },
        (error: any) => {
          console.error('Error fetching countries:', error);
        }
      );
    }
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



  loadbranches(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore', selectedSchema)
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

    console.log('schemastore', selectedSchema)
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

    console.log('schemastore', selectedSchema)
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

    console.log('schemastore', selectedSchema)
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

    console.log('schemastore', selectedSchema)
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


  loadFormFields(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore', selectedSchema)
    // Check if selectedSchema is available
    if (selectedSchema) {
      this.EmployeeService.getFormField(selectedSchema).subscribe(
        (result: any) => {
          this.custom_fields = result;
        },
        (error: any) => {
          console.error('Error fetching countries:', error);
        }
      );
    }
  }


  ClosePopup() {
    this.ref.close('Closed using function')
    // this.dialog.open(SuccesModalComponent,{
    //   width:'80%',
    //   height:'500px',
    // })



  }



  isLoading: boolean = false;
  bulkOn() {
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible = !this.visible;
    this.visibility = !this.visibility;
  }

  openbulkupload() {
    this.show = !this.show;

  }
  emp_ot_applicable: boolean = false;


  bulkuploaddocument(): void {
    this.registerButtonClicked = true;

    this.isLoading = true;

    const formData = new FormData();

    if (this.file) {
      formData.append('file', this.file);
    } else {
      formData.append('file', '');
    }

    formData.append('emp_code', this.emp_code);
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
    formData.append('emp_company_id', this.emp_company_id);
    formData.append('emp_branch_id', this.emp_branch_id);
    formData.append('emp_dept_id', this.emp_dept_id);
    formData.append('emp_desgntn_id', this.emp_desgntn_id);
    formData.append('emp_ctgry_id', this.emp_ctgry_id);
    formData.append('emp_languages', this.emp_languages);
    formData.append('emp_date_of_confirmation', this.emp_date_of_confirmation);
    formData.append('emp_joined_date', this.emp_joined_date);
    formData.append('is_ess', this.is_ess ? '1' : '0');
    formData.append('emp_status', this.emp_status ? '1' : '0');
    formData.append('emp_ot_applicable', this.emp_ot_applicable.toString());


    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return;
    }

    this.http.post(`${this.apiUrl}/employee/api/emp-bulkupload/bulk_upload/?schema=${selectedSchema}`, formData)
      .subscribe(
        (response) => {
          this.isLoading = false;

          console.log('Bulk upload successful', response);

          const dialogRef = this.dialog.open(SuccesModalComponent, {
            width: '300px',
            data: { message: 'Bulk upload employee successfully!' }
          });

          dialogRef.afterClosed().subscribe(() => {
            console.log('The success modal was closed');
          });
        },
        (error: HttpErrorResponse) => {
          this.isLoading = false;
          console.error('Upload error:', error);
        
          const errorMessages: string[] = [];
        
          if (error.error) {
            if (typeof error.error === 'string') {
              // Simple string error message
              alert(error.error);
            } else if (typeof error.error === 'object') {
              // Iterate through error object keys
              Object.entries(error.error).forEach(([sheetKey, errors]) => {
                if (Array.isArray(errors)) {
                  errors.forEach((errObj: any) => {
                    if (errObj.row !== undefined && errObj.error) {
                      errorMessages.push(`${sheetKey} - Row ${errObj.row}: ${errObj.error}`);
                    } else {
                      // Fallback if row or error message is missing
                      errorMessages.push(`${sheetKey}: ${JSON.stringify(errObj)}`);
                    }
                  });
                } else if (typeof errors === 'string') {
                  errorMessages.push(`${sheetKey}: ${errors}`);
                }
              });
        
              if (errorMessages.length > 0) {
                alert(errorMessages.join('\n'));
              } else {
                alert('An unexpected error occurred. Please try again.');
              }
            } else {
              alert('An unexpected error format was received.');
            }
          } else {
            alert('Something went wrong. Please check your connection or try again later.');
          }
        }
      );

  }



  onChangeFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        const formData = new FormData();
        formData.append('file', file);

        const selectedSchema = localStorage.getItem('selectedSchema');
        if (!selectedSchema) {
          console.error('No schema selected.');
          alert('No schema selected. Please select a schema.');
          return;
        }

        const url = `${this.apiUrl}/employee/api/emp-bulkupload/bulk_upload/?schema=${selectedSchema}`;
        console.log('Uploading to URL:', url);

        this.http.post(url, formData).subscribe(
          (res: any) => {
            console.log('Upload successful:', res);
          },
          (error: any) => {
            console.error('Upload error:', error);
            alert('Upload failed. Please check the console for details.');
          }
        );
      } else {
        alert("Please select a valid Excel file");
      }
    }
  }


  Delete: boolean = false;

  Deletes: boolean = false;
  selectedFiles!: File;
  file: any = '';

  selectFile(event: any) {
    console.log(event)
  }

  uploadFile() {
    let formData = new FormData();
    formData.append('file', this.file)
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  togglebulkupload() {
    this.Delete = !this.Delete;

  }





}
