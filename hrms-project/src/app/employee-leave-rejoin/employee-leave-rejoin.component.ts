import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { SessionService } from '../login/session.service';
import { LeaveService } from '../leave-master/leave.service';
import { DesignationService } from '../designation-master/designation.service';

@Component({
  selector: 'app-employee-leave-rejoin',
  templateUrl: './employee-leave-rejoin.component.html',
  styleUrl: './employee-leave-rejoin.component.css'
})
export class EmployeeLeaveRejoinComponent {

  

  Users: any[] = [];
  Rejoings: any[] = [];


  Employees: any[] = [];

  LeaveReq: any[] = [];
  LeaveTypes: any[] = [];


  rejoining_date:any='';
  unpaid_leave_days:any='';
  deducted:any='';
  employee:any='';
  leave_request:any='';
  deduct_from_leave_type:any='';
  created_by:any='';



  hasAddPermission: boolean = false;
  hasDeletePermission: boolean = false;
  hasViewPermission: boolean =false;
  hasEditPermission: boolean = false;
  
  userId: number | null | undefined;
  userDetails: any;
  userDetailss: any;
  schemas: string[] = []; // Array to store schema names


  selectedFile: File | null = null;


  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private leaveService:LeaveService,
    private DesignationService: DesignationService,
  
    ) {}

    ngOnInit(): void {
      const selectedSchema = this.authService.getSelectedSchema();
      if (selectedSchema) {


        this.LoadLeaveRejoin(selectedSchema);
      // this.LoadUsers(selectedSchema);
      this.LoadEmployees(selectedSchema);
      // this.LoadLeavebalance(selectedSchema);
      this.LoadLeavetype(selectedSchema);

this.LoadLeaveResuest(selectedSchema)  ;    
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

               
                this.hasAddPermission = this.checkGroupPermission('add_leaveapprovallevels', groupPermissions);
                console.log('Has add permission:', this.hasAddPermission);
                
                this.hasEditPermission = this.checkGroupPermission('change_leaveapprovallevels', groupPermissions);
                console.log('Has edit permission:', this.hasEditPermission);
  
               this.hasDeletePermission = this.checkGroupPermission('delete_leaveapprovallevels', groupPermissions);
               console.log('Has delete permission:', this.hasDeletePermission);
  

                this.hasViewPermission = this.checkGroupPermission('view_leaveapprovallevels', groupPermissions);
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

      
   
    }

    checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
      return groupPermissions.some(permission => permission.codename === codeName);
      }




      LoadLeaveRejoin(selectedSchema: string) {
        this.leaveService.getLeaveRejoins(selectedSchema).subscribe(
          (data: any) => {
            this.Rejoings = data;
          
            console.log('employee:', this.Rejoings);
          },
          (error: any) => {
            console.error('Error fetching categories:', error);
          }
        );
      }
  
      
      isLeaveRejoinModalOpen:boolean=false;



      ClosePopup(){
        this.isLeaveRejoinModalOpen=false;
      }
    

      selectedRejoin: any = null;

openRejoinModal(id: number) {
  // Find the selected rejoin data by ID
  const selected = this.Rejoings.find((item: any) => item.id === id);

  if (selected) {
    this.selectedRejoin = selected;
    this.isLeaveRejoinModalOpen = true;
    console.log('Selected Rejoin Data:', this.selectedRejoin);
  }
}



LoadEmployees(selectedSchema: string) {
  this.leaveService.getEmployee(selectedSchema).subscribe(
    (data: any) => {
      this.Employees = data;
    
      console.log('employee:', this.Employees);
    },
    (error: any) => {
      console.error('Error fetching Employees:', error);
    }
  );
}


LoadLeaveResuest(selectedSchema: string) {
  this.leaveService.getLeaveRequest(selectedSchema).subscribe(
    (data: any) => {
      this.LeaveReq = data;
    
      console.log('employee:', this.LeaveReq);
    },
    (error: any) => {
      console.error('Error fetching Employees:', error);
    }
  );
}



LoadLeavetype(selectedSchema: string) {
  this.leaveService.getLeaveType(selectedSchema).subscribe(
    (data: any) => {
      this.LeaveTypes = data;
    
      console.log('employee:', this.LeaveTypes);
    },
    (error: any) => {
      console.error('Error fetching categories:', error);
    }
  );
}



LeaveRejoiningsubmit(): void {
  if (!this.selectedRejoin || !this.selectedRejoin.id) {
    console.error('No rejoin ID selected');
    return;
  }

  const payload = {
    rejoining_date: this.selectedRejoin.rejoining_date,
    unpaid_leave_days: this.selectedRejoin.unpaid_leave_days ?? 0, // Default to 0 if null/undefined
    employee: this.selectedRejoin.employee,
    leave_request: this.selectedRejoin.leave_request,
    deduct_from_leave_type: this.selectedRejoin.deduct_from_leave_type,
  };

  this.leaveService.deductLeaveBalance(this.selectedRejoin.id, payload).subscribe(
    (response) => {
      console.log('Leave rejoin updated successfully', response);
      this.ClosePopup(); // Optional: Close modal
      this.LoadLeaveRejoin(localStorage.getItem('selectedSchema') || ''); // Optional: Refresh list
    },
    (error) => {
      console.error('Error updating leave rejoin:', error);
    }
  );
}



}
