import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee-master/employee.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DesignationService } from '../designation-master/designation.service';
import { SessionService } from '../login/session.service';


@Component({
  selector: 'app-from-designer',
  templateUrl: './from-designer.component.html',
  styleUrl: './from-designer.component.css',
  

})
export class FromDesignerComponent {

  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;



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



   isFirstNameMandatory: boolean = false; // New property to store the checkbox state
   isLastNameMandatory: boolean = false; // New property to store the checkbox state
   isGenderMandatory: boolean = false; // New property to store the checkbox state
   isEmailMandatory: boolean = false; // New property to store the checkbox state

   isCmpnoMandatory: boolean = false; // New property to store the checkbox state
   isPernoMandatory: boolean = false; // New property to store the checkbox state
   isPeraddMandatory: boolean = false; // New property to store the checkbox state
   isPresaddMandatory: boolean = false; // New property to store the checkbox state
   isCityMandatory: boolean = false; // New property to store the checkbox state
   isRelMandatory: boolean = false; // New property to store the checkbox state
   isBloodMandatory: boolean = false; // New property to store the checkbox state

   isNatMandatory: boolean = false; // New property to store the checkbox state
   isMariMandatory: boolean = false; // New property to store the checkbox state
   isFatherMandatory: boolean = false; // New property to store the checkbox state
   isMotherMandatory: boolean = false; // New property to store the checkbox state
   isLocationMandatory: boolean = false; // New property to store the checkbox state
   isLCountryMandatory: boolean = false; // New property to store the checkbox state
   isLBranchMandatory: boolean = false; // New property to store the checkbox state

   isLDepartmentMandatory: boolean = false; // New property to store the checkbox state
   isLDesignationMandatory: boolean = false; // New property to store the checkbox state
   isLCatogoryMandatory: boolean = false; // New property to store the checkbox state
   isHiringMandatory: boolean = false; // New property to store the checkbox state




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
  
        hasAddPermission: boolean = false;
        hasDeletePermission: boolean = false;
        hasViewPermission: boolean =false;
        hasEditPermission: boolean = false;
        
        userId: number | null | undefined;
        userDetails: any;
        userDetailss: any;
        schemas: string[] = []; // Array to store schema names


  custom_fields :any[] = [];

  constructor(private EmployeeService: EmployeeService ,
    private http: HttpClient,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private _formBuilder: FormBuilder,
    
private DesignationService: DesignationService,
private sessionService: SessionService,

  
   ) {}


   ngOnInit(): void {
    this.loadFormFields();
    this.loadFieldNames();
    this.loadFieldDisplay();
    this.loadFamilyFieldNames();

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

               
                this.hasAddPermission = this.checkGroupPermission('add_emp_customfield', groupPermissions);
                console.log('Has add permission:', this.hasAddPermission);
                
                this.hasEditPermission = this.checkGroupPermission('change_emp_customfield', groupPermissions);
                console.log('Has edit permission:', this.hasEditPermission);
  
               this.hasDeletePermission = this.checkGroupPermission('delete_emp_customfield', groupPermissions);
               console.log('Has delete permission:', this.hasDeletePermission);
  

                this.hasViewPermission = this.checkGroupPermission('view_emp_customfield', groupPermissions);
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

  //  checkViewPermission(permissions: any[]): boolean {
  //   const requiredPermission = 'add_emp_customfield' ||'change_emp_customfield' ||'delete_emp_customfield' ||'view_emp_customfield';
    
    
  //   // Check user permissions
  //   if (permissions.some(permission => permission.codename === requiredPermission)) {
  //     return true;
  //   }
    
  //   // Check group permissions (if applicable)
  //   // Replace `// TODO: Implement group permission check`
  //   // with your logic to retrieve and check group permissions
  //   // (consider using a separate service or approach)
  //   return false; // Replace with actual group permission check
  //   }
    
    
    
    
    checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
    return groupPermissions.some(permission => permission.codename === codeName);
    }
    


