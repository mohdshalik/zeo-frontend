import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CountryService } from '../country.service';
import { AuthenticationService } from '../login/authentication.service';
import { DesignationService } from '../designation-master/designation.service';
import { SessionService } from '../login/session.service';

@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrl: './state-master.component.css'
})
export class StateMasterComponent {


  selectedDeparmentsecId:any | undefined;

  registerButtonClicked = false;
  Countries: any[] = [];

  States: any[] = [];


  state_name: string = '';
  country:any ='';

  hasAddPermission: boolean = false;
hasDeletePermission: boolean = false;
hasViewPermission: boolean =false;
hasEditPermission: boolean = false;

userId: number | null | undefined;
userDetails: any;
userDetailss: any;
schemas: string[] = []; // Array to store schema names

stateLabel: string = ''; // Default value


  constructor(
    private countryService: CountryService, 
    private authService: AuthenticationService, 

    private http: HttpClient,
    private DesignationService: DesignationService,
private sessionService: SessionService,
    
  ) {}


  
  registerDepartment(): void {
    this.registerButtonClicked = true;
    const companyData = {
      state_name: this.state_name,
    
      country:this.country,
   

      // Add other form field values to the companyData object
    };
  

    this.countryService.registerState(companyData).subscribe(
      (response) => {
        console.log('Registration successful', response);
      
            alert('State has been Added ');
            window.location.reload();
            // window.location.reload();
       

      },
      (error) => {
        console.error('Added failed', error);
        alert('enter all field!')
        // Handle the error appropriately, e.g., show a user-friendly error message.
      }
    );
  }

  ngOnInit(): void {
    this.loadDeparmentBranch();

    // this.loadCompanies();
    
this.loadstates();

this.userId = this.sessionService.getUserId();
if (this.userId !== null) {
  this.authService.getUserData(this.userId).subscribe(
    async (userData: any) => {
      this.userDetails = userData; // Store user details in userDetails property
      // this.username = this.userDetails.username;
   

      console.log('User ID:', this.userId); // Log user ID
      console.log('User Details:', this.userDetails); // Log user details

      // Check if user is_superuser is true or false
      let isSuperuser = this.userDetails.is_superuser || false; // Default to false if is_superuser is undefined
      const selectedSchema = this.authService.getSelectedSchema();
      
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

               
                this.hasAddPermission = this.checkGroupPermission('add_state_mstr', groupPermissions);
                console.log('Has add permission:', this.hasAddPermission);
                
                this.hasEditPermission = this.checkGroupPermission('change_state_mstr', groupPermissions);
                console.log('Has edit permission:', this.hasEditPermission);
  
               this.hasDeletePermission = this.checkGroupPermission('delete_state_mstr', groupPermissions);
               console.log('Has delete permission:', this.hasDeletePermission);
  

                this.hasViewPermission = this.checkGroupPermission('view_state_mstr', groupPermissions);
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
  //   const requiredPermission = 'add_state_mstr' ||'change_state_mstr' ||'delete_state_mstr' ||'view_state_mstr';
    
    
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
    


  loadDeparmentBranch(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
  
    this.countryService.getCountriesList(selectedSchema).subscribe(
      (result: any) => {
        this.Countries = result;
      },
      (error: any) => {
        console.error('Error fetching countries:', error);
      }
    );
    }
  }

  
  loadstates(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
  
    this.countryService.getstatescreated(selectedSchema).subscribe(
      (result: any) => {
        this.States = result;
      },
      (error: any) => {
        console.error('Error fetching countries:', error);
      }
    );
    }
  }



  // loadCompanies(): void { 
  //   const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

  //   console.log('schemastore',selectedSchema )
  //   // Check if selectedSchema is available
  //   if (selectedSchema) {
  //   this.countryService.getAllStatesList(selectedSchema).subscribe(
  //     (result: any) => {
  //       console.log(result); // Log the API response
  //       this.States = result; // Assuming the data is directly in the result without a 'data' property
  //     },
  //     (error) => {
  //       console.error('Error fetching states:', error);
  //     }
  //   );
  //   }
  // }


}
