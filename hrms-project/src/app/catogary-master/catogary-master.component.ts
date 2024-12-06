import { Component,OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CountryService } from '../country.service';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CompanySelectionComponent } from '../company-selection/company-selection.component';
import { MatDialog } from '@angular/material/dialog';
import { CatogaryService } from './catogary.service'; 
import { CatogaryCrationComponent } from '../catogary-cration/catogary-cration.component'; 
import { CatogaryEditComponent } from '../catogary-edit/catogary-edit.component';
import { UserMasterService } from '../user-master/user-master.service';
import { Permissions } from './permission';
import { EmployeeService } from '../employee-master/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../login/session.service';
import { DesignationService } from '../designation-master/designation.service';


interface Permission {
  id: number;
  name: string;
  codename: string;
  content_type: number;
}

@Component({
  selector: 'app-catogary-master',
  templateUrl: './catogary-master.component.html',
  styleUrl: './catogary-master.component.css'
})
export class CatogaryMasterComponent  implements OnInit{

  
  Catogaries: any[] = [];
  selectedDepartment: any;

  ctgry_title: string = '';
  ctgry_description:string = '';
  hasPermissioncom: boolean = false;

  isAuthenticated: boolean = false;
  showComponent: boolean = false;
  
  userPermissions: string[] = [];
  user_permissions: string[] = [];
  hasAddPermission: boolean = false;
  hasDeletePermission: boolean = false;
  hasViewPermission: boolean =false;
  hasEditPermission: boolean = false;

  employee: any;


  userId: number | null | undefined;
  userDetails: any;


  filteredEmployees: any[] = [];
  searchQuery: string = '';


