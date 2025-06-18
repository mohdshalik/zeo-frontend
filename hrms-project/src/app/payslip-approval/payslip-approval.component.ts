import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EmployeeService } from '../employee-master/employee.service';
import { SessionService } from '../login/session.service';
import { LeaveService } from '../leave-master/leave.service';
import { environment } from '../../environments/environment';
import { DesignationService } from '../designation-master/designation.service';

@Component({
  selector: 'app-payslip-approval',
  templateUrl: './payslip-approval.component.html',
  styleUrl: './payslip-approval.component.css'
})
export class PayslipApprovalComponent {


  
  @ViewChild('bottomOfPage') bottomOfPage!: ElementRef;


  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local

  
  schemas: string[] = []; // Array to store schema names

  userId: number | null | undefined;
  userDetails: any;
  userDetailss: any;
  username: any;
  selectedSchema: string | null = null;
  isLoading: boolean = false;


  Approvals: any[] = []; // Assuming this array holds the list of expired documents

  RejectionResons: any[] = []; // Assuming this array holds the list of expired documents
  hasAddPermission: boolean = false;
  hasDeletePermission: boolean = false;
  hasViewPermission: boolean =false;
  hasEditPermission: boolean = false;

  Employees: any[] = [];

  
  constructor(private authService: AuthenticationService,
    private router: Router,
   private EmployeeService: EmployeeService,
   private route: ActivatedRoute,
   private sessionService: SessionService,
   private leaveService: LeaveService,
   private DesignationService: DesignationService,

   ) { }


