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
import { DesignationService } from '../designation-master/designation.service';
import { SessionService } from '../login/session.service';

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


  hasAddPermission: boolean = false;
  hasDeletePermission: boolean = false;
  hasViewPermission: boolean = false;
  hasEditPermission: boolean = false;

  userId: number | null | undefined;
  userDetails: any;
  userDetailss: any;
  schemas: string[] = []; // Array to store schema names



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

  week1_pattern:any='';
  week2_pattern:any='';
  week3_pattern:any='';
  week4_pattern:any='';

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

  // selectedYear: number | '' = '';
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
    private DesignationService: DesignationService,
    private sessionService: SessionService,




  
    
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



    this.userId = this.sessionService.getUserId();
    if (this.userId !== null) {
      this.authService.getUserData(this.userId).subscribe(
        async (userData: any) => {
          this.userDetails = userData; // Store user details in userDetails property

          // this.created_by= this.userId;
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


                    this.hasAddPermission = this.checkGroupPermission('add_shift', groupPermissions);
                    console.log('Has add permission:', this.hasAddPermission);

                    this.hasEditPermission = this.checkGroupPermission('change_shift', groupPermissions);
                    console.log('Has edit permission:', this.hasEditPermission);

                    this.hasDeletePermission = this.checkGroupPermission('delete_shift', groupPermissions);
                    console.log('Has delete permission:', this.hasDeletePermission);


                    this.hasViewPermission = this.checkGroupPermission('view_shift', groupPermissions);
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



  checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
    return groupPermissions.some(permission => permission.codename === codeName);
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

      week1_pattern: this.week1_pattern || null,
      week2_pattern: this.week2_pattern || null,
      week3_pattern: this.week3_pattern || null,
      week4_pattern: this.week4_pattern || null,

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
    selectedYear: string = '2025'; // Default to 2025
    currentMonthIndex: number = 0; // Start with January (0 = Jan, 11 = Dec)
    currentMonth: string = '01';   // Current month in "MM" format
// Transform shift data for table display based on current month
transformShiftDataForTable(): void {
  if (!this.shiftData || !this.shiftData.shifts) {
      this.employeeCodes = [];
      this.allDates = [];
      return;
  }

  // 1) Get all employee codes
  this.employeeCodes = Object.keys(this.shiftData.shifts);

  // 2) Gather dates for the current month
  const dateSet = new Set<string>();
  for (const empCode of this.employeeCodes) {
      const schedule = this.shiftData.shifts[empCode];
      if (schedule) {
          Object.keys(schedule).forEach(date => {
              if (date.split('-')[1] === this.currentMonth) {
                  dateSet.add(date);
              }
          });
      }
  }

  // 3) Sort the dates
  this.allDates = Array.from(dateSet).sort((a, b) => {
      const [dayA, monthA, yearA] = a.split('-').map(Number);
      const [dayB, monthB, yearB] = b.split('-').map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA).getTime();
      const dateB = new Date(yearB, monthB - 1, dayB).getTime();
      return dateA - dateB;
  });
}

// Get shift for employee and date
getShift(empCode: string, date: string): string {
  if (!this.shiftData.shifts || !this.shiftData.shifts[empCode]) return '';
  return this.shiftData.shifts[empCode][date] || '';
}

// Fetch shifts for the selected year
fetchShifts(): void {
  if (!this.selectedSchedule || !this.selectedYear) {
      alert('Please select schedule and year.');
      return;
  }

  const selectedSchema = localStorage.getItem('selectedSchema');
  const url = `${this.apiUrl}/calendars/api/employee-shift/get_shifts_for_year/?schedule_id=${this.selectedSchedule}&year=${this.selectedYear}&schema=${selectedSchema}`;

  this.http.get(url).subscribe(
      (response: any) => {
          console.log('Fetched shift data:', response);
          this.shiftData = response;
          this.currentMonthIndex = 0; // Reset to January
          this.currentMonth = '01';   // January
          this.transformShiftDataForTable();
      },
      (error) => {
          console.error('Error fetching shift data:', error);
          let errorMessage = 'Error fetching shift data.';
          if (error.error) {
              errorMessage = typeof error.error === 'string' ? error.error : error.error.error || errorMessage;
          }
          alert(errorMessage);
      }
  );
}

// Navigate to next month
nextMonth(): void {
  if (this.currentMonthIndex < 11) {
      this.currentMonthIndex++;
      this.currentMonth = String(this.currentMonthIndex + 1).padStart(2, '0');
      this.transformShiftDataForTable();
  }
}

// Navigate to previous month
previousMonth(): void {
  if (this.currentMonthIndex > 0) {
      this.currentMonthIndex--;
      this.currentMonth = String(this.currentMonthIndex + 1).padStart(2, '0');
      this.transformShiftDataForTable();
  }
}

// Helper to get month name for display
getMonthName(month: string): string {
  const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return monthNames[parseInt(month) - 1];
}

// Extract the day number (e.g. "25") from "DD-MM-YYYY"
getDayNumber(dateStr: string): string {
  return dateStr.split('-')[0]; // "25"
}

// Convert "DD-MM-YYYY" to a JS date, then get weekday name (e.g. "Mon", "Tuesday", etc.)
getDayName(dateStr: string): string {
  const [day, month, year] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  // 'short' -> "Mon", 'long' -> "Monday"
  return date.toLocaleString('en-US', { weekday: 'short' });
}

// Extract the month name from "DD-MM-YYYY"
getMonthNameFromDate(dateStr: string): string {
  const [day, month, year] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  // 'short' -> "Jan", 'long' -> "January"
  return date.toLocaleString('en-US', { month: 'short' });
}
  
}
