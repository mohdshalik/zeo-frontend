import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { EmployeeService } from '../employee-master/employee.service';
import { UserMasterService } from '../user-master/user-master.service';
import { SessionService } from '../login/session.service';

declare var $: any;

@Component({
  selector: 'app-request-type',
  templateUrl: './request-type.component.html',
  styleUrl: './request-type.component.css'
})
export class RequestTypeComponent implements  AfterViewInit {



  ngAfterViewInit(): void {
    $('#summernote').summernote({
      height: 300,  // Set editor height
      placeholder: 'Type your text here...',
      toolbar: [
        // Add or remove buttons as needed
        ['style', ['bold', 'italic', 'underline']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['insert', ['link', 'picture', 'video']],
        ['view', ['fullscreen', 'codeview', 'help']]
      ],
      hint: {
        mentions: ['Jayden Smith', 'Peter Pan', 'Lorca', 'David Summer'],
        match: /\B@(\w*)$/,
        search: function (keyword: string, callback: Function) {
          callback($.grep(this.mentions, function (item: string | string[]) {
            return item.indexOf(keyword) == 0;
          }));
        },
        content: function (item: string) {
          return '@' + item;
        }
      }
    });
  }

  getTextContent() {
    const content = $('#summernote').summernote('code');
    console.log(content);
  }

  getContent() {
    const content = $(this.el.nativeElement).find('.summernote').summernote('code');
    console.log(content);
  }

  setContent(content: string) {
    $(this.el.nativeElement).find('.summernote').summernote('code', content);
  }

  
  name: any = '';
  description: any = '';
  created_by: any = '';
 



  Users:any []=[];



  userId: number | null | undefined;
  userDetails: any;
  userDetailss: any[] = [];
  username: any;

  schemas: string[] = []; // Array to store schema names




  registerButtonClicked = false;


  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private employeeService: EmployeeService,
    private userService: UserMasterService,
    private el: ElementRef,
    private sessionService: SessionService,

    


) {}

ngOnInit(): void {
 
  this.loadUsers();


  this.userId = this.sessionService.getUserId();
  
  if (this.userId !== null) {
    this.authService.getUserData(this.userId).subscribe(
      (userData: any) => {
        this.userDetails = userData;
        this.created_by = this.userId; // Automatically set the owner to logged-in user ID

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



          registerGeneralreq(): void {
            this.registerButtonClicked = true;
            const companyData = {
              name: this.name,
            
              description:this.description,
            
              created_by:this.created_by,

           
        
              // Add other form field values to the companyData object
            };
          
        
            this.employeeService.registerReqType(companyData).subscribe(
              (response) => {
                console.log('Registration successful', response);
              
                    alert('Request Type has been Added ');
                    window.location.reload();
                    // window.location.reload();
               
        
              },
              (error) => {
                console.error('Added failed', error);
                alert('enter all field!')
                // Handle the error appropriately, e.g., show a user-friendly error message.
              }
            );
          }

}
