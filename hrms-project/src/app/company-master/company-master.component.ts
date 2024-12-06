import { Component,OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CountryService } from '../country.service';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CompanySelectionComponent } from '../company-selection/company-selection.component';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { CompanyEditComponent } from '../company-edit/company-edit.component';
import { Router } from '@angular/router';
import { SessionService } from '../login/session.service';


@Component({
  selector: 'app-company-master',
  template: ` <div class="container mt-5" *ngIf="hasViewPermission">
  <div class="comapny_section   ">
      <div class="header_section ">

          <div class="row">
              <div class="col-md-7">
                  <h1> Company details</h1>
              </div>
              <div class="col-md-5">
                  <div class="button-group pull-right">
                      <button type="button" (click)="openPopus()"  class="btn-Create btn btn-success " *ngIf="hasAddPermission"><span class="header-btn-icon"><mat-icon>add_circle
                      </mat-icon></span> Create</button>
                      <span *ngIf="!hasAddPermission"></span>
                      <button type="button" class="btn-Edit btn-info btn"  (click)="EditShowButtons()" *ngIf="hasEditPermission">
                      <span class="header-btn-icon">
                       <mat-icon>draw
                  </mat-icon></span> Edit</button>
                  <span *ngIf="hasEditPermission"></span>
                      <button type="button" class="btn-Delete btn btn-danger" (click)="toggleCheckboxes()" *ngIf="hasDeletePermission">
                      <span class="header-btn-icon">
                          <mat-icon> delete
                     </mat-icon></span> {{ Delete ? 'Cancel' : 'Delete' }}</button>
                     <span *ngIf="!hasDeletePermission"></span>
                  </div>
              </div>
          </div>
         
         

      </div>
      <div class="row">
            <div class="col-md-2">
                
                <button  class=" mt-3 btn-danger btn " style="width: 100%;" color="warn" *ngIf="Delete" (click)="toggleSelectAllEmployees()">Select All</button>

            </div>
            <div class="col-md-3">
                <button class=" mt-3 btn-danger btn"  color="warn" *ngIf="Delete" (click)="deleteSelectedEmployees()">Delete Selected Employees</button>

            </div>
        </div>
      <!-- <div class="list_company_sec mt-4" >
          
      </div> -->


      
<div   #contentDiv>
      <div class="row mt-4">
          <div class="col-md-12 col-12">
              <div class="row">
                  <div class="col-md-3">
                      <p>Companies</p>
                  </div>

                  <div class="col-md-2">
                      <p>City</p>
                  </div>
                  <div class="col-md-3">
                      <p>Email ID</p>
                  </div>
                  <div class="col-md-3">
                  <p>Contact</p>
              </div>
              </div>
              <div class="com_list" *ngFor="let companysec of Companies" [ngClass]="{ 'selected-item': companysec.selected }">
              <mat-checkbox *ngIf="Delete" [(ngModel)]="companysec.selected" (change)="onCheckboxChange(companysec.id)"></mat-checkbox>
             
                <div class="row">
                
                  <div class="col-md-3" (click)="showEmployeeDetails(companysec.id)">
                  <h2 class="text-center" >{{ companysec.cmpny_name }}</h2>
                                 </div>

                  <div class="col-md-2">
                      <h2 class="text-center">{{ companysec.cmpny_city }}</h2>
                  </div>
                  <div class="col-md-3">
                      <h2 class="text-center">{{ companysec.cmpny_mail }} </h2>
                  </div>

                  <div class="col-md-3">
                      <h2 class="text-center">{{ companysec.cmpny_nmbr_1 }} </h2>
                  </div>
                  <div class="col-md-1">
                  <button type="button" class="btn btn-Edit btn-info" (click)="openEditEmpPopuss(companysec.id)" *ngIf="showEditBtn">Edit</button>
                  
              </div>
                </div>
              </div>



              
</div>
              
          </div>
      </div>
</div>
    
  </div>

  <div *ngIf="!hasViewPermission">
    <!-- Message for users without permission -->
    <p class="text-center " style="margin-top: 150px;" >You don't have permission to view this component.</p>
  </div>
`,
  styleUrl: './company-master.component.css'
})
export class CompanyMasterComponent implements OnInit {

  @ViewChild('contentDiv') contentDiv!: ElementRef;


  Companies: any[] = [];
  selectedCompany: any;

  cmpny_name: string = '';
  cmpny_city:string = '';
  cmpny_mail:string = '';
  cmpny_nmbr_1:string = '';

  hasAddPermission: boolean = true;
  hasDeletePermission: boolean = true;
  hasViewPermission: boolean =true;
  hasEditPermission: boolean = true;

  userId: number | null | undefined;
  userDetails: any;