   isFirstNameFieldHidden: boolean = false; // New variable to track if the field is disabled
   isLasstNameFieldHidden: boolean = false;
   isGernderNameFieldHidden: boolean = false;
   isEmailNameFieldHidden: boolean = false;
   isCmpNoNameFieldHidden: boolean = false;
   isPerNoNameFieldHidden: boolean = false;
   isPermaddNameFieldHidden: boolean = false;
   isPresentaddNameFieldHidden: boolean = false;
   isCityFieldHidden: boolean = false;
   isReliFieldHidden: boolean = false;
   isBloodFieldHidden: boolean = false;
   isNationFieldHidden: boolean = false;
   isMaritalFieldHidden: boolean = false;
   isFatherFieldHidden: boolean = false;
   isMotherFieldHidden: boolean = false;
   isLocationFieldHidden: boolean = false;
   isCountryFieldHidden: boolean = false;
   isBranchFieldHidden: boolean = false;
   isDepartFieldHidden: boolean = false;
   isDesignationFieldHidden: boolean = false;
   isCatFieldHidden: boolean = false;
   isHireFieldHidden: boolean = false;
 


   loadFieldDisplay():void{
    const savedFirstNameFieldVisibility = localStorage.getItem('isFirstNameFieldHidden');
    if (savedFirstNameFieldVisibility) {
        this.isFirstNameFieldHidden = JSON.parse(savedFirstNameFieldVisibility);
    }

    const isLasstNameFieldHidden = localStorage.getItem('isLasstNameFieldHidden');
    if (isLasstNameFieldHidden) {
        this.isLasstNameFieldHidden = JSON.parse(isLasstNameFieldHidden);
    }

    const isGernderNameFieldHidden = localStorage.getItem('isGernderNameFieldHidden');
    if (isGernderNameFieldHidden) {
        this.isGernderNameFieldHidden = JSON.parse(isGernderNameFieldHidden);
    }

    const isEmailNameFieldHidden = localStorage.getItem('isEmailNameFieldHidden');
    if (isEmailNameFieldHidden) {
        this.isEmailNameFieldHidden = JSON.parse(isEmailNameFieldHidden);
    }

    const isCmpNoNameFieldHidden = localStorage.getItem('isCmpNoNameFieldHidden');
    if (isCmpNoNameFieldHidden) {
        this.isCmpNoNameFieldHidden = JSON.parse(isCmpNoNameFieldHidden);
    }

    const isPerNoNameFieldHidden = localStorage.getItem('isPerNoNameFieldHidden');
    if (isPerNoNameFieldHidden) {
        this.isPerNoNameFieldHidden = JSON.parse(isPerNoNameFieldHidden);
    }

    const isPermaddNameFieldHidden = localStorage.getItem('isPermaddNameFieldHidden');
    if (isPermaddNameFieldHidden) {
        this.isPermaddNameFieldHidden = JSON.parse(isPermaddNameFieldHidden);
    }


    const isPresentaddNameFieldHidden = localStorage.getItem('isPresentaddNameFieldHidden');
    if (isPresentaddNameFieldHidden) {
        this.isPresentaddNameFieldHidden = JSON.parse(isPresentaddNameFieldHidden);
    }


    const isCityFieldHidden = localStorage.getItem('isCityFieldHidden');
    if (isCityFieldHidden) {
        this.isCityFieldHidden = JSON.parse(isCityFieldHidden);
    }

    const isReliFieldHidden = localStorage.getItem('isReliFieldHidden');
    if (isReliFieldHidden) {
        this.isReliFieldHidden = JSON.parse(isReliFieldHidden);
    }

    const isBloodFieldHidden = localStorage.getItem('isBloodFieldHidden');
    if (isBloodFieldHidden) {
        this.isBloodFieldHidden = JSON.parse(isBloodFieldHidden);
    }

    const isNationFieldHidden = localStorage.getItem('isNationFieldHidden');
    if (isNationFieldHidden) {
        this.isNationFieldHidden = JSON.parse(isNationFieldHidden);
    }

    const isMaritalFieldHidden = localStorage.getItem('isMaritalFieldHidden');
    if (isMaritalFieldHidden) {
        this.isMaritalFieldHidden = JSON.parse(isMaritalFieldHidden);
    }



    const isFatherFieldHidden = localStorage.getItem('isFatherFieldHidden');
    if (isFatherFieldHidden) {
        this.isFatherFieldHidden = JSON.parse(isFatherFieldHidden);
    }

    const isMotherFieldHidden = localStorage.getItem('isMotherFieldHidden');
    if (isMotherFieldHidden) {
        this.isMotherFieldHidden = JSON.parse(isMotherFieldHidden);
    }

    const isLocationFieldHidden = localStorage.getItem('isLocationFieldHidden');
    if (isLocationFieldHidden) {
        this.isLocationFieldHidden = JSON.parse(isLocationFieldHidden);
    }

    const isCountryFieldHidden = localStorage.getItem('isCountryFieldHidden');
    if (isCountryFieldHidden) {
        this.isCountryFieldHidden = JSON.parse(isCountryFieldHidden);
    }

    const isDepartFieldHidden = localStorage.getItem('isDepartFieldHidden');
    if (isDepartFieldHidden) {
        this.isDepartFieldHidden = JSON.parse(isDepartFieldHidden);
    }

    const isDesignationFieldHidden = localStorage.getItem('isDesignationFieldHidden');
    if (isDesignationFieldHidden) {
        this.isDesignationFieldHidden = JSON.parse(isDesignationFieldHidden);
    }

    const isCatFieldHidden = localStorage.getItem('isCatFieldHidden');
    if (isCatFieldHidden) {
        this.isCatFieldHidden = JSON.parse(isCatFieldHidden);
    }

    const isHireFieldHidden = localStorage.getItem('isHireFieldHidden');
    if (isHireFieldHidden) {
        this.isHireFieldHidden = JSON.parse(isHireFieldHidden);
    }





  }
       


