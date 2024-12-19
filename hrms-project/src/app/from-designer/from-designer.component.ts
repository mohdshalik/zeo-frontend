import { Component } from '@angular/core';
import { EmployeeService } from '../employee-master/employee.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-from-designer',
  templateUrl: './from-designer.component.html',
  styleUrl: './from-designer.component.css'
})
export class FromDesignerComponent {

  field_name: any
  field_value: any;

  // emp_id: string = '';
  data_type:any='';
  dropdown_values:any='';
  radio_values:any="";
  emp_id: number | undefined;
  emp_master:any='';

  registerButtonClicked = false;
  registerButtonClicked1 = false;

  registerButtonClicked2 = false;

  registerButtonClicked3 = false;


  isMArketingModalOpen:boolean=false;

  
   // Initial field names
   empCodeFieldName: string = 'Employee Code';
   firstNameFieldName: string = 'First Name';
   lastNameFieldName: string = 'Last Name';
   emailFieldName: string = 'Email';
   dobFieldName: string = 'Date Of Birth';
   cmpnoFieldName: string = 'Company Number';
   pernoFieldName: string = 'Personal Number';
   peraddressFieldName: string = 'Permanent Address';
   preaddressFieldName: string = 'Present Address';
   cityFieldName: string = 'City';
   nationFieldName: string = 'Nationality';
   fatherFieldName: string = 'Father Name';
   motherFieldName: string = 'mother Name';

   hiredFieldName: string = 'Hired Date';
   joinFieldName: string = 'joining Date';






   selectedDataType: string = 'Text Box'; // Default data type


   dropdownValues: string = ''; // Property to store dropdown values as a comma-separated string


   // Add new fields for gender
genderFieldName: string = 'Gender';  // Initial Gender field name
genderDataType: string = 'Dropdown'; // Default data type for Gender
genderDropdownValues: string = '';   // Store gender dropdown values as a comma-separated string
genderDropdownOptions: string[] = [];  // Property to store the dropdown options


religionFieldName: string = 'Religion';
selectedDataTypereligion: string = 'Text Box'; // Default data type
dropdownValuesreligion: string = ''; // Property to store dropdown values as a comma-separated string
ReligionDropdownOptions: string[] = [];  // Property to store the dropdown options


bloodFieldName: string = 'Blood Group';
selectedDataTypeblood: string = 'Text Box'; // Default data type
dropdownValuesblood: string = ''; // Property to store dropdown values as a comma-separated string
bloodDropdownOptions: string[] = [];  // Property to store the dropdown options


   // Add new fields for gender
   maritalFieldName: string = 'Marital Status';  // Initial Gender field name
   maritalDataType: string = 'Dropdown'; // Default data type for Gender
   maritalDropdownValues: string = '';   // Store gender dropdown values as a comma-separated string
   maritalDropdownOptions: string[] = [];  // Property to store the dropdown options
   
   // Add new fields for gender
   locationFieldName: string = 'Location';  // Initial Gender field name
   locationDataType: string = 'Dropdown'; // Default data type for Gender
   locationDropdownValues: string = '';   // Store gender dropdown values as a comma-separated string
   locationDropdownOptions: string[] = [];  // Property to store the dropdown options
   
   // Add new fields for country
   cntryFieldName: string = 'Country';  // Initial Gender field name
   cntryDataType: string = 'Dropdown'; // Default data type for Gender
   cntryDropdownValues: string = '';   // Store gender dropdown values as a comma-separated string
   cntryDropdownOptions: string[] = [];  // Property to store the dropdown options
   

      // Add new fields for country
      brchFieldName: string = 'Branch';  // Initial Gender field name
      brchDataType: string = 'Dropdown'; // Default data type for Gender
      brchDropdownValues: string = '';   // Store gender dropdown values as a comma-separated string
      brchDropdownOptions: string[] = []; 


       // Add new fields for country
       deptFieldName: string = 'Department';  // Initial Gender field name
       deptDataType: string = 'Dropdown'; // Default data type for Gender
       deptDropdownValues: string = '';   // Store gender dropdown values as a comma-separated string
       deptDropdownOptions: string[] = []; 
 
           // Add new fields for country
           desFieldName: string = 'Designation';  // Initial Gender field name
           desDataType: string = 'Dropdown'; // Default data type for Gender
           desDropdownValues: string = '';   // Store gender dropdown values as a comma-separated string
           desDropdownOptions: string[] = []; 
     
