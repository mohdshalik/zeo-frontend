import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserMasterService } from '../user-master/user-master.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-user-role-grouping-create',
  templateUrl: './user-role-grouping-create.component.html',
  styleUrls: ['./user-role-grouping-create.component.css'],
})
export class UserRoleGroupingCreateComponent implements OnInit {
  GrouppermissionsEmp: any[] = [];
  GrouppermissionsDept: any[] = [];
  GrouppermissionsDis: any[] = [];
  GrouppermissionsCat: any[] = [];
  GrouppermissionsCmp: any[] = [];
  GrouppermissionsBrch: any[] = [];
  GrouppermissionsUser: any[] = [];
  GrouppermissionsUsergroup: any[] = [];
  GrouppermissionsassigneddUser: any[] = [];
  GrouppermissionsstateMaster: any[] = [];
  Grouppermissionsdocumentype: any[] = [];
  Grouppermissionsexpirydocuments: any[] = [];
  GrouppermissionslocationMaster: any[] = [];
  GrouppermissionsemployeeReport: any[] = [];
  GrouppermissionsdocumnetReport: any[] =[];
  GrouppermissiionsgeneralReport: any[]=[];
  Grouppermissionsaddweek:any[] =[];
  Grouppermisionsassignweek:any[]=[];
  Grouppermissionsaddholiday: any[]=[];
  Grouppermissionsassisgnholiday:any[]=[];
  groupName: string = '';
  codename:string ='';
  profile:string ='';
  selectedPermissions: any[] = [];
  employeeMasterIndeterminate = false;
departmentMasterInderminate= false;
designationMasterInderminate = false;
categoryMasterInderminate = false;
branchMasterInderminate = false;
userMasterInderminate = false;
userGroupMasterInderminate= false;
assignMasterInderminate= false;
stateMasterInderminate= false;
documentMasterInderminate= false;
expiredMasterInderminate= false;
locationMasterInderminate= false;
emportReportInderminate= false;
documentReportInderminate = false;
generalReportInderminate= false;
addweekInderminate=false;
assignweekInderminate= false;
addholidayInderminate= false;
assignholidayInderminate= false;
calenderdetailInderminate= false;
  // Add these lines
  employeeMasterChecked: boolean = false;
  departmentMasterChecked: boolean = false;
  designationMasterChecked: boolean = false;
  categoryMasterChecked: boolean = false;
  companyMasterChecked: boolean = false;
  branchMasterChecked: boolean = false;
  userMasterChecked: boolean = false;
  usergroupingMasterChecked: boolean = false;
  assignpermissionMasterChecked: boolean =false;
  stationMasterChecked:boolean =false;
  documenttypeMasterChecked:boolean = false;
  expireddocumnetsMasterChecked:boolean = false;
  locationMasterChecked:boolean = false;
  emportReportChecked:boolean = false;
  documentReportChecked:boolean = false;
  generelReportChecked:boolean = false;
  addweekChecked:boolean= false;
  assignweekChecked:boolean = false;
  addholidayChecked:boolean= false;
  assignholidayChecked:boolean = false;
  selectAllChecked: boolean = false;
  settingsChecked: boolean = false;
  reportchecked:boolean = false;
  calenderchecked:boolean = false;
  expandedMasters: boolean = true;
  expandedMastersvalue: boolean = true;
  reportMastersvalue:boolean =true;
  calenderMastersvalue:boolean =true;

  // Add this property
  registerButtonClicked: boolean = false;
  childCheckboxes = [
    'branchMasterChecked',
    'userMasterChecked',
    'userGroupingMasterChecked',
    'assignPermissionMasterChecked',
    'stateMasterChecked',
    'documentTypeMasterChecked',
    'expiredDocumentsMasterChecked',
    'locationMasterChecked'
  ];
  checkboxes = [
    { label: 'Branch Master', checked: false },
    { label: 'User Master', checked: false },
    { label: 'User Grouping', checked: false },
    { label: 'Assign Permission For User', checked: false },
    { label: 'State Master', checked: false },
    { label: 'Document Type', checked: false },
    { label: 'Expired Documents', checked: false },
    { label: 'Location Master', checked: false },
  ];
  // permissionNameMap: { [key: string]: string } = {
  //   "Add_emp_master": "Add ",
  //   "Change_emp_master": "Edit",
  //   "Delete_emp_master": "Delete",
  //   "View_emp_master": "View"
  // };
  

 


  isEmployeeManagementMasterChecked(): boolean {
    return this.employeeMasterChecked &&
      this.departmentMasterChecked &&
      this.designationMasterChecked &&
      this.categoryMasterChecked;
  }
  
