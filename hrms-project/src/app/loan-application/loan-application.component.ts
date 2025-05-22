import { Component } from '@angular/core';
import { CountryService } from '../country.service';
import { AuthenticationService } from '../login/authentication.service';
import { HttpClient } from '@angular/common/http';
import { LeaveService } from '../leave-master/leave.service';
import { DesignationService } from '../designation-master/designation.service';
import { SessionService } from '../login/session.service';
import { EmployeeService } from '../employee-master/employee.service';

@Component({
  selector: 'app-loan-application',
  templateUrl: './loan-application.component.html',
  styleUrl: './loan-application.component.css'
})
export class LoanApplicationComponent {


  amount_requested:any='';
  repayment_period:any='';
  emi_amount:any='';
  disbursement_date:any='';
  remaining_balance:any='';
  approved_on:any='';

  rejection_reason:any='';

  pause_start_date:any='';

  resume_date:any='';

  pause_reason:any='';

  employee:any='';
  loan_type:any='';





  


  Employees: any[] = []; // Array to store schema names
  LoanTypes:any []=[];
  LoanApplications:any []=[];



  selectedFile!: File | null;

  hasAddPermission: boolean = false;
hasDeletePermission: boolean = false;
hasViewPermission: boolean =false;
hasEditPermission: boolean = false;

userId: number | null | undefined;
userDetails: any;
userDetailss: any;
schemas: string[] = []; // Array to store schema names
  
  constructor(
    private leaveservice: LeaveService, 
    private authService: AuthenticationService, 

    private http: HttpClient,
    private DesignationService: DesignationService,
private sessionService: SessionService,
private employeeService: EmployeeService,

  ) {}

  ngOnInit(): void {

    this.loadLoanTypes();
    this.LoadEmployees();
    this.loadLoanApplications();

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
    
                   
                    this.hasAddPermission = this.checkGroupPermission('add_leave_type', groupPermissions);
                    console.log('Has add permission:', this.hasAddPermission);
                    
                    this.hasEditPermission = this.checkGroupPermission('change_leave_type', groupPermissions);
                    console.log('Has edit permission:', this.hasEditPermission);
      
                   this.hasDeletePermission = this.checkGroupPermission('delete_leave_type', groupPermissions);
                   console.log('Has delete permission:', this.hasDeletePermission);
      
    
                    this.hasViewPermission = this.checkGroupPermission('view_leave_type', groupPermissions);
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
  }
}
// checkViewPermission(permissions: any[]): boolean {
//   const requiredPermission = 'add_leave_type' ||'change_leave_type' ||'delete_leave_type' ||'view_leave_type';
  
  
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
  

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files.length > 0 ? event.target.files[0] : null;
  }
  

  registerButtonClicked = false;


  CreateLoanApplication(): void {
    this.registerButtonClicked = true;
  
  
    const formData = new FormData();
    formData.append('amount_requested', this.amount_requested);
    formData.append('repayment_period', this.repayment_period);
    formData.append('emi_amount', this.emi_amount);
    formData.append('disbursement_date', this.disbursement_date );
    formData.append('remaining_balance', this.remaining_balance);
    formData.append('approved_on', this.approved_on);
    formData.append('rejection_reason', this.rejection_reason);

    formData.append('pause_start_date', this.pause_start_date);
    formData.append('resume_date', this.resume_date );
    formData.append('pause_reason', this.pause_reason);
    formData.append('employee', this.employee);
    formData.append('loan_type', this.loan_type);


  
    this.employeeService.registerLoanApplication(formData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        alert('Loan application has been added');
        window.location.reload();
      },
      (error) => {
        console.error('Added failed', error);
        alert('Enter all required fields!');
      }
    );
  }



  LoadEmployees() {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
  
    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
      this.employeeService.getemployees(selectedSchema).subscribe(
        (result: any) => {
          this.Employees = result;
          console.log(' fetching Employees:');
  
        },
        (error) => {
          console.error('Error fetching Companies:', error);
        }
      );
    }
    }
  


      
  loadLoanTypes(): void {
    
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
  
    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
      this.employeeService.getLoanTypes(selectedSchema).subscribe(
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



     
    loadLoanApplications(): void {
    
      const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
    
      console.log('schemastore',selectedSchema )
      // Check if selectedSchema is available
      if (selectedSchema) {
        this.employeeService.getLoanApplications(selectedSchema).subscribe(
          (result: any) => {
            this.LoanApplications = result;
            console.log(' fetching Loantypes:');
    
          },
          (error) => {
            console.error('Error fetching Companies:', error);
          }
        );
      }
      }
  


      isPauseModalOpen: boolean = false;
      isResumeModalOpen: boolean = false;

      iscreateLoanApp: boolean = false;




      openPopus():void{
        this.iscreateLoanApp = true;

      }
    
      closeapplicationModal():void{
        this.iscreateLoanApp = false;

      }

selectedLoanId: number | null = null;



openPauseModal(loan: any): void {
  this.selectedLoanId = loan.id;
  this.pause_start_date = '';
  this.pause_reason = '';
  this.isPauseModalOpen = true;
}
closePauseModal(): void {
  this.isPauseModalOpen = false;
}


openResumeModal(loan: any): void {
  this.selectedLoanId = loan.id;
  this.resume_date = '';
  this.isResumeModalOpen = true;
}

closeResumeModal(): void {
  this.isResumeModalOpen = false;
}



// -------------------- Submit Pause --------------------

submitPauseLoan(): void {
  if (!this.selectedLoanId) {
    alert('Loan ID is missing!');
    return;
  }

  const pauseData = {
    pause_start_date: this.pause_start_date,
    pause_reason: this.pause_reason,
    resume_date: null // resume date is not set during pause
  };

  this.employeeService.pauseLoanApplication(this.selectedLoanId, pauseData).subscribe(
    (response) => {
      alert('Loan application paused successfully!');
      this.closePauseModal();
      this.loadLoanApplications();
    },
    (error) => {
      console.error('Pause failed:', error);
      alert('Failed to pause the loan application.');
    }
  );
}

// -------------------- Submit Resume --------------------

submitResumeLoan(): void {
  if (!this.selectedLoanId) {
    alert('Loan ID is missing!');
    return;
  }

  const resumeData = {
    resume_date: this.resume_date,
    pause_start_date: null, // clear pause date when resuming
    pause_reason: null
  };

  this.employeeService.resumeLoanApplication(this.selectedLoanId, resumeData).subscribe(
    (response) => {
      alert('Loan application resumed successfully!');
      this.closeResumeModal();
      this.loadLoanApplications();
    },
    (error) => {
      console.error('Resume failed:', error);
      alert('Failed to resume the loan application.');
    }
  );
}

}