  constructor(private CatogaryService:CatogaryService,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private UserMasterService: UserMasterService,
    private EmployeeService: EmployeeService,
    private sessionService: SessionService,
    private DesignationService: DesignationService,


    private dialog:MatDialog,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,

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

        const selectedSchema = this.authService.getSelectedSchema();
        if (selectedSchema) {
          // try {
          //   const permissionsData: any = await this.DesignationService.getDesignationsPermission(selectedSchema).toPromise();
          //   console.log('Permissions data:', permissionsData);
  
          //   if (permissionsData && permissionsData.length > 0 && permissionsData[0].groups) {
          //     // Check if user is superuser according to the permissions API
          //     isSuperuser = permissionsData[0].is_superuser || false;
              
          //     if (isSuperuser) {
          //       console.log('User is superuser according to permissions API');
          //       // Grant all permissions
          //       this.hasViewPermission = true;
          //       this.hasAddPermission = true;
          //       this.hasDeletePermission = true;
          //       this.hasEditPermission = true;
          //     } else {
          //       const groupPermissions = permissionsData[0].groups.flatMap((group: any) => group.permissions);
          //       console.log('Group Permissions:', groupPermissions);
  
          //       this.hasViewPermission = this.checkGroupPermission('view_ctgry_master', groupPermissions);
          //       console.log('Has view permission:', this.hasViewPermission);
  
          //       this.hasAddPermission = this.checkGroupPermission('add_ctgry_master', groupPermissions);
          //       console.log('Has add permission:', this.hasAddPermission);
  
          //       this.hasDeletePermission = this.checkGroupPermission('delete_ctgry_master', groupPermissions);
          //       console.log('Has delete permission:', this.hasDeletePermission);
  
          //       this.hasEditPermission = this.checkGroupPermission('change_ctgry_master', groupPermissions);
          //       console.log('Has edit permission:', this.hasEditPermission);
          //     }
          //   } else {
          //     console.error('No groups found in data or data format is incorrect.', permissionsData);
          //   }
  
          //   // Fetching designations after checking permissions
          //   this.fetchDesignations(selectedSchema);
          // } 
          
          
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

               
                 this.hasViewPermission = this.checkGroupPermission('view_ctgry_master', groupPermissions);
                 console.log('Has view permission:', this.hasViewPermission);
  
                 this.hasAddPermission = this.checkGroupPermission('add_ctgry_master', groupPermissions);
                console.log('Has add permission:', this.hasAddPermission);
  
               this.hasDeletePermission = this.checkGroupPermission('delete_ctgry_master', groupPermissions);
               console.log('Has delete permission:', this.hasDeletePermission);
  
                this.hasEditPermission = this.checkGroupPermission('change_ctgry_master', groupPermissions);
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

   
    checkViewPermission(permissions: any[]): boolean {
      const requiredPermission = 'view_ctgry_master' ||'add_ctgry_master' ||'delete_ctgry_master' ||'change_ctgry_master';
      
    
      // Check user permissions
      if (permissions.some(permission => permission.codename === requiredPermission)) {
        return true;
      }
    
      // Check group permissions (if applicable)
      // Replace `// TODO: Implement group permission check`
      // with your logic to retrieve and check group permissions
      // (consider using a separate service or approach)
      return false; // Replace with actual group permission check
    }

    

    
    checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
      return groupPermissions.some(permission => permission.codename === codeName);
    }
  
    fetchDesignations(selectedSchema: string) {
      this.CatogaryService.getcatogarys(selectedSchema).subscribe(
        (data: any) => {
          this.Catogaries = data;
          this.filteredEmployees = this.Catogaries;

          console.log('employee:', this.Catogaries);
        },
        (error: any) => {
          console.error('Error fetching categories:', error);
        }
      );
    }

  user: any; // Define user object to hold user details



    loadcatogary(): void {
      this.CatogaryService.getcatogary().subscribe(
        (result: any) => {
          this.Catogaries = result;
          console.log(' fetching catogeries:');
  
        },
        (error) => {
          console.error('Error fetching catogeries:', error);
        }
      );
    }
  
    loadUser(): void {
      this.UserMasterService.getUsers().subscribe(
        (result: any) => {
          this.Catogaries = result;
          console.log(' fetching catogeries:');
  
        },
        (error) => {
          console.error('Error fetching catogeries:', error);
        }
      );
    }

    loadPermissions(): void {
      this.UserMasterService.getPermission().subscribe(
        (result: any) => {
          this.user_permissions = result;
          console.log(' fetching catogeries:');
  
        },
        (error) => {
          console.error('Error fetching catogeries:', error);
        }
      );
    }
  

    openPopuss(){
      this.dialog.open(CatogaryCrationComponent,{
        width:'80%',
        height:'700px',
      })
    }

    openEditPopuss(categoryId: number):void{
      const dialogRef = this.dialog.open(CatogaryEditComponent, {
        width:'80%',
        height:'500px',
        data: { categoryId: categoryId }
        
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }


    showEditBtn: boolean = false;

    EditShowButtons() {
      this.showEditBtn = !this.showEditBtn;
    }


    Delete: boolean = false;
    allSelected: boolean = false;

  toggleCheckboxes() {
    this.Delete = !this.Delete;
  }

  toggleSelectAllEmployees() {
    this.allSelected = !this.allSelected;
    this.Catogaries.forEach(employee => employee.selected = this.allSelected);
  }

  onCheckboxChange(employee:number) {
    // No need to implement any logic here if you just want to change the style.
    // You can add any additional logic if needed.
  }

  deleteSelectedEmployees() { 
    const selectedEmployeeIds = this.Catogaries
      .filter(employee => employee.selected)
      .map(employee => employee.id);

    if (selectedEmployeeIds.length === 0) {
      alert('No Category selected for deletion.');
      return;
    }

    if (confirm('Are you sure you want to delete the selected Category?')) {
      selectedEmployeeIds.forEach(categoryId => {
        this.CatogaryService.deleteCategory(categoryId).subscribe(
          () => {
            console.log('Category deleted successfully:', categoryId);
            // Remove the deleted employee from the local list
            this.Catogaries = this.Catogaries.filter(employee => employee.id !== categoryId);
            alert(' Category deleted successfully');
            window.location.reload();

          },
          (error) => {
            console.error('Error deleting Category:', error);
          }
        );
      });
    }
  }


  filterEmployees(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredEmployees = this.Catogaries.filter(Catogaries =>
      Catogaries.catogary_title.toLowerCase().includes(query) 
    );
  }


  


    }