  isEmployeeMasterIndeterminate(): boolean {
    const selectedEmpPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsEmp.map(p => p.id).includes(permission)
    );
    return selectedEmpPermissions.length > 0 && selectedEmpPermissions.length < this.GrouppermissionsEmp.length;
  }

  isDepartmentMasterIndeterminate(): boolean {
    const selectedDeptPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsDept.map(p => p.id).includes(permission)
    );
    return selectedDeptPermissions.length > 0 && selectedDeptPermissions.length < this.GrouppermissionsDept.length;
  }

  isDesignationMasterIndeterminate(): boolean {
    const selectedDisPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsDis.map(p => p.id).includes(permission)
    );
    return selectedDisPermissions.length > 0 && selectedDisPermissions.length < this.GrouppermissionsDis.length;
  }

  isCategoryMasterIndeterminate(): boolean {
    const selectedCatPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsCat.map(p => p.id).includes(permission)
    );
    return selectedCatPermissions.length > 0 && selectedCatPermissions.length < this.GrouppermissionsCat.length;
  }

  isSettingsMasterChecked(): boolean {
    return this.branchMasterChecked &&
      this.userMasterChecked &&
      this.usergroupingMasterChecked &&
      this.assignpermissionMasterChecked &&
      this.stationMasterChecked &&
      this.documenttypeMasterChecked &&
      this.expireddocumnetsMasterChecked &&
      this.locationMasterChecked;
  }
  
  
  
  
  // isCompanyMasterIndeterminate(): boolean {
  //   const selectedComPermissions = this.selectedPermissions.filter(permission =>
  //     this.GrouppermissionsCmp.map(p => p.id).includes(permission)
  //   );
  //   return selectedComPermissions.length > 0 && selectedComPermissions.length < this.GrouppermissionsCmp.length;
  // }
   isBranchMasterIndeterminate(): boolean {
    const selectedBranchPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsBrch.map(p => p.id).includes(permission)
    );
    return selectedBranchPermissions.length > 0 && selectedBranchPermissions.length < this.GrouppermissionsBrch.length;
  }
 
  isUserMasterIndeterminate(): boolean {
    const selectedUserMasterPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsUser.map(p => p.id).includes(permission)
    );
    return selectedUserMasterPermissions.length > 0 && selectedUserMasterPermissions.length < this.GrouppermissionsUser.length;
  }
  isUserGroupingIndeterminate(): boolean {
    const selectedUserGroupPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsUsergroup.map(p => p.id).includes(permission)
    );
    return selectedUserGroupPermissions.length > 0 && selectedUserGroupPermissions.length < this.GrouppermissionsUsergroup.length;
  }
    isAssignPermissionsIndeterminate(): boolean {
    const selectedAssignPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsassigneddUser.map(p => p.id).includes(permission)
    );
    return selectedAssignPermissions.length > 0 && selectedAssignPermissions.length < this.GrouppermissionsassigneddUser.length;
  }
    isStateMasterIndeterminate(): boolean {
    const selectedstatePermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsstateMaster.map(p => p.id).includes(permission)
    );
    return selectedstatePermissions.length > 0 && selectedstatePermissions.length < this.GrouppermissionsstateMaster.length;
  }
      isdocumenttypeIndeterminate(): boolean {
    const selecteddocumentPermissions = this.selectedPermissions.filter(permission =>
      this.Grouppermissionsdocumentype.map(p => p.id).includes(permission)
    );
    return selecteddocumentPermissions.length > 0 && selecteddocumentPermissions.length < this.Grouppermissionsdocumentype.length;
  }
        isExpireddocumentsIndeterminate(): boolean {
    const selectedexpiredPermissions = this.selectedPermissions.filter(permission =>
      this.Grouppermissionsexpirydocuments.map(p => p.id).includes(permission)
    );
    return selectedexpiredPermissions.length > 0 && selectedexpiredPermissions.length < this.Grouppermissionsexpirydocuments.length;
  }
          isloactionmasterIndeterminate(): boolean {
    const selectedlocationPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionslocationMaster.map(p => p.id).includes(permission)
    );
    return selectedlocationPermissions.length > 0 && selectedlocationPermissions.length < this.GrouppermissionslocationMaster.length;
  }
  

  
  isReportManagementMasterChecked(): boolean {
    return this.emportReportChecked &&
      this.documentReportChecked &&
      this.generelReportChecked 
  }
  
  isEmployeeReportIndeterminate(): boolean {
    const selectedempreportPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsemployeeReport.map(p => p.id).includes(permission)
    );
    return selectedempreportPermissions.length > 0 && selectedempreportPermissions.length < this.GrouppermissionsemployeeReport.length;
  }

  isDocumentReportIndeterminate(): boolean {
    const selecteddocreportPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsdocumnetReport.map(p => p.id).includes(permission)
    );
    return selecteddocreportPermissions.length > 0 && selecteddocreportPermissions.length < this.GrouppermissionsdocumnetReport.length;
  }

  isGeneralReportIndeterminate(): boolean {
    const selectedGenReportPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissiionsgeneralReport.map(p => p.id).includes(permission)
    );
    return selectedGenReportPermissions.length > 0 && selectedGenReportPermissions.length < this.GrouppermissiionsgeneralReport.length;
  }


  isCalenderMangementMasterChecked():boolean{
    return this.addweekChecked &&
          this.assignweekChecked &&
          this.addholidayChecked &&
          this.assignholidayChecked 
  }

  isAddWeekIndeterminate(): boolean {
    const selectedaddweekPermissions = this.selectedPermissions.filter(permission =>
      this.Grouppermissionsaddweek.map(p => p.id).includes(permission)
    );
    return selectedaddweekPermissions.length > 0 && selectedaddweekPermissions.length < this.Grouppermissionsaddweek.length;
  }
  isAssignWeekIndeterminate(): boolean {
    const selectedassignweekPermissions = this.selectedPermissions.filter(permission =>
      this.Grouppermisionsassignweek.map(p => p.id).includes(permission)
    );
    return selectedassignweekPermissions.length > 0 && selectedassignweekPermissions.length < this.Grouppermisionsassignweek.length;
  }
  isAddHolidayIndeterminate(): boolean {
    const selectedaddholidayPermissions = this.selectedPermissions.filter(permission =>
      this.Grouppermissionsaddholiday.map(p => p.id).includes(permission)
    );
    return selectedaddholidayPermissions.length > 0 && selectedaddholidayPermissions.length < this.Grouppermissionsaddholiday.length;
  }
  isAssignHolidayIndeterminate(): boolean {
    const selectedassignholidayPermissions = this.selectedPermissions.filter(permission =>
      this.Grouppermissionsassisgnholiday.map(p => p.id).includes(permission)
    );
    return selectedassignholidayPermissions.length > 0 && selectedassignholidayPermissions.length < this.Grouppermissionsassisgnholiday.length;
  }
 
  constructor(
    private UserMasterService: UserMasterService,
    private authService: AuthenticationService,
    private http: HttpClient,
    private ref: MatDialogRef<UserRoleGroupingCreateComponent>
  ) {}

  ngOnInit(): void {
    this.loadPermissions();
    this.loadSettingPermissions();
    this.loadReportPermissions();
    this.loadCalenderPermissions();
    this.updateIndeterminateStates();
    this.updateIndeterminateStatesvalue();
    this.updateIndeterminateReports();
    this.updateInderminateCalenders();


  }
  updateIndeterminateStates(): void {
    this.isEmployeeMasterIndeterminate();
    this.isDepartmentMasterIndeterminate();
    this.isDesignationMasterIndeterminate();
    this.isCategoryMasterIndeterminate();
  }

  updateIndeterminateStatesvalue(): void{
    // this.isBranchMasterIndeterminate();
    this.isBranchMasterIndeterminate();
    this.isUserMasterIndeterminate();
    this.isUserGroupingIndeterminate();
    this.isAssignPermissionsIndeterminate();
    this.isStateMasterIndeterminate();
    this.isdocumenttypeIndeterminate();
    this.isExpireddocumentsIndeterminate();
    this.isloactionmasterIndeterminate();
  
  }

updateIndeterminateReports(): void{
  this.isEmployeeReportIndeterminate();
  this.isDocumentReportIndeterminate();
  this.isGeneralReportIndeterminate();
}

updateInderminateCalenders():void{
  this.isAddHolidayIndeterminate();
  this.isAddWeekIndeterminate();
  this.isAssignWeekIndeterminate();
  this.isAssignHolidayIndeterminate();
}

  loadPermissions(): void {
    this.loadpermissionsEmpMaster();
    this.loadpermissionsDepartMaster();
    this.loadpermissionsDisgMaster();
    this.loadpermissionsCatgMaster();
    // this.loadpermissionsCmpMaster();
   
  }
  loadSettingPermissions():void{
    this.loadpermissionsBranchMaster();
    this.loadpermissionsUserMaster();
    this.loadpermissionsUserGroupMaster();
    this.loadpermissionsassigneduser();
    this.loadpermissionsstatemaster();
    this.loadpermissionsdocumnettype();
    this.loadpermissionexpirydocuments();
    this.loadpermissionlocationmaster();
  }

  loadReportPermissions():void{
    this.loadpermissionsEmpReport();
    this.loadpermissionsDocReport();
    this.loadpermissionsGenReport();
   
  }


  loadCalenderPermissions():void{
    this.loadpermissionsAddweekDetail();
    this.loadpermissionsAssignweekDetail();
    this.loadpermissionsAddholidayDetail();
    this.loadpermissionsAssignholidayDetail();
  }
//load employee master permissions 

  loadpermissionsEmpMaster(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )

if (selectedSchema) {
     	
  this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
    (result: any) => {
        this.GrouppermissionsEmp = result.slice(96, 100);
        
      },
      (error: any) => {
        console.error('Error fetching permissions:', error);
      }
    );
}
  }


    //Display Name add view delte code for emplotee master-------

    getDisplayNameEmp(permissionCodename: string): string {
      switch (permissionCodename.trim().toLowerCase()) {
        case 'add_emp_master':
          return 'Add';
        case 'change_emp_master':
          return 'Edit';
        case 'delete_emp_master':
          return 'Delete';
        case 'view_emp_master':
          return 'View';
        default:
          return permissionCodename;
      }
    }


    //load permission for department

  loadpermissionsDepartMaster(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )

if (selectedSchema) {
     	
  this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
    (result: any) => {
        this.GrouppermissionsDept = result.slice(221, 225);
      },
      (error: any) => {
        console.error('Error fetching permissions:', error);
      }
    );
}
  }


  
  //Display Name  add view delte code for department master-------
  getDisplayNameDept(permissionCodename: string): string {
    switch (permissionCodename.trim().toLowerCase()) {
      case 'add_dept_master':
        return 'Add';
      case 'change_dept_master':
        return 'Edit';
      case 'delete_dept_master':
        return 'Delete';
      case 'view_dept_master':
        return 'View';
      default:
        return permissionCodename;
    }
  }


  // load permission for designation matser

  loadpermissionsDisgMaster(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )

if (selectedSchema) {
     	
  this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
    (result: any) => {
        this.GrouppermissionsDis = result.slice(225, 229);
      },
      (error: any) => {
        console.error('Error fetching permissions:', error);
      }
    );
}
  }


    //Display Name  add view delte code for department master-------
    getDisplayNameDesg(permissionCodename: string): string {
      switch (permissionCodename.trim().toLowerCase()) {
        case 'add_desgntn_master':
          return 'Add';
        case 'change_desgntn_master':
          return 'Edit';
        case 'delete_desgntn_master':
          return 'Delete';
        case 'view_desgntn_master':
          return 'View';
        default:
          return permissionCodename;
      }
    }

    //load permission for category master

  loadpermissionsCatgMaster(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )

