import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { SessionService } from '../login/session.service';
import { LeaveService } from '../leave-master/leave.service';
import { DesignationService } from '../designation-master/designation.service';

@Component({
  selector: 'app-employee-overtime',
  templateUrl: './employee-overtime.component.html',
  styleUrl: './employee-overtime.component.css'
})
export class EmployeeOvertimeComponent {



  

  registerButtonClicked: boolean = false;


  date:any='';
  hours:any='' ;
  rate_multiplier:any='' ;
  employee:any='' ;

  approved_by:any='' ;

  created_by:any='' ;
  approved: boolean = false;



  LeaveTypes: any[] = [];
  Employees: any[] = [];
  LeaveBalances: any[] = [];



  Users: any[] = [];

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


        this.LoadLeavetype(selectedSchema);
      this.LoadUsers(selectedSchema);
      this.LoadEmployees(selectedSchema);
      this.LoadLeavebalance(selectedSchema);


      
      }

      this.userId = this.sessionService.getUserId();
if (this.userId !== null) {
  this.authService.getUserData(this.userId).subscribe(
    async (userData: any) => {
      this.userDetails = userData; // Store user details in userDetails property

      this.created_by= this.userId;
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
      


      showBulkUpload: boolean = false;

      toggleBulkUpload() {
        this.showBulkUpload = !this.showBulkUpload;
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
    
    
    
   
    
      LoadUsers(selectedSchema: string) {
        this.leaveService.getApproverUsers(selectedSchema).subscribe(
          (data: any) => {
            this.Users = data;
          
            console.log('employee:', this.LeaveTypes);
          },
          (error: any) => {
            console.error('Error fetching categories:', error);
          }
        );
      }



      
      EmployeeOvertime(): void {
      this.registerButtonClicked = true;
      // if (!this.name || !this.code || !this.valid_to) {
      //   return;
      // }
    
      const formData = new FormData();
      formData.append('date', this.date);
      formData.append('hours', this.hours);


  
  
      formData.append('rate_multiplier', this.rate_multiplier);
      formData.append('employee', this.employee);
      formData.append('approved_by', this.approved_by);

    
      formData.append('created_by', this.created_by);

      formData.append('approved', this.approved.toString());

  
      
    
    
      this.leaveService.CreateEmployeeOvertime(formData).subscribe(
        (response) => {
          console.log('Registration successful', response);
  
  
          alert('Employee Overtime has been Created');
  
          window.location.reload();
        },  
        (error) => {
          console.error('Added failed', error);
          alert('Enter all required fields!');
        }
      );
    }


    LoadLeavebalance(selectedSchema: string) {
      this.leaveService.getEmployeeOvertime(selectedSchema).subscribe(
        (data: any) => {
          this.LeaveBalances = data;
        
          console.log('employee:', this.LeaveTypes);
        },
        (error: any) => {
          console.error('Error fetching categories:', error);
        }
      );
    }
  


    // File selection
onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
  console.log('Selected file:', this.selectedFile);
}

    
}
