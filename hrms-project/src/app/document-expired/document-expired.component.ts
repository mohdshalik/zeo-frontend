import { Component, Renderer2 } from '@angular/core';
import { EmployeeService } from '../employee-master/employee.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DocumentEditComponent } from '../document-edit/document-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-document-expired',
  templateUrl: './document-expired.component.html',
  styleUrl: './document-expired.component.css'
})
export class DocumentExpiredComponent {


  Documents: any[] = [];


  constructor(private EmployeeService:EmployeeService,
    private authService:AuthenticationService,
    private http: HttpClient,
    private renderer: Renderer2,
    private router: Router,
    private dialog:MatDialog,

  
  
    ) {
     
    }

    ngOnInit(): void {

      
      
      this.loadExpiredDoc();

      

   

  
  
  
    
     
    }



    showEmployeeDetails(employeeId: number): void {
      this.EmployeeService.getEmployeeDetails(employeeId).subscribe(
        (details) => {
          // Navigate to the employee details page with the retrieved details
          this.router.navigate(['/main-sidebar/sub-sidebar/employee-details', employeeId, 'details'], { state: { details } });
        },
        (error) => {
          console.error('Failed to fetch employee details', error);
        }
      );
    }



    loadExpiredDoc(): void {

      const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

  console.log('schemastore',selectedSchema )
  // Check if selectedSchema is available
  if (selectedSchema) {
      
      this.EmployeeService.getExpiredDocuments(selectedSchema).subscribe(
        (result: any) => {
          this.Documents = result;
          console.log(' fetching Expired Documents:');
  
        },
        (error) => {
          console.error('Error fetching Expired Documents:', error);
        }
      );
  }
    }


    openEditPopuss(departmentId: number):void{
      
      const dialogRef = this.dialog.open(DocumentEditComponent, {
        width:'80%',
        height:'500px',
        data: { departmentId: departmentId }
        
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
}