if (selectedSchema) {
     	
  this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
    (result: any) => {
        this.GrouppermissionsCat = result.slice(217, 221);
      },
      (error: any) => {
        console.error('Error fetching permissions:', error);
      }
    );
}
  }


   //Display Name  add view delte code for category master-------

   getDisplayNameCat(permissionCodename: string): string {
    switch (permissionCodename.trim().toLowerCase()) {
      case 'add_ctgry_master':
        return 'Add';
      case 'change_ctgry_master':
        return 'Edit';
      case 'delete_ctgry_master':
        return 'Delete';
      case 'view_ctgry_master':
        return 'View';
      default:
        return permissionCodename;
    }
  }




// load permission for company master---------

  loadpermissionsCmpMaster(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )

if (selectedSchema) {
     	
  this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
    (result: any) => {
        this.GrouppermissionsCmp = result.slice(253, 259);
      },
      (error: any) => {
        console.error('Error fetching permissions:', error);
      }
    );
}
  }
  

     //Display Name  add view delte code for category master-------

     getDisplayNameCmp(permissionCodename: string): string {
      switch (permissionCodename.trim().toLowerCase()) {
        case 'add_cmpny_master':
          return 'Add';
        case 'change_cmpny_master':
          return 'Edit';
        case 'delete_cmpny_master':
          return 'Delete';
        case 'view_cmpny_master':
          return 'View';
        default:
          return permissionCodename;
      }
    }
  

//load permission for branch master------------

  loadpermissionsBranchMaster(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )

if (selectedSchema) {
     	
  this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
    (result: any) => {
        this.GrouppermissionsBrch = result.slice(213, 217);
      },
      (error: any) => {
        console.error('Error fetching permissions:', error);
      }
    );
}
  }


     //Display Name  add view delte code for Branch master-------

     getDisplayNameBranch(permissionCodename: string): string {
      switch (permissionCodename.trim().toLowerCase()) {
        case 'add_brnch_mstr':
          return 'Add';
        case 'change_brnch_mstr':
          return 'Edit';
        case 'delete_brnch_mstr':
          return 'Delete';
        case 'view_brnch_mstr':
          return 'View';
        default:
          return permissionCodename;
      }
    }

 
 //load permission for user master----------
    loadpermissionsUserMaster(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )

if (selectedSchema) {
     	
  this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
    (result: any) => {
        this.GrouppermissionsUser = result.slice(257, 261);
      },
      (error: any) => {
        console.error('Error fetching permissions:', error);
      }
    );
}
  }


    //Display Name  add view delte code for user master-------

    getDisplayNameUser(permissionCodename: string): string {
      switch (permissionCodename.trim().toLowerCase()) {
        case 'add_customuser':
          return 'Add';
        case 'change_customuser':
          return 'Edit';
        case 'delete_customuser':
          return 'Delete';
        case 'view_customuser':
          return 'View';
        default:
          return permissionCodename;
      }
    }


  //load permisssion for group master-------
  loadpermissionsUserGroupMaster(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )

if (selectedSchema) {
     	
  this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
    (result: any) => {
        this.GrouppermissionsUsergroup = result.slice(4, 8);
      },
      (error: any) => {
        console.error('Error fetching permissions:', error);
      }
    );
}
  }


   //Display Name  add view delte code for group master-------

   getDisplayNameUserGroup(permissionCodename: string): string {
    switch (permissionCodename.trim().toLowerCase()) {
      case 'add_group':
        return 'Add';
      case 'change_group':
        return 'Edit';
      case 'delete_group':
        return 'Delete';
      case 'view_group':
        return 'View';
      default:
        return permissionCodename;
    }
  }


//load permission for assigned permission for user---------
  loadpermissionsassigneduser(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )

if (selectedSchema) {
     	
  this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
    (result: any) => {
        this.GrouppermissionsassigneddUser = result.slice(8, 12);
      },
      (error: any) => {
        console.error('Error fetching permissions:', error);
      }
    );
}
  }


   //Display Name  add view delte code for User assigned permission master-------

   getDisplayNameUserPermission(permissionCodename: string): string {
    switch (permissionCodename.trim().toLowerCase()) {
      case 'add_permission':
        return 'Add';
      case 'change_permission':
        return 'Edit';
      case 'delete_permission':
        return 'Delete';
      case 'view_permission':
        return 'View';
      default:
        return permissionCodename;
    }
  }


  //load permission for state master----------------
  loadpermissionsstatemaster(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )

if (selectedSchema) {
     	
  this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
    (result: any) => {
        this.GrouppermissionsstateMaster = result.slice(68, 72);
      },
      (error: any) => {
        console.error('Error fetching permissions:', error);
      }
    );
}
  }


   //Display Name  add view delte code for state master-------

   getDisplayNameState(permissionCodename: string): string {
    switch (permissionCodename.trim().toLowerCase()) {
      case 'add_state_mstr':
        return 'Add';
      case 'change_state_mstr':
        return 'Edit';
      case 'delete_state_mstr':
        return 'Delete';
      case 'view_state_mstr':
        return 'View';
      default:
        return permissionCodename;
    }
  }



  //load permission for document type master-----------
  loadpermissionsdocumnettype(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )

if (selectedSchema) {
     	
  this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
    (result: any) => {
        this.Grouppermissionsdocumentype= result.slice(185, 189);
      },
      (error: any) => {
        console.error('Error fetching permissions:', error);
      }
    );
}
  }

   //Display Name  add view delte code for Document type master-------

   getDisplayNameDocType(permissionCodename: string): string {
    switch (permissionCodename.trim().toLowerCase()) {
      case 'add_document_type':
        return 'Add';
      case 'change_document_type':
        return 'Edit';
      case 'delete_document_type':
        return 'Delete';
      case 'view_document_type':
        return 'View';
      default:
        return permissionCodename;
    }
  }
  

