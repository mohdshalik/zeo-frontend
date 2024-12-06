import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeeFamilyComponent } from '../employee-family/employee-family.component';



@Component({
  selector: 'app-succes-modal',
  templateUrl: './succes-modal.component.html',
  styleUrl: './succes-modal.component.css'
})
export class SuccesModalComponent {

  constructor( private dialog: MatDialog,
    
   private ref:MatDialogRef<EmployeeFamilyComponent>,
   private dialogRef: MatDialogRef<SuccesModalComponent>
   ) {}


   continueEmpDetails():void{
  
    this.dialogRef.close();
    const dialogRef = this.dialog.open(EmployeeFamilyComponent, {
    width:'80%',
        height:'500px',// Adjust width as needed
      data: { message: 'Employee created successfully!' } // Pass any data you want to display in the modal
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The success modal was closed');
      // Handle any actions after the modal is closed, if needed
    });
   }


}
