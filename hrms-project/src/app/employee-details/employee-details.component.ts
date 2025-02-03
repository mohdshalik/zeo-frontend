import { Component,OnInit, ElementRef, Renderer2, ViewChild,  EventEmitter, Output, Input  } from '@angular/core';
import { CountryService } from '../country.service';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CompanySelectionComponent } from '../company-selection/company-selection.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../employee-master/employee.service'; 
import { DesignationCreationComponent } from '../designation-creation/designation-creation.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { SuccesModalComponent } from '../succes-modal/succes-modal.component';
import { EmployeeFamilyComponent } from '../employee-family/employee-family.component';
import { NotificationServiceService } from '../notification-service.service';
import { EmployeeCreateLanguageComponent } from '../employee-create-language/employee-create-language.component';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {
  Employees: any[] = [];
  emp_first_name: string = '';
  employee: any;
  profilePicture: any;
  emp_family_details: any[] | undefined;
  Qualifications: any[] | undefined;
  EmpSkills: any[] | undefined;
  EmpPrgmSkills: any[] | undefined;
  EmpMarkkills: any[] | undefined;

  EmpLangSkills:any[] | undefined ;

  Jobhistorys:any[] | undefined;
  LeaveRequests:any[] | undefined;

  employeeDocuments: any[] = [] ;

  // expiredDocuments: any[] = [];

  isEssUser: boolean = false; // Initialize with a default value, or set it based on some condition

  hideButton = false;

  progressBarValue: number = 40; // or any initial value you want

  langSe:boolean=false;
  
  empCodeFieldName: string = 'Employee Code';
  firstNameFieldName: string = 'First Name';
  lastNameFieldName: string = 'First Name';
  emailFieldName: string = 'Email';
  dobFieldName: string = 'Date Of Birth';
  cmpnoFieldName: string = 'Company Number';
  pernoFieldName: string = 'Personal Number';
  peraddressFieldName: string = 'Permanent Address';
  preaddressFieldName: string = 'Present Address';
  cityFieldName: string = 'City';
  nationFieldName: string = 'Nationality';
  fatherFieldName: string = 'Father Name';
  motherFieldName: string = 'Mother Name';
  genderFieldName: string = 'Gender';  // Initial Gender field name
  maritalFieldName: string = 'Marital Status';
  religionFieldName: string = 'Religion';
  bloodFieldName: string = 'Blood Group';
  locationFieldName: string = 'Location';
  cntryFieldName: string = 'Country';
  brchFieldName: string = 'Branch';
  deptFieldName: string = 'Department';
  desFieldName: string = 'Designation';
  catFieldName: string = 'Catogory';

  hiredFieldName: string = 'Hired Date';

  joinFieldName: string = 'Joining Date';
  @Input() document: any; // Input property to receive the document object
  // cdr: any;
  constructor(private EmployeeService:EmployeeService,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private notificationServiceService: NotificationServiceService,

    private dialog:MatDialog,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    
    ) {}

    ngOnInit(): void {

      
      

    

      this.hideButton = this.EmployeeService.getHideButton();

      this.route.params.subscribe(params => {
        this.employee = params['id'];
        // this.loadEmployeeDetails();
        this.loadFamilyDetails();
        this.loadQualification();
        this.loadJobHistory();
        this.loadEmpSkills();
        this.loadEmpProgramSkills();


        
        this.fetchEmployeeDocuments();
        this.loadprogramlang();
        this.loadMarprogramlang();
        this.loadEmpMarkSkills();
        this.loadFieldNames();


      });
     
      const employeeIdParam = this.route.snapshot.paramMap.get('id');
      this.loadFamilyDetails();


      if (employeeIdParam) {
        const employeeId = +employeeIdParam;
  
        // Fetch employee details
        this.EmployeeService.getEmployeeDetails(employeeId).subscribe(
          (details) => {
            this.employee = details;
            // this.cdr.detectChanges(); // Manually trigger change detection

          },
          (error) => {
            console.error('Failed to fetch employee details', error);
          }
        );
      } else {
        console.error('Employee ID parameter is null.');
      }


    }

    // ngOnDestroy() {
    //   this.notificationServiceService.disconnect();
    // }

    handleImageError(event: any): void {
      // console.error('Error loading image:', event);
    }

    handleImageErrors(event: any): void {
      // console.error('Error loading image:', event);
    }

    isImage(src: string): boolean {
      return src.toLowerCase().endsWith('.jpg') || src.toLowerCase().endsWith('.jpeg') || src.toLowerCase().endsWith('.png') || src.toLowerCase().endsWith('.gif');
    }

    isImages(src: string): boolean {
      const extensions = ['.jpg', '.jpeg', '.png', '.gif'];
      return extensions.some((ext) => src.toLowerCase().endsWith(ext));
    }
    // fetchEmployeeDocuments(): void {
    //   this.EmployeeService.getDocument(this.employee).subscribe(
    //     data => {
          
    //       // Assuming the API response includes doc_custom_fields as part of each document object
    //       this.employeeDocuments = data.map((document: { doc_custom_fields: any; }) => ({
    //         ...document,
            
    //         doc_custom_fields: document.doc_custom_fields || [] // Ensure this key is present
    //       }));
    //     },
    //     error => {
    //       console.error('Error fetching employee documents:', error);
    //     }
    //   );
    // }

    fetchEmployeeDocuments(): void {
      this.EmployeeService.getDocument(this.employee).subscribe(
        (data: any[]) => {  // Allow any structure
          this.employeeDocuments = data.map(document => ({
            ...document,
            emp_doc_document: document.emp_doc_document
              ? `${environment.apiBaseUrl}${document.emp_doc_document}`
              : null,
            doc_custom_fields: document.doc_custom_fields || []
          }));
        },
        error => {
          console.error('Error fetching employee documents:', error);
        }
      );
    }

    loadFamilyDetails(): void {
      this.EmployeeService.getFamilyDetails(this.employee).subscribe(
        family => {
          this.emp_family_details = family;
        },
        error => {
          console.error('Error fetching family details:', error);
        }
      );
    }


    loadFieldNames(): void {
      // Load field names from localStorage
      const savedEmpCodeFieldName = localStorage.getItem('empCodeFieldName');
      const savedFirstNameFieldName = localStorage.getItem('firstNameFieldName');
      const savedLastNameFieldName = localStorage.getItem('lastNameFieldName');
      const savedemailFieldName = localStorage.getItem('emailFieldName');
      const saveddobFieldName = localStorage.getItem('dobFieldName');
      const savedcmpnoFieldName = localStorage.getItem('cmpnoFieldName');
      const savedpernoFieldName = localStorage.getItem('pernoFieldName');
    
      const savedperaddressFieldName = localStorage.getItem('peraddressFieldName');
      const savedpreaddressFieldName = localStorage.getItem('preaddressFieldName');
      const savedcityFieldName = localStorage.getItem('cityFieldName');
    
      const savednationFieldName = localStorage.getItem('nationFieldName');
    
    
          // Load field names from localStorage
          const savedGenderFieldName = localStorage.getItem('genderFieldName');
          if (savedGenderFieldName) {
              this.genderFieldName = savedGenderFieldName;
          }
    
               // Load field names from localStorage
               const savedMaritalFieldName = localStorage.getItem('maritalFieldName');
               if (savedMaritalFieldName) {
                   this.maritalFieldName = savedMaritalFieldName;
               }
       
    
      if (savedEmpCodeFieldName) {
        this.empCodeFieldName = savedEmpCodeFieldName;
      }
      if (savedFirstNameFieldName) {
        this.firstNameFieldName = savedFirstNameFieldName;
      }
      if (savedLastNameFieldName) {
        this.lastNameFieldName = savedLastNameFieldName;
      }
      if (savedemailFieldName) {
        this.emailFieldName = savedemailFieldName;
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
    
      const savedReligionFieldName = localStorage.getItem('religionFieldName');
      if (savedReligionFieldName) {
          this.religionFieldName = savedReligionFieldName;
      }
    
      const savedBloodFieldName = localStorage.getItem('bloodFieldName');
      if (savedBloodFieldName) {
          this.bloodFieldName = savedBloodFieldName;
      }
    
    
      const savedfatherFieldName = localStorage.getItem('fatherFieldName');
      if (savedfatherFieldName) {
        this.fatherFieldName = savedfatherFieldName;
    }
    
       const savedmotherFieldName = localStorage.getItem('motherFieldName');
      if (savedmotherFieldName) {
        this.motherFieldName = savedmotherFieldName;
    }
    
       // Load field names from localStorage
       const savedLocationFieldName = localStorage.getItem('locationFieldName');
       if (savedLocationFieldName) {
           this.locationFieldName = savedLocationFieldName;
       }
    
         // Load field names from localStorage
         const savedcntryFieldName = localStorage.getItem('cntryFieldName');
         if (savedcntryFieldName) {
             this.cntryFieldName = savedcntryFieldName;
         }
    
           // Load field names from localStorage
           const savedbrchFieldName = localStorage.getItem('brchFieldName');
           if (savedbrchFieldName) {
               this.brchFieldName = savedbrchFieldName;
           }
    
    
             // Load field names from localStorage
             const saveddeptFieldName = localStorage.getItem('deptFieldName');
             if (saveddeptFieldName) {
                 this.deptFieldName = saveddeptFieldName;
             }
    
               // Load field names from localStorage
               const saveddesFieldName = localStorage.getItem('desFieldName');
               if (saveddesFieldName) {
                   this.desFieldName = saveddesFieldName;
               }
    
    
               
               // Load field names from localStorage
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
    loadEmpSkills(): void {
      this.EmployeeService.getempLangaugeSkill(this.employee).subscribe(
        family => {
          this.EmpLangSkills = family;
        },
        error => {
          console.error('Error fetching family details:', error);
        }
      );
    }


    loadEmpProgramSkills(): void {
      this.EmployeeService.getEmpPgmSkills(this.employee).subscribe(
        family => {
          this.EmpPrgmSkills = family;
        },
        error => {
          console.error('Error fetching family details:', error);
        }
      );
    }

    loadEmpMarkSkills(): void {
      this.EmployeeService.getEmpMarkSkills(this.employee).subscribe(
        family => {
          this.EmpMarkkills = family;
        },
        error => {
          console.error('Error fetching family details:', error);
        }
      );
    }





    loadQualification(): void {
      this.EmployeeService.getQualificationById(this.employee).subscribe(
        Qualification => {
          this.Qualifications = Qualification;
          console.log('qua',Qualification)
        },
        error => {
          console.error('Error fetching family details:', error);
        }
      );
    }


    loadJobHistory(): void {
      this.EmployeeService.getJobHistoryById(this.employee).subscribe(
        Jobhistory => {
          this.Jobhistorys = Jobhistory;
        },
        error => {
          console.error('Error fetching family details:', error);
        }
      );
    }


    loadLeaveRequest(): void {
      this.EmployeeService.getLeaveRequestById(this.employee).subscribe(
        LeaveReq => {
          this.LeaveRequests = LeaveReq;
        },
        error => {
          console.error('Error fetching family details:', error);
        }
      );
    }
    
    isAddFieldsModalOpen:boolean=false;

    openAddFieldsModal(): void {
      this.isAddFieldsModalOpen = true;
    }

    closeAddFieldsModal(): void {
      this.isAddFieldsModalOpen = false;
    }





    openEditEmpPopuss(employeeId: number):void{
      const dialogRef = this.dialog.open(EmployeeEditComponent, {
        width:'80%',
        height:'500px',
        data: { employeeId: employeeId }
        
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }


    onDeleteEmployee(employeeId: number): void {
      if (confirm('Are you sure you want to delete this employee?')) {
          this.EmployeeService.deleteEmployee(employeeId).subscribe(
              () => {
                  console.log('Employee deleted successfully');
                  this.router.navigate(['/main-sidebar/sub-sidebar/employee-master']);
                  // Refresh the employee list after deletion
                  // this.loadEmployee();
              },
              (error) => {
                  console.error('Error deleting employee:', error);
              }
          );
      }
  }


  employeefamAdd():void{


    const dialogRef = this.dialog.open(EmployeeFamilyComponent, {
      width:'80%',
      height:'500px', // Adjust width as needed
      data: { emp_id: this.employee.id }  // Pass any data you want to display in the modal
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log('The success modal was closed');
      // Handle any actions after the modal is closed, if needed
      this.loadFamilyDetails();

    });

  }


  employeeLang():void{
    
    this.langSe = !this.langSe; // Toggle the boolean value


  }

  langSecClose():void{

    this.langSe =false;
  }



  onDeleteEmployeeLanguage(id: number): void {
    if (confirm('Are you sure you want to delete this language skill?')) {
      this.EmployeeService.deleteEmployeeLanguageSkill(id).subscribe(
        () => {
          // Remove the skill from the local list
          this.EmpLangSkills = this.EmpLangSkills?.filter(skill => skill.id !== id);
          alert('Language skill deleted successfully.');
        },
        error => {
          console.error('Error deleting language skill:', error);
        }
      );
    }
  }

  onDeleteEmployeeProgramLanguage(id: number): void {
    if (confirm('Are you sure you want to delete this program language skill?')) {
      this.EmployeeService.deleteEmployeeProgramLanguageSkill(id).subscribe(
        () => {
          // Remove the skill from the local list
          this.EmpPrgmSkills = this.EmpPrgmSkills?.filter(skill => skill.id !== id);
          alert('program skill deleted successfully.');
        },
        error => {
          console.error('Error deleting language skill:', error);
        }
      );
    }
  }

  onDeleteEmployeeMarketLanguage(id: number): void {
    if (confirm('Are you sure you want to delete this Marketing language skill?')) {
      this.EmployeeService.deleteEmployeeMarketanguageSkill(id).subscribe(
        () => {
          // Remove the skill from the local list
          this.EmpMarkkills = this.EmpMarkkills?.filter(skill => skill.id !== id);
          alert('Marketing skill deleted successfully.');
        },
        error => {
          console.error('Error deleting language skill:', error);
        }
      );
    }
  }


  empLanguageOpen():void{
    const dialogRef = this.dialog.open(EmployeeCreateLanguageComponent, {
      width:'80%',
      height:'500px',
      // data: { categoryId: categoryId }
      data: { emp_id: this.employee.id }  // Pass any data you want to display in the modal

      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }




 registerButtonClicked = false;

 program_skill :any;
 percentage:any;

 marketing_skill :any;

 PrgmLangaguesSkills :any[]=[];
 MarlangaguesSkills :any[]=[];

 
  registerlanguage(): void {
    this.registerButtonClicked = true;
    const companyData = {
      program_skill: this.program_skill,
      percentage:this.percentage,
      emp_id:this.employee.id,
   

      // Add other form field values to the companyData object
    };
   
    this.EmployeeService.registerPrgmLanguage(companyData).subscribe(
      (response) => {
        console.log('Registration successful', response);
       
            alert('program language  has been added ');
          //  this. loadprogramlang();
          //  this.closeAddFieldsModal();
            window.location.reload();
           

      },
      (error) => {
        console.error('Registration failed', error);
        alert('enter all field!')
        // Handle the error appropriately, e.g., show a user-friendly error message.
      }
    );
  }


  loadprogramlang(): void {
    
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
  
    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
      this.EmployeeService.getPrgmLangaugeSkill(selectedSchema).subscribe(
        (result: any) => {
          this.PrgmLangaguesSkills = result;
          console.log(' fetching Companies:');
  
        },
        (error) => {
          console.error('Error fetching Companies:', error);
        }
      );
    }
    }


    registerMarlanguage(): void {
      this.registerButtonClicked = true;
      const companyData = {
        marketing_skill: this.marketing_skill,
        percentage:this.percentage,
        emp_id:this.employee.id,
     
  
        // Add other form field values to the companyData object
      };
     
      this.EmployeeService.registerMarPrgmLanguage(companyData).subscribe(
        (response) => {
          console.log('Registration successful', response);
         
          alert('Marketing Language has been added.');
          // Reload the page
          // this.loadMarprogramlang();
          // this.closemarketModal();
          window.location.reload();
        },
        (error) => {
          console.error('Registration failed', error);
          alert('enter all field!')
          // Handle the error appropriately, e.g., show a user-friendly error message.
        }
      );
    }
  
  
    loadMarprogramlang(): void {
      
      const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
    
      console.log('schemastore',selectedSchema )
      // Check if selectedSchema is available
      if (selectedSchema) {
        this.EmployeeService.getMarLangaugeSkill(selectedSchema).subscribe(
          (result: any) => {
            this.MarlangaguesSkills = result;
            console.log(' fetching Companies:');
    
          },
          (error) => {
            console.error('Error fetching Companies:', error);
          }
        );
      }
      }
  
      isMArketingModalOpen:boolean=false;

      openMarketingModal(): void {
        this.isMArketingModalOpen = true;
      }

      closemarketModal(){
        this.isMArketingModalOpen=false;
      }

}