//load permission for expiring document-----------
  loadpermissionexpirydocuments(): void {

    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore',selectedSchema )

    if (selectedSchema) {
     	
  this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
    (result: any) => {
        this.Grouppermissionsexpirydocuments = result.slice(88, 92);
      },
      (error: any) => {
        console.error('Error fetching permissions:', error);
      }
    );
}
  }

    //Display Name  add view delte code for Document type master-------

    getDisplayNameDocExpired(permissionCodename: string): string {
      switch (permissionCodename.trim().toLowerCase()) {
        case 'add_emp_documents':
          return 'Add';
        case 'change_emp_documents':
          return 'Edit';
        case 'delete_emp_documents':
          return 'Delete';
        case 'view_emp_documents':
          return 'View';
        default:
          return permissionCodename;
      }
    }


  // load permission for company master-----------

 
  
    loadpermissionlocationmaster(): void {
      const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
  
      console.log('schemastore',selectedSchema )
  
  if (selectedSchema) {
         
    this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
      (result: any) => {
          this.GrouppermissionslocationMaster = result.slice(253, 257);
        },
        (error: any) => {
          console.error('Error fetching permissions:', error);
        }
      );
  }
    }
  
      //Display Name  add view delte code for Company master-------
  
      getDisplayNameCompany(permissionCodename: string): string {
        switch (permissionCodename.trim().toLowerCase()) {
          case 'add_company':
            return 'Add';
          case 'change_company':
            return 'Edit';
          case 'delete_company':
            return 'Delete';
          case 'view_company':
            return 'View';
          default:
            return permissionCodename;
        }
      }
      loadpermissionsEmpReport(): void {
        const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
    
        console.log('schemastore',selectedSchema )
    
    if (selectedSchema) {
           
      this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
        (result: any) => {
            this.GrouppermissionsemployeeReport = result.slice(174, 179);
          },
          (error: any) => {
            console.error('Error fetching permissions:', error);
          }
        );
    }
      }
    
        //Display Name  add view delte code for Company master-------
    
        getDisplayNameEmpReport(permissionCodename: string): string {
          switch (permissionCodename.trim().toLowerCase()) {
            case 'add_report':
              return 'Add';
            case 'change_report':
              return 'Edit';
            case 'delete_report':
              return 'Delete';
            case 'export_report':
              return 'Export';
            case 'view_report':
                return 'View';
            default:
              return permissionCodename;
          }
        }
      
        loadpermissionsDocReport(): void {
        const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
    
        console.log('schemastore',selectedSchema )
    
    if (selectedSchema) {
           
      this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
        (result: any) => {
            this.GrouppermissionsdocumnetReport = result.slice(80, 85);
          },
          (error: any) => {
            console.error('Error fetching permissions:', error);
          }
        );
    }
      }
    
        //Display Name  add view delte code for Company master-------
    
        getDisplayNameDocReport(permissionCodename: string): string {
          switch (permissionCodename.trim().toLowerCase()) {
            case 'add_doc_report':
              return 'Add';
            case 'change_doc_report':
              return 'Edit';
            case 'delete_doc_report':
              return 'Delete';
            case 'export_doc_report':
              return 'Export';
              case 'view_doc_report':
                return 'View';
            default:
              return permissionCodename;
          }
        }
        loadpermissionsGenReport(): void {
          const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
      
          console.log('schemastore',selectedSchema )
      
      if (selectedSchema) {
             
        this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
          (result: any) => {
              this.GrouppermissiionsgeneralReport = result.slice(153, 158);
            },
            (error: any) => {
              console.error('Error fetching permissions:', error);
            }
          );
      }
        }
      
          //Display Name  add view delte code for Company master-------
      
          getDisplayNameGenReport(permissionCodename: string): string {
            switch (permissionCodename.trim().toLowerCase()) {
              case 'add_generalrequestreport':
                return 'Add';
              case 'change_generalrequestreport':
                return 'Edit';
              case 'delete_generalrequestreport':
                return 'Delete';
              case 'export_general_request_report':
                return 'Export';
                case 'view_generalrequestreport':
                  return 'View';
              default:
                return permissionCodename;
            }
          }

          
            // loadpermissionsAddweekDetail
            loadpermissionsAddweekDetail(): void {
              const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
          
              console.log('schemastore',selectedSchema )
          
          if (selectedSchema) {
                 
            this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
              (result: any) => {
                  this.Grouppermissionsaddweek = result.slice(36, 40);
                },
                (error: any) => {
                  console.error('Error fetching permissions:', error);
                }
              );
          }
            }
          
              //Display Name  add view delte code for Company master-------
          
              getDisplayNameAddWeek(permissionCodename: string): string {
                switch (permissionCodename.trim().toLowerCase()) {
                  case 'add_weekend_calendar':
                    return 'Add';
                  case 'change_weekend_calendar':
                    return 'Edit';
                  case 'delete_weekend_calendar':
                    return 'Delete';
                    case 'view_weekend_calendar':
                      return 'View';
                  default:
                    return permissionCodename;
                }
              }

              // loadpermissionsAssignweekDetail
              loadpermissionsAssignweekDetail(): void {
                const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
            
                console.log('schemastore',selectedSchema )
            
            if (selectedSchema) {
                   
              this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
                (result: any) => {
                    this.Grouppermisionsassignweek = result.slice(40,44);
                  },
                  (error: any) => {
                    console.error('Error fetching permissions:', error);
                  }
                );
            }
              }
            
                //Display Name  add view delte code for Company master-------
            
                getDisplayNameAssignWeek(permissionCodename: string): string {
                  switch (permissionCodename.trim().toLowerCase()) {
                    case 'add_assign_weekend':
                      return 'Add';
                    case 'change_assign_weekend':
                      return 'Edit';
                    case 'delete_assign_weekend':
                      return 'Delete';
                      case 'view_assign_weekend':
                        return 'View';
                    default:
                      return permissionCodename;
                  }
                }
  
                // loadpermissionsAddholidayDetail

                loadpermissionsAddholidayDetail(): void {
                  const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
              
                  console.log('schemastore',selectedSchema )
              
              if (selectedSchema) {
                     
                this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
                  (result: any) => {
                      this.Grouppermissionsaddholiday = result.slice(54, 58);
                    },
                    (error: any) => {
                      console.error('Error fetching permissions:', error);
                    }
                  );
              }
                }
              
                  //Display Name  add view delte code for Company master-------
              
                  getDisplayNameAddholiday(permissionCodename: string): string {
                    switch (permissionCodename.trim().toLowerCase()) {
                      case 'add_holiday':
                        return 'Add';
                      case 'change_holiday':
                        return 'Edit';
                      case 'delete_holiday':
                        return 'Delete';
                        case 'view_holiday':
                          return 'View';
                      default:
                        return permissionCodename;
                    }
                  }
                  // loadpermissionsAssignholidayDetail

                  loadpermissionsAssignholidayDetail(): void {
                    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
                
                    console.log('schemastore',selectedSchema )
                
                if (selectedSchema) {
                       
                  this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
                    (result: any) => {
                        this.Grouppermissionsassisgnholiday = result.slice(36, 40);
                      },
                      (error: any) => {
                        console.error('Error fetching permissions:', error);
                      }
                    );
                }
                  }
                
                    //Display Name  add view delte code for Company master-------
                
                    getDisplayNameAssignholidayDetail(permissionCodename: string): string {
                      switch (permissionCodename.trim().toLowerCase()) {
                        case 'add_assign_holiday':
                          return 'Add';
                        case 'change_assign_holiday':
                          return 'Edit';
                        case 'delete_assign_holiday':
                          return 'Delete';
                          case 'view_assign_holiday':
                            return 'View';
                        default:
                          return permissionCodename;
                      }
                    }
  //   onCheckboxChangeEmp(permission: string): void {
  //   if (this.selectedPermissions.includes(permission)) {
  //     this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
  //   } else {
  //     this.selectedPermissions.push(permission);
  //   }
  
   
  //   this.updateEmployeeMasterCheckbox();
  // }

  // updateEmployeeMasterCheckbox(): void {
  //   const allPermissionsSelected = this.GrouppermissionsEmp.every(permission => 
  //     this.selectedPermissions.includes(permission.id)
  //   );
  //   this.employeeMasterChecked = allPermissionsSelected;
  // }
  
  // onCheckboxChangeDept(permission: string): void {
  //   if (this.selectedPermissions.includes(permission)) {
  //     this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
  //   } else {
  //     this.selectedPermissions.push(permission);
  //   }
  
   
  //   this.updateDepartmentMasterCheckbox();
  // }

  // updateDepartmentMasterCheckbox(): void {
  //   const allPermissionsSelected = this.GrouppermissionsDept.every(permission => 
  //     this.selectedPermissions.includes(permission.id)
  //   );
  //   this.departmentMasterChecked = allPermissionsSelected;
  // }
  
  // onCheckboxChangeDesg(permission: string): void {
  //   if (this.selectedPermissions.includes(permission)) {
  //     this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
  //   } else {
  //     this.selectedPermissions.push(permission);
  //   }
  
   
  //   this.updateDesgnationMasterCheckbox();
  // }

  // updateDesgnationMasterCheckbox(): void {
  //   const allPermissionsSelected = this.GrouppermissionsDis.every(permission => 
  //     this.selectedPermissions.includes(permission.id)
  //   );
  //   this.designationMasterChecked = allPermissionsSelected;
  // }
  // onCheckboxChangeCat(permission: string): void {
  //   if (this.selectedPermissions.includes(permission)) {
  //     this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
  //   } else {
  //     this.selectedPermissions.push(permission);
  //   }
  
   
  //   this.updateCategoryMasterCheckbox();
  // }

  // updateCategoryMasterCheckbox(): void {
  //   const allPermissionsSelected = this.GrouppermissionsCat.every(permission => 
  //     this.selectedPermissions.includes(permission.id)
  //   );
  //   this.categoryMasterChecked = allPermissionsSelected;
  // }
  onCheckboxChangeEmp(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
    this.updateEmployeeMasterCheckbox();
    this.updateSelectAll();
  

  }

  updateEmployeeMasterCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsEmp.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.employeeMasterChecked = allPermissionsSelected;
    this.employeeMasterIndeterminate = this.isEmployeeMasterIndeterminate();

  }

  onCheckboxChangeDept(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
    this.updateDepartmentMasterCheckbox();
    this.updateSelectAll();
  }

  updateDepartmentMasterCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsDept.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.departmentMasterChecked = allPermissionsSelected;
    this.departmentMasterInderminate = this.isDepartmentMasterIndeterminate();

  }

  onCheckboxChangeDesg(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
    this.updateDesgnationMasterCheckbox();
    this.updateSelectAll();
  }

  updateDesgnationMasterCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsDis.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    
    this.designationMasterChecked = allPermissionsSelected;
    this.designationMasterInderminate = this.isDesignationMasterIndeterminate();
  }

  onCheckboxChangeCat(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
    this.updateCategoryMasterCheckbox();
    this.updateSelectAll();
  }

  updateCategoryMasterCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsCat.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.categoryMasterChecked = allPermissionsSelected;
    this.categoryMasterInderminate = this.isCategoryMasterIndeterminate();

  }
  onCheckboxChangesBrch(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
    this.updateBranchCheckbox();
    this.updateSelectAlls();
  }
  // branchMasterInderminate = false;
  // userMasterInderminate = false;
  // userGroupMasterInderminate= false;
  // assignMasterInderminate= false;
  // stateMasterInderminate= false;
  // documentMasterInderminate= false;
  // expiredMasterInderminate= false;
  // locationMasterInderminate= false;
  updateBranchCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsBrch.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.branchMasterChecked = allPermissionsSelected;
    this.branchMasterInderminate = this.isBranchMasterIndeterminate();
  }
  onCheckboxChangesuser(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateuserMasterCheckbox();
    this.updateSelectAlls();

  }

  updateuserMasterCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsUser.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.userMasterChecked = allPermissionsSelected;
    this.userMasterInderminate =this.isUserMasterIndeterminate();
  }
  onCheckboxChangesUsergroup(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateUsergroupMasterCheckbox();
    this.updateSelectAlls();

  }

  updateUsergroupMasterCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsUsergroup.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.usergroupingMasterChecked = allPermissionsSelected;
    this.userGroupMasterInderminate= this.isUserGroupingIndeterminate();
  }
  onCheckboxChangesassign(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateassignMasterCheckbox();
    this.updateSelectAlls();

  }

  updateassignMasterCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsassigneddUser.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.assignpermissionMasterChecked = allPermissionsSelected;
    this.assignMasterInderminate = this.isAssignPermissionsIndeterminate();
  }
  onCheckboxChangesstate(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateStateMasterCheckbox();
    this.updateSelectAlls();

  }

  updateStateMasterCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsstateMaster.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.stationMasterChecked = allPermissionsSelected;
    this.stateMasterInderminate = this.isStateMasterIndeterminate();
  }
  onCheckboxChangesdoctype(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updatedoctypeMasterCheckbox();
    this.updateSelectAlls();

  }

  updatedoctypeMasterCheckbox(): void {
    const allPermissionsSelected = this.Grouppermissionsdocumentype.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.documenttypeMasterChecked = allPermissionsSelected;
    this.documentMasterInderminate = this.isdocumenttypeIndeterminate();
  }
  onCheckboxChangesexpiry(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateexpiryMasterCheckbox();
    this.updateSelectAlls();

  }

  updateexpiryMasterCheckbox(): void {
    const allPermissionsSelected = this.Grouppermissionsexpirydocuments.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.expireddocumnetsMasterChecked = allPermissionsSelected;
    this.expiredMasterInderminate = this.isExpireddocumentsIndeterminate();
  }
  onCheckboxChangesloc(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updatelocMasterCheckbox();
    this.updateSelectAlls();

  }

  updatelocMasterCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionslocationMaster.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.locationMasterChecked = allPermissionsSelected;
    this.locationMasterInderminate = this.isloactionmasterIndeterminate();
  }

  onCheckboxChangesEmpReport(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateEmpReportCheckbox();
    this.updateReport();

  }

  updateEmpReportCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsemployeeReport.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.emportReportChecked = allPermissionsSelected;
    this.emportReportInderminate = this.isEmployeeReportIndeterminate();
  }

  onCheckboxChangesdocReport(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updatedocReportCheckbox();
    this.updateReport();

  }

  updatedocReportCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsdocumnetReport.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.documentReportChecked = allPermissionsSelected;
    this.documentReportInderminate = this.isDocumentReportIndeterminate();
  }
  onCheckboxChangesGenReport(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateGenReportCheckbox();
    this.updateReport();

  }

  updateGenReportCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissiionsgeneralReport.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.generelReportChecked= allPermissionsSelected;
    this.generalReportInderminate = this.isGeneralReportIndeterminate();
  }

  onCheckboxChangesAddweek(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateAddWeekCheckbox();
    this.updateCalender();

  }

  updateAddWeekCheckbox(): void {
    const allPermissionsSelected = this.Grouppermissionsaddweek.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.addweekChecked = allPermissionsSelected;
    this.addweekInderminate = this.isAddWeekIndeterminate();
  }

  
  onCheckboxChangesAssignweek(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateAssignweekCheckbox();
    this.updateCalender();

  }

  updateAssignweekCheckbox(): void {
    const allPermissionsSelected = this.Grouppermisionsassignweek.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.assignweekChecked = allPermissionsSelected;
    this.assignweekInderminate = this.isAssignWeekIndeterminate();
  }

  onCheckboxChangesAddHoliday(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateAddHolidayCheckbox();
    this.updateCalender();

  }

  updateAddHolidayCheckbox(): void {
    const allPermissionsSelected = this.Grouppermissionsaddholiday.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.addholidayChecked = allPermissionsSelected;
    this.addholidayInderminate= this.isAddHolidayIndeterminate();
  }

  onCheckboxChangesAssignHoliday(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateAssignHolidayCheckbox();
    this.updateCalender();

  }

  updateAssignHolidayCheckbox(): void {
    const allPermissionsSelected = this.Grouppermissionsassisgnholiday.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.assignholidayChecked= allPermissionsSelected;
    this.assignholidayInderminate= this.isAssignHolidayIndeterminate();
  }
  onCheckboxChange(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
    this.updateMasterCheckboxes();
  }
  
  updateMasterCheckboxes(): void {
    this.updateEmployeeMasterCheckbox();
    this.updateDepartmentMasterCheckbox();
    this.updateDesgnationMasterCheckbox();
    this.updateCategoryMasterCheckbox();
    this.updateBranchCheckbox();
    this.updateuserMasterCheckbox();
    this.updateUsergroupMasterCheckbox();
    this.updateassignMasterCheckbox();
    this.updateStateMasterCheckbox();
    this.updatedoctypeMasterCheckbox();
    this.updateexpiryMasterCheckbox();
    this.updatelocMasterCheckbox();
    this.updateEmpReportCheckbox();
    this.updateGenReportCheckbox();
    this.updatedocReportCheckbox();
    this.updateAddHolidayCheckbox();
    this.updateAddWeekCheckbox();
    this.updateAssignHolidayCheckbox();
    this.updateAssignweekCheckbox();
    this.updateSelectAll();
    this.updateSelectAlls();
    this.updateReport();
    this.updateCalender();
  }

  
  onEmployeeMasterChange(): void {
    if (this.employeeMasterChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsEmp.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsEmp.map(p => p.id).includes(permission));
    }
  
    // Update related checkboxes
    this.updateEmployeeManagementCheckbox();
    // this.selectAllChecked = this.employeeMasterChecked;
      this.updateSelectAll();


  }


  onDepartmentMasterChange(): void {
    if (this.departmentMasterChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsDept.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsDept.map(p => p.id).includes(permission));
    }
  
    // Update related checkboxes
    this.updateEmployeeManagementCheckbox();
    // this.selectAllChecked = this.departmentMasterChecked;
 
  }

  onDesignationMasterChange(): void {
    if (this.designationMasterChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsDis.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsDis.map(p => p.id).includes(permission));
    }
  
    // Update related checkboxes
    this.updateEmployeeManagementCheckbox();
    // this.selectAllChecked = this.designationMasterChecked;

  }
  onCategoryMasterChange(): void {
    if (this.categoryMasterChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsCat.map(permission => permission.id));
    } else {  
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsCat.map(p => p.id).includes(permission));
    }
  
    // Update related checkboxes
    this.updateEmployeeManagementCheckbox();
    // this.selectAllChecked = this.categoryMasterChecked;

  }

  updateEmployeeManagementCheckbox() {
    this.selectAllChecked = this.employeeMasterChecked && 
                            this.departmentMasterChecked && 
                            this.designationMasterChecked && 
                            this.categoryMasterChecked;
}

