import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { SessionService } from '../login/session.service';
import { LeaveService } from '../leave-master/leave.service';
import { DesignationService } from '../designation-master/designation.service';

@Component({
  selector: 'app-immediate-rejection',
  templateUrl: './immediate-rejection.component.html',
  styleUrl: './immediate-rejection.component.css'
})
export class ImmediateRejectionComponent {


  LeaveRequests: any[] = [];

  rejection_reason: any = '';
  document_number: any = '';



  hasAddPermission: boolean = false;
  hasDeletePermission: boolean = false;
  hasViewPermission: boolean = false;
  hasEditPermission: boolean = false;

  userId: number | null | undefined;
  userDetails: any;
  userDetailss: any;
  schemas: string[] = []; // Array to store schema names

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private leaveService: LeaveService,
    private DesignationService: DesignationService,

  ) { }

  ngOnInit(): void {
    const selectedSchema = this.authService.getSelectedSchema();
    if (selectedSchema) {


      this.LoadLeaveRequest(selectedSchema);



    }

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


                    this.hasAddPermission = this.checkGroupPermission('add_employee_leave_request', groupPermissions);
                    console.log('Has add permission:', this.hasAddPermission);

                    this.hasEditPermission = this.checkGroupPermission('change_employee_leave_request', groupPermissions);
                    console.log('Has edit permission:', this.hasEditPermission);

                    this.hasDeletePermission = this.checkGroupPermission('delete_employee_leave_request', groupPermissions);
                    console.log('Has delete permission:', this.hasDeletePermission);


                    this.hasViewPermission = this.checkGroupPermission('view_employee_leave_request', groupPermissions);
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
          console.log('scehmas-de', userData)
        },
        (error) => {
          console.error('Failed to fetch user schemas:', error);
        }
      );
    } else {
      console.error('User ID is null.');
    }


  }

  checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
    return groupPermissions.some(permission => permission.codename === codeName);
  }


  
  LoadLeaveRequest(selectedSchema: string): void {
    this.leaveService.getLeaveRequest(selectedSchema).subscribe(
      (data: any) => {
        // Filter only approved leave requests
        this.LeaveRequests = data.filter((request: any) => request.status === 'approved');
  
        console.log('Approved leave requests:', this.LeaveRequests);
      },
      (error: any) => {
        console.error('Error fetching leave requests:', error);
      }
    );
  }
  

  immediateReject(): void {
    const payload = {
      document_number: this.document_number,
      rejection_reason: this.rejection_reason
    };
    const selectedSchema = this.authService.getSelectedSchema();
    if (selectedSchema) {
  
    this.leaveService.rejectLeaveRequest(payload, selectedSchema).subscribe(
      (response: any) => {
        console.log('Rejection successful:', response);
        alert('Leave request rejected successfully.');
        // Optionally refresh the list
        this.LoadLeaveRequest(selectedSchema);
        this.rejection_reason = '';
        this.document_number = '';
      },
      (error: any) => {
        console.error('Error rejecting leave request:', error);
        alert('Error occurred while rejecting leave request.');
      }
    );
  
  }
  }
  

  selectedRequest: any = null;

  onDocumentChange(): void {
    this.selectedRequest = this.LeaveRequests.find(req => req.document_number === this.document_number);
  }
}
