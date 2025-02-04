import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse
import { EmployeeService } from '../employee-master/employee.service';
import { SessionService } from '../login/session.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent {

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

  employee: any;

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


    
    this.hideButton = this.EmployeeService.getHideButton();

    this.route.params.subscribe(params => {
      const employeeId = +params['id']; // Assuming the route has 'id' as a parameter

      if (employeeId) {
        this.EmployeeService.getEmployeeDetails(employeeId).subscribe(
          (details) => {
            this.employee = details;
          },
          (error) => {
            console.error('Failed to fetch employee details', error);
          }
        );
      } else {
        console.error('Employee ID parameter is null.');
      }
    });
  }





  showboard :boolean=false;

  showbaordlist():void{
    this.showboard = !this.showboard; 

  }

  loadExpiredDocuments(): void {

    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

  console.log('schemastore',selectedSchema )
  // Check if selectedSchema is available
  if (selectedSchema) {
    this.EmployeeService.getExpiredDocuments(selectedSchema).subscribe(
      (result: any) => {
        this.expiredDocuments = result;
        this.expiredDocumentsCount = this.expiredDocuments.length;
        console.log('Fetching expired documents:', this.expiredDocuments);
        console.log('Fetching expired documents count:', this.expiredDocumentsCount);
      },
      (error) => {
        console.error('Error fetching expired documents:', error);
      }
    );
  }
  }
  redirectToExpiredDocuments(): void {
    this.router.navigate(['/main-sidebar/settings/document-expired']);
    this.expiredDocumentsCount = 0;
  }


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