selectAll(): void {
  const allPermissions = [
    ...this.GrouppermissionsEmp,
    ...this.GrouppermissionsDept,
    ...this.GrouppermissionsCat,
    ...this.GrouppermissionsDis

    
  ].map(permission => permission.id);

  if (this.selectAllChecked) {
    this.selectedPermissions = Array.from(new Set([...this.selectedPermissions, ...allPermissions]));
  } else {
    this.selectedPermissions = this.selectedPermissions.filter(permission => !allPermissions.includes(permission));
  }
  this.updateEmployeeMasterCheckbox();
  this.updateDepartmentMasterCheckbox();
  this.updateDesgnationMasterCheckbox();
  this.updateCategoryMasterCheckbox();
  this.updateEmployeeManagementCheckbox();
}

isEmpDeptDisCatPermission(permission: string): boolean {
  return [...this.GrouppermissionsEmp, ...this.GrouppermissionsDept, ...this.GrouppermissionsDis, ...this.GrouppermissionsCat]
    .some(p => p.id === permission);
}
// this.updateBranchCheckbox();
// this.updateuserMasterCheckbox();
// this.updateUsergroupMasterCheckbox();
// this.updateStateMasterCheckbox();
// this.updateassignMasterCheckbox();
// this.updatedoctypeMasterCheckbox();
// this.updateexpiryMasterCheckbox();
// this.updatelocMasterCheckbox();
// this.updateSettingsCheckbox();
// this.updateIndeterminateStatesvalue();
updateSelectAll(): void {
  this.updateIndeterminateStates();
  this.updateEmployeeMasterCheckbox();
  this.updateDepartmentMasterCheckbox();
  this.updateDesgnationMasterCheckbox();
  this.updateCategoryMasterCheckbox();
  this.updateEmployeeManagementCheckbox();
}
isemployee(): boolean {
  
  const employeeMasterIndeterminate = this.isEmployeeMasterIndeterminate();
  const departmentMasterInderminate = this.isDepartmentMasterIndeterminate();
  const designationMasterInderminate = this.isDesignationMasterIndeterminate();
  const categoryMasterInderminate = this.isCategoryMasterIndeterminate();
    const otherGroupIndeterminate = false; // Add indeterminate checks for other groups like Dept, Dis, Cat

    // Return true only if some but not all checkboxes are selected
    return employeeMasterIndeterminate || departmentMasterInderminate || designationMasterInderminate || categoryMasterInderminate|| otherGroupIndeterminate;
}

