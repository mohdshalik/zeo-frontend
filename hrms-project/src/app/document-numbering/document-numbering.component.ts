import { Component } from '@angular/core';
import { DepartmentServiceService } from '../department-master/department-service.service';
import { CompanyRegistrationService } from '../company-registration.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../login/authentication.service';
import { EmployeeService } from '../employee-master/employee.service';
import { UserMasterService } from '../user-master/user-master.service';
import { CatogaryService } from '../catogary-master/catogary.service';
import { SessionService } from '../login/session.service';

@Component({
  selector: 'app-document-numbering',
  templateUrl: './document-numbering.component.html',
  styleUrl: './document-numbering.component.css'
})
export class DocumentNumberingComponent {

  preffix: any = '';
  suffix: any = '';
  year: any = '';
  start_number: any = '';
  current_number: any = '';
  end_number: any = '';
  branch_id: any = '';
  category: any = '';
  user: any = '';


  automatic_numbering:  boolean = false;

  branches:any []=[];
  Users:any []=[];
  Categories:any []=[];

  docsNumbers:any []=[];


  registerButtonClicked = false;

  
  schemas: string[] = []; // Array to store schema names

  
  userId: number | null | undefined;
  userDetails: any;
  userDetailss: any[] = [];
  username: any;

  
  constructor(private DepartmentServiceService: DepartmentServiceService ,
    private companyRegistrationService: CompanyRegistrationService, 
    private http: HttpClient,
    private authService: AuthenticationService,
    private categoryService: CatogaryService,
    private userService: UserMasterService,
    private employeeService: EmployeeService,
    private sessionService: SessionService,


    


) {}

ngOnInit(): void {
  this.loadDeparmentBranch();
  this.loadCAtegory();
  this.loadUsers();
  this.loaddocNumers();


  this.userId = this.sessionService.getUserId();

  
  if (this.userId !== null) {
    this.authService.getUserData(this.userId).subscribe(
      (userData: any) => {
        this.userDetails = userData;
        this.user = this.userId; // Automatically set the owner to logged-in user ID

      },
      (error) => {
        console.error('Failed to fetch user details:', error);
      }
    );

    this.authService.getUserSchema(this.userId).subscribe(
      (userData: any) => {
        this.userDetailss = userData; // Store user schemas in userDetailss

        this.schemas = userData.map((schema: any) => schema.schema_name);
      },
      (error) => {
        console.error('Failed to fetch user schemas:', error);
      }
    );
  } else {
    console.error('User ID is null.');
  }

  

 
}

  loadDeparmentBranch(): void {
    
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
  
    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
      this.DepartmentServiceService.getDeptBranchList(selectedSchema).subscribe(
        (result: any) => {
          this.branches = result;
          console.log(' fetching Companies:');
  
        },
        (error) => {
          console.error('Error fetching Companies:', error);
        }
      );
    }
    }


    

     

        loadUsers(): void {
    
          const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
        
          console.log('schemastore',selectedSchema )
          // Check if selectedSchema is available
          if (selectedSchema) {
            this.userService.getSChemaUsers(selectedSchema).subscribe(
              (result: any) => {
                this.Users = result;
                console.log(' fetching Companies:');
        
              },
              (error) => {
                console.error('Error fetching Companies:', error);
              }
            );
          }
          }

          loadCAtegory(): void {
    
            const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
          
            console.log('schemastore',selectedSchema )
            // Check if selectedSchema is available
            if (selectedSchema) {
              this.categoryService.getcatogarys(selectedSchema).subscribe(
                (result: any) => {
                  this.Categories = result;
                  console.log(' fetching Companies:');
          
                },
                (error) => {
                  console.error('Error fetching Companies:', error);
                }
              );
            }
            }
  



          registerGeneralreq(): void {
            this.registerButtonClicked = true;
            const companyData = {
              preffix: this.preffix,
            
              suffix:this.suffix,
              year: this.year,
            
              start_number:this.start_number,
              current_number: this.current_number,
            
              end_number:this.end_number,
              branch_id:this.branch_id,
              category:this.category,
              user:this.user,

              automatic_numbering:this.automatic_numbering,



           
        
              // Add other form field values to the companyData object
            };
        
            this.employeeService.registerDocNum(companyData).subscribe(
              (response) => {
                console.log('Registration successful', response);
              
                    alert('Document number has been Added ');
                    window.location.reload();
                    // window.location.reload();
               
        
              },
              (error) => {
                console.error('Add failed', error);
                console.log('Full error response:', error);
    
                // Check if the error message matches the specific error
                const errorMessage = error.error?.error || 'An error occurred while adding the document number. Please try again.';
                alert(errorMessage);
            }
            );
          }





          loaddocNumers(): void { 
            const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
        
            console.log('schemastore',selectedSchema )
            // Check if selectedSchema is available
            if (selectedSchema) {
            this.employeeService.getAllDocnumbers(selectedSchema).subscribe(
              (result: any) => {
                console.log(result); // Log the API response
                this.docsNumbers = result; // Assuming the data is directly in the result without a 'data' property
              },
              (error) => {
                console.error('Error fetching states:', error);
              }
            );
            }
          }
        
        


}
