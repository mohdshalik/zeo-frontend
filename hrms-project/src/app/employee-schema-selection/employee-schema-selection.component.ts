import { Component,OnInit, ElementRef, Renderer2, ViewChild,  EventEmitter, Output } from '@angular/core';
import { CountryService } from '../country.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CompanySelectionComponent } from '../company-selection/company-selection.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../employee-master/employee.service';
import { DesignationCreationComponent } from '../designation-creation/designation-creation.component';
import { Router } from '@angular/router';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { ChangeDetectorRef } from '@angular/core';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { SessionService } from '../login/session.service';
import { SchemaCreationComponent } from '../schema-creation/schema-creation.component';

@Component({
  selector: 'app-employee-schema-selection',
  templateUrl: './employee-schema-selection.component.html',
  styleUrl: './employee-schema-selection.component.css'
})
export class EmployeeSchemaSelectionComponent {


  
  schemas: string[] = []; // Array to store schema names

  
  userId: number | null | undefined;
  userDetails: any;
  userDetailss: any;
  username: any;


  selectedSchema: string = ''; // Property to store the selected schema



  constructor(private EmployeeService:EmployeeService,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private dialog:MatDialog,
    private renderer: Renderer2,
    private router: Router
    ) {
     
    }


    selectSchema(event: any) {
      
      const selectedSchema = event.target.value; // Assuming value is directly the schema name
      console.log("Selected schema:", selectedSchema);
      
      
  if (!selectedSchema) {
    console.error("No schema selected.");
    return;
  }
    
  // Store the selected schema name in localStorage
  localStorage.setItem('selectedSchema', selectedSchema);
      // Construct the new URL with the selected schema name as subdomain
      const newUrl = `http://${selectedSchema}.localhost:4200/main-sidebar/sub-sidebar/employee-master`;
      
      // Navigate to the new URL
      window.location.href = newUrl;


      
      
    }

    ngOnInit(): void {

      
  
      
// Retrieve user ID
this.userId = this.sessionService.getUserId();

// Fetch user details using the obtained user ID
if (this.userId !== null) {
  this.authService.getUserData(this.userId).subscribe(
    (userData: any) => {
      this.userDetails = userData; // Store user details in userDetails property
      console.log('User ID:', this.userId); // Log user ID
      console.log('User Details:', this.userDetails); // Log user details

      this.username = this.userDetails.username;
      // Check if user is_superuser is true or false
      const isSuperuser = this.userDetails.is_superuser || false;
      const isEssUser = this.userDetails.is_ess || false; // Default to false if is_superuser is undefined
    
    },
    (error) => {
      console.error('Failed to fetch user details:', error);
    }
  );

  this.authService.getUserSchema(this.userId).subscribe(
    (userData:any)=>{
      this.userDetailss=userData;
      console.log('Schema :',this.userDetailss);
         // Extract schema names from userData and add them to the schemas array
    this.schemas = userData.map((schema: any) => schema.schema_name);

    }
    

  );
} else {
  console.error('User ID is null.');
}







  
   

  
  
  
    
     
    }





    logout(): void {
      this.authService.logout().subscribe(() => {
        // Clear any user-related data
        localStorage.removeItem('token'); // Example: Remove authentication token
        // Redirect to the login page
        this.router.navigate(['/login']);

         // Remove schema-related subdomain
    const currentUrl = window.location.href;
    const baseUrl = new URL(currentUrl);
    baseUrl.hostname = 'localhost';

       // Redirect to the login page
       this.router.navigate(['/login']).then(() => {
        window.location.href = baseUrl.origin + '/login';
      });

        // location.reload();
      }, (error: HttpErrorResponse) => { // Specify the type of error as HttpErrorResponse
        console.error('Logout failed:', error);
      });
    }
 
    showboard :boolean=false;

    showbaordlist():void{

      this.showboard = !this.showboard;

    }




    openPopuss(){
      this.dialog.open(SchemaCreationComponent,{
        width:'80%',
        height:'700px',
      })
    }


    

}
