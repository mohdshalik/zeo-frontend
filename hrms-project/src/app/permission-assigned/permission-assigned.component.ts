import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { DepartmentServiceService } from '../department-master/department-service.service';

@Component({
  selector: 'app-permission-assigned',
  templateUrl: './permission-assigned.component.html',
  styleUrl: './permission-assigned.component.css'
})
export class PermissionAssignedComponent {
 
  profile: number | string | undefined;
  users :any[]=[];
  registerButtonClicked = false;

  groups:any='';
  Groups :any[]=[];

  constructor(private DepartmentServiceService: DepartmentServiceService ,
    private http: HttpClient,
    private authService: AuthenticationService,
 ) {}


 ngOnInit(): void {
    
  this.loadDeparmentBranch();
  this.loadUserPermissions();

 }


  loadDeparmentBranch(): void {
    const selectedSchema = this.authService.getSelectedSchema();
        if (selectedSchema) {
          this.DepartmentServiceService.getUserforPermission(selectedSchema).subscribe(
            (result: any) => {
              this.users = result;
              console.log(' fetching Companies:');
      
            },
            (error) => {
              console.error('Error fetching Companies:', error);
            }
          );
        }
   
  }


  loadUserPermissions(): void {
    const selectedSchema = this.authService.getSelectedSchema();
        if (selectedSchema) {
          this.DepartmentServiceService.getUserforPermissionGroupSelection(selectedSchema).subscribe(
            (result: any) => {
              this.Groups = result;
              console.log(' fetching Companies:');
      
            },
            (error) => {
              console.error('Error fetching Companies:', error);
            }
          );
        }
   
  }



 
  registerUserAssignedPermission(): void {
    this.registerButtonClicked = true;
    const companyData = {
      profile: this.profile,
      groups:this.groups,
    
   

      // Add other form field values to the companyData object
    };
  

    this.DepartmentServiceService.registerUserAssgnedPer(companyData).subscribe(
      (response) => {
        console.log('Registration successful', response);
       
            alert('Group Permission has been Assigned ');
            window.location.reload();
          

      },
      (error) => {
        console.error('Registration failed', error);
        alert('enter all field!')
        // Handle the error appropriately, e.g., show a user-friendly error message.
      }
    );
  }

}
