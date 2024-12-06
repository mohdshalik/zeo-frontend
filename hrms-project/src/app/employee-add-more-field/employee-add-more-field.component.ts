import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../employee-master/employee.service';
import { CountryService } from '../country.service';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
@Component({
  selector: 'app-employee-add-more-field',
  templateUrl: './employee-add-more-field.component.html',
  styleUrl: './employee-add-more-field.component.css'
})
export class EmployeeAddMoreFieldComponent {

  companies: any[] = [];

  field_name: any
  field_value: any;

  // emp_id: string = '';
  data_type:any='';
  dropdown_values:any='';
  radio_values:any="";
  emp_id: number;
  emp_master:any='';

  registerButtonClicked = false;
  registerButtonClicked1 = false;

  registerButtonClicked2 = false;

  registerButtonClicked3 = false;
  Emp: any = {};


  constructor(private EmployeeService: EmployeeService ,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private countryService: CountryService,
    private dialog: MatDialog,

   private ref:MatDialogRef<EmployeeAddMoreFieldComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any,
   ) {
    this.emp_id = data.emp_id;
    this.EmployeeService.getEmpById(data.employeeId).subscribe(Emp => {
      this.Emp = Emp;
    });
    
   }


   ngOnInit(): void {
    this.loadEmployees();
    // this.loadStates();
    

   
  }
 
  loadEmployees(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
    this.EmployeeService.getEmployees(selectedSchema).subscribe(
      (result: any) => {
        this.companies = result;
        console.log(' fetching employees:');

      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
    }
  }

  ClosePopup(){
    this.ref.close('Closed using function');
    // window.location.reload();

  }

  addfieldType():void{



  }


  CreateEmployeeFeild(): void {
    this.registerButtonClicked = true;

    // Convert the dropdown_values string into an array
    const dropdownValuesArray = this.dropdown_values
        ? this.dropdown_values.split(',').map((value: any) => value.trim())
        : [];
        
   // Convert the dropdown_values string into an array
   const radio_valuesArray = this.radio_values
   ? this.radio_values.split(',').map((value: any) => value.trim())
   : [];

    const fieldData = {
      emp_custom_field: this.field_name,
        field_value: this.field_value,
        data_type: this.data_type,
        dropdown_values: dropdownValuesArray,
        radio_values: radio_valuesArray,
        emp_id: this.emp_id,
    };

    this.EmployeeService.registerEmpAddMoreFeild(fieldData).subscribe(
        (response) => {
            console.log('Field added successfully', response);
            alert('Employee field added!');

            // Optionally close the current dialog
            this.ref.close();

            // Open the EmployeeEditComponent with the employee ID
            this.dialog.open(EmployeeEditComponent, {
                width: '80%',
                height: '500px',
                data: { employeeId: this.emp_id }
            });
        },
        (error) => {
            console.error('Field addition failed', error);
            alert('Enter all fields!');
        }
    );
}


}