   toggleFieldDisabled(): void {
    this.isFirstNameFieldHidden = !this.isFirstNameFieldHidden;
    localStorage.setItem('isFirstNameFieldHidden', JSON.stringify(this.isFirstNameFieldHidden));

   
  

  }

  toggleFieldDisabledLastname():void{

    this.isLasstNameFieldHidden = !this.isLasstNameFieldHidden;
    localStorage.setItem('isLasstNameFieldHidden', JSON.stringify(this.isLasstNameFieldHidden));
  }

  
  toggleFieldDisabledGender():void{

    this.isGernderNameFieldHidden = !this.isGernderNameFieldHidden;
    localStorage.setItem('isGernderNameFieldHidden', JSON.stringify(this.isGernderNameFieldHidden));
  }

  toggleFieldDisabledEmail():void{

    this.isEmailNameFieldHidden = !this.isEmailNameFieldHidden;
    localStorage.setItem('isEmailNameFieldHidden', JSON.stringify(this.isEmailNameFieldHidden));
  }
  
  toggleFieldDisabledCmpNo():void{

    this.isCmpNoNameFieldHidden = !this.isCmpNoNameFieldHidden;
    localStorage.setItem('isCmpNoNameFieldHidden', JSON.stringify(this.isCmpNoNameFieldHidden));
  }
  
  
  toggleFieldDisabledPerNo():void{

    this.isPerNoNameFieldHidden = !this.isPerNoNameFieldHidden;
    localStorage.setItem('isPerNoNameFieldHidden', JSON.stringify(this.isPerNoNameFieldHidden));
  }
  

  toggleFieldDisabledPermadd():void{

    this.isPermaddNameFieldHidden = !this.isPermaddNameFieldHidden;
    localStorage.setItem('isPermaddNameFieldHidden', JSON.stringify(this.isPermaddNameFieldHidden));
  }
  

  toggleFieldDisabledPresentadd():void{

    this.isPresentaddNameFieldHidden = !this.isPresentaddNameFieldHidden;
    localStorage.setItem('isPresentaddNameFieldHidden', JSON.stringify(this.isPresentaddNameFieldHidden));
  }
  

  toggleFieldDisabledCity():void{

    this.isCityFieldHidden = !this.isCityFieldHidden;
    localStorage.setItem('isCityFieldHidden', JSON.stringify(this.isCityFieldHidden));
  }
  

  
  toggleFieldDisabledReli():void{

    this.isReliFieldHidden = !this.isReliFieldHidden;
    localStorage.setItem('isReliFieldHidden', JSON.stringify(this.isReliFieldHidden));
  }


  
  toggleFieldDisabledBlood():void{

    this.isBloodFieldHidden = !this.isBloodFieldHidden;
    localStorage.setItem('isBloodFieldHidden', JSON.stringify(this.isBloodFieldHidden));
  }
  

  

  toggleFieldDisabledNation():void{

    this.isNationFieldHidden = !this.isNationFieldHidden;
    localStorage.setItem('isNationFieldHidden', JSON.stringify(this.isNationFieldHidden));
  }
  
  
    

  toggleFieldDisablemarital():void{

    this.isMaritalFieldHidden = !this.isMaritalFieldHidden;
    localStorage.setItem('isMaritalFieldHidden', JSON.stringify(this.isMaritalFieldHidden));
  }
  
  