  constructor(private countryService: CountryService ,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private dialog:MatDialog,
    private renderer: Renderer2,
    private router: Router) {}




   
    
  ngOnInit(): void {
    
    this.loadComapny();


// Retrieve user ID
this.userId = this.sessionService.getUserId();

// Fetch user details using the obtained user ID
if (this.userId !== null) {
  this.authService.getUserData(this.userId).subscribe(
    (userData: any) => {
      this.userDetails = userData; // Store user details in userDetails property
      console.log('User ID:', this.userId); // Log user ID
      console.log('User Details:', this.userDetails); // Log user details

      // Check if user is_superuser is true or false
      const isSuperuser = this.userDetails.is_superuser || false; // Default to false if is_superuser is undefined
      if (isSuperuser) {
        console.log('User is superuser');
      } else {
        console.log('User is not superuser');

        // Extract group permissions from user details
        const groupPermissions = this.userDetails.groups.map((group: { permissions: any; }) => group.permissions).flat();
        console.log('Group Permissions:', groupPermissions);

        // Check permissions for various actions
        this.hasViewPermission = this.checkGroupPermission('view_cmpny_mastr', groupPermissions);
        console.log('Has View Permission:', this.hasViewPermission);

        this.hasAddPermission = this.checkGroupPermission('add_cmpny_mastr', groupPermissions);
        console.log('Has Add Permission:', this.hasAddPermission);

        this.hasDeletePermission = this.checkGroupPermission('delete_cmpny_mastr', groupPermissions);
        console.log('Has Delete Permission:', this.hasDeletePermission);

        this.hasEditPermission = this.checkGroupPermission('change_cmpny_mastr', groupPermissions);
        console.log('Has Edit Permission:', this.hasEditPermission);
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


      
checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
  return groupPermissions.some(permission => permission.codename === codeName);
}
  
  loadComapny(): void {
    
    this.companyRegistrationService.getCompany().subscribe(
      (result: any) => {
        this.Companies = result;
        console.log(' fetching Companies:');

      },
      (error) => {
        console.error('Error fetching Companies:', error);
      }
    );
  }


  openPopus(){
    this.dialog.open(CompanySelectionComponent,{
      width:'80%',
      height:'700px',
    })
  }


  deleteCompany(companyId: number) {
    this.countryService.deleteCompany(companyId).subscribe(
      () => {
        // Success - Update your local companies array or fetch updated data
        console.log('Company deleted successfully');
        // Example: Update local array
        this.Companies = this.Companies.filter(companysec => companysec.id !== companyId);
      },
      (error) => {
        // Handle error
        console.error('Error deleting company:', error);
      }
    );
  }


  editCompany(company: any) {
    const dialogRef = this.dialog.open(CompanyEditComponent, {
      width: '400px',
      height:'400px',
      data: { company: { ...company } },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Update the company details or perform any additional actions
        console.log('Company details updated:', result);

        // You may want to update the list of companies after editing
        this.loadComapny();
      }
    });
  }


  
  Delete: boolean = false;
  allSelected: boolean = false;

toggleCheckboxes() {
  this.Delete = !this.Delete;
}

toggleSelectAllEmployees() {
  this.allSelected = !this.allSelected;
  this.Companies.forEach(employee => employee.selected = this.allSelected);
}

onCheckboxChange(employee:number) {
  // No need to implement any logic here if you just want to change the style.
  // You can add any additional logic if needed.
}

deleteSelectedEmployees() { 
  const selectedEmployeeIds = this.Companies
    .filter(employee => employee.selected)
    .map(employee => employee.id);

  if (selectedEmployeeIds.length === 0) {
    alert('No employees selected for deletion.');
    return;
  }

  if (confirm('Are you sure you want to delete the selected employees?')) {
    selectedEmployeeIds.forEach(categoryId => {
      this.companyRegistrationService.deleteCompany(categoryId).subscribe(
        () => {
          console.log('Employee deleted successfully:', categoryId);
          // Remove the deleted employee from the local list
          this.Companies = this.Companies.filter(employee => employee.id !== categoryId);
        },
        (error) => {
          console.error('Error deleting employee:', error);
        }
      );
    });
  }
}

showEditBtn: boolean = false;

    EditShowButtons() {
      this.showEditBtn = !this.showEditBtn;
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


       
    showEmployeeDetails(employeeId: number): void {
      this.companyRegistrationService.getEmployeeDetails(employeeId).subscribe(
        (details) => {
          // Navigate to the employee details page with the retrieved details
          this.router.navigate(['/main-sidebar/settings/company-details', employeeId, 'details'], { state: { details } });
        },
        (error) => {
          console.error('Failed to fetch employee details', error);
        }
      );
    }
    
}
