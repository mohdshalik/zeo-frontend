import { Component } from '@angular/core';
import { EmployeeService } from '../employee-master/employee.service';
import { SessionService } from '../login/session.service';
import { AuthenticationService } from '../login/authentication.service';
import { DesignationService } from '../designation-master/designation.service';
import { CatogaryService } from '../catogary-master/catogary.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {


  userId: number | null | undefined;
  userDetails: any;

  hasPermissioncom: boolean = false;

  isAuthenticated: boolean = false;
  showComponent: boolean = false;
  
  userPermissions: string[] = [];
  user_permissions: string[] = [];

  hasViewPermissionBranch: boolean = false;
  hasViewPermissionUsers: boolean = false;
  hasViewPermissionGroups: boolean =false;
  hasViewPermissionDocType: boolean = false;
  hasViewPermissionAssignPermission: boolean = false;
  hasViewStateMaster: boolean = false;
  hasAddCompanyMaster: boolean = false;
  hasViewNotification: boolean = false;
  hasViewDN : boolean = false;
  hasViewPermissionFormdes : boolean = false;
  hasViewPermissionEmtemp : boolean = false;
  hasViewPermissionCmp : boolean = false;

  hasViewPermissionLeaveEmtemp : boolean = false;




  hasViewWeek: boolean = false;
  hasViewWeekAssgn: boolean = false;
  hasViewHoly: boolean = false;
  hasViewHolyAssgn : boolean = false;

    hasViewShift : boolean = false;

  hasViewPermissionempreport:boolean = false;
  hasViewPermissiondocreport:boolean = false;
  hasViewPermissiongenreport:boolean = false;
  hasViewPermissionLeavereport:boolean = false;

  stateLabel: string = ''; // Default value




  constructor(private EmployeeService:EmployeeService,
    private sessionService: SessionService,
    private authService: AuthenticationService,
    private DesignationService: DesignationService,
    private CatogaryService: CatogaryService



    
    ) {
     
    }


  ngOnInit(): void {

    // Retrieve user ID
this.userId = this.sessionService.getUserId();

// Fetch user details using the obtained user ID
if (this.userId !== null) {
  this.authService.getUserData(this.userId).subscribe(
    async (userData: any) => {
      this.userDetails = userData; // Store user details in userDetails property
      console.log('User ID:', this.userId); // Log user ID
      console.log('User Details:', this.userDetails); // Log user details

      // Check if user is_superuser is true or false
      let isSuperuser = this.userDetails.is_superuser || false; // Default to false if is_superuser is undefined
      const selectedSchema = this.authService.getSelectedSchema();
      console.log('schemaname',selectedSchema);

      const selectedStateLabel = localStorage.getItem('selectedSchemaStateLabel');
      console.log("Retrieved state label:", selectedStateLabel);

      this.stateLabel = selectedStateLabel ? selectedStateLabel : '';


      if (!selectedSchema) {
        console.error('No schema selected.');
        return;
      }
    
    
      if (isSuperuser) {
        console.log('User is superuser or ESS user');
        // Grant all permissions
        this.hasViewPermissionBranch = true;
        this.hasViewPermissionUsers = true;
        this.hasViewPermissionGroups = true;
        this.hasViewPermissionDocType = true;
        this.hasViewPermissionAssignPermission = true;
        this.hasViewStateMaster = true;
        this.hasAddCompanyMaster = true;
        this.hasViewNotification = true;
        this.hasViewDN = true;
        this.hasViewPermissionFormdes = true;
        this.hasViewPermissionEmtemp = true;
        this.hasViewPermissionCmp = true;
        this.hasViewPermissionLeaveEmtemp = true;




        this.hasViewWeek = true;
        this.hasViewWeekAssgn = true;
        this.hasViewHoly = true;
        this.hasViewHolyAssgn = true;
        this.hasViewShift = true;


        this.hasViewPermissionempreport = true;
        this.hasViewPermissiondocreport = true;
        this.hasViewPermissiongenreport = true;
        this.hasViewPermissionLeavereport = true;






    
        // Fetch designations without checking permissions
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
                this.hasViewPermissionBranch = true;
                this.hasViewPermissionUsers = true;
                this.hasViewPermissionGroups = true;
                this.hasViewPermissionDocType = true;
                this.hasViewPermissionAssignPermission = true;
                this.hasViewStateMaster = true;
                this.hasAddCompanyMaster = true;
                this.hasViewNotification = true;
                this.hasViewDN = true;
                this.hasViewPermissionFormdes = true;
                this.hasViewPermissionEmtemp = true;
                this.hasViewPermissionCmp = true;
                this.hasViewPermissionLeaveEmtemp = true;




                this.hasViewWeek = true;
                this.hasViewWeekAssgn = true;
                this.hasViewHoly = true;
                this.hasViewHolyAssgn = true;
                this.hasViewShift = true;



                this.hasViewPermissionempreport = true;
                this.hasViewPermissiondocreport = true;
                this.hasViewPermissiongenreport = true;
                this.hasViewPermissionLeavereport = true;


        
              } else if (firstItem.groups && Array.isArray(firstItem.groups) && firstItem.groups.length > 0) {
                const groupPermissions = firstItem.groups.flatMap((group: any) => group.permissions);
                console.log('Group Permissions:', groupPermissions);

                this.hasViewPermissionBranch = this.checkGroupPermission('view_brnch_mstr', groupPermissions);
                    console.log('Has view permission:', this.hasViewPermissionBranch);
      
                 this.hasViewPermissionUsers = this.checkGroupPermission('view_customuser', groupPermissions);
                  console.log('Has view permission:', this.hasViewPermissionUsers);
                        
                  this.hasViewPermissionGroups = this.checkGroupPermission('view_group', groupPermissions);
                   console.log('Has view permission:', this.hasViewPermissionGroups);
      
                  this.hasViewPermissionDocType = this.checkGroupPermission('view_document_type', groupPermissions);
                   console.log('Has view permission:', this.hasViewPermissionDocType);
      
                    this.hasViewPermissionAssignPermission = this.checkGroupPermission('view_permission', groupPermissions);
                    console.log('Has view permission:', this.hasViewPermissionAssignPermission);
              
                    this.hasViewStateMaster = this.checkGroupPermission('view_state_mstr', groupPermissions);
                  console.log('Has view permission:', this.hasViewStateMaster);
      
                  this.hasAddCompanyMaster = this.checkGroupPermission('add_cmpny_mastr', groupPermissions);
                   console.log('Has view permission:', this.hasAddCompanyMaster);
      
                    this.hasViewNotification = this.checkGroupPermission('view_notification', groupPermissions);
                    console.log('Has view permission:', this.hasViewNotification);

                    this.hasViewDN = this.checkGroupPermission('view_document_numbering', groupPermissions);
                    console.log('Has view permission:', this.hasViewDN);

                    this.hasViewPermissionFormdes = this.checkGroupPermission('view_emp_customfield', groupPermissions);
                    console.log('Has view permission:', this.hasViewPermissionFormdes);
                   
                    this.hasViewPermissionEmtemp = this.checkGroupPermission('view_emailtemplate', groupPermissions);
                    console.log('Has view permission:', this.hasViewPermissionEmtemp);

                    this.hasViewPermissionCmp = this.checkGroupPermission('view_companypolicy', groupPermissions);
                    console.log('Has view permission:', this.hasViewPermissionCmp);
                  
                    this.hasViewPermissionLeaveEmtemp = this.checkGroupPermission('view_lvemailtemplate', groupPermissions);
                    console.log('Has view permission:', this.hasViewPermissionLeaveEmtemp);
                   
                   
                   
                    this.hasViewWeek = this.checkGroupPermission('view_weekend_calendar', groupPermissions);
                    console.log('Has view permission:', this.hasViewWeek);
                    
                    this.hasViewWeekAssgn = this.checkGroupPermission('view_assign_weekend', groupPermissions);
                    console.log('Has view permission:', this.hasViewWeekAssgn);

                    this.hasViewHoly = this.checkGroupPermission('view_holiday', groupPermissions);
                    console.log('Has view permission:', this.hasViewHoly);
                   
                    this.hasViewHolyAssgn = this.checkGroupPermission('view_assign_holiday', groupPermissions);
                    console.log('Has view permission:', this.hasViewHolyAssgn);
                  
                    this.hasViewShift = this.checkGroupPermission('view_shift', groupPermissions);
                    console.log('Has view permission:', this.hasViewShift);
                  
                    this.hasViewPermissionempreport = this.checkGroupPermission('view_report', groupPermissions);
                   console.log('Has view permission:', this.hasViewPermissionempreport);
      
                    this.hasViewPermissiondocreport = this.checkGroupPermission('view_doc_report', groupPermissions);
                    console.log('Has view permission:', this.hasViewPermissiondocreport);
              
                    this.hasViewPermissiongenreport = this.checkGroupPermission('view_generalrequestreport', groupPermissions);
                  console.log('Has view permission:', this.hasViewPermissiongenreport);

                  
                  this.hasViewPermissionLeavereport = this.checkGroupPermission('view_leavereport', groupPermissions);
                  console.log('Has view permission:', this.hasViewPermissionLeavereport);
      
                 
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
} else {
  console.error('User ID is null.');
}






  }

  
  // checkViewPermission(permissions: any[]): boolean {
  //   const requiredPermission = 'view_ctgry_master' ||'add_ctgry_master' ||'delete_ctgry_master' ||'change_ctgry_master';
    
  
  //   // Check user permissions
  //   if (permissions.some(permission => permission.codename === requiredPermission)) {
  //     return true;
  //   }
  
  //   // Check group permissions (if applicable)
  //   // Replace `// TODO: Implement group permission check`
  //   // with your logic to retrieve and check group permissions
  //   // (consider using a separate service or approach)
  //   return false; // Replace with actual group permission check
  // }

  

  
  checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
    return groupPermissions.some(permission => permission.codename === codeName);
  }

}