  toggleFieldDisableFather():void{

    this.isFatherFieldHidden = !this.isFatherFieldHidden;
    localStorage.setItem('isFatherFieldHidden', JSON.stringify(this.isFatherFieldHidden));
  }
  

  toggleFieldDisableMother():void{

    this.isMotherFieldHidden = !this.isMotherFieldHidden;
    localStorage.setItem('isMotherFieldHidden', JSON.stringify(this.isMotherFieldHidden));
  }
   

  toggleFieldDisableLocation():void{

    this.isLocationFieldHidden = !this.isLocationFieldHidden;
    localStorage.setItem('isLocationFieldHidden', JSON.stringify(this.isLocationFieldHidden));
  }
   



  

  
  toggleFieldDisableCountry():void{

    this.isCountryFieldHidden = !this.isCountryFieldHidden;
    localStorage.setItem('isCountryFieldHidden', JSON.stringify(this.isCountryFieldHidden));
  }


    

  toggleFieldDisableBranch():void{

    this.isBranchFieldHidden = !this.isBranchFieldHidden;
    localStorage.setItem('isBranchFieldHidden', JSON.stringify(this.isBranchFieldHidden));
  }



  
  toggleFieldDisableDepart():void{

    this.isDepartFieldHidden = !this.isDepartFieldHidden;
    localStorage.setItem('isDepartFieldHidden', JSON.stringify(this.isDepartFieldHidden));
  }


  
  
  toggleFieldDisableDesignation():void{

    this.isDesignationFieldHidden = !this.isDesignationFieldHidden;
    localStorage.setItem('isDesignationFieldHidden', JSON.stringify(this.isDesignationFieldHidden));
  }

  
  toggleFieldDisableCat():void{

    this.isCatFieldHidden = !this.isCatFieldHidden;
    localStorage.setItem('isCatFieldHidden', JSON.stringify(this.isCatFieldHidden));
  }


  
  toggleFieldDisableHire():void{

    this.isHireFieldHidden = !this.isHireFieldHidden;
    localStorage.setItem('isHireFieldHidden', JSON.stringify(this.isHireFieldHidden));
  }