// branchMasterInderminate = false;
// userMasterInderminate = false;
// userGroupMasterInderminate= false;
// assignMasterInderminate= false;
// stateMasterInderminate= false;
// documentMasterInderminate= false;
// expiredMasterInderminate= false;
// locationMasterInderminate= false;
issettings(): boolean {
  const branchMasterInderminate = this.isBranchMasterIndeterminate();
  const userMasterInderminate = this.isUserMasterIndeterminate();
  const userGroupMasterInderminate = this.isUserGroupingIndeterminate();
  const assignMasterInderminate = this.isAssignPermissionsIndeterminate();
  const stateMasterInderminate = this.isStateMasterIndeterminate();
  const documentMasterInderminate = this.isdocumenttypeIndeterminate();
  const expiredMasterInderminate = this.isExpireddocumentsIndeterminate();
  const locationMasterInderminate = this.isloactionmasterIndeterminate();
    const otherGroupIndeterminate = false; // Add indeterminate checks for other groups like Dept, Dis, Cat

    // Return true only if some but not all checkboxes are selected
    return branchMasterInderminate || userMasterInderminate || userGroupMasterInderminate || assignMasterInderminate||stateMasterInderminate || documentMasterInderminate || userGroupMasterInderminate || expiredMasterInderminate||locationMasterInderminate||  otherGroupIndeterminate;
}
isreports(): boolean {
  const emportReportInderminate = this.isEmployeeReportIndeterminate();
  const documentReportInderminate = this.isDocumentReportIndeterminate();
  const generalReportInderminate = this.isGeneralReportIndeterminate();
  
    const otherGroupIndeterminate = false; // Add indeterminate checks for other groups like Dept, Dis, Cat

    // Return true only if some but not all checkboxes are selected
    return emportReportInderminate || documentReportInderminate || generalReportInderminate || otherGroupIndeterminate;
}

iscalenders(): boolean {
  const addweekInderminate = this.isAddWeekIndeterminate();
  const assignweekInderminate = this.isAssignWeekIndeterminate();
  const addholidayInderminate = this.isAddHolidayIndeterminate();
  const assignholidayInderminate = this.isAssignHolidayIndeterminate();

  const otherGroupIndeterminate = false;
  return addweekInderminate || assignweekInderminate || addholidayInderminate || assignholidayInderminate || otherGroupIndeterminate;
}  
// emportReportInderminate= false;
// documentReportInderminate = false;
// generalReportInderminate= false;
isIndeterminate(): boolean {
  const hasSelectedPermissions = [
    ...this.GrouppermissionsEmp,
    ...this.GrouppermissionsDept,
    ...this.GrouppermissionsDis,
    ...this.GrouppermissionsCat
  ].some(permission => this.selectedPermissions.includes(permission.id));
    return hasSelectedPermissions && !this.isEmployeeManagementMasterChecked();

}
showexpandable(): void {
  this.expandedMasters = !this.expandedMasters;
}
// updateSettingsCheckbox(): void {
//   this.settingsChecked = this.isSettingsMasterChecked();
// }
// updateSelectedPermissions(masterChecked: boolean, groupPermissions: any[]): void {
//   const permissionsIds = groupPermissions.map(permission => permission.id);
//   if (masterChecked) {
//     this.selectedPermissions = [...new Set([...this.selectedPermissions, ...permissionsIds])];
//   } else {
//     this.selectedPermissions = this.selectedPermissions.filter(permission => !permissionsIds.includes(permission));
//   }
//   this.updateSettingsCheckbox();
// }
// onSettingsChange(): void {
//   const masterGroups = [
//     // this.GrouppermissionsCmp,
//     this.GrouppermissionsBrch,
//     this.GrouppermissionsUser,
//     this.GrouppermissionsUsergroup,
//     this.GrouppermissionsassigneddUser,
//     this.GrouppermissionsstateMaster,
//     this.Grouppermissionsdocumentype,
//     this.Grouppermissionsexpirydocuments,
//     this.GrouppermissionslocationMaster
//   ];
  
//   if (this.settingsChecked) {
//     masterGroups.forEach(group => this.selectedPermissions = [...new Set([...this.selectedPermissions, ...group.map(p => p.id)])]);
//   } else {
//     masterGroups.forEach(group => this.selectedPermissions = this.selectedPermissions.filter(p => !group.map(g => g.id).includes(p)));
//   }
  
//   this.updateSettingsCheckbox();
// }

// updateSelectedPermissions(masterChecked: boolean, groupPermissions: any[]): void {
//   const permissionsIds = groupPermissions.map(permission => permission.id);
//   if (masterChecked) {
//     // Add new permissions without removing existing ones
//     this.selectedPermissions = [...new Set([...this.selectedPermissions, ...permissionsIds])];
//   } else {
//     // Remove only the permissions related to the unchecked group
//     this.selectedPermissions = this.selectedPermissions.filter(permission => !permissionsIds.includes(permission));
//   }
//   this.updateSettingsCheckbox();
// }

