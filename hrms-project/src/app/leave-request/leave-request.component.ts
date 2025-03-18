import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { SessionService } from '../login/session.service';
import { LeaveService } from '../leave-master/leave.service';
import { DesignationService } from '../designation-master/designation.service';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.css'
})
export class LeaveRequestComponent {


  start_date:any='';
  end_date:any='';
  reason:any='';

  status:any='';
  
  applied_on:any='';
  approved_by:any='';
  approved_on:any='';
  half_day_period:any='' ;
  leave_type:any='' ;
  document_number:any='' ;


  employee:any='' ;


  dis_half_day: boolean = false;

  registerButtonClicked: boolean = false;



  LeaveTypes: any[] = [];
  Employees: any[] = [];

  Users: any[] = [];

  LeaveRequests: any[] = [];



  hasAddPermission: boolean = false;
hasDeletePermission: boolean = false;
hasViewPermission: boolean =false;
hasEditPermission: boolean = false;

userId: number | null | undefined;
userDetails: any;
userDetailss: any;
schemas: string[] = []; // Array to store schema names



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


        this.LoadLeavetype(selectedSchema);
      this.LoadEmployee(selectedSchema);
      this.LoadUsers(selectedSchema);
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
    //   const requiredPermission = 'add_employee_leave_request' ||'change_employee_leave_request' ||
    //   'delete_employee_leave_request' ||'view_employee_leave_request';
      
      
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
 

      requestLeave(): void {
        this.registerButtonClicked = true;
        
        const formData = new FormData();
        formData.append('start_date', this.start_date);
        formData.append('end_date', this.end_date);
        formData.append('reason', this.reason);
        formData.append('status', this.status);
        formData.append('dis_half_day', this.dis_half_day.toString());
        formData.append('half_day_period', this.half_day_period);
        formData.append('document_number', this.document_number);

        
        formData.append('leave_type', this.leave_type);
        formData.append('employee', this.employee);
      
        this.leaveService.requestLeaveAdmin(formData).subscribe(
          (response) => {
            console.log('Registration successful', response);
            alert('Leave Request has been Sent');
            window.location.reload();
          },

          (error) => {
            console.error('Request failed', error);
            
            let errorMessage = 'Enter all required fields!';
            
            if (error.error) {
              if (typeof error.error === 'string') {
                errorMessage = error.error;
              } else if (error.error.detail) {
                errorMessage = error.error.detail;
              } else if (error.error.non_field_errors) {
                errorMessage = error.error.non_field_errors.join(', ');
              } else {
                // Collect field-specific error messages
                const fieldErrors = Object.keys(error.error)
                  .map(field => `${field}: ${error.error[field].join(', ')}`)
                  .join('\n');
                errorMessage = fieldErrors || errorMessage;
              }
            }
            
            alert(errorMessage);
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


  LoadUsers(selectedSchema: string) {
    this.leaveService.getUsers(selectedSchema).subscribe(
      (data: any) => {
        this.Users = data;
      
        console.log('employee:', this.LeaveTypes);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }


  LoadLeaveRequest(selectedSchema: string) {
    this.leaveService.getLeaveRequest(selectedSchema).subscribe(
      (data: any) => {
        this.LeaveRequests = data;
      
        console.log('employee:', this.LeaveTypes);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  

}
