import { Component, Renderer2 } from '@angular/core';
import { UserCreationComponent } from '../user-creation/user-creation.component';
import { UserMasterService } from '../user-master/user-master.service';
import { CompanyRegistrationService } from '../company-registration.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../login/authentication.service';
import { SessionService } from '../login/session.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  Users: any[] = [];
  employee: any;

  selectedEmployee: any;
  Companies: any;

  constructor(private UserMasterService:UserMasterService,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private dialog:MatDialog,
    private renderer: Renderer2,
    private router:Router,
    private route: ActivatedRoute
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
        this.UserMasterService.getEmployeeDetails(employeeId).subscribe(
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

  

  openPopus(){
    this.dialog.open(UserCreationComponent,{
      width:'80%',
      height:'500px',
    })
  }


  Delete: boolean = false;
  allSelected: boolean = false;

toggleCheckboxes() {
  this.Delete = !this.Delete;
}

toggleSelectAllEmployees() {
  this.allSelected = !this.allSelected;
  this.Users.forEach(employee => employee.selected = this.allSelected);
}

onCheckboxChange(employee:number) {
  // No need to implement any logic here if you just want to change the style.
  // You can add any additional logic if needed.
}

// deleteSelectedEmployees() { 
//   const selectedEmployeeIds = this.Users
//     .filter(employee => employee.selected)
//     .map(employee => employee.id);

//   if (selectedEmployeeIds.length === 0) {
//     alert('No employees selected for deletion.');
//     return;
//   }

//   if (confirm('Are you sure you want to delete the selected employees?')) {
//     selectedEmployeeIds.forEach(DeptId => {
//       this.UserMasterService.deleteUser(DeptId).subscribe(
//         () => {
//           console.log('User deleted successfully:', DeptId);
//           // Remove the deleted employee from the local list
//           this.Users = this.Users.filter(employee => employee.id !== DeptId);
//         },
//         (error) => {
//           console.error('Error deleting employee:', error);
//         }
//       );
//     });
//   }
// }


openEditEmpPopuss(employeeId: number, ):void{
  const dialogRef = this.dialog.open(UserEditComponent, {
    width:'80%',
    height:'500px',
    data: { employeeId: employeeId }
    
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}


 deleteSelectedEmployees() {
    const selectedEmployeeIds = this.Users.filter(employee => employee.selected).map(employee => employee.id);
  
    if (selectedEmployeeIds.length === 0) {
      alert('No user selected for deletion.');
      return;
    }
  
    if (confirm('Are you sure you want to delete the selected user?')) {
      selectedEmployeeIds.forEach(userId => {
        this.UserMasterService.markUserAsDeleted(userId).subscribe(
          () => {
            console.log('User marked as deleted:', userId);
            window.location.reload();

            // Update the local list to hide the user
            this.Users = this.Users.map(employee => {
              if (employee.id === userId) {
                return { ...employee, is_deleted: true }; // Mark as deleted locally
              }
              return employee;
            });
            // window.location.reload();

          },
          (error) => {
            console.error('Error marking user as deleted:', error);
          }
        );
      });
    }
  }


showEditBtn: boolean = false;

EditShowButtons() {
  this.showEditBtn = !this.showEditBtn;
}

// show div with selected user details


showEmployeeDetails(employeeId: number, companysec: any): void {
  this.UserMasterService.getEmployeeDetails(employeeId).subscribe(
      (details: any) => {
          // Update selectedEmployee with the fetched details
          // this.selectedEmployee = details;
          this.selectedEmployee = companysec;
      },
      (error) => {
          console.error('Failed to fetch User details', error);
      }
  );
}


onDeleteEmployee(DeptId: number): void {
if (confirm('Are you sure you want to delete this employee?')) {
    this.UserMasterService.deleteUser(DeptId).subscribe(
        () => {
            console.log('User deleted successfully');

            // this.router.navigate(['/main-sidebar/sub-sidebar/employee-master']);
            // Refresh the employee list after deletion
            // this.loadEmployee();
        },
        (error) => {
            console.error('Error deleting employee:', error);
        }
    );
}
}





}