// updateSelectedPermissions(masterChecked: boolean, groupPermissions: any[]): void {
//   const permissionsIds = groupPermissions.map(permission => permission.id);
//   if (masterChecked) {
//     // Add new permissions without removing existing ones
//     this.selectedPermissions = [...new Set([...this.selectedPermissions, ...permissionsIds])];
//   } else {
//     // Remove only the permissions related to the unchecked group
//     this.selectedPermissions = this.selectedPermissions.filter(permission => !permissionsIds.includes(permission));
//   }
//   this.updateSettingsCheckbox();
// }
  // onCompanyChange(): void {
  //   if (this.companyMasterChecked) {
  //     this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsCmp.map(permission => permission.id));
  //   } else {
  //     this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsCmp.map(p => p.id).includes(permission));
  //   }
  //   this.updateSettingsCheckbox();
  //   // this.updateSelectedPermissions(this.companyMasterChecked, this.GrouppermissionsCmp);


  // }

  onBranchMasterChange(): void {
    if (this.branchMasterChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsBrch.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsBrch.map(p => p.id).includes(permission));
    }
    this.updateSettingsCheckbox();
    // this.updateSelectedPermissions(this.branchMasterChecked, this.GrouppermissionsBrch);
    // this.settingsChecked = this.branchMasterChecked;


  }

  onUserMasterChange(): void {
    if (this.userMasterChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsUser.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsUser.map(p => p.id).includes(permission));
    }
    this.updateSettingsCheckbox();
    // this.updateSelectedPermissions(this.userMasterChecked, this.GrouppermissionsUser);
    // this.settingsChecked = this.userMasterChecked;


  }

  onUsergroupingMasterChange(): void {
    if (this.usergroupingMasterChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsUsergroup.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsUsergroup.map(p => p.id).includes(permission));
    }
    this.updateSettingsCheckbox();
    // this.updateSelectedPermissions(this.usergroupingMasterChecked, this.GrouppermissionsUsergroup);
    // this.settingsChecked = this.usergroupingMasterChecked;


  }

  onUserAssignChange(): void {
    if (this.assignpermissionMasterChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsassigneddUser.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsassigneddUser.map(p => p.id).includes(permission));
    }
    this.updateSettingsCheckbox();
    // this.updateSelectedPermissions(this.assignpermissionMasterChecked, this.GrouppermissionsassigneddUser);
    // this.settingsChecked = this.assignpermissionMasterChecked;

  }
  onUserStateChange(): void {
    if (this.stationMasterChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsstateMaster.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsstateMaster.map(p => p.id).includes(permission));
    }
    this.updateSettingsCheckbox();
    // this.updateSelectedPermissions(this.stationMasterChecked, this.GrouppermissionsstateMaster);
    // this.settingsChecked = this.stationMasterChecked;


  }
  onUserDocumentChange(): void {
    if (this.documenttypeMasterChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.Grouppermissionsdocumentype.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.Grouppermissionsdocumentype.map(p => p.id).includes(permission));
    }
    this.updateSettingsCheckbox();
    // this.updateSelectedPermissions(this.documenttypeMasterChecked, this.Grouppermissionsdocumentype);
    // this.settingsChecked = this.documenttypeMasterChecked;


  }
  onUserExpireChange(): void {
    if (this.expireddocumnetsMasterChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.Grouppermissionsexpirydocuments.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.Grouppermissionsexpirydocuments.map(p => p.id).includes(permission));
    }
    this.updateSettingsCheckbox();
    // this.updateSelectedPermissions(this.expireddocumnetsMasterChecked, this.Grouppermissionsexpirydocuments);
    // this.settingsChecked = this.expireddocumnetsMasterChecked;


  }
  onUserLocationChange(): void {
    if (this.locationMasterChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionslocationMaster.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionslocationMaster.map(p => p.id).includes(permission));
    }
    this.updateSettingsCheckbox();
    // this.updateSelectedPermissions(this.locationMasterChecked, this.GrouppermissionslocationMaster);
    // this.settingsChecked = this.locationMasterChecked;


  }
  updateSettingsCheckbox(): void {
    this.settingsChecked = this.isSettingsMasterChecked();
  }
  
  
  onEmpReportChange(): void {
    if (this.emportReportChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsemployeeReport.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsemployeeReport.map(p => p.id).includes(permission));
    }
    this.updateReportCheckbox();
    // this.updateSelectedPermissions(this.documenttypeMasterChecked, this.Grouppermissionsdocumentype);
    // this.settingsChecked = this.documenttypeMasterChecked;


  }
  onDocReportChange(): void {
    if (this.documentReportChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsdocumnetReport.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsdocumnetReport.map(p => p.id).includes(permission));
    }
    this.updateReportCheckbox();
    // this.updateSelectedPermissions(this.expireddocumnetsMasterChecked, this.Grouppermissionsexpirydocuments);
    // this.settingsChecked = this.expireddocumnetsMasterChecked;


  }
  onGenReportChange(): void {
    if (this.generelReportChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissiionsgeneralReport.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissiionsgeneralReport.map(p => p.id).includes(permission));
    }
    this.updateReportCheckbox();
    // this.updateSelectedPermissions(this.locationMasterChecked, this.GrouppermissionslocationMaster);
    // this.settingsChecked = this.locationMasterChecked;


  }
  updateReportCheckbox(): void {
    this.reportchecked = this.isReportManagementMasterChecked();
  }
   
  onAddweekChange(): void {
    if (this.addweekChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.Grouppermissionsaddweek.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.Grouppermissionsaddweek.map(p => p.id).includes(permission));
    }
    this.updateCalenderCheckbox();
    // this.updateSelectedPermissions(this.locationMasterChecked, this.GrouppermissionslocationMaster);
    // this.settingsChecked = this.locationMasterChecked;


  }

  onAssignweekChange(): void {
    if (this.assignweekChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.Grouppermisionsassignweek.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.Grouppermisionsassignweek.map(p => p.id).includes(permission));
    }
    this.updateCalenderCheckbox();
    // this.updateSelectedPermissions(this.locationMasterChecked, this.GrouppermissionslocationMaster);
    // this.settingsChecked = this.locationMasterChecked;


  }

  onAddholidayChange(): void {
    if (this.addholidayChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.Grouppermissionsaddholiday.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.Grouppermissionsaddholiday.map(p => p.id).includes(permission));
    }
    this.updateCalenderCheckbox();
    // this.updateSelectedPermissions(this.locationMasterChecked, this.GrouppermissionslocationMaster);
    // this.settingsChecked = this.locationMasterChecked;


  }

  onAssignholidayChange(): void {
    if (this.assignholidayChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.Grouppermissionsassisgnholiday.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.Grouppermissionsassisgnholiday.map(p => p.id).includes(permission));
    }
    this.updateCalenderCheckbox();
    // this.updateSelectedPermissions(this.locationMasterChecked, this.GrouppermissionslocationMaster);
    // this.settingsChecked = this.locationMasterChecked;


  }

  updateCalenderCheckbox(): void {
    this.calenderchecked = this.isCalenderMangementMasterChecked();
  }
  // selectAlls(): void {
  //   const isSelected = this.settingsChecked;
  
  //   this.branchMasterChecked = isSelected;
  //   this.userMasterChecked = isSelected;
  //   this.usergroupingMasterChecked = isSelected;
  //   this.assignpermissionMasterChecked = isSelected;
  //   this.stationMasterChecked = isSelected;
  //   this.documenttypeMasterChecked = isSelected;
  //   this.expireddocumnetsMasterChecked = isSelected;
  //   this.locationMasterChecked = isSelected;
  
  //   if (isSelected) {
  //     this.selectedPermissions = [
  //       ...this.selectedPermissions,
  //       ...this.GrouppermissionsBrch.map(p => p.id),
  //       ...this.GrouppermissionsUser.map(p => p.id),
  //       ...this.GrouppermissionsUsergroup.map(p => p.id),
  //       ...this.GrouppermissionsassigneddUser.map(p => p.id),
  //       ...this.GrouppermissionsstateMaster.map(p => p.id),
  //       ...this.Grouppermissionsdocumentype.map(p => p.id),
  //       ...this.Grouppermissionsexpirydocuments.map(p => p.id),
  //       ...this.GrouppermissionslocationMaster.map(p => p.id)
  //     ];
  //   } else {
  //     this.selectedPermissions = this.selectedPermissions.filter(p => !this.isSettingsPermission(p));
  //   }
  
  //   this.updateSelectAlls();
  // }
  // isSettingsPermission(permission: string): boolean {
  //   return [...this.GrouppermissionsBrch, ...this.GrouppermissionsUser, ...this.GrouppermissionsUsergroup, ...this.GrouppermissionsassigneddUser, ...this.GrouppermissionsstateMaster, ...this.Grouppermissionsdocumentype, ...this.Grouppermissionsexpirydocuments, ...this.GrouppermissionslocationMaster]
  //     .some(p => p.id === permission);
  // }
  selectAlls(): void {
    const allPermissions = [
      ...this.GrouppermissionsBrch,
      ...this.GrouppermissionsUser,
      ...this.GrouppermissionsUsergroup,
      ...this.GrouppermissionsassigneddUser,
      ...this.GrouppermissionsstateMaster,
      ...this.Grouppermissionsdocumentype,
      ...this.Grouppermissionsexpirydocuments,
      ...this.GrouppermissionslocationMaster
      
    ].map(permission => permission.id);
  
    if (this.settingsChecked) {
      this.selectedPermissions = Array.from(new Set([...this.selectedPermissions, ...allPermissions]));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !allPermissions.includes(permission));
    }
    this.updateBranchCheckbox();
    this.updateuserMasterCheckbox();
    this.updateUsergroupMasterCheckbox();
    this.updateStateMasterCheckbox();
    this.updateassignMasterCheckbox();
    this.updatedoctypeMasterCheckbox();
    this.updateexpiryMasterCheckbox();
    this.updatelocMasterCheckbox();
    this.updateSettingsCheckbox();
  }

  updateSelectAlls():void{
    this.updateBranchCheckbox();
    this.updateuserMasterCheckbox();
    this.updateUsergroupMasterCheckbox();
    this.updateStateMasterCheckbox();
    this.updateassignMasterCheckbox();
    this.updatedoctypeMasterCheckbox();
    this.updateexpiryMasterCheckbox();
    this.updatelocMasterCheckbox();
    this.updateSettingsCheckbox();
    this.updateIndeterminateStatesvalue();
  }
  isIndeterminates(): boolean {
    const hasSelectedPermissions = [
      ...this.GrouppermissionsBrch,
      ...this.GrouppermissionsUser,
      ...this.GrouppermissionsUsergroup,
      ...this.GrouppermissionsassigneddUser,
      ...this.GrouppermissionsstateMaster,
      ...this.Grouppermissionsdocumentype,
      ...this.Grouppermissionsexpirydocuments,
      ...this.GrouppermissionslocationMaster
    ].some(permission => this.selectedPermissions.includes(permission.id));
      return hasSelectedPermissions && !this.isSettingsMasterChecked();

    // return !this.settingsChecked && (
    //   this.branchMasterChecked ||
    //   this.userMasterChecked ||
    //   this.usergroupingMasterChecked ||
    //   this.assignpermissionMasterChecked ||
    //   this.stationMasterChecked ||
    //   this.documenttypeMasterChecked ||
    //   this.expireddocumnetsMasterChecked ||
    //   this.locationMasterChecked
    // );
  }
  // selectReport(): void{
  //   const reportSelected = this.reportchecked;
    
  //   this.emportReportChecked= reportSelected;
  //   this.documentReportChecked = reportSelected;
  //   this.generelReportChecked= reportSelected;
    
  //   if (reportSelected) {
  //     this.selectedPermissions = [
  //       ...this.selectedPermissions,
  //       ...this.GrouppermissionsemployeeReport.map(p => p.id),
  //       ...this.GrouppermissionsdocumnetReport.map(p => p.id),
  //       ...this.GrouppermissiionsgeneralReport.map(p => p.id),
       
  //     ];
  //   } else {
  //     this.selectedPermissions = this.selectedPermissions.filter(p => !this.isReportsPermission(p));
  //   }
  
  //   this.updateReport();
  
  // }
  // isReportsPermission(permission: string): boolean {
  //   return [...this.GrouppermissionsemployeeReport, ...this.GrouppermissionsdocumnetReport, ...this.GrouppermissiionsgeneralReport]
  //     .some(p => p.id === permission);
  // }
  selectReport(): void {
    const allPermissions = [
      ...this.GrouppermissionsemployeeReport,
      ...this.GrouppermissionsdocumnetReport,
      ...this.GrouppermissiionsgeneralReport
    ].map(permission => permission.id);
  
    if (this.reportchecked) {
      this.selectedPermissions = Array.from(new Set([...this.selectedPermissions, ...allPermissions]));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !allPermissions.includes(permission));
    }
  
    this.updateEmpReportCheckbox();
    this.updatedocReportCheckbox();
    this.updateGenReportCheckbox();
    this.updateReportCheckbox();
  }
