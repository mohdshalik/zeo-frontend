import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CompanySelectionComponent } from '../company-selection/company-selection.component';
import { MatDialog } from '@angular/material/dialog';
import { BrachRegistrationService } from '../branch-creation/brach-registration.service';
import { BranchCreationComponent } from '../branch-creation/branch-creation.component';
import { BranchEditComponent } from '../branch-edit/branch-edit.component';
import { SessionService } from '../login/session.service';

@Component({
  selector: 'app-branch-master',
  template: ` <div class="container" *ngIf="hasViewPermission">
  <div class="comapny_section">
      <div class="header_section mt-4">

          <div class="row">
              <div class="col-md-3">
                  <h1 title="change Branch"> Branch details</h1>
                  
              </div>
              <div class="col-md-4">
                    
                    <input type="text" class="form-control mt-1" placeholder="Search by branch or branch code " [(ngModel)]="searchQuery" (input)="filterEmployees()">

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
          <button class=" mt-3 btn-danger btn"  color="warn" *ngIf="Delete" (click)="deleteSelectedEmployees()">Delete Selected </button>

      </div>
  </div>
      <!-- <div class="list_company_sec mt-4" >
          
      </div> -->
<div  >
      <div class="row mt-4">
          <div class="col-md-12 col-12">
              <div class="row">
              <div class="col-md-2">
              <p>Br Code</p>
              </div>
                  <div class="col-md-3">
                      <p>Branches</p>
                  </div>

                  <div class="col-md-2">
                      <p>City</p>
                  </div>
                  <div class="col-md-3">
                      <p>Email ID</p>
                  </div>
                  <div class="col-md-2">
                  <p>Contact</p>
              </div>
              </div>
              <div class="com_list" *ngFor="let branchsec of filteredEmployees" [ngClass]="{ 'selected-item': branchsec.selected }">
              <mat-checkbox *ngIf="Delete" [(ngModel)]="branchsec.selected" (change)="onCheckboxChange(branchsec.id)"></mat-checkbox>

                <div class="row">
                <div class="col-md-2">
                <h2 class="text-center">{{ branchsec.branch_code }}</h2>
                </div>
                 
                  <div class="col-md-3" >
                  <h2 class="text-center" >{{ branchsec.branch_name }}</h2>
                                 </div>

                  <div class="col-md-2">
                      <h2 class="text-center">{{ branchsec.br_city }}</h2>
                  </div>
                  <div class="col-md-3">
                      <h2 class="text-center">{{ branchsec.br_branch_mail }} </h2>
                  </div>

                  <div class="col-md-2">
                      <h2 class="text-center">{{ branchsec.br_branch_nmbr_1 }} </h2>
                  </div>
                
                  

                </div>
                <div class="row mt-2">
                <div class="col-md-10">
                </div>
                <div class="col-md-2">
                 <button mat-fab class="btn_ed pull-right" style="color:white" color="primary" aria-label="Example icon button with a delete icon" (click)="openEditPopuss(branchsec.id)" *ngIf="showEditBtn"><mat-icon>draw</mat-icon></button>

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
  styleUrl: './branch-master.component.css'
})
export class BranchMasterComponent {

  branches: any[] = [];


  branch_name: string = '';
  br_city:string = '';
  br_branch_mail:string = '';
  br_branch_nmbr_1:string = '';

  hasAddPermission: boolean = false;
  hasDeletePermission: boolean = false;
  hasViewPermission: boolean =false;
  hasEditPermission: boolean = false;

  userId: number | null | undefined;
  userDetails: any;

  selectedSchema: string | null = null;

  filteredEmployees: any[] = [];
  searchQuery: string = '';

  constructor(private BrachRegistrationService: BrachRegistrationService ,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private dialog:MatDialog,
    ) {}

    


    async ngOnInit(): Promise<void> {

      // this.loadcatogary();

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
        this.fetchDesignations(selectedSchema);
      } else {
        console.log('User is not superuser');

        if (selectedSchema) {
          try {
            const permissionsData: any = await this.BrachRegistrationService.getDesignationsPermission(selectedSchema).toPromise();
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

                this.hasViewPermission = this.checkGroupPermission('view_brnch_mstr', groupPermissions);
                console.log('Has view permission:', this.hasViewPermission);

                this.hasAddPermission = this.checkGroupPermission('add_brnch_mstr', groupPermissions);
                console.log('Has add permission:', this.hasAddPermission);

                this.hasDeletePermission = this.checkGroupPermission('delete_brnch_mstr', groupPermissions);
                console.log('Has delete permission:', this.hasDeletePermission);

                this.hasEditPermission = this.checkGroupPermission('change_brnch_mstr', groupPermissions);
                console.log('Has edit permission:', this.hasEditPermission);
              } else {
                console.error('No groups found in data or groups array is empty.', firstItem);
              }
            } else {
              console.error('Permissions data is not an array or is empty.', permissionsData);
            }

            // Fetching designations after checking permissions
            this.fetchDesignations(selectedSchema);
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

   

    

    
    checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
      return groupPermissions.some(permission => permission.codename === codeName);
    }
    fetchDesignations(selectedSchema: string) {
      this.BrachRegistrationService.getBranchess(selectedSchema).subscribe(
        (data: any) => {
          this.branches = data;
          this.filteredEmployees = this.branches;
          console.log('employee:', this.branches);
        },
        (error: any) => {
          console.error('Error fetching categories:', error);
        }
      );
    }

  
    
// checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
//   return groupPermissions.some(permission => permission.codename === codeName);
// }
 
  
  // loadBranch(): void {
  //   this.BrachRegistrationService.getBranches().subscribe(
  //     (result: any) => {
  //       this.branches = result;
  //       console.log(' fetching branches:');

  //     },
  //     (error) => {
  //       console.error('Error fetching branches:', error);
  //     }
  //   );
  // }


  openPopus(){
    this.dialog.open(BranchCreationComponent,{
      width:'80%',
      height:'700px',
    })
  }


  
  Delete: boolean = false;
  allSelected: boolean = false;

toggleCheckboxes() {
  this.Delete = !this.Delete;
}

toggleSelectAllEmployees() {
  this.allSelected = !this.allSelected;
  this.branches.forEach(employee => employee.selected = this.allSelected);
}

onCheckboxChange(employee:number) {
  // No need to implement any logic here if you just want to change the style.
  // You can add any additional logic if needed.
}

deleteSelectedEmployees() { 
  const selectedEmployeeIds = this.branches
    .filter(employee => employee.selected)
    .map(employee => employee.id);

  if (selectedEmployeeIds.length === 0) {
    alert('No Branch selected for deletion.');
    return;
  }

  if (confirm('Are you sure you want to delete the selected Branch?')) {
    selectedEmployeeIds.forEach(categoryId => {
      this.BrachRegistrationService.deleteBranch(categoryId).subscribe(
        () => {
          console.log('Branch deleted successfully:', categoryId);
          // Remove the deleted employee from the local list
          this.branches = this.branches.filter(employee => employee.id !== categoryId);
          alert(' Branch deleted successfully')
          window.location.reload();

        },
        (error) => {
          console.error('Error deleting Branch:', error);
          const errorMessage = error.error?.detail || 'Error deleting Branch';
          alert(`deleting error: ${errorMessage}`);
        }
      );
    });
  }
}


openEditPopuss(employeeId: number):void{
  const dialogRef = this.dialog.open(BranchEditComponent, {
    width:'80%',
    height:'500px',
    data: { employeeId: employeeId }
    
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

filterEmployees(): void {
  const query = this.searchQuery.toLowerCase();
  this.filteredEmployees = this.branches.filter(branches =>
    branches.branch_code.toLowerCase().includes(query) ||
    branches.branch_name.toLowerCase().includes(query)
  );
}



showEditBtn: boolean = false;

EditShowButtons() {
  this.showEditBtn = !this.showEditBtn;
}
}
