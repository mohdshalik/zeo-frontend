import { Component, ViewChild } from '@angular/core';
import { DepartmentServiceService } from '../department-master/department-service.service';
import { CompanyRegistrationService } from '../company-registration.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../login/authentication.service';
import { EmployeeService } from '../employee-master/employee.service';
import { UserMasterService } from '../user-master/user-master.service';
import { CatogaryService } from '../catogary-master/catogary.service';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-assign-holiday-calendar',
  templateUrl: './assign-holiday-calendar.component.html',
  styleUrl: './assign-holiday-calendar.component.css'
})
export class AssignHolidayCalendarComponent {

  
  related_to: any = '';
  // branch: any = '';

  // department: any = '';

  // category: any = '';

  holiday_model: any = '';




  branches:any []=[];
  Departments:any []=[];
  Categories:any []=[];
  Employee: any[] = [];


  WeekCalendar:any []=[];

  branch: number[] = [];
  department: number[] = [];
  category: number[] = [];  
  employee: number[] = [];

  


  @ViewChild('select') select: MatSelect | undefined;



  registerButtonClicked = false;

  allSelected=false;
  allSelecteddept=false;
  allSelectedcat=false;
  allSelectedEmp=false;

  


  constructor(private DepartmentServiceService: DepartmentServiceService ,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private categoryService: CatogaryService,
    private userService: UserMasterService,
    private employeeService: EmployeeService,

  

) {}





ngOnInit(): void {
  this.loadBranch();
  this.loadCAtegory();
  this.loadDEpartments();
  this.loadWeekendCalendar();
  this.loadEmployee();





  

 
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
      if (this.select) {
        if (this.allSelecteddept) {
          this.select.options.forEach((item: MatOption) => item.select());
        } else {
          this.select.options.forEach((item: MatOption) => item.deselect());
        }
      }
    }

    toggleAllSelectioncat(): void {
      if (this.select) {
        if (this.allSelectedcat) {
          this.select.options.forEach((item: MatOption) => item.select());
        } else {
          this.select.options.forEach((item: MatOption) => item.deselect());
        }
      }
    }
    toggleAllSelectionEmp(): void {
      if (this.select) {
        if (this.allSelectedEmp) {
          this.select.options.forEach((item: MatOption) => item.select());
        } else {
          this.select.options.forEach((item: MatOption) => item.deselect());
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

            loadWeekendCalendar(): void {
    
              const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
            
              console.log('schemastore',selectedSchema )
              // Check if selectedSchema is available
              if (selectedSchema) {
                this.categoryService.getHolidayCalendar(selectedSchema).subscribe(
                  (result: any) => {
                    this.WeekCalendar = result;
                    console.log(' fetching Companies:');
            
                  },
                  (error) => {
                    console.error('Error fetching Companies:', error);
                  }
                );
              }
              }

  




            registerAssignCalendar(): void {
              this.registerButtonClicked = true;
              const companyData = {
                related_to: this.related_to,
              
                branch:this.branch,
                department: this.department,
              
                category:this.category,
                employee:this.employee,

                holiday_model: this.holiday_model,
              
               
  
  
             
          
                // Add other form field values to the companyData object
              };
            
          
              this.employeeService.registerHolidacalendar(companyData).subscribe(
                (response) => {
                  console.log('Registration successful', response);
                
                      alert('Holiday Calendar has been Assigned ');
                      window.location.reload();
                      // window.location.reload();
                 
          
                },
                (error) => {
                  console.error('Add failed', error);
                  console.log('Full error response:', error);
      
                  // Check if the error message matches the specific error
                  const errorMessage = error.error?.error || 'An error occurred while Assign the Holiday Calendar. Please try again.';
                  alert(errorMessage);
              }
              );
            }







}
