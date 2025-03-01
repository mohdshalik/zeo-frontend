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
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrl: './shifts.component.css'
})
export class ShiftsComponent {

  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local

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
  schedule_name:any='';
  shift_type:any='';
  rotation_cycle_weeks :any='';
  departments:any='';
  single_shift_pattern:any='';

  automaticNumbering: boolean = false;


  week_number:any='';
  schedule:any='';
  template:any='';


  date:any='';
  override_shift:any='';
  employee_override:any=''


  shiftData: any = {};

  selectedYear: number | '' = '';
  selectedSchedule: string = '';
  selectedEmployee: string = '';
  availableYears: number[] = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
  employeeShifts: any[] = [];

  
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
  
    // Build the payload, converting values as necessary:
    const payload = {
      start_date: this.start_date || null,
      schedule_name: this.schedule_name || null,
      shift_type: this.shift_type || null,
      // Convert to number if provided; otherwise, send null.
      rotation_cycle_weeks: this.rotation_cycle_weeks ? Number(this.rotation_cycle_weeks) : null,
      employee: this.employee || null,
      // For a multi-select field, ensure we send an array.
      departments: (this.departments && Array.isArray(this.departments)) ? this.departments : [],
      // If nothing is selected for single shift pattern, send null.
      single_shift_pattern: this.single_shift_pattern || null,
    };
  
    console.log('Payload:', payload);
  
    this.employeeService.registerEmployeeShifts(payload).subscribe(
      (response) => {
        console.log('Registration successful', response);
        alert('Shift has been added.');
        window.location.reload();
      },
      (error) => {
        console.error('Registration failed', error);
  
        // Extract backend error messages.
        let errorMsg = 'Registration failed. Please try again.';
        if (error.error) {
          if (typeof error.error === 'string') {
            errorMsg = error.error;
          } else if (typeof error.error === 'object') {
            // Example: { rotation_cycle_weeks: ["A valid integer is required."], departments: ["Expected a list of items but got type \"str\"."] }
            errorMsg = Object.keys(error.error)
              .map(field => `${field}: ${error.error[field].join(', ')}`)
              .join('\n');
          }
        }
        alert(errorMsg);
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



        
// The raw response from the backend:

// For table display:
//  - employeeCodes: array of strings (["EMP001", "EMP2", ...])
//  - allDates: array of sorted date strings (["01-01-2025", "02-01-2025", ...])
employeeCodes: string[] = [];
allDates: string[] = [];

// After fetching shiftData, transform for table display
transformShiftDataForTable(): void {
  if (!this.shiftData || !this.shiftData.shifts) {
    this.employeeCodes = [];
    this.allDates = [];
    return;
  }

  // 1) Get all employee codes
  this.employeeCodes = Object.keys(this.shiftData.shifts); // e.g. ["EMP001", "EMP2"]

  // 2) Gather all dates from each employee's shift object
  const dateSet = new Set<string>(); 
  for (const empCode of this.employeeCodes) {
    const schedule = this.shiftData.shifts[empCode];
    if (schedule) {
      Object.keys(schedule).forEach(date => dateSet.add(date));
    }
  }

  // 3) Sort the dates
  this.allDates = Array.from(dateSet).sort((a, b) => {
    // Example date format: "DD-MM-YYYY"
    const [dayA, monthA, yearA] = a.split('-').map(Number);
    const [dayB, monthB, yearB] = b.split('-').map(Number);
    const dateA = new Date(yearA, monthA - 1, dayA).getTime();
    const dateB = new Date(yearB, monthB - 1, dayB).getTime();
    return dateA - dateB;
  });
}

// Helper to fetch a shift from shiftData for a given employee and date
getShift(empCode: string, date: string): string {
  if (!this.shiftData.shifts || !this.shiftData.shifts[empCode]) return '';
  return this.shiftData.shifts[empCode][date] || '';
}

// Example: fetching the shifts
fetchShifts(): void {
  if (!this.selectedSchedule ||  !this.selectedYear) {
    alert('Please select schedule, employee, and year.');
    return;
  }

  const selectedSchema = localStorage.getItem('selectedSchema');
  const url = `${this.apiUrl}/calendars/api/employee-shift/get_shifts_for_year/?schedule_id=${this.selectedSchedule}&employee=${this.selectedEmployee}&year=${this.selectedYear}&schema=${selectedSchema}`;

  this.http.get(url).subscribe(
    (response: any) => {
      console.log('Fetched shift data:', response);
      this.shiftData = response;

      // Transform for table
      this.transformShiftDataForTable();
    },
    (error) => {
      console.error('Error fetching shift data:', error);
      let errorMessage = 'Error fetching shift data.';
      if (error.error) {
        if (typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.error.error) {
          errorMessage = error.error.error;
        }
      }
      alert(errorMessage);
    }
  );
}

  
}