// updateReport():void{
//   const allGroupsSelected = this.emportReportChecked &&
//                               this.documentReportChecked &&
//                               this.generelReportChecked
                              
  
//     this.reportchecked= allGroupsSelected;
// }
updateReport(): void {
  this.updateReportCheckbox();
  this.updateEmpReportCheckbox();
  this.updatedocReportCheckbox();
  this.updateGenReportCheckbox();
  this.updateIndeterminateReports();
}



isReportInderminate(): boolean {
  const hasSelectedPermissions = [
    ...this.GrouppermissionsemployeeReport,
    ...this.GrouppermissionsdocumnetReport,
    ...this.GrouppermissiionsgeneralReport
  ].some(permission => this.selectedPermissions.includes(permission.id));

  return hasSelectedPermissions && !this.isReportManagementMasterChecked();
}


selectCalender(): void {
  const allPermissions = [
    ...this.Grouppermissionsaddweek,
    ...this.Grouppermisionsassignweek,
    ...this.Grouppermissionsaddholiday,
    ...this.Grouppermissionsassisgnholiday
  ].map(permission => permission.id);

  if (this.calenderchecked) {
    this.selectedPermissions = Array.from(new Set([...this.selectedPermissions, ...allPermissions]));
  } else {
    this.selectedPermissions = this.selectedPermissions.filter(permission => !allPermissions.includes(permission));
  }

  this.updateAddWeekCheckbox();
  this.updateAddHolidayCheckbox();
  this.updateAssignHolidayCheckbox();
  this.updateAssignweekCheckbox();
  this.updateCalenderCheckbox();
}


updateCalender():void{
  this.updateAddHolidayCheckbox();
  this.updateAssignHolidayCheckbox();
  this.updateAddWeekCheckbox();
  this.updateAssignweekCheckbox();
  this.updateInderminateCalenders();
  this.updateCalenderCheckbox();

}

isCalenderInderminate(): boolean {
  const hasSelectedPermissions = [
    ...this.Grouppermissionsaddweek,
    ...this.Grouppermisionsassignweek,
    ...this.Grouppermissionsaddholiday,
    ...this.Grouppermissionsassisgnholiday
  ].some(permission => this.selectedPermissions.includes(permission.id));

  return hasSelectedPermissions && !this.isCalenderMangementMasterChecked();
}

// isReportInderminate(): boolean {
//   return !this.reportchecked && (
//     this.emportReportChecked||
//     this.documentReportChecked||
//     this.generelReportChecked
   
//   );
// }
  showexpandables(): void {
    this.expandedMastersvalue = !this.expandedMastersvalue;
  }
showreports(): void {
  this.reportMastersvalue =!this.reportMastersvalue;
}

showcalenders(): void{
  this.calenderMastersvalue =!this.calenderMastersvalue;
}
onSubmit(): void {
  const selectedSchema = localStorage.getItem('selectedSchema');
  
  if (!selectedSchema) {
    console.error('No schema selected.');
    return;
  }

  // Validate the form data
  if (!this.profile || !this.selectedPermissions || this.selectedPermissions.length === 0) {
    console.error('Codename and permissions are required.');
    return;
  }

  // Construct the URL with the selected schema
  const url = `http://${selectedSchema}.localhost:8000/organisation/api/permissions/`;
  
  const formData = {
    profile: this.profile,
    permissions: this.selectedPermissions
  };

  // Send POST request to the dynamically constructed URL
  this.http.post(url, formData).subscribe(response => {
    console.log('Data saved successfully:', response); 
    // Optionally reset the form or handle the response
  }, error => {
    console.error('Failed to save data:', error);
    if (error.error.profile) {
      // Display the error message to the user, e.g., by setting a form error
      console.error('Codename error:', error.error.profile);
    }
  });
}



  ClosePopup() {
    this.ref.close('Closed using function');
  }
}
