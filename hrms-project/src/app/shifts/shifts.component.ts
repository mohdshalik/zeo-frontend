import { Component, ViewChild } from '@angular/core';
import { CountryService } from '../country.service';
import { AuthenticationService } from '../login/authentication.service';
import { CatogaryService } from '../catogary-master/catogary.service';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../employee-master/employee.service';
import { MatSelect } from '@angular/material/select';
import { DepartmentServiceService } from '../department-master/department-service.service';
import { CompanyRegistrationService } from '../company-registration.service';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrl: './shifts.component.css'
})
export class ShiftsComponent {


  name:any='';
  start_time:any='';
  end_time:any='';
  break_duration:any='';


  registerButtonClicked = false;

  Shifts:any []=[];

  branches:any []=[];
  Departments:any []=[];
  Categories:any []=[];
  Employee: any[] = [];
  Designations: any[] = [];

  EmployeeShifts: any[] = [];

  ShiftsPattern: any[] = [];

  allSelected=false;
  allSelecteddept=false;
  allSelectedcat=false;
  allSelectedEmp=false;
  allSelecteddes=false;


  monday_shift:any='';
  tuesday_shift:any='';

  wednesday_shift:any='';

  thursday_shift:any='';

  friday_shift:any='';

  saturday_shift:any='';

  sunday_shift:any='';
  employee:any='';
  branch:any='';
  department:any='';
  designation:any='';
  role:any='';
  Patern_name:any='';



  start_date:any='';
  rotation_cycle_weeks:any='';
  is_rotating:any='';
  departments:any='';
  single_shift_pattern:any='';

  automaticNumbering: boolean = false;


  week_number:any='';
  schedule:any='';
  template:any='';


  date:any='';
  override_shift:any='';
  employee_override:any=''

  
  @ViewChild('select') select: MatSelect | undefined;

  @ViewChild('selectDept') selectDept: MatSelect | undefined;

  @ViewChild('selectCat') selectCat: MatSelect | undefined;
  @ViewChild('selectEmp') selectEmp: MatSelect | undefined;
  @ViewChild('selectDes') selectDes: MatSelect | undefined;


  constructor(
    private countryService: CountryService, 
    private authService: AuthenticationService, 

    private http: HttpClient,
    private employeeService: EmployeeService,
    private DepartmentServiceService: DepartmentServiceService ,
    private companyRegistrationService: CompanyRegistrationService, 
    private categoryService: CatogaryService,


  
    
  ) {}


  ngOnInit(): void {
    this.loadShifts();
    this.loadBranch();
    this.loadCAtegory();
    this.loadDEpartments();
    this.loadEmployee();
    this.loadDesignations();
this.loadEmployeeshift();
this.loadShiftsPattern();
  }
  
