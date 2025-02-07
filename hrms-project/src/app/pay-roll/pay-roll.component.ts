import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { SessionService } from '../login/session.service';
import { LeaveService } from '../leave-master/leave.service';
import { DesignationService } from '../designation-master/designation.service';
import { EmployeeService } from '../employee-master/employee.service';
import { CatogaryService } from '../catogary-master/catogary.service';

@Component({
  selector: 'app-pay-roll',
  templateUrl: './pay-roll.component.html',
  styleUrl: './pay-roll.component.css'
})
export class PayRollComponent {


  payroll_frequency:any='';
  next_run_date:any='';
  pay_period_start_date:any='';
  pay_period_end_date:any='';
  created_by:any='';
  category:any='';




  pay_period_start:any='';
  pay_period_end:any='';
  total_earnings:any='';
  total_deductions:any='';
  net_salary:any='';
  employee:any='';
  is_paid: boolean = false;


  payslip_pdf: File | null = null;
  payroll:any='';

  registerButtonClicked: boolean = false;



  hasAddPermission: boolean = false;
  hasDeletePermission: boolean = false;
  hasViewPermission: boolean =false;
  hasEditPermission: boolean = false;

  userId: number | null | undefined;
userDetails: any;
userDetailss: any;
schemas: string[] = []; // Array to store schema names

employees: any[] = [];
Salarycomponent: any[] = [];

filteredEmployees: any[] = [];

Categories: any[] = [];
Payrolls: any[] = [];
PayrollSettings: any[] = [];
PaySlips: any[] = [];




  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private leaveService:LeaveService,
    private DesignationService: DesignationService,
    private EmployeeService:EmployeeService,
    private categoryService:CatogaryService,

    
    ) {}

    ngOnInit(): void {
      const selectedSchema = this.authService.getSelectedSchema();
      if (selectedSchema) {


      this.LoadEmployee(selectedSchema);
      // this.LoadSalaryCom(selectedSchema);
this.LoadCategory();
this.LoadPayroll(selectedSchema);
this.LoadPayrollSettings(selectedSchema);
this.LoadPaySlip(selectedSchema)

      
      }


      this.userId = this.sessionService.getUserId();
if (this.userId !== null) {
  this.authService.getUserData(this.userId).subscribe(
    async (userData: any) => {
      this.userDetails = userData; // Store user details in userDetails property

      this.created_by = this.userId;
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
            console.log('scehmas-de',userData)
        },
        (error) => {
            console.error('Failed to fetch user schemas:', error);
        }
    );
} else {
    console.error('User ID is null.');
}

   
    }

    checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
      return groupPermissions.some(permission => permission.codename === codeName);
      }



      RegisterPayrollSettings(): void {
        this.registerButtonClicked = true;
      
        // Frontend validation
        if (!this.payroll_frequency || !this.next_run_date || !this.pay_period_start_date || !this.pay_period_end_date) {
          alert('Please fill in all required fields.');
          return;
        }
      
        const formData = new FormData();
        formData.append('payroll_frequency', this.payroll_frequency);
        formData.append('next_run_date', this.next_run_date);
        formData.append('pay_period_start_date', this.pay_period_start_date);
        formData.append('pay_period_end_date', this.pay_period_end_date);

        formData.append('category', this.category);
        formData.append('created_by', this.created_by);

        this.leaveService.requestPayrollSettings(formData).subscribe(
          (response) => {
            console.log('Registration successful', response);
            alert('Payroll Settings has been added');
            window.location.reload();
          },
          (error) => {
            console.error('Added failed', error);
      
            // Extract backend error message
            let errorMessage = 'An unexpected error occurred. Please try again.';
      
            if (error.error) {
              if (typeof error.error === 'string') {
                errorMessage = error.error; // If backend returns a string message
              } else if (error.error.detail) {
                errorMessage = error.error.detail; // If backend returns { detail: "message" }
              } else if (error.error.non_field_errors) {
                errorMessage = error.error.non_field_errors.join(', '); // Handle non-field errors array
              } else {
                // Handle field-specific errors
                const fieldErrors = Object.keys(error.error).map(field => `${field}: ${error.error[field]}`).join('\n');
                errorMessage = fieldErrors || errorMessage;
              }
            }
      
            alert(errorMessage); // Show extracted error
          }
        );
      }
      
    
      requestPayRoll(): void {
        this.registerButtonClicked = true;
      
        // Frontend validation
        if (!this.pay_period_start || !this.pay_period_end || !this.employee) {
          alert('Please fill in all required fields.');
          return;
        }
      
        const formData = new FormData();
        formData.append('pay_period_start', this.pay_period_start);
        formData.append('pay_period_end', this.pay_period_end);
        formData.append('total_earnings', this.total_earnings);
        formData.append('total_deductions', this.total_deductions);
        formData.append('net_salary', this.net_salary);
        formData.append('employee', this.employee);
        formData.append('created_by', this.created_by);
        formData.append('is_paid', this.is_paid.toString());
      
        this.leaveService.requestPayroll(formData).subscribe(
          (response) => {
            console.log('Registration successful', response);
            alert('Payroll has been added');
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
                const fieldErrors = Object.keys(error.error).map(field => `${field}: ${error.error[field]}`).join('\n');
                errorMessage = fieldErrors || errorMessage;
              }
            }
      
            alert(errorMessage); // Show extracted error
          }
        );
      }

     
      
      registerPaySlip(): void {
        this.registerButtonClicked = true;
      
        // Frontend validation
        if (!this.payslip_pdf || !this.payroll) {
          alert('Please select a Payslip PDF and Payroll.');
          return;
        }
      
        const formData = new FormData();
        formData.append('payroll', this.payroll);
        formData.append('payslip_pdf', this.payslip_pdf); // Append file to FormData
      
        this.leaveService.requestPaySlip(formData).subscribe(
          (response) => {
            console.log('Registration successful', response);
            alert('Payslip has been added successfully.');
            window.location.reload();
          },
          (error) => {
            console.error('Upload failed', error);
      
            // Extract backend error message
            let errorMessage = 'An unexpected error occurred. Please try again.';
      
            if (error.error) {
              if (typeof error.error === 'string') {
                errorMessage = error.error;
              } else if (error.error.detail) {
                errorMessage = error.error.detail;
              } else if (error.error.non_field_errors) {
                errorMessage = error.error.non_field_errors.join(', ');
              } else {
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
      
      

onFileSelected(event:any){
  const file = event.target.files[0];
  if  (file){
    this.payslip_pdf =file;


  }
}


    LoadEmployee(selectedSchema: string) {
      this.EmployeeService.getemployees(selectedSchema).subscribe(
        (data: any) => {
          // Filtering employees where is_active is null or true
          this.employees = data.filter((employee: any) => employee.is_active === null || employee.is_active === true);
          this.filteredEmployees = this.employees;
    
    
          console.log('Filtered Employees:', this.filteredEmployees);
        },
        (error: any) => {
    
          console.error('Error fetching employees:', error);
        }
      );
    }


    LoadSalaryCom(selectedSchema: string) {
      this.leaveService.getSalaryCom(selectedSchema).subscribe(
        (data: any) => {
          this.Salarycomponent = data;
        
          console.log('employee:', this.Salarycomponent);
        },
        (error: any) => {
          console.error('Error fetching categories:', error);
        }
      );
    }


    LoadCategory() {
      this.categoryService.getcatogary().subscribe(
        (data: any) => {
          this.Categories = data;
        
          console.log('Categories:', this.Categories);
        },
        (error: any) => {
          console.error('Error fetching categories:', error);
        }
      );
    }


    LoadPayroll(selectedSchema: string) {
      this.leaveService.getPayroll(selectedSchema).subscribe(
        (data: any) => {
          this.Payrolls = data;
        
          console.log('Payrolls:', this.Payrolls);
        },
        (error: any) => {
          console.error('Error fetching Payrolls:', error);
        }
      );
    }

    LoadPayrollSettings(selectedSchema: string) {
      this.leaveService.getPayrollSettings(selectedSchema).subscribe(
        (data: any) => {
          this.PayrollSettings = data;
        
          console.log('payrollsettings:', this.PayrollSettings);
        },
        (error: any) => {
          console.error('Error fetching PayrollSettings:', error);
        }
      );
    }


    LoadPaySlip(selectedSchema: string) {
      this.leaveService.getPaySlip(selectedSchema).subscribe(
        (data: any) => {
          // Ensure each payslip has a valid URL
          this.PaySlips = data.map((payslip: any) => ({
            ...payslip,
            payslip_pdf: payslip.payslip_pdf ? payslip.payslip_pdf : null
          }));
    
          console.log('Fetched Payslips:', this.PaySlips);
        },
        (error: any) => {
          console.error('Error fetching Payslips:', error);
        }
      );
    }
    

 

}
