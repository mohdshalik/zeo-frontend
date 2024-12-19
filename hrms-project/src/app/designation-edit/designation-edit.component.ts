import { Component,Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Route,ActivatedRoute } from '@angular/router';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DesignationCreationComponent } from '../designation-creation/designation-creation.component';
import { DesignationService } from '../designation-master/designation.service';

@Component({
  selector: 'app-designation-edit',
  templateUrl: './designation-edit.component.html',
  styleUrl: './designation-edit.component.css'
})
export class DesignationEditComponent {

  selectedDeparmentsecId:any | undefined;

  selectedCategoryId: number | undefined;

  registerButtonClicked = false;
  Catogaries: any[] = [];

  job_title: string = '';
  desgntn_description:string ='';
  desgntn_code:string ='';



  designation: any;


  constructor(
    private ref:MatDialogRef<DesignationCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { desigId: number },
    private DesignationService: DesignationService,
    private renderer: Renderer2,
    private http: HttpClient,
    private authService: AuthenticationService,
    private dialogRef: MatDialogRef<DesignationEditComponent>

  ) {
    this.DesignationService.getDesgById(data.desigId).subscribe(designation => {
      this.designation = designation;
    });
  }



  
  ngOnInit(): void {
    this.DesignationService.getDesgById(this.data.desigId).subscribe(
      (designation) => {
        this.designation = designation;
      },
      (error) => {
        console.error('Error fetching designation:', error);
      }
    );
  }



  updateDesignation(): void {
    // Update category
    this.DesignationService.updateDesignation(this.data.desigId, this.designation).subscribe(
      (response) => {
        console.log('designation updated successfully:', response);
        // Close the dialog when category is updated
        this.dialogRef.close();

        alert('Designation has been Updated ');
        window.location.reload();
        
      },
      (error) => {
        console.error('Error updating designation:', error);
      }
    );
  }
 
  ClosePopup(){
    this.ref.close('Closed using function')
  }
}