  registerEmployeeShifts(): void {
    this.registerButtonClicked = true;

    if (!this.name || !this.start_time || !this.end_time|| !this.break_duration) {
      alert('Please fill out all required fields.');
      return;
    }

    const companyData = {
      name: this.name,
      start_time: this.start_time,
      end_time: this.end_time,
      break_duration: this.break_duration,
    };

    this.employeeService.registerShifts(companyData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        alert('Shift has been added.');
        window.location.reload();
      },
      (error) => {
        console.error('Registration failed', error);
        alert('Registration failed. Please try again.');
      }
    );
  }




  registerWeeklyEmployeeShifts(): void {
    this.registerButtonClicked = true;

    if (!this.monday_shift || !this.tuesday_shift || !this.wednesday_shift|| !this.thursday_shift
      || !this.friday_shift || !this.saturday_shift|| !this.sunday_shift 
    ) {
      alert('Please fill out all required fields.');
      return;
    }

    const companyData = {
      monday_shift: this.monday_shift,
      tuesday_shift: this.tuesday_shift,
      wednesday_shift: this.wednesday_shift,
      thursday_shift: this.thursday_shift,
      friday_shift: this.friday_shift,
      saturday_shift: this.saturday_shift,
      sunday_shift: this.sunday_shift,
      name: this.Patern_name,


      // employee: this.employee,
      // branch: this.branch,
      // department: this.department,
      // designation: this.designation,
      // role: this.role,

    };

    this.employeeService.registerWeeklyShifts(companyData).subscribe(
      (response) => { 
        console.log('Registration successful', response);
        alert('Shift has been added.');
        window.location.reload();
      },
      (error) => {
        console.error('Registration failed', error);
        alert('Registration failed. Please try again.');
      }
    );
  }



  registerEmployeeallocateshifts(): void {
    this.registerButtonClicked = true;

 

    const companyData = {
      start_date: this.start_date,
      rotation_cycle_weeks: this.rotation_cycle_weeks ,
      is_rotating: this.is_rotating,
      // single_shift_pattern: this.single_shift_pattern,
      employee: this.employee,
      departments: this.departments,
      single_shift_pattern:this.single_shift_pattern,


      // employee: this.employee,
      // branch: this.branch,
      // department: this.department,
      // designation: this.designation,
      // role: this.role,

    };

    this.employeeService.registerEmployeeShifts(companyData).subscribe(
      (response) => { 
        console.log('Registration successful', response);
        alert('Shift has been added.');
        window.location.reload();
      },
      (error) => {
        console.error('Registration failed', error);
        alert('Registration failed. Please try again.');
      }
    );
  }


  registerweekassign(): void {
    this.registerButtonClicked = true;

 

    const companyData = {
      week_number: this.week_number,
      schedule: this.schedule ,
      template: this.template,
      // single_shift_pattern: this.single_shift_pattern,


    };

    this.employeeService.registerweekpaternassign(companyData).subscribe(
      (response) => { 
        console.log('Registration successful', response);
        alert('Shift has been added.');
        window.location.reload();
      },
      (error) => {
        console.error('Registration failed', error);
        alert('Registration failed. Please try again.');
      }
    );
  }


  registerShiftOverride(): void {
    this.registerButtonClicked = true;

 

    const companyData = {
      date: this.date,
      employee: this.employee_override ,
      override_shift: this.override_shift,
      // single_shift_pattern: this.single_shift_pattern,


    };

    this.employeeService.registerShiftOverride(companyData).subscribe(
      (response) => { 
        console.log('Registration successful', response);
        alert('Shift has been added.');
        // window.location.reload();
      },
      (error) => {
        console.error('Registration failed', error);
        alert('Registration failed. Please try again.');
      }
    );
  }




  
  loadShifts(): void {
    
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
  
    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
      this.countryService.getShifts(selectedSchema).subscribe(
        (result: any) => {
          this.Shifts = result;
          console.log(' fetching Companies:');
  
        },
        (error) => {
          console.error('Error fetching Companies:', error);
        }
      );
    }
    }


    loadEmployeeshift(): void {
    
      const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
    
      console.log('schemastore',selectedSchema )
      // Check if selectedSchema is available
      if (selectedSchema) {
        this.countryService.getEmployeeShifts(selectedSchema).subscribe(
          (result: any) => {
            this.EmployeeShifts = result;
            console.log(' fetching Companies:');
    
          },
          (error) => {
            console.error('Error fetching Companies:', error);
          }
        );
      }
      }

      loadShiftsPattern(): void {
    
        const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
      
        console.log('schemastore',selectedSchema )
        // Check if selectedSchema is available
        if (selectedSchema) {
          this.countryService.getShiftsPattern(selectedSchema).subscribe(
            (result: any) => {
              this.ShiftsPattern = result;
              console.log(' fetching Companies:');
      
            },
            (error) => {
              console.error('Error fetching Companies:', error);
            }
          );
        }
        }

    loadBranch(): void {
    
      const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
    
      console.log('schemastore',selectedSchema )
      // Check if selectedSchema is available
      if (selectedSchema) {
        this.DepartmentServiceService.getDeptBranchList(selectedSchema).subscribe(
          (result: any) => {
            this.branches = result;
            console.log(' fetching Companies:');
    
          },
          (error) => {
            console.error('Error fetching Companies:', error);
          }
        );
      }
      }
  
  
  
  
  
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
  
      
      toggleAllSelectionEmp(): void {
        if (this.selectEmp) {
          if (this.allSelectedEmp) {
            this.selectEmp.options.forEach((item: MatOption) => item.select());
          } else {
            this.selectEmp.options.forEach((item: MatOption) => item.deselect());
          }
        }
      }

        
      
      toggleAllSelectiondes(): void {
        if (this.selectDes) {
          if (this.allSelecteddes) {
            this.selectDes.options.forEach((item: MatOption) => item.select());
          } else {
            this.selectDes.options.forEach((item: MatOption) => item.deselect());
          }
        }
      }
  
  
       
  
          loadDEpartments(): void {
      
            const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
          
            console.log('schemastore',selectedSchema )
            // Check if selectedSchema is available
            if (selectedSchema) {
              this.DepartmentServiceService.getDepartments(selectedSchema).subscribe(
                (result: any) => {
                  this.Departments = result;
                  console.log(' fetching Companies:');
          
                },
                (error) => {
                  console.error('Error fetching Companies:', error);
                }
              );
            }
            }

            loadDesignations(): void {
      
              const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
            
              console.log('schemastore',selectedSchema )
              // Check if selectedSchema is available
              if (selectedSchema) {
                this.employeeService.getDesignations(selectedSchema).subscribe(
                  (result: any) => {
                    this.Designations = result;
                    console.log(' fetching Companies:');
            
                  },
                  (error) => {
                    console.error('Error fetching Companies:', error);
                  }
                );
              }
              }
    
  

            loadCAtegory(): void {
      
              const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
            
              console.log('schemastore',selectedSchema )
              // Check if selectedSchema is available
              if (selectedSchema) {
                this.categoryService.getcatogarys(selectedSchema).subscribe(
                  (result: any) => {
                    this.Categories = result;
                    console.log(' fetching Companies:');
            
                  },
                  (error) => {
                    console.error('Error fetching Companies:', error);
                  }
                );
              }
              }
  
              loadEmployee(): void {
      
                const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
              
                console.log('schemastore',selectedSchema )
                // Check if selectedSchema is available
                if (selectedSchema) {
                  this.employeeService.getemployees(selectedSchema).subscribe(
                    (result: any) => {
                      this.Employee = result;
                      console.log(' fetching Employees:');
              
                    },
                    (error) => {
                      console.error('Error fetching Employees:', error);
                    }
                  );
                }
                }
  
}
