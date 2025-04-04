import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { SessionService } from '../login/session.service';
import { LeaveService } from '../leave-master/leave.service';
import { DesignationService } from '../designation-master/designation.service';
import { EmployeeService } from '../employee-master/employee.service';
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
  unpaid_leave: boolean = false;
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


  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private leaveService:LeaveService,
    private DesignationService: DesignationService,
    private EmployeeService:EmployeeService,

    
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

    RegisterSalaryComponent(): void {
      this.registerButtonClicked = true;


      if (!this.name || !this.component_type || !this.code) {
        return;
      }
    
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('component_type', this.component_type);
      formData.append('code', this.code);
      formData.append('description', this.description);
      formData.append('formula', this.formula);

      
      formData.append('is_fixed', this.is_fixed.toString());
      formData.append('unpaid_leave', this.unpaid_leave.toString());

      formData.append('affected_by_halfpaid_leave', this.affected_by_halfpaid_leave.toString());

      formData.append('prorata_calculation', this.prorata_calculation.toString());

      formData.append('is_emi_deduction', this.is_emi_deduction.toString());

      this.leaveService.registerSalaryComponent(formData).subscribe(
        (response) => {
          console.log('Registration successful', response);
          alert('Salary Component has been added');
          window.location.reload();
        },
        (error) => {
          console.error('Added failed', error);
          alert('Enter all required fields!');
        }
      );
    }

    
    requestEmployeeSalary(): void {
      
    alert(123)
      this.registerButtonClicked = true;


  
    
      const formData = new FormData();
      formData.append('amount', this.amount);
      formData.append('employee', this.employee);
      formData.append('component', this.component);
      
      formData.append('is_active', this.is_active.toString());
   

      this.leaveService.registerEmpSalary(formData).subscribe(
        (response) => {
          console.log('Registration successful', response);
          alert('Employee Salary  has been added');
          window.location.reload();
        },
        (error) => {
          console.error('Added failed', error);
          alert('Enter all required fields!');
        }
      );
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
    
}
