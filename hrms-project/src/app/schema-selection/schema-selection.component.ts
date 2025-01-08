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
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-schema-selection',
  templateUrl: './schema-selection.component.html',
  styleUrl: './schema-selection.component.css'
})
export class SchemaSelectionComponent {

  schemas: string[] = []; // Array to store schema names

  
  userId: number | null | undefined;
  userDetails: any;
  userDetailss: any[] = [];
  username: any;


  selectedSchema: string = ''; // Property to store the selected schema
  isLoading: boolean = false;



  constructor(private EmployeeService:EmployeeService,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private dialog:MatDialog,
    private renderer: Renderer2,
    private router: Router,
    

    ) {
     
    }


 

    

    ngOnInit(): void {
      this.userId = this.sessionService.getUserId();
  
      if (this.userId !== null) {
        this.authService.getUserData(this.userId).subscribe(
          (userData: any) => {
            this.userDetails = userData;
          },
          (error) => {
            console.error('Failed to fetch user details:', error);
          }
        );
  
        this.authService.getUserSchema(this.userId).subscribe(
          (userData: any) => {
            this.userDetailss = userData; // Store user schemas in userDetailss

            this.schemas = userData.map((schema: any) => schema.schema_name);
          },
          (error) => {
            console.error('Failed to fetch user schemas:', error);
          }
        );
      } else {
        console.error('User ID is null.');
      }
    }

    connect(): void {
      if (this.selectedSchema) {
        // Display the loader
        this.isLoading = true;
  
        // Store the selected schema in the session
        this.sessionService.setSelectedSchema(this.selectedSchema);
  
        // Wait for 5 seconds before navigating
        setTimeout(() => {
          this.isLoading = false; // Hide the loader
          const url = `/main-sidebar`;
          this.router.navigate([url]);
        }, 3000); // 5000 milliseconds = 5 seconds
      } else {
        alert('Please select a schema.');
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
  
        const url =` /main-sidebar/dashboard-contents`;
          window.location.href = url;
      }, 3000); // Delay of 100ms to ensure localStorage is updated
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
    baseUrl.hostname = environment.apiBaseUrl

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
