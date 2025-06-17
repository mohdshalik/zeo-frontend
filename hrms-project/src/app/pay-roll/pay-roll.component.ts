import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { SessionService } from '../login/session.service';
import { LeaveService } from '../leave-master/leave.service';
import { DesignationService } from '../designation-master/designation.service';
import { EmployeeService } from '../employee-master/employee.service';
import { CatogaryService } from '../catogary-master/catogary.service';
import { Route, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-pay-roll',
  templateUrl: './pay-roll.component.html',
  styleUrl: './pay-roll.component.css'
})
export class PayRollComponent {



  created_by:any='';


  // name:any='';
  // formula_text: string = ''; // Initialize empty
  // description:any='';




  name:any='';
  year:any='';
  month:any='';
  payment_date:any='';


  branch:any='';
  department:any='';
  category:any='';


  payslip_pdf: File | null = null;
  payroll:any='';


  basic_salary:any='';
  gross_salary:any=''; 
  net_salary:any=''; 
  total_deductions:any=''; 
  total_additions:any=''; 


  amount:any=''; 
  payslip:any=''; 
  component:any=''; 


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
PaySlipsComponent: any[] = [];

PaySlipsConfrimed: any[] = [];



Branches: any[] = [];
Departments: any[] = [];









  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private leaveService:LeaveService,
    private DesignationService: DesignationService,
    private EmployeeService:EmployeeService,
    private categoryService:CatogaryService,
    private router: Router

    
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
this.LoadConfrimedPayslip(selectedSchema)

this.LoadSalaryCom(selectedSchema)
this.LoadPaySlipComponent(selectedSchema);

this.LoadBranch(selectedSchema);
this.LoadDepartment(selectedSchema);



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



