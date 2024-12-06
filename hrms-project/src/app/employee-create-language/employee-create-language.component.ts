import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../employee-master/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-create-language',
  templateUrl: './employee-create-language.component.html',
  styleUrl: './employee-create-language.component.css'
})
export class EmployeeCreateLanguageComponent {


  LangaguesSkills: any[] = [];

  percentage:any;
  language_skill:any;
  registerButtonClicked = false;
  emp_id: number;



  constructor(   private employeeService: EmployeeService,
    private http: HttpClient,
    private authService: AuthenticationService,
   private ref:MatDialogRef<EmployeeCreateLanguageComponent>,
   private dialog:MatDialog,
   private router: Router,
    private route: ActivatedRoute,
    
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
   this.emp_id = data.emp_id;
   
  }

   
   ngOnInit(): void {
    this.loadDeparmentBranch();
    // this.loadStates();
    

   
  }
 

  registerlanguage(): void {
    this.registerButtonClicked = true;
    const companyData = {
      language_skill: this.language_skill,
      percentage:this.percentage,
      emp_id:this.emp_id,
   

      // Add other form field values to the companyData object
    };
   
    this.employeeService.registerLanguage(companyData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        // window.reload
        alert('Language has been Registered');
        // Reload the page
        window.location.reload();
           

      },
      (error) => {
        console.error('Registration failed', error);
        alert('enter all field!')
        // Handle the error appropriately, e.g., show a user-friendly error message.
      }
    );
  }


   loadDeparmentBranch(): void {
    
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
  
    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
      this.employeeService.getLangaugeSkill(selectedSchema).subscribe(
        (result: any) => {
          this.LangaguesSkills = result;
          console.log(' fetching Companies:');
  
        },
        (error) => {
          console.error('Error fetching Companies:', error);
        }
      );
    }
    }



    onDeleteEmployee(employeeId: number): void {
      if (confirm('Are you sure you want to delete this employee?')) {
          this.employeeService.deleteEmployeeLangague(employeeId).subscribe(
              () => {
                  console.log('Employee deleted successfully');
                  // this.router.navigate(['/main-sidebar/sub-sidebar/employee-master']);
                  // Refresh the employee list after deletion
                  // this.loadEmployee();
              },
              (error) => {
                  console.error('Error deleting employee:', error);
              }
          );
      }
  }




    ClosePopup(){
      this.ref.close('Closed using function')
    }
  
  


}
