import { Component } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EmployeeService } from '../employee-master/employee.service';
import { SessionService } from '../login/session.service';
import { LeaveService } from '../leave-master/leave.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-leave-approvals',
  templateUrl: './leave-approvals.component.html',
  styleUrl: './leave-approvals.component.css'
})
export class LeaveApprovalsComponent {



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

  constructor(private authService: AuthenticationService,
    private router: Router,
   private EmployeeService: EmployeeService,
   private route: ActivatedRoute,
   private sessionService: SessionService,
   private leaveService: LeaveService,

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
            (userData: any) => {
                this.userDetails = userData;
                this.username = this.userDetails.username;
                const isSuperuser = this.userDetails.is_superuser || false;
                const isEssUser = this.userDetails.is_ess || false;
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




// Modified fetchingApprovals to accept userId

fetchingApprovals(): void {
  const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

  console.log('schemastore', selectedSchema);
  
  // Check if selectedSchema and userId are available
  if (selectedSchema && this.userId) {
      this.leaveService.getApprovalslistLeave(selectedSchema, this.userId).subscribe(
          (result: any) => {
              this.Approvals = result;
              console.log('approvals', this.Approvals)
          },
          (error) => {
              console.error('Error fetching approvals:', error);
          }
      );
  }






  
}



selectedApproval: any = null;
isAddFieldsModalOpen: boolean = false;
note: string = '';  // To hold the note entered by the user


 // Fetching approval details when an item is clicked
 selectedaprovaldetalis(approvalId: number): void {
  const selectedSchema = this.authService.getSelectedSchema();

  if (selectedSchema) {
    const apiUrl = `${this.apiUrl}/calendars/api/leave-approvals/${approvalId}/?schema=${selectedSchema}`;

    this.leaveService.getApprovalDetailsLeave(apiUrl).subscribe(
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
  






 
 // Function for handling approval status change to "Approved"
 approveApproval(approvalId: number): void {
  const selectedSchema = this.authService.getSelectedSchema();

  if (selectedSchema) {
    const apiUrl = `${this.apiUrl}/calendars/api/leave-approvals/${approvalId}/approve/?schema=${selectedSchema}`;


       // Data to be sent in the request body (including the note)
       const approvalData = {
        note: this.note,          // The note entered by the user
        status: 'Approved',       // Setting status to "Approved"
      };

      this.leaveService.approveApprovalRequestLeave(apiUrl, approvalData).subscribe(
        (response: any) => {
        console.log('Approval status changed to Approved:', response);

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
    const apiUrl = `${this.apiUrl}/calendars/api/leave-approvals/${approvalId}/reject/?schema=${selectedSchema}`;

    this.leaveService.rejectApprovalRequestLeave(apiUrl, approvalData).subscribe(
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



}