        // Add new fields for country
        catFieldName: string = 'Catogory';  // Initial Gender field name
        catDataType: string = 'Dropdown'; // Default data type for Gender
        catDropdownValues: string = '';   // Store gender dropdown values as a comma-separated string
        catDropdownOptions: string[] = []; 
  



  custom_fields :any[] = [];

  constructor(private EmployeeService: EmployeeService ,
    private http: HttpClient,
    private authService: AuthenticationService,
    private dialog: MatDialog,

  
   ) {}


   ngOnInit(): void {
    this.loadFormFields();
    this.loadFieldNames();
    this.selectedDataType = localStorage.getItem('selectedDataType') || this.selectedDataType;

    this.genderDataType = localStorage.getItem('genderDataType') || this.genderDataType;

    if (this.genderDataType === 'Dropdown') {
        const savedGenderDropdownValues = localStorage.getItem('genderDropdownValues');
        if (savedGenderDropdownValues) {
            this.ReligionDropdownOptions = savedGenderDropdownValues.split(',');
        }
    }

    
    if (this.selectedDataTypereligion === 'Dropdown') {
      const savedReligionDropdownValues = localStorage.getItem('dropdownValuesreligion');
      if (savedReligionDropdownValues) {
          this.ReligionDropdownOptions = savedReligionDropdownValues.split(',');
      }
  }


  


   }
   
   updateFieldNames(): void {
    // Save updated field names to localStorage
    localStorage.setItem('empCodeFieldName', this.empCodeFieldName);
    localStorage.setItem('firstNameFieldName', this.firstNameFieldName);
    localStorage.setItem('lastNameFieldName', this.lastNameFieldName);
    localStorage.setItem('emailFieldName', this.emailFieldName);
    localStorage.setItem('dobFieldName', this.dobFieldName);
    localStorage.setItem('cmpnoFieldName', this.cmpnoFieldName);

    localStorage.setItem('pernoFieldName', this.pernoFieldName);
    localStorage.setItem('peraddressFieldName', this.peraddressFieldName);

    localStorage.setItem('preaddressFieldName', this.preaddressFieldName);
    localStorage.setItem('cityFieldName', this.cityFieldName);
    localStorage.setItem('nationFieldName', this.nationFieldName);
    localStorage.setItem('fatherFieldName', this.fatherFieldName);

    localStorage.setItem('motherFieldName', this.motherFieldName);

    localStorage.setItem('hiredFieldName', this.hiredFieldName);

    localStorage.setItem('joinFieldName', this.joinFieldName);



    localStorage.setItem('selectedDataType', this.selectedDataType);
    if (this.selectedDataType === 'Dropdown') {
      localStorage.setItem('dropdownValues', this.dropdownValues);
    } else {
      localStorage.removeItem('dropdownValues'); // Clear dropdown values if not using dropdown
    }

    // Save updated field names to localStorage
    localStorage.setItem('genderFieldName', this.genderFieldName);
    localStorage.setItem('genderDataType', this.genderDataType);

    if (this.genderDataType === 'Dropdown') {
        localStorage.setItem('genderDropdownValues', this.genderDropdownValues);
    } else {
        localStorage.removeItem('genderDropdownValues');
    }

    localStorage.setItem('religionFieldName', this.religionFieldName);
    localStorage.setItem('selectedDataTypereligion', this.selectedDataTypereligion);

    if (this.selectedDataTypereligion === 'Dropdown') {
      localStorage.setItem('dropdownValuesreligion', this.dropdownValuesreligion);
      console.log('re',this.dropdownValuesreligion)
    } else {
      localStorage.removeItem('dropdownValuesreligion'); // Clear dropdown values if not using dropdown
    }


    localStorage.setItem('bloodFieldName', this.bloodFieldName);
    localStorage.setItem('selectedDataTypeblood', this.selectedDataTypeblood);

    if (this.selectedDataTypeblood === 'Dropdown') {
      localStorage.setItem('dropdownValuesblood', this.dropdownValuesblood);
      console.log('blood',this.dropdownValuesblood)
    } else {
      localStorage.removeItem('dropdownValuesblood'); // Clear dropdown values if not using dropdown
    }

   // Save updated field names to localStorage marital status
   localStorage.setItem('maritalFieldName', this.maritalFieldName);
   localStorage.setItem('maritalDataType', this.maritalDataType);

   if (this.maritalDataType === 'Dropdown') {
       localStorage.setItem('maritalDropdownValues', this.maritalDropdownValues);
   } else {
       localStorage.removeItem('maritalDropdownValues');
   }

   

      // Save updated field names to localStorage marital status
      localStorage.setItem('locationFieldName', this.locationFieldName);
      localStorage.setItem('locationDataType', this.locationDataType);
   
      if (this.locationDataType === 'Dropdown') {
          localStorage.setItem('locationDropdownValues', this.locationDropdownValues);
      } else {
          localStorage.removeItem('locationDropdownValues');
      }
   
         // Save updated field names to localStorage marital status
         localStorage.setItem('cntryFieldName', this.cntryFieldName);
         localStorage.setItem('cntryDataType', this.cntryDataType);
      
         if (this.cntryDataType === 'Dropdown') {
             localStorage.setItem('cntryDropdownValues', this.cntryDropdownValues);
         } else {
             localStorage.removeItem('cntryDropdownValues');
         }

               // Save updated field names to localStorage marital status
               localStorage.setItem('brchFieldName', this.brchFieldName);
               localStorage.setItem('brchDataType', this.brchDataType);
            
               if (this.brchDataType === 'Dropdown') {
                   localStorage.setItem('brchDropdownValues', this.brchDropdownValues);
               } else {
                   localStorage.removeItem('brchDropdownValues');
               }
            
      

                       // Save updated field names to localStorage marital status
                       localStorage.setItem('deptFieldName', this.deptFieldName);
                       localStorage.setItem('deptDataType', this.deptDataType);
                    
                       if (this.deptDataType === 'Dropdown') {
                           localStorage.setItem('deptDropdownValues', this.deptDropdownValues);
                       } else {
                           localStorage.removeItem('deptDropdownValues');
                       }


                            // Save updated field names to localStorage marital status
                            localStorage.setItem('desFieldName', this.desFieldName);
                            localStorage.setItem('desDataType', this.desDataType);
                         
                            if (this.desDataType === 'Dropdown') {
                                localStorage.setItem('desDropdownValues', this.desDropdownValues);
                            } else {
                                localStorage.removeItem('desDropdownValues');
                            }
                         
                    
     // Save updated field names to localStorage marital status
     localStorage.setItem('catFieldName', this.catFieldName);
     localStorage.setItem('catDataType', this.catDataType);
  
     if (this.catDataType === 'Dropdown') {
         localStorage.setItem('catDropdownValues', this.catDropdownValues);
     } else {
         localStorage.removeItem('catDropdownValues');
     }
  

    // You can also add logic here to inform the user that the update was successful
    console.log('Field names updated:', this.empCodeFieldName, this.firstNameFieldName, this.religionFieldName,this.cntryDataType);
  }







