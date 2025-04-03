import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CountryService } from '../country.service';
import { DocumentEditComponent } from '../document-edit/document-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { UserMasterService } from '../user-master/user-master.service';
import { AuthenticationService } from '../login/authentication.service';
import { SessionService } from '../login/session.service';


@Component({
  selector: 'app-document-type-master',
  templateUrl: './document-type-master.component.html',
  styleUrl: './document-type-master.component.css'
})
export class DocumentTypeMasterComponent {



  

  selectedDeparmentsecId:any | undefined;

  registerButtonClicked = false;
  Countries: any[] = [];

  Documents:any[] = [];


  type_name: string = '';
  description:any ='';

  
  hasAddPermission: boolean = false;
  hasDeletePermission: boolean = false;
  hasViewPermission: boolean =false;
  hasEditPermission: boolean = false;

  userId: number | null | undefined;
  userDetails: any;

  filteredDocuments: any[] = [];  // Filtered list



  constructor(
    private countryService: CountryService, 
    private http: HttpClient,
    private dialog:MatDialog,
    private UserMasterService: UserMasterService ,
    private authService: AuthenticationService,
    private sessionService: SessionService,
   

    
  ) {}


  ngOnInit(): void {
  
    
// Retrieve user ID
this.userId = this.sessionService.getUserId();

// Fetch user details using the obtained user ID
if (this.userId !== null) {
  this.authService.getUserData(this.userId).subscribe(
    async (userData: any) => {
      this.userDetails = userData; // Store user details in userDetails property
      console.log('User ID:', this.userId); // Log user ID
      console.log('User Details:', this.userDetails); // Log user details

      // Check if user is_superuser is true or false
      let isSuperuser = this.userDetails.is_superuser || false; // Default to false if is_superuser is undefined
     
      const selectedSchema = this.authService.getSelectedSchema();
      if (!selectedSchema) {
        console.error('No schema selected.');
        return;
      }
    
      if (isSuperuser) {
        console.log('User is superuser or ESS user');
        // Grant all permissions
        this.hasViewPermission = true;
        this.hasAddPermission = true;
        this.hasDeletePermission = true;
        this.hasEditPermission = true;
    
        // Fetch designations without checking permissions
        this.fetchDesignations(selectedSchema);
      } else {
        console.log('User is not superuser');

        const selectedSchema = this.authService.getSelectedSchema();
        if (selectedSchema) {
          // try {
          //   const userData: any = await this.UserMasterService.getDesignationsPermission(selectedSchema).toPromise();
          //   console.log('permissions:', userData);
        
          //   if (userData && userData.length > 0 && userData[0].groups) {
          //     const groupPermissions = userData[0].groups.flatMap((group: any) => group.permissions);
          //     console.log('Group Permissions:', groupPermissions);
        
          //     this.hasViewPermission = this.checkGroupPermission('view_document_type', groupPermissions);
          //     console.log('Has view permission:', this.hasViewPermission);
        
          //     this.hasAddPermission = this.checkGroupPermission('add_document_type', groupPermissions);
          //     console.log('Has add permission:', this.hasAddPermission);
        
          //     this.hasDeletePermission = this.checkGroupPermission('delete_document_type', groupPermissions);
          //     console.log('Has delete permission:', this.hasDeletePermission);
        
          //     this.hasEditPermission = this.checkGroupPermission('change_document_type', groupPermissions);
          //     console.log('Has edit permission:', this.hasEditPermission);
          //   } else {
          //     console.error('No groups found in data or data format is incorrect.', userData);
          //   }
        
          //   // Fetching designations after checking permissions
          //   this.fetchDesignations(selectedSchema);
          // }



          try {
            const permissionsData: any = await this.UserMasterService.getDesignationsPermission(selectedSchema).toPromise();
            console.log('Permissions data:', permissionsData);

            if (Array.isArray(permissionsData) && permissionsData.length > 0) {
              const firstItem = permissionsData[0];

              if (firstItem.is_superuser) {
                console.log('User is superuser according to permissions API');
                // Grant all permissions
                this.hasViewPermission = true;
                this.hasAddPermission = true;
                this.hasDeletePermission = true;
                this.hasEditPermission = true;
              } else if (firstItem.groups && Array.isArray(firstItem.groups) && firstItem.groups.length > 0) {
                const groupPermissions = firstItem.groups.flatMap((group: any) => group.permissions);
                console.log('Group Permissions:', groupPermissions);

               this.hasViewPermission = this.checkGroupPermission('view_document_type', groupPermissions);
             console.log('Has view permission:', this.hasViewPermission);
        
              this.hasAddPermission = this.checkGroupPermission('add_document_type', groupPermissions);
             console.log('Has add permission:', this.hasAddPermission);
        
             this.hasDeletePermission = this.checkGroupPermission('delete_document_type', groupPermissions);
             console.log('Has delete permission:', this.hasDeletePermission);
        
       this.hasEditPermission = this.checkGroupPermission('change_document_type', groupPermissions);
              console.log('Has edit permission:', this.hasEditPermission);
              } else {
                console.error('No groups found in data or groups array is empty.', firstItem);
              }
            } else {
              console.error('Permissions data is not an array or is empty.', permissionsData);
            }

            // Fetching designations after checking permissions
            this.fetchDesignations(selectedSchema);

          }
          
          catch (error) {
            console.error('Error fetching permissions:', error);
          }
        } else {
          console.error('No schema selected.');
        }

        // // Extract group permissions from user details
        // const groupPermissions = this.userDetails.groups.map((group: { permissions: any; }) => group.permissions).flat();
        // console.log('Group Permissions:', groupPermissions);

        // // Check permissions for various actions
        // this.hasViewPermission = this.checkGroupPermission('view_customusergroup', groupPermissions);
        // console.log('Has View Permission:', this.hasViewPermission);

        // this.hasAddPermission = this.checkGroupPermission('add_customusergroup', groupPermissions);
        // console.log('Has Add Permission:', this.hasAddPermission);

        // this.hasDeletePermission = this.checkGroupPermission('delete_customusergroup', groupPermissions);
        // console.log('Has Delete Permission:', this.hasDeletePermission);

        // this.hasEditPermission = this.checkGroupPermission('change_customusergroup', groupPermissions);
        // console.log('Has Edit Permission:', this.hasEditPermission);
      }
    },
    (error) => {
      console.error('Failed to fetch user details:', error);
    }
  );
} else {
  console.error('User ID is null.');
}


   
  }


  checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
    return groupPermissions.some(permission => permission.codename === codeName);
  }

  fetchDesignations(selectedSchema: string) {
    this.countryService.getDocument(selectedSchema).subscribe(
      (data: any) => {
        this.Documents = data;
        this.filteredDocuments = data;  // Initialize filtered data
        
        console.log('employee:', this.Documents);
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

    // Filter documents based on searchQuery
    filterDocuments() {
      this.filteredDocuments = this.Documents.filter(doc =>
        doc.type_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  
  registerDocumentType(): void {
    this.registerButtonClicked = true;

    const companyData = {
      type_name: this.type_name,
      description: this.description,
    };

    this.countryService.registerDocumentType(companyData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        alert('Document Type has been Added');
        window.location.reload();
      },
      (error) => {
        console.error('Addition failed', error);

        // Check if the error response contains validation messages from the backend
        if (error.error) {
          let errorMessage = 'Error: ';
          if (typeof error.error === 'string') {
            // If backend returns a simple error message
            errorMessage += error.error;
          } else if (typeof error.error === 'object') {
            // If backend returns an object with multiple field errors
            for (const key in error.error) {
              if (error.error.hasOwnProperty(key)) {
                errorMessage += `\n${key}: ${error.error[key]}`;
              }
            }
          }
          alert(errorMessage);
        } else {
          alert('An unknown error occurred. Please try again.');
        }
      }
    );
}


  // Variable to hold the selected document for editing
  selectedDoc: any = {};
  isDocumentnumbereditModalOpen: boolean = false;
  
    
openEditDocModal(state: any): void {
  // Clone the document (to avoid modifying the original before saving)
  this.selectedDoc = { ...state };
  this.isDocumentnumbereditModalOpen = true;
}



closeEditDocModal(): void {
  this.isDocumentnumbereditModalOpen = false;
}

// Method to update the document number via API
updateDocumentNumber(): void {
  // Optionally convert the date input to a year integer if needed:
  // Example: this.selectedDoc.year = new Date(this.selectedDoc.year).getFullYear();
  
  this.countryService.updateDocNum(this.selectedDoc.id, this.selectedDoc).subscribe(
    (response) => {
      console.log('Document type updated successfully', response);
      alert('Document type updated successfully.');
      // Optionally, refresh your list or reload the page
      this.closeEditDocModal();
       // re-fetch the list if needed
      window.location.reload();
    },
    (error) => {
      console.error('Error updating document type', error);
      const errorMessage = error.error?.error || 'Error updating document type.';
      alert(errorMessage);
    }
  );
}


  // loadCompanies(): void { 
  //   const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

  //   console.log('schemastore',selectedSchema )
  //   // Check if selectedSchema is available
  //   if (selectedSchema) {
  //   this.countryService.getAllDocsList(selectedSchema).subscribe(
  //     (result: any) => {
  //       console.log(result); // Log the API response
  //       this.Documents = result; // Assuming the data is directly in the result without a 'data' property
  //     },
  //     (error) => {
  //       console.error('Error fetching states:', error);
  //     }
  //   );
  //   }
  // }


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


  deleteDoc(permissionId: number): void {
    if (confirm('Are you sure you want to delete this permission?')) {
      const selectedSchema = this.authService.getSelectedSchema();
      if (selectedSchema) {
      this.countryService.deleteAssignedPermission(permissionId,selectedSchema).subscribe(
        (response) => {
          console.log('Document type deleted successfully', response);
          alert('Document type deleted successfully');
            
      const selectedSchema = this.authService.getSelectedSchema();
      if (!selectedSchema) {
        console.error('No schema selected.');
        return;
      }
          this.fetchDesignations(selectedSchema); // Refresh the list after deletion
        },
        (error) => {
          console.error('Error deleting Document type:', error);
          alert('Failed to delete permission');
        }
      );
    }
    }
  }


  isExpanded = false;
  searchQuery = '';

  toggleSearch() {
    this.isExpanded = !this.isExpanded;
  }




}