    exportToExcel(): void {
      const exportData = this.PaySlips.map((p, index) => {
        const components = p.components?.map((c: { component_name: any; component_type: any; payslip_amount: any; }) =>
          `${c.component_name} (${c.component_type}): ${c.payslip_amount}`
        ).join(' | ') || '';
    
        return {
          No: index + 1,
          Employee: p.employee,
          'Payroll Name': p.payroll_run?.name,
          Year: p.payroll_run?.year,
          Month: this.getMonthName(p.payroll_run?.month),
          'Gross Salary': p.gross_salary,
          'Net Salary': p.net_salary,
          'Total Additions': p.total_additions,
          'Total Deductions': p.total_deductions,
          'Pro Rata Adjustment': p.pro_rata_adjustment,
          // Arrears: p.arrears,
          'Working Days': p.total_working_days,
          'Days Worked': p.days_worked,
          Status: p.status,
          Components: components
        };
      });
    
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
      const workbook: XLSX.WorkBook = {
        Sheets: { 'Payslips': worksheet },
        SheetNames: ['Payslips']
      };
    
      const excelBuffer: any = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });
    
      const blobData: Blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
      });
    
      FileSaver.saveAs(blobData, `Payslips_${new Date().toISOString().slice(0,10)}.xlsx`);
    }
    
    
    checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
      return groupPermissions.some(permission => permission.codename === codeName);
      }



      // RegisterPayrollSettings(): void {
      //   this.registerButtonClicked = true;
      
      //   // Frontend validation
      //   if (!this.name || !this.formula_text ) {
      //     alert('Please fill in all required fields.');
      //     return;
      //   }
      
      //   const formData = new FormData();
      //   formData.append('name', this.name);
      //   formData.append('formula_text', this.formula_text);
      //   formData.append('description', this.description);
   

      //   this.leaveService.requestPayrollSettings(formData).subscribe(
      //     (response) => {
      //       console.log('Registration successful', response);
      //       alert('Payroll Formula has been added');
      //       window.location.reload();
      //     },
      //     (error) => {
      //       console.error('Added failed', error);
      
      //       // Extract backend error message
      //       let errorMessage = 'An unexpected error occurred. Please try again.';
      
      //       if (error.error) {
      //         if (typeof error.error === 'string') {
      //           errorMessage = error.error; // If backend returns a string message
      //         } else if (error.error.detail) {
      //           errorMessage = error.error.detail; // If backend returns { detail: "message" }
      //         } else if (error.error.non_field_errors) {
      //           errorMessage = error.error.non_field_errors.join(', '); // Handle non-field errors array
      //         } else {
      //           // Handle field-specific errors
      //           const fieldErrors = Object.keys(error.error).map(field => `${field}: ${error.error[field]}`).join('\n');
      //           errorMessage = fieldErrors || errorMessage;
      //         }
      //       }
      
      //       alert(errorMessage); // Show extracted error
      //     }
      //   );
      // }
      

 
      
      
      isLoading: boolean = false;

      requestPayRoll(): void {
        this.registerButtonClicked = true;
      
        // Frontend validation
        if (!this.name || !this.year ) {
          alert('Please fill in all required fields.');
          return;
        }
      
        const formData = new FormData();
        formData.append('name', this.name);
        formData.append('year', this.year);
        formData.append('month', this.month);
        formData.append('payment_date', this.payment_date);
        formData.append('branch', this.branch);

        formData.append('department', this.department);
        formData.append('category', this.category);
     
        this.isLoading = true;

        this.leaveService.requestPayroll(formData).subscribe(
          (response) => {
            this.isLoading = false;

            console.log('Registration successful', response);
            alert('Payroll has been added');
            window.location.reload();
          },
          (error) => {
            this.isLoading = false;

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

     
      
      // registerPaySlip(): void {
      //   this.registerButtonClicked = true;
      
      //   // Frontend validation
      //   if (!this.basic_salary || !this.gross_salary) {
      //     alert('Please select a Payslip PDF and Payroll.');
      //     return;
      //   }
      
      //   const formData = new FormData();
      //   formData.append('basic_salary', this.basic_salary);
      //   formData.append('gross_salary', this.gross_salary); // Append file to FormData

      //   formData.append('net_salary', this.net_salary);

      //   formData.append('total_deductions', this.total_deductions);

      //   formData.append('total_additions', this.total_additions);


      
      //   this.leaveService.requestPaySlip(formData).subscribe(
      //     (response) => {
      //       console.log('Registration successful', response);
      //       alert('Payslip has been added successfully.');
      //       window.location.reload();
      //     },
      //     (error) => {
      //       console.error('Upload failed', error);
      
      //       // Extract backend error message
      //       let errorMessage = 'An unexpected error occurred. Please try again.';
      
      //       if (error.error) {
      //         if (typeof error.error === 'string') {
      //           errorMessage = error.error;
      //         } else if (error.error.detail) {
      //           errorMessage = error.error.detail;
      //         } else if (error.error.non_field_errors) {
      //           errorMessage = error.error.non_field_errors.join(', ');
      //         } else {
      //           const fieldErrors = Object.keys(error.error)
      //             .map((field) => `${field}: ${error.error[field]}`)
      //             .join('\n');
      //           errorMessage = fieldErrors || errorMessage;
      //         }
      //       }
      
      //       alert(errorMessage); // Show extracted error
      //     }
      //   );
      // }
      
      
      // registerPaySlipComponent(): void {
      //   this.registerButtonClicked = true;
      
      //   // Frontend validation
      //   if (!this.amount || !this.payslip) {
      //     alert('Please select a Payslip PDF and Payroll.');
      //     return;
      //   }
      
      //   const formData = new FormData();
      //   formData.append('amount', this.amount);
      //   formData.append('payslip', this.payslip); // Append file to FormData

      //   formData.append('component', this.component);

     


      
      //   this.leaveService.requestPayslipComponent(formData).subscribe(
      //     (response) => {
      //       console.log('Registration successful', response);
      //       alert('Payslip has been added successfully.');
      //       window.location.reload();
      //     },
      //     (error) => {
      //       console.error('Upload failed', error);
      
      //       // Extract backend error message
      //       let errorMessage = 'An unexpected error occurred. Please try again.';
      
      //       if (error.error) {
      //         if (typeof error.error === 'string') {
      //           errorMessage = error.error;
      //         } else if (error.error.detail) {
      //           errorMessage = error.error.detail;
      //         } else if (error.error.non_field_errors) {
      //           errorMessage = error.error.non_field_errors.join(', ');
      //         } else {
      //           const fieldErrors = Object.keys(error.error)
      //             .map((field) => `${field}: ${error.error[field]}`)
      //             .join('\n');
      //           errorMessage = fieldErrors || errorMessage;
      //         }
      //       }
      
      //       alert(errorMessage); // Show extracted error
      //     }
      //   );
      // }

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


    deletePayroll(payrollId: number): void {
      if (confirm('Are you sure you want to delete this payroll entry?')) {
        this.leaveService.deletePayroll(payrollId).subscribe(
          () => {
            // Filter out the deleted payroll from the list
            this.Payrolls = this.Payrolls.filter(p => p.id !== payrollId);
            console.log('Payroll deleted successfully');
          },
          (error) => {
            console.error('Failed to delete payroll', error);
          }
        );
      }
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


    // LoadPaySlip(selectedSchema: string) {
    //   this.leaveService.getPaySlip(selectedSchema).subscribe(
    //     (data: any) => {
    //       this.PaySlips = data.map((payslip: any) => ({
    //         ...payslip,
    //         payslip_pdf: payslip.payslip_pdf ? payslip.payslip_pdf : null
    //       }));
    //     },
    //     (error: any) => {
    //       console.error('Error fetching Payslips:', error);
    //     }
    //   );
    // }
    

    LoadPaySlip(selectedSchema: string) {
      this.leaveService.getPaySlip(selectedSchema).subscribe(
        (data: any[]) => {
          this.PaySlips = data
            .filter((payslip: any) => payslip.confirm_status === false) // Only pending confirm status
            .map((payslip: any) => ({
              ...payslip,
              payslip_pdf: payslip.payslip_pdf ? payslip.payslip_pdf : null
            }));
        },
        (error: any) => {
          console.error('Error fetching Payslips:', error);
        }
      );
    }
    

    getMonthName(month: number): string {
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      return months[month - 1] || 'N/A';
    }
    

    LoadPaySlipComponent(selectedSchema: string) {
      this.leaveService.getPayslipComponent(selectedSchema).subscribe(
        (data: any) => {
          // Ensure each payslip has a valid URL
          this.PaySlipsComponent = data;
    
          console.log('Fetched Payslips:', this.PaySlips);
        },
        (error: any) => {
          console.error('Error fetching Payslips:', error);
        }
      );
    }
    

    
  LoadBranch(selectedSchema: string) {
    this.leaveService.getBranches(selectedSchema).subscribe(
      (data: any) => {
        this.Branches = data;

        console.log('employee:', this.Branches);
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

        console.log('employee:', this.Departments);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }



 
  LoadConfrimedPayslip(selectedSchema: string) {
    this.leaveService.getPaySlipApproved(selectedSchema).subscribe(
      (data: any) => {
        this.PaySlipsConfrimed = data;
        this.filteredDocuments = this.PaySlipsConfrimed;  // Initialize filtered data
        console.log('Confirmed Payslips:', this.PaySlipsConfrimed);
      },
      (error: any) => {
        console.error('Error fetching Payrolls:', error);
      }
    );
  }
  

  LoadPayslip(selectedSchema: string) {
    this.leaveService.getPaySlip(selectedSchema).subscribe(
      (data: any[]) => {
        this.PaySlips = data;
        this.masterSelected = false;
        console.log('Payrolls:', this.PaySlips);
      },
      (error: any) => {
        console.error('Error fetching Payrolls:', error);
      }
    );
  }
  

  searchQuery = '';


  filteredDocuments: any[] = [];  // Filtered list
// Filter documents based on searchQuery
filterDocuments() {
  this.filteredDocuments = this.PaySlips.filter(doc =>
    doc.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    doc.employee.toLowerCase().includes(this.searchQuery.toLowerCase())
  );

  
}

isExpanded = false;


toggleSearch() {
  this.isExpanded = !this.isExpanded;
}



viewPayrollDetails(payslip: any) {
  // Navigate and pass the payslip ID as a route parameter (or use state)
  this.router.navigate(['/main-sidebar/salary-options/payroll-details', payslip.id]);
}



masterSelected: boolean = false;


selectAllRows() {
  for (let payslip of this.PaySlips) {
    payslip.selected = this.masterSelected;
  }
}

checkIfAllSelected() {
  this.masterSelected = this.PaySlips.every(item => item.selected);
}


confirmSelectedPayslips() {
  const selectedPayslips = this.PaySlips.filter(p => p.selected && !p.confirm_status);

  if (selectedPayslips.length === 0) {
    alert('No unconfirmed payslips selected.');
    return;
  }

  const payload = selectedPayslips.map(p => ({
    id: p.id,
    confirm_status: true
  }));

  this.leaveService.confirmPayslips(payload).subscribe(
    (response: any) => {
      // Update local state
      for (let p of selectedPayslips) {
        p.confirm_status = true;
        p.selected = false;
      }
      this.masterSelected = false;
      alert('Selected payslips confirmed successfully.');
    },
    (error: any) => {
      console.error('Error confirming payslips:', error);
      alert('Failed to confirm payslips.');
    }
  );
}


}