  loadFieldNames(): void {
    // Load field names from localStorage
    const savedEmpCodeFieldName = localStorage.getItem('empCodeFieldName');
    const savedFirstNameFieldName = localStorage.getItem('firstNameFieldName');
    const savedLastNameFieldName = localStorage.getItem('lastNameFieldName');
    const savedEmailFieldName = localStorage.getItem('emailFieldName');

    const saveddobFieldName = localStorage.getItem('dobFieldName');
    const savedcmpnoFieldName = localStorage.getItem('cmpnoFieldName');
    const savedpernoFieldName = localStorage.getItem('pernoFieldName');
    const savedperaddressFieldName = localStorage.getItem('peraddressFieldName');
    const savedpreaddressFieldName = localStorage.getItem('preaddressFieldName');
    const savedcityFieldName = localStorage.getItem('cityFieldName');

    const savednationFieldName = localStorage.getItem('nationFieldName');



    if (savedEmpCodeFieldName) {
      this.empCodeFieldName = savedEmpCodeFieldName;
    }
    if (savedFirstNameFieldName) {
      this.firstNameFieldName = savedFirstNameFieldName;
    }
    if (savedLastNameFieldName) {
      this.lastNameFieldName = savedLastNameFieldName;
    }
    if (savedEmailFieldName) {
      this.emailFieldName = savedEmailFieldName;
    }
    if (saveddobFieldName) {
      this.dobFieldName = saveddobFieldName;
    }
    if (savedcmpnoFieldName) {
      this.cmpnoFieldName = savedcmpnoFieldName;
    }
    if (savedpernoFieldName) {
      this.pernoFieldName = savedpernoFieldName;
    }
    if (savedperaddressFieldName) {
      this.peraddressFieldName = savedperaddressFieldName;
    }
    if (savedpreaddressFieldName) {
      this.preaddressFieldName = savedpreaddressFieldName;
    }

    if (savedcityFieldName) {
      this.cityFieldName = savedcityFieldName;
    }
    if (savednationFieldName) {
      this.nationFieldName = savednationFieldName;
    }


  
        // Load field names from localStorage
        const savedGenderFieldName = localStorage.getItem('genderFieldName');
        if (savedGenderFieldName) {
            this.genderFieldName = savedGenderFieldName;
        }

        const savedReligionFieldName = localStorage.getItem('religionFieldName');
        if (savedReligionFieldName) {
            this.religionFieldName = savedReligionFieldName;
        }

        const savedBloodFieldName = localStorage.getItem('bloodFieldName');
        if (savedBloodFieldName) {
            this.bloodFieldName = savedBloodFieldName;
        }

          // Load field names from localStorage marital
          const savedMaritalFieldName = localStorage.getItem('maritalFieldName');
          if (savedMaritalFieldName) {
              this.maritalFieldName = savedMaritalFieldName;
          }

          const savedfatherFieldName = localStorage.getItem('fatherFieldName');
          if (savedfatherFieldName) {
            this.fatherFieldName = savedfatherFieldName;
          }

          const savedmotherFieldName = localStorage.getItem('motherFieldName');
          if (savedmotherFieldName) {
            this.motherFieldName = savedmotherFieldName;
          }

       
  
            // Load field names from localStorage marital
            const savedLocationFieldName = localStorage.getItem('locationFieldName');
            if (savedLocationFieldName) {
                this.locationFieldName = savedLocationFieldName;
            }
            

            
            // Load field names from localStorage marital
            const savedcntryFieldName = localStorage.getItem('cntryFieldName');
            if (savedcntryFieldName) {
                this.cntryFieldName = savedcntryFieldName;
            }

             
            // Load field names from localStorage marital
            const savedbrchFieldName = localStorage.getItem('brchFieldName');
            if (savedbrchFieldName) {
                this.brchFieldName = savedbrchFieldName;
            }

              // Load field names from localStorage marital
              const saveddeptFieldName = localStorage.getItem('deptFieldName');
              if (saveddeptFieldName) {
                  this.deptFieldName = saveddeptFieldName;
              }
    
  
        // Load field names from localStorage marital
        const saveddesFieldName = localStorage.getItem('desFieldName');
        if (saveddesFieldName) {
            this.desFieldName = saveddesFieldName;
        }

               // Load field names from localStorage marital
               const savedcatFieldName = localStorage.getItem('catFieldName');
               if (savedcatFieldName) {
                   this.catFieldName = savedcatFieldName;
               }

               const savedhiredFieldName = localStorage.getItem('hiredFieldName');
               if (savedhiredFieldName) {
                 this.hiredFieldName = savedhiredFieldName;
               }

               const savedjoinFieldName = localStorage.getItem('joinFieldName');
               if (savedjoinFieldName) {
                 this.joinFieldName = savedjoinFieldName;
               }

  }

  


  openMarketingModal(): void {
    this.isMArketingModalOpen = true;
  }

  ClosePopup(){
    this.isMArketingModalOpen=false;
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
    };

    this.EmployeeService.registerEmpAddMoreFeild(fieldData).subscribe(
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

  this.EmployeeService.updateEmpCustomField(updatedField).subscribe(
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


loadFormFields(): void {
  const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

  console.log('schemastore',selectedSchema )
  // Check if selectedSchema is available
  if (selectedSchema) {
  this.EmployeeService.getFormField(selectedSchema).subscribe(
    (result: any) => {
      this.custom_fields = result;
    },
    (error: any) => {
      console.error('Error fetching countries:', error);
    }
  );
  }
}


deleteCustomField(fieldId: number): void {
  if (confirm('Are you sure you want to delete this custom field?')) {
    this.EmployeeService.deleteEmpCustomField(fieldId).subscribe(
      (response) => {
        console.log('Field deleted successfully', response);
        // Remove the deleted field from the custom_fields array
        this.custom_fields = this.custom_fields.filter(field => field.id !== fieldId);
        alert('Field deleted successfully');
      },
      (error) => {
        console.error('Field delete failed', error);
        alert('Error deleting field!');
      }
    );
  }
}

}
