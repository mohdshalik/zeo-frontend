import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ActivatedRoute, Router, NavigationEnd  } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse
import { EmployeeService } from '../employee-master/employee.service';
import { SessionService } from '../login/session.service';
import { environment } from '../../environments/environment';

// import { DivControlService } from '../div-control.service';
// import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrl: './main-sidebar.component.css'
})
export class MainSidebarComponent {
 
  expiredDocumentsCount: number = 0;
  expiredDocuments: any[] = []; // Assuming this array holds the list of expired documents

  hideButton = false;
  // constructor(public authService: AuthService) {}

  schemas: string[] = []; // Array to store schema names

  userId: number | null | undefined;
  userDetails: any;
  userDetailss: any;
  username: any;
  selectedSchema: string | null = null;
  isLoading: boolean = false;

  selectedCompany: any; // Define this in your component to hold selected company details

  constructor(private authService: AuthenticationService,
     private router: Router,
    private EmployeeService: EmployeeService,
    private route: ActivatedRoute,
    private sessionService: SessionService,
    ) { }
  isMenuOpen = true;
  // marginLeftValue = '200px';
  onToolbarMenuToggle(){
   
    console.log('On toolbar toggled', this.isMenuOpen );
    this.isMenuOpen = !this.isMenuOpen;
    // this.updateMarginLeft();
  }

  // private updateMarginLeft() {
  //   this.marginLeftValue = this.isMenuOpen ? '200px' : '0px';
  // }

  ngOnInit(): void {
        this.selectedSchema = this.sessionService.getSelectedSchema();

    this.hideButton = this.EmployeeService.getHideButton();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Perform any actions on navigation end if needed
      }
    });
    // this.loadExpiredDocuments();

    const selectedSchema = this.authService.getSelectedSchema();
    const selectedSchemaId = this.authService.getSelectedSchemaId();


    

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






selectSchema(event: any) {
  const selectedSchemaName = event.target.value;
  console.log("Selected schema name:", selectedSchemaName);

  if (!selectedSchemaName) {
      console.error("No schema selected.");
      return;
  }

  const selectedSchema = this.userDetailss.find((schema: any) => schema.schema_name === selectedSchemaName);
  if (!selectedSchema) {
      console.error("Schema not found.");
      return;
  }

  const selectedSchemaId = selectedSchema.id;
  console.log("Selected schema ID:", selectedSchemaId);
  this.isLoading = true;

  // Store the selected schema name and ID in localStorage
  localStorage.setItem('selectedSchema', selectedSchemaName);
  localStorage.setItem('selectedSchemaId', selectedSchemaId.toString());

  // Update the component state
  this.selectedSchema = selectedSchemaName;

  // Delay the URL redirection to ensure state is updated
  setTimeout(() => {
    this.isLoading = false; // Hide the loader
    this.isMenuOpen = true;

     this.router.navigate(['/main-sidebar/dashboard-contents']);

    // this.router.navigate(['/main-sidebar/sub-sidebar/dashboard-contents']);
    // const url =` /main-sidebar/dashboard-contents`;
    //   window.location.href = url;
  }, 500); // Delay of 100ms to ensure localStorage is updated
}




showsidebar: boolean = true;

showsidebarclick() {
  this.showsidebar = !this.showsidebar;
  
}




  showboard :boolean=false;

  
  showbaordlist():void{

  this.showboard = !this.showboard; 

  }


  
  redirectToExpiredDocuments(): void {
    this.router.navigate(['/main-sidebar/settings/document-expired']);
    this.expiredDocumentsCount = 0;
  }


  // logout(): void {
  //   this.authService.logout().subscribe(() => {
  //     // Clear any user-related data
  //     localStorage.removeItem('token'); // Example: Remove authentication token
  //     localStorage.removeItem('selectedSchema'); // Remove selected schema

  //      // Remove schema-related subdomain
  //   const currentUrl = window.location.href;
  //   const baseUrl = new URL(currentUrl);
  //   baseUrl.hostname = environment.apiBaseUrl

  //      // Redirect to the login page
  //      this.router.navigate(['/login']).then(() => {
  //       window.location.href = baseUrl.origin + '/login';
  //     });
  //   }, (error: HttpErrorResponse) => { // Specify the type of error as HttpErrorResponse
  //     console.error('Logout failed:', error);
  //   });

    
  // }

  logout(): void {
    this.authService.logout().subscribe(() => {
      // Clear any user-related data
      localStorage.removeItem('token'); // Remove authentication token
  
      // If you need to reset the hostname (for subdomain logout scenarios)
      const currentUrl = window.location.href;
      const baseUrl = new URL(currentUrl);
      baseUrl.hostname = environment.apiBaseUrl; 
  
      // Redirect to login after logout and ensure a full reload
      window.location.href = baseUrl.origin + '/login';
      
    }, (error: HttpErrorResponse) => { 
      console.error('Logout failed:', error);
    });
  }
  
}
