import { Component,OnInit, ElementRef, Renderer2, ViewChild,  EventEmitter, Output } from '@angular/core';
import { CountryService } from '../country.service';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CompanySelectionComponent } from '../company-selection/company-selection.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../employee-master/employee.service'; 
import { DesignationCreationComponent } from '../designation-creation/designation-creation.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { CompanyEditComponent } from '../company-edit/company-edit.component';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.css'
})
export class CompanyDetailsComponent {

  Companies:any;

  constructor(private EmployeeService:EmployeeService,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private dialog:MatDialog,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    
    ) {}


  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.Companies = params['id'];
      // this.loadEmployeeDetails();
  

    });
    const employeeIdParam = this.route.snapshot.paramMap.get('id');


    if (employeeIdParam) {
      const employeeId = +employeeIdParam;

      // Fetch employee details
      this.companyRegistrationService.getEmployeeDetails(employeeId).subscribe(
        (details) => {
          this.Companies = details;
          // this.cdr.detectChanges(); // Manually trigger change detection

        },
        (error) => {
          console.error('Failed to fetch Company details', error);
        }
      );
    } else {
      console.error('Company ID parameter is null.');
    }
  }






  openEditEmpPopuss(employeeId: number):void{
    const dialogRef = this.dialog.open(CompanyEditComponent, {
      width:'80%',
      height:'500px',
      data: { employeeId: employeeId }
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  onDeleteEmployee(employeeId: number): void {
    if (confirm('Are you sure you want to delete this Company?')) {
        this.companyRegistrationService.deleteEmployee(employeeId).subscribe(
            () => {
                console.log('Company deleted successfully');
                this.router.navigate(['/main-sidebar/settings/company-master']);
                // Refresh the employee list after deletion
                // this.loadEmployee();
            },
            (error) => {
                console.error('Error deleting Company:', error);
            }
        );
    }
}
}