   updateFieldNames(): void {
    // Save updated field names to localStorage
    localStorage.setItem('empCodeFieldName', this.empCodeFieldName);
    localStorage.setItem('firstNameFieldName', this.firstNameFieldName);
    localStorage.setItem('isFirstNameMandatory', JSON.stringify(this.isFirstNameMandatory)); // Convert boolean to string for storage
  


    localStorage.setItem('lastNameFieldName', this.lastNameFieldName);
    localStorage.setItem('isLastNameMandatory', JSON.stringify(this.isLastNameMandatory)); // Convert boolean to string for storage

    localStorage.setItem('dobFieldName', this.dobFieldName);


    localStorage.setItem('emailFieldName', this.emailFieldName);
    localStorage.setItem('isEmailMandatory', JSON.stringify(this.isEmailMandatory)); // Convert boolean to string for storage


    
    localStorage.setItem('cmpnoFieldName', this.cmpnoFieldName);
        localStorage.setItem('isCmpnoMandatory', JSON.stringify(this.isCmpnoMandatory)); // Convert boolean to string for storage


    localStorage.setItem('pernoFieldName', this.pernoFieldName);
    localStorage.setItem('isPernoMandatory', JSON.stringify(this.isPernoMandatory)); // Convert boolean to string for storage

    localStorage.setItem('peraddressFieldName', this.peraddressFieldName);
    localStorage.setItem('isPeraddMandatory', JSON.stringify(this.isPeraddMandatory)); // Convert boolean to string for storage

    

    localStorage.setItem('preaddressFieldName', this.preaddressFieldName);
    localStorage.setItem('isPresaddMandatory', JSON.stringify(this.isPresaddMandatory)); // Convert boolean to string for storage

    localStorage.setItem('cityFieldName', this.cityFieldName);
    localStorage.setItem('isCityMandatory', JSON.stringify(this.isCityMandatory)); // Convert boolean to string for storage

    localStorage.setItem('nationFieldName', this.nationFieldName);
    localStorage.setItem('isNatMandatory', JSON.stringify(this.isNatMandatory)); // Convert boolean to string for storage

    localStorage.setItem('fatherFieldName', this.fatherFieldName);
    localStorage.setItem('isFatherMandatory', JSON.stringify(this.isFatherMandatory)); // Convert boolean to string for storage


    localStorage.setItem('motherFieldName', this.motherFieldName);
    localStorage.setItem('isMotherMandatory', JSON.stringify(this.isMotherMandatory)); // Convert boolean to string for storage


    localStorage.setItem('hiredFieldName', this.hiredFieldName);
    localStorage.setItem('isHiringMandatory', JSON.stringify(this.isHiringMandatory)); // Convert boolean to string for storage


    localStorage.setItem('joinFieldName', this.joinFieldName);



    localStorage.setItem('selectedDataType', this.selectedDataType);
    if (this.selectedDataType === 'Dropdown') {
      localStorage.setItem('dropdownValues', this.dropdownValues);
    } else {
      localStorage.removeItem('dropdownValues'); // Clear dropdown values if not using dropdown
    }

    // Save updated field names to localStorage
    localStorage.setItem('genderFieldName', this.genderFieldName);
    localStorage.setItem('isGenderMandatory', JSON.stringify(this.isGenderMandatory)); // Convert boolean to string for storage
    
    localStorage.setItem('genderDataType', this.genderDataType);

    if (this.genderDataType === 'Dropdown') {
        localStorage.setItem('genderDropdownValues', this.genderDropdownValues);
    } else {
        localStorage.removeItem('genderDropdownValues');
    }



    localStorage.setItem('religionFieldName', this.religionFieldName);
    localStorage.setItem('isRelMandatory', JSON.stringify(this.isRelMandatory)); // Convert boolean to string for storage

    localStorage.setItem('selectedDataTypereligion', this.selectedDataTypereligion);

    if (this.selectedDataTypereligion === 'Dropdown') {
      localStorage.setItem('dropdownValuesreligion', this.dropdownValuesreligion);
      console.log('re',this.dropdownValuesreligion)
    } else {
      localStorage.removeItem('dropdownValuesreligion'); // Clear dropdown values if not using dropdown
    }




    localStorage.setItem('bloodFieldName', this.bloodFieldName);
    localStorage.setItem('isBloodMandatory', JSON.stringify(this.isBloodMandatory)); // Convert boolean to string for storage

    localStorage.setItem('selectedDataTypeblood', this.selectedDataTypeblood);

    if (this.selectedDataTypeblood === 'Dropdown') {
      localStorage.setItem('dropdownValuesblood', this.dropdownValuesblood);
      console.log('blood',this.dropdownValuesblood)
    } else {
      localStorage.removeItem('dropdownValuesblood'); // Clear dropdown values if not using dropdown
    }




   // Save updated field names to localStorage marital status
   localStorage.setItem('maritalFieldName', this.maritalFieldName);
   localStorage.setItem('isMariMandatory', JSON.stringify(this.isMariMandatory)); // Convert boolean to string for storage

   localStorage.setItem('maritalDataType', this.maritalDataType);

   if (this.maritalDataType === 'Dropdown') {
       localStorage.setItem('maritalDropdownValues', this.maritalDropdownValues);
   } else {
       localStorage.removeItem('maritalDropdownValues');
   }

   



      // Save updated field names to localStorage marital status
      localStorage.setItem('locationFieldName', this.locationFieldName);
      localStorage.setItem('isLocationMandatory', JSON.stringify(this.isLocationMandatory)); // Convert boolean to string for storage

      localStorage.setItem('locationDataType', this.locationDataType);
   
      if (this.locationDataType === 'Dropdown') {
          localStorage.setItem('locationDropdownValues', this.locationDropdownValues);
      } else {
          localStorage.removeItem('locationDropdownValues');
      }
   



         // Save updated field names to localStorage marital status
         localStorage.setItem('cntryFieldName', this.cntryFieldName);   
         localStorage.setItem('isLCountryMandatory', JSON.stringify(this.isLCountryMandatory)); // Convert boolean to string for storage

         localStorage.setItem('cntryDataType', this.cntryDataType);
      
         if (this.cntryDataType === 'Dropdown') {
             localStorage.setItem('cntryDropdownValues', this.cntryDropdownValues);
         } else {
             localStorage.removeItem('cntryDropdownValues');
         }




               // Save updated field names to localStorage marital status
               localStorage.setItem('brchFieldName', this.brchFieldName);
               localStorage.setItem('isLBranchMandatory', JSON.stringify(this.isLBranchMandatory)); // Convert boolean to string for storage

               localStorage.setItem('brchDataType', this.brchDataType);
            
               if (this.brchDataType === 'Dropdown') {
                   localStorage.setItem('brchDropdownValues', this.brchDropdownValues);
               } else {
                   localStorage.removeItem('brchDropdownValues');
               }
            
      



                       // Save updated field names to localStorage marital status
                       localStorage.setItem('deptFieldName', this.deptFieldName);
                       localStorage.setItem('isLDepartmentMandatory', JSON.stringify(this.isLDepartmentMandatory)); // Convert boolean to string for storage

                       localStorage.setItem('deptDataType', this.deptDataType);
                    
                       if (this.deptDataType === 'Dropdown') {
                           localStorage.setItem('deptDropdownValues', this.deptDropdownValues);
                       } else {
                           localStorage.removeItem('deptDropdownValues');
                       }


                  
                  
                       // Save updated field names to localStorage marital status
                            localStorage.setItem('desFieldName', this.desFieldName);
                            localStorage.setItem('isLDesignationMandatory', JSON.stringify(this.isLDesignationMandatory)); // Convert boolean to string for storage

                            localStorage.setItem('desDataType', this.desDataType);
                         
                            if (this.desDataType === 'Dropdown') {
                                localStorage.setItem('desDropdownValues', this.desDropdownValues);
                            } else {
                                localStorage.removeItem('desDropdownValues');
                            }
                 
                            
                            
                    
     // Save updated field names to localStorage marital status
     localStorage.setItem('catFieldName', this.catFieldName);
     localStorage.setItem('isLCatogoryMandatory', JSON.stringify(this.isLCatogoryMandatory)); // Convert boolean to string for storage

     localStorage.setItem('catDataType', this.catDataType);
  
     if (this.catDataType === 'Dropdown') {
         localStorage.setItem('catDropdownValues', this.catDropdownValues);
     } else {
         localStorage.removeItem('catDropdownValues');
     }
  

    // You can also add logic here to inform the user that the update was successful
    console.log('Field names updated:', this.empCodeFieldName, this.firstNameFieldName, this.religionFieldName,this.cntryDataType);
  }

