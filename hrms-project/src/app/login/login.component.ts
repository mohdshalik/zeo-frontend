import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { style } from '@angular/animations';
import { AuthenticationService } from './authentication.service';
import { UserMasterComponent } from '../user-master/user-master.component';
import { UserMasterService } from '../user-master/user-master.service';
import { EmployeeService } from '../employee-master/employee.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  username: string = 'admin';
  hide: boolean = true;
  input: any;
  register: any;
  email = '';
  password = 'admin';
  contact_number: any='';

  users: any[] = [];

  registerButtonClicked = false;


  first_name: string = '';


  

  loggedInUser: any; // Assuming this contains logged-in user's data


  constructor(private UserMasterService: UserMasterService,
     private router: Router,
      private authService: AuthenticationService,
      private EmployeeService: EmployeeService) { }

  ngOnInit(): void {
    

    this.loadEmployee();
    // user register  section

    this.register = {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      // companyrole:'',
      contact_number: '',
      password: '',

    };


    // user login section

    // this.input = {

    //   email: 'testing@gmail.com',

    //   password: 'test'

    // }

    

  }

  isEssUser: boolean = true; // Default value, adjust based on your logic


  login(): void {
    this.registerButtonClicked = true;

     // Basic validation for username and password fields
  if (!this.username || !this.password) {
    if (!this.username) {
      alert('Username field is blank.');
    }
    if (!this.password) {
      alert('Password field is blank.');
    }
    // return; // Exit the function if validation fails
  }
    
  
    this.authService.login( this.password,this.username,).subscribe(
      (response: any) => {
        const token = response.access;
        this.authService.setAuthToken(token);
  
        // Extract the user ID from the login response
        const userId = response.user_id; // Adjust this according to your login response structure
  
      
        
        // Proceed with fetching user data using the obtained user ID
        this.authService.getUserData(userId).subscribe(
          (userData: any) => {
            console.log('User Data:', userData); // Log user data
            const isEssUser = userData.is_ess;
            const tenants = userData.allocated_tenants;


            if (isEssUser && tenants.length > 0) {
              
              // Automatically select the first tenant for the employee
              const tenant = tenants[0]; // Assuming the first tenant in the array is to be used
              const selectedSchema = tenant.schema_name; // Assuming the tenant ID is in the tenants array
              localStorage.setItem('selectedSchema', selectedSchema.toString());

              this.router.navigate(['/employee-dashboard/employee-sction']);
       
              // this.EmployeeService.getEmployeeDetails(userId).subscribe(
              //   (employeeDetails) => {
              //     console.log('Employee Details:', employeeDetails); // Log employee details
              //     this.router.navigate(['/employee-dashboard/employee-master']);
              //   },
              //   (error) => {
              //     console.error('Failed to fetch employee details', error);
              //     alert('Failed to fetch employee details. Please try again.');
              //   }
              // );
            } else if (!isEssUser) {
              this.router.navigate(['/schema-selection']);
              alert('Login Successful.');
            } else {
              alert('No tenant available for the user.');
              console.error('No tenant available for the user.');
            }
          },
          error => {
            console.error('Error fetching user data:', error);
            alert('An error occurred while fetching user data. Please try again.');
          }
        );
      },
      (error:HttpErrorResponse) => {

        if (error.status === 401) {
          // Unauthorized error, typically used for wrong credentials
          alert('Incorrect username or password.');
        } else {
          // General error message
          const errorMessage = error.error?.detail || 'Enter correct user ID and Password';
          alert(`Login error: ${errorMessage}`);
        }
           

        // console.error('Login error', error);
        // // alert('Enter correct user ID and Password');
        //       alert(`Login error: ${error.statusText}`);
      }
    );
  }
  
  

  
  

  loadEmployee(): void {
    this.authService.getEmployee().subscribe(
      (result: any) => {
        this.users = result;
        console.log(' fetching Users:');

      },
      (error) => {
        console.error('Error fetching USERS:', error);
      }
    );
  }


  

  // user register button click event code here

  registerUser() {

    // this.registerButtonClicked = true;

    this.UserMasterService.registeruser(this.register).subscribe(
      _Response => {
        const token = _Response.access;  // Assuming your token key is 'access'
        this.authService.setAuthToken(token);
        alert('User has been created!')
        // this.router.navigate(['./login']);
        this.showCurrentDiv = !this.showCurrentDiv;
      },

      (error) => {
        if (error instanceof HttpErrorResponse && error.status === 400) {
          // Handle validation errors
          console.log('Validation errors:', error.error);
          // Display error messages to the user
          alert('Please enter all fields')

        } else {
          // Handle other types of errors
          console.error('Unexpected error:', error);
          alert('Something Error')
          // console.log('Please fill in the required fields.');
          // alert('enter all fields')
        }

      }
    );

  }


  // login event code here

  // onLogin() {

  //   this.userService.loginUser(this.input).subscribe(
  //     _Response => {

  //       this.router.navigate(['/company-selection']);
  //       alert('User has been Login!')
  //       // alert(`Welcome, ${this.username}!`);
  //     },

  //     (error) => {
  //       if (error instanceof HttpErrorResponse && error.status === 400) {
  //         // Handle validation errors
  //         console.log('Validation errors:', error.error);
  //         // Display error messages to the user
  //         alert('Please enter all fields');
  //         // style.border = '8px solid green';


  //       } else {
  //         // Handle other types of errors
  //         console.error('Unexpected error:', error);
  //         // console.log('Please fill in the required fields.');
  //         // alert('enter all fields')
  //       }

  //     }
  //   );

  // }









  // switching sign in and signup pages code here


  showCurrentDiv: boolean = true;
  showButton: boolean = true;

  toggleDivs() {
    this.showCurrentDiv = !this.showCurrentDiv;

  }





}
