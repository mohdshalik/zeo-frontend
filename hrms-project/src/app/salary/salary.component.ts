import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { SessionService } from '../login/session.service';
import { LeaveService } from '../leave-master/leave.service';
import { DesignationService } from '../designation-master/designation.service';
import { EmployeeService } from '../employee-master/employee.service';
declare var $: any;
import 'summernote'; // Ensure you have summernote imported
@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrl: './salary.component.css'
})
export class SalaryComponent {


  name:any='';
  component_type:any='';
  code:any='';
  description:any='';
  reason:any='';
  is_fixed: boolean = true;
  deduct_leave: boolean = false;
  is_loan_component: boolean = false;

  show_in_payslip: boolean = false;

  affected_by_halfpaid_leave: boolean = false;
  prorata_calculation: boolean = false;
  is_emi_deduction: boolean = false;


  amount:any='';
  employee:any='';
  component:any='';
  is_active: boolean = false;

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
EmployeeSalarycomponent: any[] = [];


filteredEmployees: any[] = [];

// edit salary component

editingComponent: any = null;
isEditMode: boolean = false;
updateId: number | null = null;


editingComponentEmp: any = null;
isEditModeEmp: boolean = false;
updateIdEmp: number | null = null;





  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private leaveService:LeaveService,
    private DesignationService: DesignationService,
    private EmployeeService:EmployeeService,
    private el:ElementRef,


    
    ) {}

    ngOnInit(): void {
      const selectedSchema = this.authService.getSelectedSchema();
      if (selectedSchema) {


      this.LoadEmployee(selectedSchema);
      this.LoadSalaryCom(selectedSchema);
      this.LoadEmployeeSalaryCom(selectedSchema);

      
      }


      this.userId = this.sessionService.getUserId();
if (this.userId !== null) {
  this.authService.getUserData(this.userId).subscribe(
    async (userData: any) => {
      this.userDetails = userData; // Store user details in userDetails property


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

    // RegisterSalaryComponent(): void {
    //   this.registerButtonClicked = true;


    //   if (!this.name || !this.component_type || !this.code) {
    //     return;
    //   }
    
    //   const formData = new FormData();
    //   formData.append('name', this.name);
    //   formData.append('component_type', this.component_type);
    //   formData.append('code', this.code);
    //   formData.append('description', this.description);
    //   formData.append('formula', this.formula);

      
    //   formData.append('is_fixed', this.is_fixed.toString());
    //   formData.append('unpaid_leave', this.unpaid_leave.toString());

    //   formData.append('affected_by_halfpaid_leave', this.affected_by_halfpaid_leave.toString());

    //   formData.append('prorata_calculation', this.prorata_calculation.toString());

    //   formData.append('is_emi_deduction', this.is_emi_deduction.toString());

    //   this.leaveService.registerSalaryComponent(formData).subscribe(
    //     (response) => {
    //       console.log('Registration successful', response);
    //       alert('Salary Component has been added');
    //       window.location.reload();
    //     },
    //     (error) => {
    //       console.error('Added failed', error);
    //       alert('Enter all required fields!');
    //     }
    //   );
    // }

    saveOrUpdateSalaryComponent(): void {
      this.registerButtonClicked = true;
    
      if (!this.name || !this.component_type || !this.code) {
        alert('Please fill in all required fields!');
        return;
      }
    
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('component_type', this.component_type);
      formData.append('code', this.code);
      formData.append('description', this.description || '');
      formData.append('formula', this.formula || '');
    
      formData.append('is_fixed', (this.is_fixed ?? false).toString());
      formData.append('deduct_leave', (this.deduct_leave ?? false).toString());
      formData.append('is_loan_component', (this.is_loan_component ?? false).toString());

      formData.append('show_in_payslip', (this.show_in_payslip ?? false).toString());

      formData.append('affected_by_halfpaid_leave', (this.affected_by_halfpaid_leave ?? false).toString());
      formData.append('prorata_calculation', (this.prorata_calculation ?? false).toString());
      formData.append('is_emi_deduction', (this.is_emi_deduction ?? false).toString());
    
      if (this.isEditMode && this.updateId !== null) {
        this.leaveService.updateSalaryComponent(this.updateId, formData).subscribe(
          (response) => {
            alert('Salary Component updated successfully');
            this.resetForm();
            this.LoadSalaryCom(localStorage.getItem('selectedSchema') || '');
          },
          (error) => {
            console.error('Update failed', error);
            this.displayBackendErrors(error);
          }
        );
      } else {
        this.leaveService.registerSalaryComponent(formData).subscribe(
          (response) => {
            alert('Salary Component has been added');
            this.resetForm();
            this.LoadSalaryCom(localStorage.getItem('selectedSchema') || '');
          },
          (error) => {
            console.error('Add failed', error);
            this.displayBackendErrors(error);
          }
        );
      }
    }
    
    

    resetForm(): void {
      this.name = '';
      this.component_type = '';
      this.code = '';
      this.description = '';
      this.formula = '';
      this.is_fixed = true;
      this.deduct_leave = false;
      this.affected_by_halfpaid_leave = false;
      this.prorata_calculation = false;
      this.is_emi_deduction = false;
      this.updateId = null;
      this.isEditMode = false;
      this.registerButtonClicked = false;
    }
    


    editSalaryComponent(component: any): void {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    
      this.name = component.name;
      this.component_type = component.component_type;
      this.code = component.code;
      this.description = component.description;
      this.formula = component.formula;
    
      this.is_fixed = component.is_fixed;
      this.deduct_leave = component.deduct_leave;
      this.affected_by_halfpaid_leave = component.affected_by_halfpaid_leave;
      this.prorata_calculation = component.prorata_calculation;
      this.is_emi_deduction = component.is_emi_deduction;
    
      this.updateId = component.id;
      this.isEditMode = true;
    }
    
    
    // requestEmployeeSalary(): void {
      
    //   this.registerButtonClicked = true;


  
    
    //   const formData = new FormData();
    //   formData.append('amount', this.amount);
    //   formData.append('employee', this.employee);
    //   formData.append('component', this.component);
      
    //   formData.append('is_active', this.is_active.toString());
   

    //   this.leaveService.registerEmpSalary(formData).subscribe(
    //     (response) => {
    //       console.log('Registration successful', response);
    //       alert('Employee Salary  has been added');
    //       window.location.reload();
    //     },
    //     (error) => {
    //       console.error('Added failed', error);
    //       alert('Enter all required fields!');
    //     }
    //   );
    // }
    saveOrUpdateSalaryComponentEmp(): void {
      this.registerButtonClicked = true;
    
      if ( !this.employee || !this.component) {
        alert('Please fill in all required fields!');
        return;
      }
    
      const formData = new FormData();
      formData.append('amount', this.amount);
      formData.append('employee', this.employee);
      formData.append('component', this.component);
      formData.append('is_active', (this.is_active ?? false).toString());
    
      if (this.isEditModeEmp && this.updateIdEmp !== null) {
        this.leaveService.updateSalaryComponentEmp(this.updateIdEmp, formData).subscribe(
          (response) => {
            alert('Employee Salary updated successfully');
            this.resetFormEmp();
            this.LoadEmployeeSalaryCom(localStorage.getItem('selectedSchema') || '');
          },
          (error) => {
            console.error('Update failed', error);
            this.displayBackendErrors(error);
          }
        );
      } else {
        this.leaveService.registerEmpSalary(formData).subscribe(
          (response) => {
            alert('Salary Component has been added');
            this.resetFormEmp();
            this.LoadEmployeeSalaryCom(localStorage.getItem('selectedSchema') || '');
          },
          (error) => {
            console.error('Add failed', error);
            this.displayBackendErrors(error);
          }
        );
      }
    }
    

    displayBackendErrors(error: any): void {
      if (error.error) {
        const backendErrors = error.error;
        let errorMsg = '';
    
        // If the backend returns a dictionary of field-specific errors
        if (typeof backendErrors === 'object') {
          for (const key in backendErrors) {
            if (backendErrors.hasOwnProperty(key)) {
              const fieldErrors = backendErrors[key];
              if (Array.isArray(fieldErrors)) {
                fieldErrors.forEach((msg: string) => {
                  errorMsg += `${key}: ${msg}\n`;
                });
              } else {
                errorMsg += `${key}: ${fieldErrors}\n`;
              }
            }
          }
        } else {
          // Fallback for generic error message
          errorMsg = backendErrors;
        }
    
        alert(errorMsg || 'An unknown error occurred!');
      } else {
        alert('An error occurred while processing your request.');
      }
    }



    resetFormEmp(): void {
      this.amount = '';
      this.employee = '';
      this.component = '';
 
      this.is_active = true;
      this.isEditModeEmp = false;

    }
    


  

    editSalaryComponentEmp(component: any): void {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    
      this.amount = component.amount;
      this.employee = component.employee;
      this.component = component.component;
      this.is_active = component.is_active;
     
    
      this.updateIdEmp = component.id;
      this.isEditModeEmp = true;
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


    LoadEmployeeSalaryCom(selectedSchema: string) {
      this.leaveService.getEmployeeSalaryCom(selectedSchema).subscribe(
        (data: any) => {
          this.EmployeeSalarycomponent = data;
        
          console.log('employee:', this.Salarycomponent);
        },
        (error: any) => {
          console.error('Error fetching categories:', error);
        }
      );
    }



    numbers: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    formula: string = ''; // Initialize empty
    
    insertIntoTextarea(componentName: string): void {
      if (this.formula) {
        this.formula += ' ' + componentName; // Append new name
      } else {
        this.formula = componentName; // First entry
      }
    }

    clearTextarea(): void {
      this.formula = ''; // Clear the textarea
    }

    deleteLastCharacter(): void {
      this.formula = this.formula.trim().slice(0, -1); // Remove last character
    }




    selectedComponent: any = null;

    // selectedComponentId: number | null = null;


    onComponentChange() {
      // Find the selected component details from the Salarycomponent list
      this.selectedComponent = this.Salarycomponent.find(
        comp => comp.id === Number(this.component)
      );
    
      // If is_fixed is false, clear the amount field
      if (this.selectedComponent && !this.selectedComponent.is_fixed) {
        this.amount = '';
      }
    }




    insertComponentToFormula(code: string, textarea: HTMLTextAreaElement): void {
      const placeholder = `${code}`;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
    
      this.formula = 
        this.formula.substring(0, start) + 
        placeholder + 
        this.formula.substring(end);
    
      setTimeout(() => {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + placeholder.length;
      }, 0);
    
      // Close dropdowns after selection
      this.dropdownOpen = false;
      this.operatorDropdownOpen = false;
      this.arithmeticDropdownOpen = false; // close the salary component dropdown if open

    }

isAddFieldsModalOpen: boolean = false;


// Triggered when the checkbox is changed
onFixedChange() {
  if (!this.is_fixed) {
    this.isAddFieldsModalOpen = true;
  }
}

closemarketModal(){
  this.isAddFieldsModalOpen=false;
}




dropdownOpen: boolean = false;

operatorDropdownOpen: boolean = false;
arithmeticDropdownOpen: boolean = false;
FunctionsdropdownOpen: boolean = false;

VariablesdropdownOpen: boolean = false;


logicalOperators: string[] = ['<', '>', '>=', '<=', '==', '!=', 'AND','OR','NOT']; // Add more if needed

arithmeticOperators: string[] = ['+', '-', '*', '/', '%'];

FunctionsOperators: string[] = ['WORKHOURS()','MAX()', 'MIN()', 'ROUND()', 'SUM()', 'AVG()','ABS()','INT()',];

VariablesOperators: string[] = ['calendar_days','working_days','fixed_days','standard_hours','ot_hours','years_of_service'];


toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
  this.operatorDropdownOpen = false; // close the other dropdown if open
  this.arithmeticDropdownOpen = false; // close the salary component dropdown if open
  this.FunctionsdropdownOpen = false;
  this.VariablesdropdownOpen = false;

}

toggleOperatorDropdown() {
  this.operatorDropdownOpen = !this.operatorDropdownOpen;
  this.dropdownOpen = false; // close the salary component dropdown if open
  this.arithmeticDropdownOpen = false; // close the salary component dropdown if open
  this.FunctionsdropdownOpen = false;
  this.VariablesdropdownOpen = false;

}


toggleArithmeticDropdown() {
  this.arithmeticDropdownOpen = !this.arithmeticDropdownOpen;

  // Close the other dropdowns
  this.dropdownOpen = false;
  this.operatorDropdownOpen = false;
  this.FunctionsdropdownOpen = false;
  this.VariablesdropdownOpen = false;

}

toggleFunctionsDropdown() {
  this.FunctionsdropdownOpen = !this.FunctionsdropdownOpen;

  // Close the other dropdowns
  this.dropdownOpen = false;
  this.operatorDropdownOpen = false;
  this.arithmeticDropdownOpen = false;

  this.VariablesdropdownOpen = false;

}


toggleVariablesDropdown() {
  this.VariablesdropdownOpen = !this.VariablesdropdownOpen;

  // Close the other dropdowns
  this.dropdownOpen = false;
  this.operatorDropdownOpen = false;
  this.arithmeticDropdownOpen = false;
  this.FunctionsdropdownOpen = false;

}


deletePayroll(payrollId: number): void {
  if (confirm('Are you sure you want to delete this Component?')) {
    this.leaveService.deleteSalary(payrollId).subscribe(
      () => {
        // Filter out the deleted payroll from the list
        this.Salarycomponent = this.Salarycomponent.filter(p => p.id !== payrollId);
        console.log('Payroll deleted successfully');
        alert('salary Component deleted succesfull');
      },
      (error) => {
        console.error('Failed to delete payroll', error);
      }
    );
  }
}



}