  empFamilynameFieldName: string = 'Family Member Name';
  empRelationnameFieldName: string = 'Relationship Name';
  empExpencenameFieldName: string = 'Family Company Expense';
  empmemDobnameFieldName: string = 'Member Date Of Birth';


  empQualificationnameFieldName: string = 'Qualification';
  empInstitutionnameFieldName: string = 'Institution Name';
  empQuaYearnameFieldName: string = 'Qualification Year';
  empQuaSubjectFieldName: string = 'Employee qualification subject';

  
  empJobFromDatenameFieldName: string = 'Employee job History From date';
  empJobendDatenameFieldName: string = 'Employee job History to date';
  empComapanyameFieldName: string = 'Comapany Name';
  empJobDesignationFieldName: string = 'Employee Designation';
  empSalarypermonthFieldName: string = 'Employee salary per month';
  empLeavingReasonFieldName: string = 'Leaving reason';
  empWorkExpFieldName: string = 'Employee work Experiance';


  empDocmentNoFieldName: string = 'Document Number';
  empIssueDateFieldName: string = 'Issued date';
  empExpDateFieldName: string = 'Expired Date';
  empEmpdocumentFieldName: string = 'Employee Document';
  empEmpdocumentDatatypeFieldName: string = 'Document Type';


  updateEmployeeFamily():void{
        localStorage.setItem('empFamilynameFieldName', this.empFamilynameFieldName);
        localStorage.setItem('empRelationnameFieldName', this.empRelationnameFieldName);
        localStorage.setItem('empExpencenameFieldName', this.empExpencenameFieldName);
        localStorage.setItem('empmemDobnameFieldName', this.empmemDobnameFieldName);



        localStorage.setItem('empQualificationnameFieldName', this.empQualificationnameFieldName);
        localStorage.setItem('empInstitutionnameFieldName', this.empInstitutionnameFieldName);
        localStorage.setItem('empQuaYearnameFieldName', this.empQuaYearnameFieldName);
        localStorage.setItem('empQuaSubjectFieldName', this.empQuaSubjectFieldName);


        localStorage.setItem('empJobFromDatenameFieldName', this.empJobFromDatenameFieldName);
        localStorage.setItem('empJobendDatenameFieldName', this.empJobendDatenameFieldName);
        localStorage.setItem('empComapanyameFieldName', this.empComapanyameFieldName);
        localStorage.setItem('empJobDesignationFieldName', this.empJobDesignationFieldName);
        localStorage.setItem('empSalarypermonthFieldName', this.empSalarypermonthFieldName);
        localStorage.setItem('empLeavingReasonFieldName', this.empLeavingReasonFieldName);
        localStorage.setItem('empWorkExpFieldName', this.empWorkExpFieldName);



        
        localStorage.setItem('empDocmentNoFieldName', this.empDocmentNoFieldName);
        localStorage.setItem('empIssueDateFieldName', this.empIssueDateFieldName);
        localStorage.setItem('empExpDateFieldName', this.empExpDateFieldName);
        localStorage.setItem('empEmpdocumentFieldName', this.empEmpdocumentFieldName);
        localStorage.setItem('empEmpdocumentDatatypeFieldName', this.empEmpdocumentDatatypeFieldName);


  }


  
  loadFamilyFieldNames(): void {
    // Load field names from localStorage

    const savedFamilyNameFieldName = localStorage.getItem('empFamilynameFieldName');
    if (savedFamilyNameFieldName) {
      this.empFamilynameFieldName = savedFamilyNameFieldName;
    }

    const empRelationnameFieldName = localStorage.getItem('empRelationnameFieldName');
    if (empRelationnameFieldName) {
      this.empRelationnameFieldName = empRelationnameFieldName;
    }

    const empExpencenameFieldName = localStorage.getItem('empExpencenameFieldName');
    if (empExpencenameFieldName) {
      this.empExpencenameFieldName = empExpencenameFieldName;
    }

    const empmemDobnameFieldName = localStorage.getItem('empmemDobnameFieldName');
    if (empmemDobnameFieldName) {
      this.empmemDobnameFieldName = empmemDobnameFieldName;
    }



    const empQualificationnameFieldName = localStorage.getItem('empQualificationnameFieldName');
    if (empQualificationnameFieldName) {
      this.empQualificationnameFieldName = empQualificationnameFieldName;
    }
    const empInstitutionnameFieldName = localStorage.getItem('empInstitutionnameFieldName');
    if (empInstitutionnameFieldName) {
      this.empInstitutionnameFieldName = empInstitutionnameFieldName;
    }

    const empQuaYearnameFieldName = localStorage.getItem('empQuaYearnameFieldName');
    if (empQuaYearnameFieldName) {
      this.empQuaYearnameFieldName = empQuaYearnameFieldName;
    }

    const empQuaSubjectFieldName = localStorage.getItem('empQuaSubjectFieldName');
    if (empQuaSubjectFieldName) {
      this.empQuaSubjectFieldName = empQuaSubjectFieldName;
    }




    const empJobFromDatenameFieldName = localStorage.getItem('empJobFromDatenameFieldName');
    if (empJobFromDatenameFieldName) {
      this.empJobFromDatenameFieldName = empJobFromDatenameFieldName;
    }


    const empJobendDatenameFieldName = localStorage.getItem('empJobendDatenameFieldName');
    if (empJobendDatenameFieldName) {
      this.empJobendDatenameFieldName = empJobendDatenameFieldName;
    }

    
    const empComapanyameFieldName = localStorage.getItem('empComapanyameFieldName');
    if (empComapanyameFieldName) {
      this.empComapanyameFieldName = empComapanyameFieldName;
    }


    const empJobDesignationFieldName = localStorage.getItem('empJobDesignationFieldName');
    if (empJobDesignationFieldName) {
      this.empJobDesignationFieldName = empJobDesignationFieldName;
    }

    const empSalarypermonthFieldName = localStorage.getItem('empSalarypermonthFieldName');
    if (empSalarypermonthFieldName) {
      this.empSalarypermonthFieldName = empSalarypermonthFieldName;
    }

    const empLeavingReasonFieldName = localStorage.getItem('empLeavingReasonFieldName');
    if (empLeavingReasonFieldName) {
      this.empLeavingReasonFieldName = empLeavingReasonFieldName;
    }


    const empWorkExpFieldName = localStorage.getItem('empWorkExpFieldName');
    if (empWorkExpFieldName) {
      this.empWorkExpFieldName = empWorkExpFieldName;
    }



    
    const empDocmentNoFieldName = localStorage.getItem('empDocmentNoFieldName');
    if (empDocmentNoFieldName) {
      this.empDocmentNoFieldName = empDocmentNoFieldName;
    }


    const empIssueDateFieldName = localStorage.getItem('empIssueDateFieldName');
    if (empIssueDateFieldName) {
      this.empIssueDateFieldName = empIssueDateFieldName;
    }

    const empExpDateFieldName = localStorage.getItem('empExpDateFieldName');
    if (empExpDateFieldName) {
      this.empExpDateFieldName = empExpDateFieldName;
    }

    const empEmpdocumentFieldName = localStorage.getItem('empEmpdocumentFieldName');
    if (empEmpdocumentFieldName) {
      this.empEmpdocumentFieldName = empEmpdocumentFieldName;
    }


    const empEmpdocumentDatatypeFieldName = localStorage.getItem('empEmpdocumentDatatypeFieldName');
    if (empEmpdocumentDatatypeFieldName) {
      this.empEmpdocumentDatatypeFieldName = empEmpdocumentDatatypeFieldName;
    }



  }



