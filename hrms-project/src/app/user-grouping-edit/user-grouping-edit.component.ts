import { Component,Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyRegistrationService } from '../company-registration.service';
import { AuthenticationService } from '../login/authentication.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Route,ActivatedRoute } from '@angular/router';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentCreationComponent } from '../department-creation/department-creation.component';
import { DepartmentServiceService } from '../department-master/department-service.service';
import { UserMasterService } from '../user-master/user-master.service';

@Component({
  selector: 'app-user-grouping-edit',
  templateUrl: './user-grouping-edit.component.html',
  styleUrl: './user-grouping-edit.component.css'
})
export class UserGroupingEditComponent {

  department: any;

  Departments: any[] = [];

  registerButtonClicked = false;

  selectedDeparmentsecId:any | undefined;

  selecteddepartmentId: number | undefined;


  GrouppermissionsEmp:any[] = [];
  Grouppermissionsall:any[] = [];
  GrouppermissionsDept:any[] = [];
  GrouppermissionsDis:any[] = [];
  GrouppermissionsCat:any[] = [];

  GrouppermissionsCmp:any[] = [];
  GrouppermissionsBrch:any[] = [];

  GrouppermissionsUser:any[] = [];

  GrouppermissionsUsergroup:any[] = [];



  name:any='';
  permission:any='';
  permissions:any='';
  user_permissions:any='';

  groupName: string = '';


  constructor(
    private ref:MatDialogRef<DepartmentCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { departmentId: number },
    private userMasterService: UserMasterService,
    private DepartmentServiceService: DepartmentServiceService,

    private renderer: Renderer2,
    private http: HttpClient,
    private authService: AuthenticationService,
    private dialogRef: MatDialogRef<UserGroupingEditComponent>

  ) {
    this.userMasterService.getCategoryById(data.departmentId).subscribe(department => {
      this.department = department;
    });// this.userMasterService.getCategoryById(data.departmentId).subscribe(department => {
    //   this.department = department;
    // });
  }

  ngOnInit(): void {


    

    this.userMasterService.getCategoryById(this.data.departmentId).subscribe(
      (department) => {
        this.department = department;
      },
      (error) => {
        console.error('Error fetching department:', error);
      }
    );

    this.loadDeparmentBranch();


    
    this.loadpermissionsEmpMaster();
    // this.loadpermissionsall();
    this.loadpermissionsDepartMaster();
    this.loadpermissionsDisgMaster();
    this.loadpermissionsCatgMaster();

    this.loadpermissionsCmpMaster();
    this.loadpermissionsBranchMaster();
    this.loadpermissionsUserMaster();
    this.loadpermissionsUserGroupMaster();
  }

  loadDeparmentBranch(): void {
    this.DepartmentServiceService.getDeptBranch().subscribe(
      (result: any) => {
        this.Departments = result;
        console.log(' fetching Companies:');

      },
      (error) => {
        console.error('Error fetching Companies:', error);
      }
    );
  }

  updateCategory(): void {
    // Update category
    this.userMasterService.updateCategory(this.data.departmentId, this.department).subscribe(
      (response) => {
        console.log('department updated successfully:', response);
        // Close the dialog when category is updated
        alert('Deaprtment Updated ');

        this.dialogRef.close();
        window.location.reload();
      },
      (error) => {
        console.error('Error updating department:', error);
      }
    );
  }

  ClosePopup(){
    this.ref.close('Closed using function')
  }








  

  companyMasterChecked: boolean = false;
  branchMasterChecked: boolean = false;

  userMasterChecked: boolean = false;

  usergroupingMasterChecked: boolean = false;

  selectedPermissions: any[] = [];


  employeeMasterChecked: boolean = false;
  selectAllChecked: boolean = false;

  // Other checkboxes' states
  departmentMasterChecked: boolean = false;
  designationMasterChecked: boolean = false;
  categoryMasterChecked: boolean = false;


  expandedMasters: boolean = true;
  expandedMasterss: boolean = true;



  onCheckboxChange(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  }


  onEmployeeMasterChange(): void {
    if (this.employeeMasterChecked) {
        // If "Employee Master" checkbox is checked, select all employee permissions
        this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsEmp.map(permission => permission.id));
    } else {
        // If "Employee Master" checkbox is unchecked, deselect all employee permissions
        this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsEmp.map(p => p.id).includes(permission));
    }
}

onDepartmentMasterChange(): void {
    if (this.departmentMasterChecked) {
        // If "Department Master" checkbox is checked, select all department permissions
        this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsDept.map(permission => permission.id));
    } else {
        // If "Department Master" checkbox is unchecked, deselect all department permissions
        this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsDept.map(p => p.id).includes(permission));
    }
}
    

onDesignationMasterChange(): void {
  if (this.designationMasterChecked) {
      // If "Employee Master" checkbox is checked, select all employee permissions
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsDis.map(permission => permission.id));
  } else {
      // If "Employee Master" checkbox is unchecked, deselect all employee permissions
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsDis.map(p => p.id).includes(permission));
  }
}

