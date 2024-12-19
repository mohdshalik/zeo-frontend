import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CountryService } from '../country.service';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrl: './state-master.component.css'
})
export class StateMasterComponent {


  selectedDeparmentsecId:any | undefined;

  registerButtonClicked = false;
  Countries: any[] = [];

  States: any[] = [];


  state_name: string = '';
  country:any ='';


  constructor(
    private countryService: CountryService, 
    private authService: AuthenticationService, 

    private http: HttpClient,
    
  ) {}


  
  registerDepartment(): void {
    this.registerButtonClicked = true;
    const companyData = {
      state_name: this.state_name,
    
      country:this.country,
   

      // Add other form field values to the companyData object
    };
  

    this.countryService.registerState(companyData).subscribe(
      (response) => {
        console.log('Registration successful', response);
      
            alert('State has been Added ');
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

  ngOnInit(): void {
    this.loadDeparmentBranch();

    // this.loadCompanies();
    
this.loadstates();
   
  }


  loadDeparmentBranch(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
  
    this.countryService.getCountriesList(selectedSchema).subscribe(
      (result: any) => {
        this.Countries = result;
      },
      (error: any) => {
        console.error('Error fetching countries:', error);
      }
    );
    }
  }

  
  loadstates(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
  
    this.countryService.getstatescreated(selectedSchema).subscribe(
      (result: any) => {
        this.States = result;
      },
      (error: any) => {
        console.error('Error fetching countries:', error);
      }
    );
    }
  }



  // loadCompanies(): void { 
  //   const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

  //   console.log('schemastore',selectedSchema )
  //   // Check if selectedSchema is available
  //   if (selectedSchema) {
  //   this.countryService.getAllStatesList(selectedSchema).subscribe(
  //     (result: any) => {
  //       console.log(result); // Log the API response
  //       this.States = result; // Assuming the data is directly in the result without a 'data' property
  //     },
  //     (error) => {
  //       console.error('Error fetching states:', error);
  //     }
  //   );
  //   }
  // }


}