  loadFieldNames(): void {
    // Load field names from localStorage
    const savedEmpCodeFieldName = localStorage.getItem('empCodeFieldName');
    const savedFirstNameFieldName = localStorage.getItem('firstNameFieldName');
    const savedIsFirstNameDisabled = localStorage.getItem('isFirstNameDisabled');

    const savedLastNameFieldName = localStorage.getItem('lastNameFieldName');
    const savedEmailFieldName = localStorage.getItem('emailFieldName');

    const saveddobFieldName = localStorage.getItem('dobFieldName');
    const savedcmpnoFieldName = localStorage.getItem('cmpnoFieldName');
    const savedpernoFieldName = localStorage.getItem('pernoFieldName');
    const savedperaddressFieldName = localStorage.getItem('peraddressFieldName');
    const savedpreaddressFieldName = localStorage.getItem('preaddressFieldName');
    const savedcityFieldName = localStorage.getItem('cityFieldName');

    const savednationFieldName = localStorage.getItem('nationFieldName');

    const savedIsFirstNameMandatory = localStorage.getItem('isFirstNameMandatory');
    if (savedIsFirstNameMandatory) {
      this.isFirstNameMandatory = JSON.parse(savedIsFirstNameMandatory); // Convert string back to boolean
  }



    if (savedEmpCodeFieldName) {
      this.empCodeFieldName = savedEmpCodeFieldName;
    }
    if (savedFirstNameFieldName) {
      this.firstNameFieldName = savedFirstNameFieldName;
    }
    // const savedFirstNameFieldVisibility = localStorage.getItem('isFirstNameFieldHidden');
    // if (savedFirstNameFieldVisibility) {
    //     this.isFirstNameFieldHidden = JSON.parse(savedFirstNameFieldVisibility);
    // }



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

//   CreateEmployeeFeild(): void {
//     this.registerButtonClicked = true;

//     // Convert the dropdown_values string into an array
//     const dropdownValuesArray = this.dropdown_values
//         ? this.dropdown_values.split(',').map((value: any) => value.trim())
//         : [];
        
//    // Convert the dropdown_values string into an array
//    const radio_valuesArray = this.radio_values
//    ? this.radio_values.split(',').map((value: any) => value.trim())
//    : [];

//     const fieldData = {
//       emp_custom_field: this.field_name,
//         field_value: this.field_value,
//         data_type: this.data_type,
//         dropdown_values: dropdownValuesArray,
//         radio_values: radio_valuesArray,
//     };

//     this.EmployeeService.registerEmpAddMoreFeild(fieldData).subscribe(
//         (response) => {
//             console.log('Field added successfully', response);
//             alert('Field added successfully');

       
//         },
//         (error) => {
//             console.error('Field addition failed', error);
//             alert('Enter all fields!');
//         }
//     );
// }

mandatory: boolean = false;

CreateEmployeeFeild(): void {
  this.registerButtonClicked = true;

  // Convert the dropdown_values string into an array
  const dropdownValuesArray = this.dropdown_values
      ? this.dropdown_values.split(',').map((value: any) => value.trim())
      : [];
      
 // Convert the radio_values string into an array
 const radio_valuesArray = this.radio_values
 ? this.radio_values.split(',').map((value: any) => value.trim())
 : [];

  const fieldData = {
      emp_custom_field: this.field_name,
      field_value: this.field_value,
      data_type: this.data_type,
      dropdown_values: dropdownValuesArray,
      radio_values: radio_valuesArray,
      mandatory: this.mandatory  // Capture the mandatory field status
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