   ngOnInit(): void {

   

    this.fetchingApprovals();
        this.selectedSchema = this.sessionService.getSelectedSchema();

    // this.hideButton = this.EmployeeService.getHideButton();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Perform any actions on navigation end if needed
      }
    });

    const selectedSchema = this.authService.getSelectedSchema();
    const selectedSchemaId = this.authService.getSelectedSchemaId();

    if (selectedSchema) {


      this.LoadLeaveRejectionReasons(selectedSchema);


      this.LoadEmployee(selectedSchema);



    
    
    }
    

    if (selectedSchema && selectedSchemaId) {
        this.selectedSchema = selectedSchema;
        console.log('Selected schema from localStorage:', selectedSchema);
        console.log('Selected schema ID from localStorage:', selectedSchemaId);
      
    } else {
        console.error("No schema selected.");
    }

    this.userId = this.sessionService.getUserId();
    if (this.userId !== null) {
      this.authService.getUserData(this.userId).subscribe(
        async (userData: any) => {
          this.userDetails = userData; // Store user details in userDetails property
          this.username = this.userDetails.username;
    
    
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
    
                   
                    this.hasAddPermission = this.checkGroupPermission('add_leaveapproval', groupPermissions);
                    console.log('Has add permission:', this.hasAddPermission);
                    
                    this.hasEditPermission = this.checkGroupPermission('change_leaveapproval', groupPermissions);
                    console.log('Has edit permission:', this.hasEditPermission);
      
                   this.hasDeletePermission = this.checkGroupPermission('delete_leaveapproval', groupPermissions);
                   console.log('Has delete permission:', this.hasDeletePermission);
      
    
                    this.hasViewPermission = this.checkGroupPermission('view_leaveapproval', groupPermissions);
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
        this.fetchingApprovals();


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

}

// checkViewPermission(permissions: any[]): boolean {
//   const requiredPermission = 'add_leaveapproval' ||'change_leaveapproval' ||'delete_leaveapproval' ||'view_leaveapproval';
  
  
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
  


// Modified fetchingApprovals to accept userId

// fetchingApprovals(): void {
//   const selectedSchema = this.authService.getSelectedSchema();
//   if (selectedSchema && this.userId) {
//     this.EmployeeService.getApprovalslistPayslip(selectedSchema, this.userId).subscribe(
//       (result: any[]) => {
//         // ✅ Filter only "pending" status items and add "selected" property
//         this.Approvals = result
//           .filter((item: any) => item.request?.status === 'pending')
//           .map((item: any) => ({ ...item, selected: false }));
//       },
//       (error) => {
//         console.error('Error fetching approvals:', error);
//       }
//     );
//   }
// }

fetchingApprovals(): void {
  const selectedSchema = this.authService.getSelectedSchema();
  if (selectedSchema && this.userId) {
    this.EmployeeService.getApprovalslistPayslip(selectedSchema, this.userId).subscribe(
      (result: any[]) => {
        // Filter items where status is "pending" AND confirm_status is true
        this.Approvals = result
          .filter((item: any) =>
            item.request?.status === 'pending' &&
            item.request?.confirm_status === true
          )
          .map((item: any) => ({ ...item, selected: false }));
      },
      (error) => {
        console.error('Error fetching approvals:', error);
      }
    );
  }
}


masterSelected = false;

toggleAll(): void {
  this.Approvals.forEach(p => p.selected = this.masterSelected);
}

// Approve selected payslips
approveSelectedPayslips(): void {
  const selectedSchema = this.authService.getSelectedSchema();

  if (!selectedSchema) {
    alert('Schema not found.');
    return;
  }

  // ✅ Only collect top-level `id` of each approval object
  const selectedIds = this.Approvals
    .filter(p => p.selected)
    .map(p => p.id);

  if (selectedIds.length === 0) {
    alert('Please select at least one payslip to approve.');
    return;
  }

  const note = 'Approved successfully';

  this.EmployeeService.bulkApprovePayslips(selectedSchema, selectedIds, note).subscribe(
    (res) => {
      alert('Selected payslips approved.');
      this.fetchingApprovals(); // refresh list
    },
    (err) => {
      console.error('Error approving:', err);
      alert('Approval failed.');
    }
  );
}

LoadEmployee(selectedSchema: string) {
  this.leaveService.getEmployee(selectedSchema).subscribe(
    (data: any) => {
      this.Employees = data;

      console.log('employee:', this.Employees);
    },
    (error: any) => {
      console.error('Error fetching categories:', error);
    }
  );
}



selectedApproval: any = null;
isAddFieldsModalOpen: boolean = false;
note: string = '';  // To hold the note entered by the user


 // Fetching approval details when an item is clicked
 selectedaprovaldetalis(approvalId: number): void {
  const selectedSchema = this.authService.getSelectedSchema();

  if (selectedSchema) {
    const apiUrl = `${this.apiUrl}/payroll/api/approval-payroll/${approvalId}/?schema=${selectedSchema}`;

    this.EmployeeService.getApprovalDetailsPayslip(apiUrl).subscribe(
      (response: any) => {
        this.selectedApproval = response;
        this.isAddFieldsModalOpen = true; // Open the modal
        console.log('detalis',this.selectedApproval)
      },
      (error) => {
        console.error('Error fetching approval details:', error);
      }
    );
  }
}
  


scrollToBottom(): void {
  this.bottomOfPage.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
  



 
 // Function for handling approval status change to "Approved"
 approveApproval(approvalId: number): void {
  const selectedSchema = this.authService.getSelectedSchema();

  if (selectedSchema) {
    const apiUrl = `${this.apiUrl}/payroll/api/approval-payroll/${approvalId}/approve/?schema=${selectedSchema}`;


       // Data to be sent in the request body (including the note)
       const approvalData = {
        note: this.note,          // The note entered by the user
        status: 'Approved',       // Setting status to "Approved"
      };

      this.EmployeeService.approveApprovalRequest(apiUrl, approvalData).subscribe(
        (response: any) => {
        console.log('Approval status changed to Approved:', response);
         this.fetchingApprovals();
        // Update the selected approval status in the local UI
        if (this.selectedApproval) {
          this.selectedApproval.status = 'Approved';
        }

        // Optionally, update the main approvals list if needed
        const approvalIndex = this.Approvals.findIndex(approval => approval.id === approvalId);
        if (approvalIndex !== -1) {
          this.Approvals[approvalIndex].status = 'Approved';
        }

        // Close the modal after successful approval
        this.isAddFieldsModalOpen = false;
      },
      (error) => {
        console.error('Error approving the approval request:', error);
      }
    );
  }
}


closemarketModal(){
  this.isAddFieldsModalOpen=false;
}

rejection_reason: string = ''; // New property for rejection reason
showRejectionReason: boolean = false; // Controls whether the rejection reason input is shown

// Function for handling approval rejection
rejectApproval(approvalId: number): void {
  this.showRejectionReason = true; // Show the rejection reason input when "Reject" is clicked
}

confirmRejection(approvalId: number): void {
  const selectedSchema = this.authService.getSelectedSchema();

  // Data to be sent in the request body (including the note and rejection reason)
  const approvalData = {
    note: this.note, // The note entered by the user
    status: 'Rejected', // Setting status to "Rejected"
    rejection_reason: this.rejection_reason, // Adding the rejection reason
  };

  if (selectedSchema) {
    const apiUrl = `${this.apiUrl}/payroll/api/approval-payroll/${approvalId}/reject/?schema=${selectedSchema}`;

    this.EmployeeService.rejectApprovalRequestLeave(apiUrl, approvalData).subscribe(
      (response: any) => {
        console.log('Approval status changed to Rejected:', response);

        // Update the selected approval status in the local UI
        if (this.selectedApproval) {
          this.selectedApproval.status = 'Rejected';
        }

        // Optionally, update the main approvals list if needed
        const approvalIndex = this.Approvals.findIndex(approval => approval.id === approvalId);
        if (approvalIndex !== -1) {
          this.Approvals[approvalIndex].status = 'Rejected';
        }

        // Reset the rejection reason and close the modal
        this.rejection_reason = '';
        this.showRejectionReason = false;
        this.isAddFieldsModalOpen = false;
      },
      (error) => {
        console.error('Error rejecting the approval request:', error);
      }
    );
  }
}


LoadLeaveRejectionReasons(selectedSchema: string) {
  this.leaveService.getLeaverejectionReasons(selectedSchema).subscribe(
    (data: any) => {
      this.RejectionResons = data;
    
      console.log('employee:', this.RejectionResons);
    },
    (error: any) => {
      console.error('Error fetching categories:', error);
    }
  );
}


getMonthName(month: number): string {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return months[month - 1] || 'N/A';
}






selectedEmployeeId: string = '';
leaveHistory: any[] = [];


getLeaveHistory(): void {
  if (!this.selectedEmployeeId || !this.selectedSchema) {
    console.warn('Employee or schema not selected.');
    return;
  }

  this.leaveService.getLeaveRequestHistory(this.selectedEmployeeId, this.selectedSchema).subscribe(
    (data: any) => {
      this.leaveHistory = data;
      console.log('Leave History:', this.leaveHistory);
    },
    (error: any) => {
      console.error('Error fetching leave history:', error);
    }
  );
}


}