onCategoryMasterChange(): void {
  if (this.categoryMasterChecked) {
      // If "Department Master" checkbox is checked, select all department permissions
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsCat.map(permission => permission.id));
  } else {
      // If "Department Master" checkbox is unchecked, deselect all department permissions
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsCat.map(p => p.id).includes(permission));
  }
}


onCompanyChange(): void {
  if (this.companyMasterChecked) {
      // If "Department Master" checkbox is checked, select all department permissions
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsCmp.map(permission => permission.id));
  } else {
      // If "Department Master" checkbox is unchecked, deselect all department permissions
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsCmp.map(p => p.id).includes(permission));
  }
}


onBranchMasterChange(): void {
  if (this.branchMasterChecked) {
      // If "Department Master" checkbox is checked, select all department permissions
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsBrch.map(permission => permission.id));
  } else {
      // If "Department Master" checkbox is unchecked, deselect all department permissions
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsBrch.map(p => p.id).includes(permission));
  }
}

onUserMasterChange(): void {
  if (this.userMasterChecked) {
      // If "Department Master" checkbox is checked, select all department permissions
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsUser.map(permission => permission.id));
  } else {
      // If "Department Master" checkbox is unchecked, deselect all department permissions
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsUser.map(p => p.id).includes(permission));
  }
}



onUsergroupingMasterChange(): void {
  if (this.usergroupingMasterChecked) {
      // If "Department Master" checkbox is checked, select all department permissions
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsUsergroup.map(permission => permission.id));
  } else {
      // If "Department Master" checkbox is unchecked, deselect all department permissions
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsUsergroup.map(p => p.id).includes(permission));
  }
}








// loadpermissionsall(): void {
//   this.userMasterService.getPermissionByRoleGrouping().subscribe(
//     (result: any) => {
//       this.Grouppermissionsall = result;
//     },
//     (error: any) => {
//       console.error('Error fetching countries:', error);
//     }
//   );
// }
 loadpermissionsEmpMaster(): void {

    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
      this.userMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
        (result: any) => {
          this.GrouppermissionsEmp = result.slice(44, 48);
        },
        (error: any) => {
          console.error('Error fetching countries:', error);
        }
      );
    }
    else {
      console.error('No schema selected.');
    }
   
  }

  loadpermissionsDepartMaster(): void {

    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
      this.userMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
        (result: any) => {
          this.GrouppermissionsDept = result.slice(76, 80);
        },
        (error: any) => {
          console.error('Error fetching countries:', error);
        }
      );
    }
    else {
      console.error('No schema selected.');
    }
 
  }



  loadpermissionsDisgMaster(): void {

    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )

if (selectedSchema) {
  this.userMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
    (result: any) => {
      this.GrouppermissionsDis = result.slice(80, 84);
    },
    (error: any) => {
      console.error('Error fetching countries:', error);
    }
  );
     	
    }
    else {
      console.error('No schema selected.');
    }

  
  }


  loadpermissionsCatgMaster(): void {



    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )

if (selectedSchema) {
  this.userMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
    (result: any) => {
      this.GrouppermissionsCat = result.slice(72, 76);
    },
    (error: any) => {
      console.error('Error fetching countries:', error);
    }
  );
     	
    }
    else {
      console.error('No schema selected.');
    }

   
  }


  loadpermissionsCmpMaster(): void {


    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )

if (selectedSchema) {
  this.userMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
    (result: any) => {
      this.GrouppermissionsCmp = result.slice(68, 72);
    },
    (error: any) => {
      console.error('Error fetching countries:', error);
    }
  );
    }
    else {
      console.error('No schema selected.');
    }


    
  }

  loadpermissionsBranchMaster(): void {


    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )

if (selectedSchema) {
     	
  this.userMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
    (result: any) => {
      this.GrouppermissionsBrch = result.slice(64, 68);
    },
    (error: any) => {
      console.error('Error fetching countries:', error);
    }
  );
    }
    else {
      console.error('No schema selected.');
    }

   
  }


  
  loadpermissionsUserMaster(): void {

    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )

if (selectedSchema) {
  this.userMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
    (result: any) => {
      this.GrouppermissionsUser = result.slice(108, 112);
    },
    (error: any) => {
      console.error('Error fetching countries:', error);
    }
  );
    }
    else {
      console.error('No schema selected.');
    }

  
  }

  loadpermissionsUserGroupMaster(): void {


    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )

if (selectedSchema) {
     	
  this.userMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
    (result: any) => {
      this.GrouppermissionsUsergroup = result.slice(112, 116);
    },
    (error: any) => {
      console.error('Error fetching countries:', error);
    }
  );
    }
    else {
      console.error('No schema selected.');
    }

  
  }
  




showexpandable() {
  this.expandedMasters = !this.expandedMasters;
}

showexpandables() {
  this.expandedMasterss = !this.expandedMasterss;
}


  // Method to check/uncheck all individual checkboxes based on the state of the "Select All" checkbox
  selectAll(): void {
    this.employeeMasterChecked = this.selectAllChecked;
    this.departmentMasterChecked = this.selectAllChecked;
    this.designationMasterChecked = this.selectAllChecked;
    this.categoryMasterChecked = this.selectAllChecked;

    

  }

}
