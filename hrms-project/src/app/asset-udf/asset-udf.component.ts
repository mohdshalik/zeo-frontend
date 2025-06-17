import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee-master/employee.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DesignationService } from '../designation-master/designation.service';
import { SessionService } from '../login/session.service';

@Component({
  selector: 'app-asset-udf',
  templateUrl: './asset-udf.component.html',
  styleUrl: './asset-udf.component.css'
})
export class AssetUdfComponent {




    custom_fields_fam :any[] = [];

    LoanTypes:any []=[];

      asset_type: any = '';



    constructor(private EmployeeService: EmployeeService ,
      private http: HttpClient,
      private authService: AuthenticationService,
      private dialog: MatDialog,
      private _formBuilder: FormBuilder,
      
  private DesignationService: DesignationService,
  private sessionService: SessionService,
  
    
     ) {}
  

     ngOnInit(): void {
  
      this.loadFormFieldsFam();
      this.loadLAssetType();

     }


     loadFormFieldsFam(): void {
      const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
    
      console.log('schemastore',selectedSchema )
      // Check if selectedSchema is available
      if (selectedSchema) {
      this.EmployeeService.getFormFieldAsset(selectedSchema).subscribe(
        (result: any) => {
          this.custom_fields_fam = result;
        },
        (error: any) => {
          console.error('Error fetching EMployee Family Fields:', error);
        }
      );
      }
    }


    deleteCustomFieldFam(fieldId: number): void {
      if (confirm('Are you sure you want to delete this custom field?')) {
        this.EmployeeService.deleteEmpCustomFieldFam(fieldId).subscribe(
          (response) => {
            console.log('Field deleted successfully', response);
            // Remove the deleted field from the custom_fields array
            this.custom_fields_fam = this.custom_fields_fam.filter(field => field.id !== fieldId);
            alert('Field deleted successfully');
          },
          (error) => {
            console.error('Field delete failed', error);
            alert('Error deleting field!');
          }
        );
      }
    }


      isFamfieldModalOpen:boolean=false;


    openFamFieldModal(): void {
      this.isFamfieldModalOpen = true;
    }
    ClosePopupFam(){
      this.isFamfieldModalOpen=false;
    }
  
  registerButtonClicked1 = false;

  registerButtonClicked2 = false;

  registerButtonClicked3 = false;

    registerButtonClicked = false;

    field_name_fam: any
  field_value_fam: any;
  data_type_fam:any='';
  dropdown_values_fam:any='';
  radio_values_fam:any="";


    
CreateEmployeeFeildFam(): void {
  this.registerButtonClicked = true;

  // Convert the dropdown_values string into an array
  const dropdownValuesArray = this.dropdown_values_fam
      ? this.dropdown_values_fam.split(',').map((value: any) => value.trim())
      : [];
      
 // Convert the radio_values string into an array
 const radio_valuesArray = this.radio_values_fam
 ? this.radio_values_fam.split(',').map((value: any) => value.trim())
 : [];

  const fieldData = {
    name: this.field_name_fam,
      field_value: this.field_value_fam,
      data_type: this.data_type_fam,
      dropdown_values: dropdownValuesArray,
      radio_values: radio_valuesArray,
      asset_type: this.asset_type,

      // mandatory: this.mandatory  // Capture the mandatory field status
  };

  this.EmployeeService.registerEmpAddMoreFeildAsset(fieldData).subscribe(
      (response) => {
          console.log('Field added successfully', response);
          alert('Field added successfully');
      },
      (error) => {
          console.error('Field addition failed', error);
          alert('Enter all fields!');
      }
  );
}




updateCustomField(field: any): void {
  // Convert the dropdown_values and radio_values only if they are strings
  const updatedField = {
    ...field,
    dropdown_values: Array.isArray(field.dropdown_values)
      ? field.dropdown_values
      : field.dropdown_values
      ? field.dropdown_values.split(',').map((value: any) => value.trim())
      : null,
    radio_values: Array.isArray(field.radio_values)
      ? field.radio_values
      : field.radio_values
      ? field.radio_values.split(',').map((value: any) => value.trim())
      : null,
  };

  this.EmployeeService.updateEmpCustomFieldAsset(updatedField).subscribe(
    (response) => {
      console.log('Field updated successfully', response);
      alert('Field updated successfully');
    },
    (error) => {
      console.error('Field update failed', error);
      alert('Error updating field!');
    }
  );
}


  loadLAssetType(): void {
    
            const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
          
            console.log('schemastore',selectedSchema )
            // Check if selectedSchema is available
            if (selectedSchema) {
              this.EmployeeService.getAssetType(selectedSchema).subscribe(
                (result: any) => {
                  this.LoanTypes = result;
                  console.log(' fetching Loantypes:');
          
                },
                (error) => {
                  console.error('Error fetching Companies:', error);
                }
              );
            }
            }
        

}
