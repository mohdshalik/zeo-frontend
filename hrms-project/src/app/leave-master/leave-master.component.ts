import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { SessionService } from '../login/session.service';
import { LeaveService } from './leave.service';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { DesignationService } from '../designation-master/designation.service';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from '../employee-master/employee.service';

@Component({
  selector: 'app-leave-master',
  templateUrl: './leave-master.component.html',
  styleUrl: './leave-master.component.css'
})
export class LeaveMasterComponent {

  // Define months with both full and short forms
  months: { short: string, full: string }[] = [
    { short: 'Jan', full: 'January' },
    { short: 'Feb', full: 'February' },
    { short: 'Mar', full: 'March' },
    { short: 'Apr', full: 'April' },
    { short: 'May', full: 'May' },
    { short: 'Jun', full: 'June' },
    { short: 'Jul', full: 'July' },
    { short: 'Aug', full: 'August' },
    { short: 'Sep', full: 'September' },
    { short: 'Oct', full: 'October' },
    { short: 'Nov', full: 'November' },
    { short: 'Dec', full: 'December' }
  ];


  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  ThridFormGroup!: FormGroup

  isLinear = true;

  LeaveTypes: any[] = [];
  Branches: any[] = [];
  Departments: any[] = [];
  Designation: any[] = [];
  Category: any[] = [];



  // entitlement field variables declaration

  min_experience: any = '';
  effective_after_unit: any = '';
  effective_after_from: any = '';
  accrual_rate: any = '';
  accrual_frequency: any = '';
  accrual_month: any = '';
  accrual_day: any = '';
  round_of: any = '';
  prorate_type:any = '';
  leave_type: any = '';

  accrual: boolean = false;

  prorate_accrual: boolean = false;

  


  registerButtonClicked: boolean = false;




  showMonth: boolean = false; // Controls the visibility of the "Month" dropdown
  showDay: boolean = false;   // Controls the visibility of the "Day" dropdown

  showResetMonth: boolean = false; // Controls the visibility of the reset "Month" dropdown
  showResetDay: boolean = false;   // Controls the visibility of the reset "Day" dropdown



  gender: any = '';
  branch: any = '';
  designation: any = '';
  department: any = '';
  role: any = '';

  hasAddPermission: boolean = false;
  hasDeletePermission: boolean = false;
  hasViewPermission: boolean = false;
  hasEditPermission: boolean = false;

  userId: number | null | undefined;
  userDetails: any;
  userDetailss: any;
  schemas: string[] = []; // Array to store schema names

  Employees: any[] = []; // Array to store schema names

  name: any = '';
  code: any = '';
  type: any = '';
  unit: any = '';
  valid_to: any = '';
  valid_from: any = '';

  description: any = '';
  created_by: any = '';


  image: string | undefined;

  negative: boolean = false;

  allow_half_day: boolean = false;
  include_weekend_and_holiday: boolean = false;
  use_common_workflow: boolean = false;



  // leave reset field variables declaration


  reset: boolean = false;

  frequency: any = '';
  month: any = '';
  day: any = '';
  carry_forward_choice: any = '';
  cf_value: any = '';
  cf_unit_or_percentage: any = '';
  cf_max_limit: any = '';
  cf_expires_in_value: any = '';
  cf_time_choice: any = '';
  encashment_value: any = '';
  encashment_unit_or_percentage: any = '';
  encashment_max_limit: any = '';

  allow_cf:boolean =false;
  allow_encashment: boolean = false;

  // reset_date: any = '';
  // initial_balance: any = '';
  // carry_forward_amount: any = '';
  // encashment_amount: any = '';
  // final_balance: any = '';
  // year: any = '';
  // employee: any = '';
  // leave_type: any = '';


  

  


  selectedFile!: File | null;

