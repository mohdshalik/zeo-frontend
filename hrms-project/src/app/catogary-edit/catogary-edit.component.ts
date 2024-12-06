import { Component , OnInit, Renderer2} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CountryService } from '../country.service';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Route,ActivatedRoute } from '@angular/router';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatogaryService } from '../catogary-master/catogary.service'; 
import { CatogaryCrationComponent } from '../catogary-cration/catogary-cration.component';


@Component({
  selector: 'app-catogary-edit',
  templateUrl: './catogary-edit.component.html',
  styleUrl: './catogary-edit.component.css'
})
export class CatogaryEditComponent {

  categoryName: string | undefined;

  selectedDeparmentsecId:any | undefined;

  selectedCategoryId: number | undefined;

  registerButtonClicked = false;
  Catogaries: any[] = [];

  ctgry_title: string = '';
  ctgry_description:string ='';
  ctgry_code:string ='';



  category: any;


  constructor(
    private ref:MatDialogRef<CatogaryCrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categoryId: number },
    private categoryService: CatogaryService,
    private renderer: Renderer2,
    private http: HttpClient,
    private authService: AuthenticationService,
    private dialogRef: MatDialogRef<CatogaryEditComponent>

  ) {
    this.categoryService.getCategoryById(data.categoryId).subscribe(category => {
      this.category = category;
    });
  }

  
   


  // loadcatogary(): void {
  //   this.categoryService.getcatogary().subscribe(
  //     (result: any) => {
  //       this.Catogaries = result;
  //       console.log(' fetching catogeries:');

  //     },
  //     (error) => {
  //       console.error('Error fetching catogeries:', error);
  //     }
  //   );
  // }
  


  ngOnInit(): void {
    this.categoryService.getCategoryById(this.data.categoryId).subscribe(
      (category) => {
        this.category = category;
      },
      (error) => {
        console.error('Error fetching category:', error);
      }
    );
  }



  updateCategory(): void {
    // Update category
    this.categoryService.updateCategory(this.data.categoryId, this.category).subscribe(
      (response) => {
        console.log('Category updated successfully:', response);
        // Close the dialog when category is updated
        this.dialogRef.close();
        alert('category has been Updated ');
        window.location.reload();
      },
      (error) => {
        console.error('Error updating category:', error);
      }
    );
  }
 
  ClosePopup(){
    this.ref.close('Closed using function')
  }

  

}
