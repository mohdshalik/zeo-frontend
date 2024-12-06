import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { SessionService } from '../login/session.service';
import { LeaveService } from '../leave-master/leave.service';
import { BranchServiceService } from '../branch-master/branch-service.service';


@Component({
  selector: 'app-company-policy',
  templateUrl: './company-policy.component.html',
  styleUrl: './company-policy.component.css'
})
export class CompanyPolicyComponent {


  title:any='';
  description:any='';
  branch:any='';

  department:any='';
  category:any='';

  policy_file: string | undefined;


  selectedFile!: File | null;


  Branches: any[] = [];
  Depts: any[] = [];

  Cats: any[] = [];

  registerButtonClicked =false;


  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private leaveService:LeaveService,
    private branchService:BranchServiceService

  
    ) {}

    ngOnInit(): void {
 
      this.LoadBranches();
      this.LoadCats();

      this.LoadDepts();

    }



    onFileSelected(event: any): void {
      this.selectedFile = event.target.files.length > 0 ? event.target.files[0] : null;
    }
    
  

    registerApproveLevel(): void {
      this.registerButtonClicked = true;
      if (!this.title || !this.description || !this.branch) {
        return;
      }
    
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('branch', this.branch);
      formData.append('department', this.department);
      formData.append('category', this.category);

      // formData.append('image', this.selectedFile);
        // Append the profile picture only if it's selected
   // Append the image only if it's selected
   if (this.selectedFile) {
    formData.append('policy_file', this.selectedFile);
  }
  
    
      this.branchService.registerpolicy(formData).subscribe(
        (response) => {
          console.log('Registration successful', response);
          alert('Company Policy has been added');
          window.location.reload();
        },
        (error) => {
          console.error('Added failed', error);
          alert('Enter all required fields!');
        }
      );
    }
  


    LoadBranches() {
      const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
  
      console.log('schemastore',selectedSchema )
      // Check if selectedSchema is available
      if (selectedSchema) {
        this.branchService.getBranches(selectedSchema).subscribe(
          (result: any) => {
            this.Branches = result;
            console.log(' fetching Employees:');
    
          },
          (error) => {
            console.error('Error fetching Employees:', error);
          }
        );
      }
  
    }


    LoadDepts() {
      const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
  
      console.log('schemastore',selectedSchema )
      // Check if selectedSchema is available
      if (selectedSchema) {
        this.branchService.getDepartment(selectedSchema).subscribe(
          (result: any) => {
            this.Depts = result;
            console.log(' fetching Depts:');
    
          },
          (error) => {
            console.error('Error fetching Depts:', error);
          }
        );
      }
  
    }
    LoadCats() {
      const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
  
      console.log('schemastore',selectedSchema )
      // Check if selectedSchema is available
      if (selectedSchema) {
        this.branchService.getCategory(selectedSchema).subscribe(
          (result: any) => {
            this.Cats = result;
            console.log(' fetching Cats:');
    
          },
          (error) => {
            console.error('Error fetching Cats:', error);
          }
        );
      }
  
    }


}