  @ViewChild('select') select: MatSelect | undefined;
  @ViewChild('selectDept') selectDept: MatSelect | undefined;
  @ViewChild('selectDes') selectDes: MatSelect | undefined;
  @ViewChild('selectCat') selectCat: MatSelect | undefined;


  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private leaveService: LeaveService,
    private DesignationService: DesignationService,
    private employeeService: EmployeeService,



  ) { }

  ngOnInit(): void {
    const selectedSchema = this.authService.getSelectedSchema();
    if (selectedSchema) {


      this.LoadLeavetype(selectedSchema);
      this.LoadEmployee(selectedSchema);

      this.LoadBranch(selectedSchema);
      this.LoadDepartment(selectedSchema);
      this.LoadDesignation(selectedSchema);
      this.LoadCategory(selectedSchema);





    }

    this.userId = this.sessionService.getUserId();
    if (this.userId !== null) {
      this.authService.getUserData(this.userId).subscribe(
        async (userData: any) => {
          this.userDetails = userData; // Store user details in userDetails property

          this.created_by= this.userId;
          console.log('User ID:', this.userId); // Log user ID
          console.log('User Details:', this.userDetails); // Log user details

          // Check if user is_superuser is true or false
          let isSuperuser = this.userDetails.is_superuser || false; // Default to false if is_superuser is undefined
          const selectedSchema = this.authService.getSelectedSchema();
          if (!selectedSchema) {
            console.error('No schema selected.');
            return;
          }


          if (isSuperuser) {
            console.log('User is superuser or ESS user');

            // Grant all permissions
            this.hasViewPermission = true;
            this.hasAddPermission = true;
            this.hasDeletePermission = true;
            this.hasEditPermission = true;

            // Fetch designations without checking permissions
            // this.fetchDesignations(selectedSchema);
          } else {
            console.log('User is not superuser');

            const selectedSchema = this.authService.getSelectedSchema();
            if (selectedSchema) {



              try {
                const permissionsData: any = await this.DesignationService.getDesignationsPermission(selectedSchema).toPromise();
                console.log('Permissions data:', permissionsData);

                if (Array.isArray(permissionsData) && permissionsData.length > 0) {
                  const firstItem = permissionsData[0];

                  if (firstItem.is_superuser) {
                    console.log('User is superuser according to permissions API');
                    // Grant all permissions
                    this.hasViewPermission = true;
                    this.hasAddPermission = true;
                    this.hasDeletePermission = true;
                    this.hasEditPermission = true;
                  } else if (firstItem.groups && Array.isArray(firstItem.groups) && firstItem.groups.length > 0) {
                    const groupPermissions = firstItem.groups.flatMap((group: any) => group.permissions);
                    console.log('Group Permissions:', groupPermissions);


                    this.hasAddPermission = this.checkGroupPermission('add_leave_entitlement', groupPermissions);
                    console.log('Has add permission:', this.hasAddPermission);

                    this.hasEditPermission = this.checkGroupPermission('change_leave_entitlement', groupPermissions);
                    console.log('Has edit permission:', this.hasEditPermission);

                    this.hasDeletePermission = this.checkGroupPermission('delete_leave_entitlement', groupPermissions);
                    console.log('Has delete permission:', this.hasDeletePermission);


                    this.hasViewPermission = this.checkGroupPermission('view_leave_entitlement', groupPermissions);
                    console.log('Has view permission:', this.hasViewPermission);


                  } else {
                    console.error('No groups found in data or groups array is empty.', firstItem);
                  }
                } else {
                  console.error('Permissions data is not an array or is empty.', permissionsData);
                }

                // Fetching designations after checking permissions
                // this.fetchDesignations(selectedSchema);
              }

              catch (error) {
                console.error('Error fetching permissions:', error);
              }
            } else {
              console.error('No schema selected.');
            }

          }
        },
        (error) => {
          console.error('Failed to fetch user details:', error);
        }
      );

      // this.fetchingApprovals();


      this.authService.getUserSchema(this.userId).subscribe(
        (userData: any) => {
          this.userDetailss = userData;
          this.schemas = userData.map((schema: any) => schema.schema_name);
          console.log('scehmas-de', userData)
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


  registerleaveType(): void {
    this.registerButtonClicked = true;
  
    if (!this.name || !this.code || !this.valid_to) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('code', this.code);
    formData.append('type', this.type);
    formData.append('unit', this.unit);
    formData.append('valid_to', this.valid_to);
    formData.append('valid_from', this.valid_from);
    formData.append('description', this.description);
    formData.append('created_by', this.created_by);
    formData.append('negative', this.negative.toString());
    formData.append('allow_half_day', this.allow_half_day.toString());
    formData.append('include_weekend_and_holiday', this.include_weekend_and_holiday.toString());
    formData.append('use_common_workflow', this.use_common_workflow.toString());
  
    // Append the image only if it's selected
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
  
    this.leaveService.registerLeaveType(formData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        alert('Leave type has been added');
        window.location.reload();
      },
      (error) => {
        console.error('Added failed', error);
  
        // Extract backend error message
        let errorMessage = 'An unexpected error occurred. Please try again.';
  
        if (error.error) {
          if (typeof error.error === 'string') {
            errorMessage = error.error; // If backend returns a plain string message
          } else if (error.error.detail) {
            errorMessage = error.error.detail; // If backend returns { detail: "message" }
          } else if (error.error.non_field_errors) {
            errorMessage = error.error.non_field_errors.join(', '); // Handle non-field errors array
          } else {
            // Handle field-specific errors
            const fieldErrors = Object.keys(error.error)
              .map((field) => `${field}: ${error.error[field]}`)
              .join('\n');
            errorMessage = fieldErrors || errorMessage;
          }
        }
  
        alert(errorMessage); // Show extracted error
      }
    );
  }
  

  // checkViewPermission(permissions: any[]): boolean {
  //   const requiredPermission = ' add_leave_entitlement' ||'change_leave_entitlement' ||'delete_leave_entitlement' ||'view_leave_entitlement';


  //   // Check user permissions
  //   if (permissions.some(permission => permission.codename === requiredPermission)) {
  //     return true;
  //   }

  //   // Check group permissions (if applicable)
  //   // Replace `// TODO: Implement group permission check`
  //   // with your logic to retrieve and check group permissions
  //   // (consider using a separate service or approach)
  //   return false; // Replace with actual group permission check
  //   }




  checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
    return groupPermissions.some(permission => permission.codename === codeName);
  }
  registerleaveEntitlement(): void {
    this.registerButtonClicked = true;
    // if (!this.name || !this.code || !this.valid_to) {
    //   return;
    // }

    const formData = new FormData();
    formData.append('min_experience', this.min_experience);
    formData.append('effective_after_from', this.effective_after_from);

    formData.append('effective_after_unit', this.effective_after_unit);
    formData.append('accrual_rate', this.accrual_rate);
    formData.append('accrual_frequency', this.accrual_frequency);
    formData.append('accrual_month', this.accrual_month);
    formData.append('accrual_day', this.accrual_day);
    formData.append('round_of', this.round_of);
    formData.append('prorate_type', this.prorate_type);

    formData.append('leave_type', this.leave_type);
    formData.append('created_by', this.created_by);


    formData.append('prorate_accrual', this.prorate_accrual.toString());
    formData.append('accrual', this.accrual.toString());
    // Append the profile picture only if it's selected
    // if (this.selectedFile) {
    //   formData.append('image', this.selectedFile);
    // } else {
    //   // Append a null or empty value to indicate no file was selected
    //   formData.append('image', '');
    // }


    this.leaveService.registerLeaveEntitlement(formData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        alert('Leave Entitlement has been added');
        // window.location.reload();

      },
      (error) => {
        console.error('Added failed', error);
        alert('Enter all required fields!');
      }
    );
  }


  registerleaveReset(): void {
    this.registerButtonClicked = true;
  
    const formData = new FormData();
      
      formData.append('frequency', this.frequency);
      formData.append('month', this.month);
      formData.append('day', this.day);
      formData.append('carry_forward_choice', this.carry_forward_choice);
      formData.append('cf_value', this.cf_value);
      formData.append('cf_unit_or_percentage', this.cf_unit_or_percentage);
      formData.append('cf_max_limit', this.cf_max_limit);
      formData.append('cf_expires_in_value', this.cf_expires_in_value);
      formData.append('cf_time_choice', this.cf_time_choice);
      formData.append('encashment_value', this.encashment_value);
      formData.append('encashment_unit_or_percentage', this.encashment_unit_or_percentage);
      formData.append('encashment_max_limit', this.encashment_max_limit);
      formData.append('leave_type', this.leave_type);

      formData.append('reset', this.reset.toString());
      formData.append('allow_cf', this.allow_cf.toString());
      formData.append('allow_encashment', this.allow_encashment.toString());

  
    this.leaveService.requestLeaveResetPolicy(formData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        alert('Leave Reset has been added');
        // window.location.reload();
      },
      (error) => {
        console.error('Added failed', error);
  
        // Extract backend error message
        let errorMessage = 'An unexpected error occurred. Please try again.';
  
        if (error.error) {
          if (typeof error.error === 'string') {
            errorMessage = error.error; // If backend returns a plain string message
          } else if (error.error.detail) {
            errorMessage = error.error.detail; // If backend returns { detail: "message" }
          } else if (error.error.non_field_errors) {
            errorMessage = error.error.non_field_errors.join(', '); // Handle non-field errors array
          } else {
            // Handle field-specific errors
            const fieldErrors = Object.keys(error.error)
              .map((field) => `${field}: ${error.error[field]}`)
              .join('\n');
            errorMessage = fieldErrors || errorMessage;
          }
        }
  
        alert(errorMessage); // Show extracted error
      }
    );
  }
  



  LoadLeavetype(selectedSchema: string) {
    this.leaveService.getLeaveType(selectedSchema).subscribe(
      (data: any) => {
        this.LeaveTypes = data;

        console.log('employee:', this.LeaveTypes);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  LoadEmployee(selectedSchema: string) {
    this.leaveService.getEmployee(selectedSchema).subscribe(
      (data: any) => {
        // Check if `data` contains strings instead of objects
       this.Employees = data;
  
        console.log('Fetched Employees:', this.Employees);
      },
      (error: any) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
  


  LoadBranch(selectedSchema: string) {
    this.leaveService.getBranches(selectedSchema).subscribe(
      (data: any) => {
        this.Branches = data;

        console.log('employee:', this.LeaveTypes);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  LoadDepartment(selectedSchema: string) {
    this.leaveService.getDepartments(selectedSchema).subscribe(
      (data: any) => {
        this.Departments = data;

        console.log('employee:', this.LeaveTypes);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  LoadDesignation(selectedSchema: string) {
    this.leaveService.getDesignation(selectedSchema).subscribe(
      (data: any) => {
        this.Designation = data;

        console.log('employee:', this.LeaveTypes);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  LoadCategory(selectedSchema: string) {
    this.leaveService.getCategory(selectedSchema).subscribe(
      (data: any) => {
        this.Category = data;

        console.log('employee:', this.LeaveTypes);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }



  registerleaveApplicable(): void {
    this.registerButtonClicked = true;
    // if (!this.name || !this.code || !this.valid_to) {
    //   return;
    // }

    const formData = new FormData();
    formData.append('gender', this.gender);
    formData.append('leave_type', this.leave_type);
    formData.append('branch', this.branch);
    formData.append('department', this.department);
    formData.append('designation', this.designation);
    formData.append('role', this.role);




    this.leaveService.registerLeaveapplicable(formData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        alert('Leave Applicable to  has been added');
        window.location.reload();
      },
      (error) => {
        console.error('Added failed', error);
        alert('Enter all required fields!');
      }
    );
  }

  allSelected = false;
  allSelecteddept = false;
  allSelectedcat = false;
  allSelectedEmp = false;
  allSelectedDes = false;


  toggleAllSelection(): void {
    if (this.select) {
      if (this.allSelected) {

        this.select.options.forEach((item: MatOption) => item.select());
      } else {
        this.select.options.forEach((item: MatOption) => item.deselect());
      }
    }
  }

  toggleAllSelectiondept(): void {
    if (this.selectDept) {
      if (this.allSelecteddept) {
        this.selectDept.options.forEach((item: MatOption) => item.select());
      } else {
        this.selectDept.options.forEach((item: MatOption) => item.deselect());
      }
    }
  }

  toggleAllSelectioncat(): void {
    if (this.selectCat) {
      if (this.allSelectedcat) {
        this.selectCat.options.forEach((item: MatOption) => item.select());
      } else {
        this.selectCat.options.forEach((item: MatOption) => item.deselect());
      }
    }
  }

  toggleAllSelectionDes(): void {
    if (this.selectDes) {
      if (this.allSelectedDes) {
        this.selectDes.options.forEach((item: MatOption) => item.select());
      } else {
        this.selectDes.options.forEach((item: MatOption) => item.deselect());
      }
    }
  }



  onAccrualFrequencyChange(): void {
    if (this.accrual_frequency === 'years') {
      this.showMonth = true;  // Show month dropdown
      this.showDay = true;    // Show day dropdown
    } else if (this.accrual_frequency === 'months') {
      this.showMonth = false; // Hide month dropdown
      this.showDay = true;    // Show day dropdown
    } else {
      this.showMonth = false; // Hide both dropdowns
      this.showDay = false;
    }
  }


  onResetFrequencyChange(): void {
    if (this.frequency === 'years') {
      this.showResetMonth = true;  // Show month dropdown
      this.showResetDay = true;    // Show day dropdown
    } else if (this.frequency === 'months') {
      this.showResetMonth = false; // Hide month dropdown
      this.showResetDay = true;   
      
    
      // Show day dropdown
    } else {
      this.showResetMonth = false; // Hide both dropdowns
      this.showResetDay = false;
    }
  }


}
