import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserMasterService } from '../user-master/user-master.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../login/authentication.service';
import { environment } from '../../environments/environment';
import { window } from 'rxjs';

@Component({
  selector: 'app-user-role-grouping-create',
  templateUrl: './user-role-grouping-create.component.html',
  styleUrls: ['./user-role-grouping-create.component.css'],
})
export class UserRoleGroupingCreateComponent implements OnInit {

  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local

  // permissions stored arrays for employeemaster
  
  GrouppermissionsEmp: any[] = [];
  GrouppermissionsDept: any[] = [];
  GrouppermissionsDis: any[] = [];
  GrouppermissionsCat: any[] = [];
  GrouppermissionsGen: any[] = [];
  GrouppermissionsReqtype: any[] = [];
  GrouppermissionsApr: any[] = [];
  GrouppermissionsAprlvl: any[] = [];
  GrouppermissionsAtd: any[] = [];






  // permissions stored arrays for settings

  GrouppermissionsCmp: any[] = [];
  GrouppermissionsBrch: any[] = [];
  GrouppermissionsUser: any[] = [];
  GrouppermissionsUsergroup: any[] = [];
  GrouppermissionsassigneddUser: any[] = [];
  GrouppermissionsstateMaster: any[] = [];
  Grouppermissionsdocumentype: any[] = [];
  Grouppermissionsexpirydocuments: any[] = [];
  GrouppermissionslocationMaster: any[] = [];
  GrouppermissionsDnMaster: any[] = [];
  GrouppermissionsCpMaster: any[] = [];
  GrouppermissionsEmtMaster: any[] = [];

  GrouppermissionsFormdesMaster: any[] = [];



    // permissions stored arrays for reports

  GrouppermissionsemployeeReport: any[] = [];
  GrouppermissionsdocumnetReport: any[] =[];
  GrouppermissiionsgeneralReport: any[]=[];
  GrouppermissiionsLeaveReport: any[]=[];




  // permissions stored arrays for calendar

  Grouppermissionsaddweek:any[] =[];
  Grouppermisionsassignweek:any[]=[];
  Grouppermissionsaddholiday: any[]=[];
  Grouppermissionsassisgnholiday:any[]=[];



  //permission stored arrays for leaves
  GrouppermissionsLeaveaprv:any[] =[];
  GrouppermissionsLeavetype:any[] =[];
  GrouppermissionsLeavemaster:any[] =[];
  GrouppermissionsLeavereq:any[] =[];
  GrouppermissionsLeavecom:any[] =[];

  GrouppermissionsLeaveaprvlvl:any[] =[];

  GrouppermissionsLeaveaprvlvltemp:any[] =[];


  //creating group name declared variables.

  groupName: string = '';
  codename:string ='';
  profile:string ='';
  selectedPermissions: any[] = [];



//selected employee master checkboxes.
  employeeMasterIndeterminate = false;
  departmentMasterInderminate= false;
  designationMasterInderminate = false;
  categoryMasterInderminate = false;
  GenMasterInderminate = false;
  ReqtypeMasterInderminate = false;
  AprMasterInderminate = false;
  AprlvlMasterInderminate = false;
  AtdMasterInderminate = false;







  //selected settings checkboxes.

  branchMasterInderminate = false;
  userMasterInderminate = false;
  userGroupMasterInderminate= false;
  assignMasterInderminate= false;
  stateMasterInderminate= false;
  documentMasterInderminate= false;
  expiredMasterInderminate= false;
  locationMasterInderminate= false;
  DnMasterInderminate= false;
  CpMasterInderminate= false;
  EmtMasterInderminate= false;

  FormdesMasterInderminate= false;



  //selected reports checkboxes/

  emportReportInderminate= false;
  documentReportInderminate = false;
  generalReportInderminate= false;
  LeaveReportInderminate= false;


  //selected calendars checkboxes.

  calenderdetailInderminate= false;

  addweekInderminate=false;
  assignweekInderminate= false;
  addholidayInderminate= false;
  assignholidayInderminate= false;





  //selected leave checkboxes.

  LeavedetailInderminate= false;


  LeaveaprvInderminate=false;
  LeavetypeInderminate=false;
  LeavemasterInderminate=false;
  LeavereqInderminate=false;
  LeavecomInderminate=false;
  LeaveaprvlvlInderminate=false;
  LeaveaprvlvltempInderminate=false;







  // Add these lines


  //employeemaster checkbox checked values
  employeeMasterChecked: boolean = false;
  departmentMasterChecked: boolean = false;
  designationMasterChecked: boolean = false;
  categoryMasterChecked: boolean = false;
  GenMasterChecked: boolean = false;
  ReqtypeMasterChecked: boolean = false;
  AprMasterChecked: boolean = false;
  AprlvlMasterChecked: boolean = false;
  AtdMasterChecked: boolean = false;







  //settings checkbox checked values

  companyMasterChecked: boolean = false;
  branchMasterChecked: boolean = false;
  userMasterChecked: boolean = false;
  usergroupingMasterChecked: boolean = false;
  assignpermissionMasterChecked: boolean =false;
  stationMasterChecked:boolean =false;
  documenttypeMasterChecked:boolean = false;
  expireddocumnetsMasterChecked:boolean = false;
  locationMasterChecked:boolean = false;
  DnMasterChecked:boolean = false;
  CpMasterChecked:boolean = false;
  EmtMasterChecked:boolean = false;

  FormdesMasterChecked:boolean = false;



  
  //Reports checkbox checked values

  emportReportChecked:boolean = false;
  documentReportChecked:boolean = false;
  generelReportChecked:boolean = false;
  LeaveReportChecked:boolean = false;

  
  
  //Calendars checkbox checked values

  addweekChecked:boolean= false;
  assignweekChecked:boolean = false;
  addholidayChecked:boolean= false;
  assignholidayChecked:boolean = false;



    //Calendars checkbox checked values
    LeaveaprvChecked:boolean= false;
    LeavetypeChecked:boolean= false;
    LeavemasterChecked:boolean= false;
    LeavereqChecked:boolean= false;
    LeavecomChecked:boolean= false;
    LeaveaprvlvlChecked:boolean= false;
    LeaveaprvlvltempChecked:boolean= false;

  


// main headings values

  selectAllChecked: boolean = false;
  settingsChecked: boolean = false;
  reportchecked:boolean = false;
  calenderchecked:boolean = false;
  Leavechecked:boolean = false;




  expandedMasters: boolean = true;
  expandedMastersvalue: boolean = true;
  reportMastersvalue:boolean =true;
  calenderMastersvalue:boolean =true;
  LeaveMastersvalue:boolean =true;

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
      this.categoryMasterChecked &&
      this.GenMasterChecked &&
      this.ReqtypeMasterChecked &&
      this.AprMasterChecked &&
      this.AprlvlMasterChecked &&
      this.AtdMasterChecked;
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

  isGenMasterIndeterminate(): boolean {
    const selectedGenPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsGen.map(p => p.id).includes(permission)
    );
    return selectedGenPermissions.length > 0 && selectedGenPermissions.length < this.GrouppermissionsGen.length;
  }

  isReqtypeMasterIndeterminate(): boolean {
    const selectedGenPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsReqtype.map(p => p.id).includes(permission)
    );
    return selectedGenPermissions.length > 0 && selectedGenPermissions.length < this.GrouppermissionsReqtype.length;
  }

  isAprMasterIndeterminate(): boolean {
    const selectedGenPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsApr.map(p => p.id).includes(permission)
    );
    return selectedGenPermissions.length > 0 && selectedGenPermissions.length < this.GrouppermissionsApr.length;
  }
  isAprlvlMasterIndeterminate(): boolean {
    const selectedGenPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsAprlvl.map(p => p.id).includes(permission)
    );
    return selectedGenPermissions.length > 0 && selectedGenPermissions.length < this.GrouppermissionsAprlvl.length;
  }

  isAtdMasterIndeterminate(): boolean {
    const selectedGenPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsAtd.map(p => p.id).includes(permission)
    );
    return selectedGenPermissions.length > 0 && selectedGenPermissions.length < this.GrouppermissionsAtd.length;
  }






  isSettingsMasterChecked(): boolean {
    return this.branchMasterChecked &&
      this.userMasterChecked &&
      this.usergroupingMasterChecked &&
      this.assignpermissionMasterChecked &&
      this.stationMasterChecked &&
      this.documenttypeMasterChecked &&
      this.expireddocumnetsMasterChecked &&
      this.locationMasterChecked &&
      this.DnMasterChecked &&
      this.CpMasterChecked &&
      this.EmtMasterChecked &&
      this.FormdesMasterChecked;
  }
  
  
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
  
  isDnmasterIndeterminate(): boolean {
    const selectedlocationPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsDnMaster.map(p => p.id).includes(permission)
    );
    return selectedlocationPermissions.length > 0 && selectedlocationPermissions.length < this.GrouppermissionsDnMaster.length;
  }

  isCpmasterIndeterminate(): boolean {
    const selectedlocationPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsCpMaster.map(p => p.id).includes(permission)
    );
    return selectedlocationPermissions.length > 0 && selectedlocationPermissions.length < this.GrouppermissionsCpMaster.length;
  }
  isEmtmasterIndeterminate(): boolean {
    const selectedlocationPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsEmtMaster.map(p => p.id).includes(permission)
    );
    return selectedlocationPermissions.length > 0 && selectedlocationPermissions.length < this.GrouppermissionsEmtMaster.length;
  }
  isFormdesmasterIndeterminate(): boolean {
    const selectedlocationPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsFormdesMaster.map(p => p.id).includes(permission)
    );
    return selectedlocationPermissions.length > 0 && selectedlocationPermissions.length < this.GrouppermissionsFormdesMaster.length;
  }



  
  isReportManagementMasterChecked(): boolean {
    return this.emportReportChecked &&
      this.documentReportChecked &&
      this.generelReportChecked  &&
      this.LeaveReportChecked;
      
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
  

  isLeaveReportIndeterminate(): boolean {
    const selectedLeaveReportPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissiionsLeaveReport.map(p => p.id).includes(permission)
    );
    return selectedLeaveReportPermissions.length > 0 && selectedLeaveReportPermissions.length < this.GrouppermissiionsLeaveReport.length;
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
 




  isLeaveMangementMasterChecked():boolean{
    return this.LeaveaprvChecked &&
    this.LeavetypeChecked &&
    this.LeavemasterChecked &&
    this.LeavereqChecked &&
    this.LeavecomChecked &&
    this.LeaveaprvlvlChecked &&
    this.LeaveaprvlvltempChecked
       
  }

  isLeaveaprvIndeterminate(): boolean {
    const selectedLeaveaprvPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsLeaveaprv.map(p => p.id).includes(permission)
    );
    return selectedLeaveaprvPermissions.length > 0 && selectedLeaveaprvPermissions.length < this.GrouppermissionsLeaveaprv.length;
  }

  isLeavetypeIndeterminate(): boolean {
    const selectedLeavetypePermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsLeavetype.map(p => p.id).includes(permission)
    );
    return selectedLeavetypePermissions.length > 0 && selectedLeavetypePermissions.length < this.GrouppermissionsLeavetype.length;
  }

  isLeavemasterIndeterminate(): boolean {
    const selectedLeavemasterPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsLeavemaster.map(p => p.id).includes(permission)
    );
    return selectedLeavemasterPermissions.length > 0 && selectedLeavemasterPermissions.length < this.GrouppermissionsLeavemaster.length;
  }

  isLeavereqIndeterminate(): boolean {
    const selectedLeavereqPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsLeavereq.map(p => p.id).includes(permission)
    );
    return selectedLeavereqPermissions.length > 0 && selectedLeavereqPermissions.length < this.GrouppermissionsLeavereq.length;
  }

  isLeavecomIndeterminate(): boolean {
    const selectedLeavecomPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsLeavecom.map(p => p.id).includes(permission)
    );
    return selectedLeavecomPermissions.length > 0 && selectedLeavecomPermissions.length < this.GrouppermissionsLeavecom.length;
  }

  isLeaveaprvlvlIndeterminate(): boolean {
    const selectedLeaveaprvlvlPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsLeaveaprvlvl.map(p => p.id).includes(permission)
    );
    return selectedLeaveaprvlvlPermissions.length > 0 && selectedLeaveaprvlvlPermissions.length < this.GrouppermissionsLeaveaprvlvl.length;
  }

  isLeaveaprvlvltempIndeterminate(): boolean {
    const selectedLeaveaprvlvltempPermissions = this.selectedPermissions.filter(permission =>
      this.GrouppermissionsLeaveaprvlvltemp.map(p => p.id).includes(permission)
    );
    return selectedLeaveaprvlvltempPermissions.length > 0 && selectedLeaveaprvlvltempPermissions.length < this.GrouppermissionsLeaveaprvlvltemp.length;
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
    this.loadLeavePermissions();


    this.updateIndeterminateStates();
    this.updateIndeterminateStatesvalue();
    this.updateIndeterminateReports();
    this.updateInderminateCalenders();
    this.updateInderminateLeave();



  }

  updateIndeterminateStates(): void {
    this.isEmployeeMasterIndeterminate();
    this.isDepartmentMasterIndeterminate();
    this.isDesignationMasterIndeterminate();
    this.isCategoryMasterIndeterminate();
    this.isGenMasterIndeterminate();
    this.isReqtypeMasterIndeterminate();
    this.isAprMasterIndeterminate();
    this.isAprlvlMasterIndeterminate();
    this.isAtdMasterIndeterminate();




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
    this.isDnmasterIndeterminate();
    this.isCpmasterIndeterminate();
    this.isEmtmasterIndeterminate();

    this.isFormdesmasterIndeterminate();


  
  }

updateIndeterminateReports(): void{
  this.isEmployeeReportIndeterminate();
  this.isDocumentReportIndeterminate();
  this.isGeneralReportIndeterminate();
  this.isLeaveReportIndeterminate();

}

updateInderminateCalenders():void{
  this.isAddHolidayIndeterminate();
  this.isAddWeekIndeterminate();
  this.isAssignWeekIndeterminate();
  this.isAssignHolidayIndeterminate();
}


updateInderminateLeave():void{
  this.isLeaveaprvIndeterminate();
  this.isLeavetypeIndeterminate();
  this.isLeavemasterIndeterminate();
  this.isLeavereqIndeterminate();
  this.isLeavecomIndeterminate();
  this.isLeaveaprvlvlIndeterminate();
  this.isLeaveaprvlvltempIndeterminate();


}





  loadPermissions(): void {
    this.loadpermissionsEmpMaster();
    this.loadpermissionsDepartMaster();
    this.loadpermissionsDisgMaster();
    this.loadpermissionsCatgMaster();
    this.loadpermissionsGenMaster();
    this.loadpermissionsReqtypeMaster();
    this.loadpermissionsAprMaster();
    this.loadpermissionsAprlvlMaster();
    this.loadpermissionsAtdMaster();






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
    this.loadpermissionDnmaster();
    this.loadpermissionCpmaster();
    this.loadpermissionEmtmaster();

    this.loadpermissionFormdesmaster();


  }

  loadReportPermissions():void{
    this.loadpermissionsEmpReport();
    this.loadpermissionsDocReport();
    this.loadpermissionsGenReport();
    this.loadpermissionsLeaveReport();

  }


  loadCalenderPermissions():void{
    this.loadpermissionsAddweekDetail();
    this.loadpermissionsAssignweekDetail();
    this.loadpermissionsAddholidayDetail();
    this.loadpermissionsAssignholidayDetail();
  }


  loadLeavePermissions():void{
    this.loadpermissionsLeaveaprv();
    this.loadpermissionsLeavetype();
    this.loadpermissionsLeavemaster();
    this.loadpermissionsLeavereq();
    this.loadpermissionsLeavecom();
    this.loadpermissionsLeaveaprvlvl();
    this.loadpermissionsLeaveaprvlvltemp();


  }




//load employee master permissions 



  loadpermissionsEmpMaster(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore', selectedSchema);
  
    if (selectedSchema) {
      this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
        (result: any[]) => {
          // Specify the codenames you want to filter
          const requiredCodenames = ['add_emp_master', 'change_emp_master', 'delete_emp_master', 'view_emp_master'];
  
          // Filter and remove duplicates based on codename
          const uniquePermissionsMap = new Map();
          result.forEach(permission => {
            const codename = permission.codename.trim().toLowerCase();
            if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
              uniquePermissionsMap.set(codename, permission);
            }
          });
  
          // Convert map values to an array
          this.GrouppermissionsEmp = Array.from(uniquePermissionsMap.values());
  
          console.log('Filtered Unique Permissions:', this.GrouppermissionsEmp);
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

    console.log('schemastore', selectedSchema);
  
    if (selectedSchema) {
      this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
        (result: any[]) => {
          // Specify the codenames you want to filter
          const requiredCodenames = ['add_dept_master', 'change_dept_master', 'delete_dept_master', 'view_dept_master'];
  
          // Filter and remove duplicates based on codename
          const uniquePermissionsMap = new Map();
          result.forEach(permission => {
            const codename = permission.codename.trim().toLowerCase();
            if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
              uniquePermissionsMap.set(codename, permission);
            }
          });
  
          // Convert map values to an array
          this.GrouppermissionsDept = Array.from(uniquePermissionsMap.values());
  
          console.log('Filtered Unique Permissions:', this.GrouppermissionsDept);
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

    console.log('schemastore', selectedSchema);
  
    if (selectedSchema) {
      this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
        (result: any[]) => {
          // Specify the codenames you want to filter
          const requiredCodenames = ['add_desgntn_master', 'change_desgntn_master', 'delete_desgntn_master', 'view_desgntn_master'];
  
          // Filter and remove duplicates based on codename
          const uniquePermissionsMap = new Map();
          result.forEach(permission => {
            const codename = permission.codename.trim().toLowerCase();
            if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
              uniquePermissionsMap.set(codename, permission);
            }
          });
  
          // Convert map values to an array
          this.GrouppermissionsDis = Array.from(uniquePermissionsMap.values());
  
          console.log('Filtered Unique Permissions:', this.GrouppermissionsDis);
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

    console.log('schemastore', selectedSchema);
  
    if (selectedSchema) {
      this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
        (result: any[]) => {
          // Specify the codenames you want to filter
          const requiredCodenames = ['add_ctgry_master', 'change_ctgry_master', 'delete_ctgry_master', 'view_ctgry_master'];
  
          // Filter and remove duplicates based on codename
          const uniquePermissionsMap = new Map();
          result.forEach(permission => {
            const codename = permission.codename.trim().toLowerCase();
            if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
              uniquePermissionsMap.set(codename, permission);
            }
          });
  
          // Convert map values to an array
          this.GrouppermissionsCat = Array.from(uniquePermissionsMap.values());
  
          console.log('Filtered Unique Permissions:', this.GrouppermissionsCat);
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


   //load permission for General request master

   loadpermissionsGenMaster(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore', selectedSchema);
  
    if (selectedSchema) {
      this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
        (result: any[]) => {
          // Specify the codenames you want to filter
          const requiredCodenames = ['add_generalrequest', 'change_generalrequest', 'delete_generalrequest', 'view_generalrequest'];
  
          // Filter and remove duplicates based on codename
          const uniquePermissionsMap = new Map();
          result.forEach(permission => {
            const codename = permission.codename.trim().toLowerCase();
            if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
              uniquePermissionsMap.set(codename, permission);
            }
          });
  
          // Convert map values to an array
          this.GrouppermissionsGen = Array.from(uniquePermissionsMap.values());
  
          console.log('Filtered Unique Permissions:', this.GrouppermissionsGen);
        },
        (error: any) => {
          console.error('Error fetching permissions:', error);
        }
      );
    }
  }


   //Display Name  add view delte code for General request master-------

   getDisplayNameGen(permissionCodename: string): string {
    switch (permissionCodename.trim().toLowerCase()) {
      case 'add_generalrequest':
        return 'Add';
      case 'change_generalrequest':
        return 'Edit';
      case 'delete_generalrequest':
        return 'Delete';
      case 'view_generalrequest':
        return 'View';
      default:
        return permissionCodename;
    }
  }

    //load permission for  request type master

    loadpermissionsReqtypeMaster(): void {
      const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

      console.log('schemastore', selectedSchema);
    
      if (selectedSchema) {
        this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
          (result: any[]) => {
            // Specify the codenames you want to filter
            const requiredCodenames = ['add_requesttype', 'change_requesttype', 'delete_requesttype', 'view_requesttype'];
    
            // Filter and remove duplicates based on codename
            const uniquePermissionsMap = new Map();
            result.forEach(permission => {
              const codename = permission.codename.trim().toLowerCase();
              if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
                uniquePermissionsMap.set(codename, permission);
              }
            });
    
            // Convert map values to an array
            this.GrouppermissionsReqtype = Array.from(uniquePermissionsMap.values());
    
            console.log('Filtered Unique Permissions:', this.GrouppermissionsReqtype);
          },
          (error: any) => {
            console.error('Error fetching permissions:', error);
          }
        );
      }
    }
  
  
     //Display Name  add view delte code for category master-------
  
     getDisplayNameReqtype(permissionCodename: string): string {
      switch (permissionCodename.trim().toLowerCase()) {
        case 'add_requesttype':
          return 'Add';
        case 'change_requesttype':
          return 'Edit';
        case 'delete_requesttype':
          return 'Delete';
        case 'view_requesttype':
          return 'View';
        default:
          return permissionCodename;
      }
    }



      //load permission for General request master

   loadpermissionsAprMaster(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore', selectedSchema);
  
    if (selectedSchema) {
      this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
        (result: any[]) => {
          // Specify the codenames you want to filter
          const requiredCodenames = ['add_approval', 'change_approval', 'delete_approval', 'view_approval'];
  
          // Filter and remove duplicates based on codename
          const uniquePermissionsMap = new Map();
          result.forEach(permission => {
            const codename = permission.codename.trim().toLowerCase();
            if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
              uniquePermissionsMap.set(codename, permission);
            }
          });
  
          // Convert map values to an array
          this.GrouppermissionsApr = Array.from(uniquePermissionsMap.values());
  
          console.log('Filtered Unique Permissions:', this.GrouppermissionsApr);
        },
        (error: any) => {
          console.error('Error fetching permissions:', error);
        }
      );
    }
  }


   //Display Name  add view delte code for General request master-------

   getDisplayNameApr(permissionCodename: string): string {
    switch (permissionCodename.trim().toLowerCase()) {
      case 'add_approval':
        return 'Add';
      case 'change_approval':
        return 'Edit';
      case 'delete_approval':
        return 'Delete';
      case 'view_approval':
        return 'View';
      default:
        return permissionCodename;
    }
  }


      //load permission for General request master

      loadpermissionsAprlvlMaster(): void {
        const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

        console.log('schemastore', selectedSchema);
      
        if (selectedSchema) {
          this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
            (result: any[]) => {
              // Specify the codenames you want to filter
              const requiredCodenames = ['add_approvallevel', 'change_approvallevel', 'delete_approvallevel', 'view_approvallevel'];
      
              // Filter and remove duplicates based on codename
              const uniquePermissionsMap = new Map();
              result.forEach(permission => {
                const codename = permission.codename.trim().toLowerCase();
                if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
                  uniquePermissionsMap.set(codename, permission);
                }
              });
      
              // Convert map values to an array
              this.GrouppermissionsAprlvl = Array.from(uniquePermissionsMap.values());
      
              console.log('Filtered Unique Permissions:', this.GrouppermissionsAprlvl);
            },
            (error: any) => {
              console.error('Error fetching permissions:', error);
            }
          );
        }
      }
    
    
       //Display Name  add view delte code for General request master-------
    
       getDisplayNameAprlvl(permissionCodename: string): string {
        switch (permissionCodename.trim().toLowerCase()) {
          case 'add_approvallevel':
            return 'Add';
          case 'change_approvallevel':
            return 'Edit';
          case 'delete_approvallevel':
            return 'Delete';
          case 'view_approvallevel':
            return 'View';
          default:
            return permissionCodename;
        }
      }
    

         //load permission for General request master

   loadpermissionsAtdMaster(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore', selectedSchema);
  
    if (selectedSchema) {
      this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
        (result: any[]) => {
          // Specify the codenames you want to filter
          const requiredCodenames = ['add_attendance', 'change_attendance', 'delete_attendance', 'view_attendance'];
  
          // Filter and remove duplicates based on codename
          const uniquePermissionsMap = new Map();
          result.forEach(permission => {
            const codename = permission.codename.trim().toLowerCase();
            if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
              uniquePermissionsMap.set(codename, permission);
            }
          });
  
          // Convert map values to an array
          this.GrouppermissionsAtd = Array.from(uniquePermissionsMap.values());
  
          console.log('Filtered Unique Permissions:', this.GrouppermissionsAtd);
        },
        (error: any) => {
          console.error('Error fetching permissions:', error);
        }
      );
    }
  }


   //Display Name  add view delte code for General request master-------

   getDisplayNameAtd(permissionCodename: string): string {
    switch (permissionCodename.trim().toLowerCase()) {
      case 'add_attendance':
        return 'Add';
      case 'change_attendance':
        return 'Edit';
      case 'delete_attendance':
        return 'Delete';
      case 'view_attendance':
        return 'View';
      default:
        return permissionCodename;
    }
  }










// load permission for company master---------

  loadpermissionsCmpMaster(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore', selectedSchema);
  
    if (selectedSchema) {
      this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
        (result: any[]) => {
          // Specify the codenames you want to filter
          const requiredCodenames = ['add_company', 'change_company', 'delete_company', 'view_company'];
  
          // Filter and remove duplicates based on codename
          const uniquePermissionsMap = new Map();
          result.forEach(permission => {
            const codename = permission.codename.trim().toLowerCase();
            if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
              uniquePermissionsMap.set(codename, permission);
            }
          });
  
          // Convert map values to an array
          this.GrouppermissionsCmp = Array.from(uniquePermissionsMap.values());
  
          console.log('Filtered Unique Permissions:', this.GrouppermissionsCmp);
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
  

    
//load permission for branch master------------

  loadpermissionsBranchMaster(): void {
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

    console.log('schemastore', selectedSchema);
  
    if (selectedSchema) {
      this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
        (result: any[]) => {
          // Specify the codenames you want to filter
          const requiredCodenames = ['add_brnch_mstr', 'change_brnch_mstr', 'delete_brnch_mstr', 'view_brnch_mstr'];
  
          // Filter and remove duplicates based on codename
          const uniquePermissionsMap = new Map();
          result.forEach(permission => {
            const codename = permission.codename.trim().toLowerCase();
            if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
              uniquePermissionsMap.set(codename, permission);
            }
          });
  
          // Convert map values to an array
          this.GrouppermissionsBrch = Array.from(uniquePermissionsMap.values());
  
          console.log('Filtered Unique Permissions:', this.GrouppermissionsBrch);
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

      console.log('schemastore', selectedSchema);
    
      if (selectedSchema) {
        this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
          (result: any[]) => {
            // Specify the codenames you want to filter
            const requiredCodenames = ['add_customuser', 'change_customuser', 'delete_customuser', 'view_customuser'];
    
            // Filter and remove duplicates based on codename
            const uniquePermissionsMap = new Map();
            result.forEach(permission => {
              const codename = permission.codename.trim().toLowerCase();
              if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
                uniquePermissionsMap.set(codename, permission);
              }
            });
    
            // Convert map values to an array
            this.GrouppermissionsUser = Array.from(uniquePermissionsMap.values());
    
            console.log('Filtered Unique Permissions:', this.GrouppermissionsUser);
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

    console.log('schemastore', selectedSchema);
  
    if (selectedSchema) {
      this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
        (result: any[]) => {
          // Specify the codenames you want to filter
          const requiredCodenames = ['add_group', 'change_group', 'delete_group', 'view_group'];
  
          // Filter and remove duplicates based on codename
          const uniquePermissionsMap = new Map();
          result.forEach(permission => {
            const codename = permission.codename.trim().toLowerCase();
            if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
              uniquePermissionsMap.set(codename, permission);
            }
          });
  
          // Convert map values to an array
          this.GrouppermissionsUsergroup = Array.from(uniquePermissionsMap.values());
  
          console.log('Filtered Unique Permissions:', this.GrouppermissionsUsergroup);
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

    console.log('schemastore', selectedSchema);
  
    if (selectedSchema) {
      this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
        (result: any[]) => {
          // Specify the codenames you want to filter
          const requiredCodenames = ['add_permission', 'change_permission', 'delete_permission', 'view_permission'];
  
          // Filter and remove duplicates based on codename
          const uniquePermissionsMap = new Map();
          result.forEach(permission => {
            const codename = permission.codename.trim().toLowerCase();
            if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
              uniquePermissionsMap.set(codename, permission);
            }
          });
  
          // Convert map values to an array
          this.GrouppermissionsassigneddUser = Array.from(uniquePermissionsMap.values());
  
          console.log('Filtered Unique Permissions:', this.GrouppermissionsassigneddUser);
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

    console.log('schemastore', selectedSchema);
  
    if (selectedSchema) {
      this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
        (result: any[]) => {
          // Specify the codenames you want to filter
          const requiredCodenames = ['add_state_mstr', 'change_state_mstr', 'delete_state_mstr', 'view_state_mstr'];
  
          // Filter and remove duplicates based on codename
          const uniquePermissionsMap = new Map();
          result.forEach(permission => {
            const codename = permission.codename.trim().toLowerCase();
            if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
              uniquePermissionsMap.set(codename, permission);
            }
          });
  
          // Convert map values to an array
          this.GrouppermissionsstateMaster = Array.from(uniquePermissionsMap.values());
  
          console.log('Filtered Unique Permissions:', this.GrouppermissionsstateMaster);
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

  console.log('schemastore', selectedSchema);

  if (selectedSchema) {
    this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
      (result: any[]) => {
        // Specify the codenames you want to filter
        const requiredCodenames = ['add_document_type', 'change_document_type', 'delete_document_type', 'view_document_type'];

        // Filter and remove duplicates based on codename
        const uniquePermissionsMap = new Map();
        result.forEach(permission => {
          const codename = permission.codename.trim().toLowerCase();
          if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
            uniquePermissionsMap.set(codename, permission);
          }
        });

        // Convert map values to an array
        this.Grouppermissionsdocumentype = Array.from(uniquePermissionsMap.values());

        console.log('Filtered Unique Permissions:', this.Grouppermissionsdocumentype);
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

    console.log('schemastore', selectedSchema);
  
    if (selectedSchema) {
      this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
        (result: any[]) => {
          // Specify the codenames you want to filter
          const requiredCodenames = ['add_emp_documents', 'change_emp_documents', 'delete_emp_documents', 'view_emp_documents'];
  
          // Filter and remove duplicates based on codename
          const uniquePermissionsMap = new Map();
          result.forEach(permission => {
            const codename = permission.codename.trim().toLowerCase();
            if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
              uniquePermissionsMap.set(codename, permission);
            }
          });
  
          // Convert map values to an array
          this.Grouppermissionsexpirydocuments = Array.from(uniquePermissionsMap.values());
  
          console.log('Filtered Unique Permissions:', this.Grouppermissionsexpirydocuments);
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

      console.log('schemastore', selectedSchema);
    
      if (selectedSchema) {
        this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
          (result: any[]) => {
            // Specify the codenames you want to filter
            const requiredCodenames = ['add_company', 'change_company', 'delete_company', 'view_company'];
    
            // Filter and remove duplicates based on codename
            const uniquePermissionsMap = new Map();
            result.forEach(permission => {
              const codename = permission.codename.trim().toLowerCase();
              if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
                uniquePermissionsMap.set(codename, permission);
              }
            });
    
            // Convert map values to an array
            this.GrouppermissionslocationMaster = Array.from(uniquePermissionsMap.values());
    
            console.log('Filtered Unique Permissions:', this.GrouppermissionslocationMaster);
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

      loadpermissionDnmaster(): void {
        const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

        console.log('schemastore', selectedSchema);
      
        if (selectedSchema) {
          this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
            (result: any[]) => {
              // Specify the codenames you want to filter
              const requiredCodenames = ['add_document_numbering', 'change_document_numbering', 'delete_document_numbering', 'view_document_numbering'];
      
              // Filter and remove duplicates based on codename
              const uniquePermissionsMap = new Map();
              result.forEach(permission => {
                const codename = permission.codename.trim().toLowerCase();
                if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
                  uniquePermissionsMap.set(codename, permission);
                }
              });
      
              // Convert map values to an array
              this.GrouppermissionsDnMaster = Array.from(uniquePermissionsMap.values());
      
              console.log('Filtered Unique Permissions:', this.GrouppermissionsDnMaster);
            },
            (error: any) => {
              console.error('Error fetching permissions:', error);
            }
          );
        }
      }
    
        //Display Name  add view delte code for Company master-------
    
        getDisplayNameDn(permissionCodename: string): string {
          switch (permissionCodename.trim().toLowerCase()) {
            case 'add_document_numbering':
              return 'Add';
            case 'change_document_numbering':
              return 'Edit';
            case 'delete_document_numbering':
              return 'Delete';
            case 'view_document_numbering':
              return 'View';
            default:
              return permissionCodename;
          }
        }

        loadpermissionCpmaster(): void {
          const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
  
          console.log('schemastore', selectedSchema);
        
          if (selectedSchema) {
            this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
              (result: any[]) => {
                // Specify the codenames you want to filter
                const requiredCodenames = ['add_companypolicy', 'change_companypolicy', 'delete_companypolicy', 'view_companypolicy'];
        
                // Filter and remove duplicates based on codename
                const uniquePermissionsMap = new Map();
                result.forEach(permission => {
                  const codename = permission.codename.trim().toLowerCase();
                  if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
                    uniquePermissionsMap.set(codename, permission);
                  }
                });
        
                // Convert map values to an array
                this.GrouppermissionsCpMaster = Array.from(uniquePermissionsMap.values());
        
                console.log('Filtered Unique Permissions:', this.GrouppermissionsCpMaster);
              },
              (error: any) => {
                console.error('Error fetching permissions:', error);
              }
            );
          }
        }
      
          //Display Name  add view delte code for Company master-------
      
          getDisplayNameCp(permissionCodename: string): string {
            switch (permissionCodename.trim().toLowerCase()) {
              case 'add_companypolicy':
                return 'Add';
              case 'change_companypolicy':
                return 'Edit';
              case 'delete_companypolicy':
                return 'Delete';
              case 'view_companypolicy':
                return 'View';
              default:
                return permissionCodename;
            }
          }

          loadpermissionEmtmaster(): void {
            const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
    
            console.log('schemastore', selectedSchema);
          
            if (selectedSchema) {
              this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
                (result: any[]) => {
                  // Specify the codenames you want to filter
                  const requiredCodenames = ['add_emailtemplate', 'change_emailtemplate', 'delete_emailtemplate', 'view_emailtemplate'];
          
                  // Filter and remove duplicates based on codename
                  const uniquePermissionsMap = new Map();
                  result.forEach(permission => {
                    const codename = permission.codename.trim().toLowerCase();
                    if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
                      uniquePermissionsMap.set(codename, permission);
                    }
                  });
          
                  // Convert map values to an array
                  this.GrouppermissionsEmtMaster = Array.from(uniquePermissionsMap.values());
          
                  console.log('Filtered Unique Permissions:', this.GrouppermissionsEmtMaster);
                },
                (error: any) => {
                  console.error('Error fetching permissions:', error);
                }
              );
            }
          }
        
            //Display Name  add view delte code for Company master-------
        
            getDisplayNameEmt(permissionCodename: string): string {
              switch (permissionCodename.trim().toLowerCase()) {
                case 'add_emailtemplate':
                  return 'Add';
                case 'change_emailtemplate':
                  return 'Edit';
                case 'delete_emailtemplate':
                  return 'Delete';
                case 'view_emailtemplate':
                  return 'View';
                default:
                  return permissionCodename;
              }
            }

        loadpermissionFormdesmaster(): void {
          const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

          console.log('schemastore', selectedSchema);
        
          if (selectedSchema) {
            this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
              (result: any[]) => {
                // Specify the codenames you want to filter
                const requiredCodenames = ['add_emp_customfield', 'change_emp_customfield', 'delete_emp_customfield', 'view_emp_customfield'];
        
                // Filter and remove duplicates based on codename
                const uniquePermissionsMap = new Map();
                result.forEach(permission => {
                  const codename = permission.codename.trim().toLowerCase();
                  if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
                    uniquePermissionsMap.set(codename, permission);
                  }
                });
        
                // Convert map values to an array
                this.GrouppermissionsFormdesMaster = Array.from(uniquePermissionsMap.values());
        
                console.log('Filtered Unique Permissions:', this.GrouppermissionsFormdesMaster);
              },
              (error: any) => {
                console.error('Error fetching permissions:', error);
              }
            );
          }
        }
      
          //Display Name  add view delte code for Company master-------
      
          getDisplayNameFormdes(permissionCodename: string): string {
            switch (permissionCodename.trim().toLowerCase()) {
              case 'add_emp_customfield':
                return 'Add';
              case 'change_emp_customfield':
                return 'Edit';
              case 'delete_emp_customfield':
                return 'Delete';
              case 'view_emp_customfield':
                return 'View';
              default:
                return permissionCodename;
            }
          }







      loadpermissionsEmpReport(): void {
        const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

        console.log('schemastore', selectedSchema);
      
        if (selectedSchema) {
          this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
            (result: any[]) => {
              // Specify the codenames you want to filter
              const requiredCodenames = ['add_report', 'change_report', 'delete_report', 'export_report','view_report'];
      
              // Filter and remove duplicates based on codename
              const uniquePermissionsMap = new Map();
              result.forEach(permission => {
                const codename = permission.codename.trim().toLowerCase();
                if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
                  uniquePermissionsMap.set(codename, permission);
                }
              });
      
              // Convert map values to an array
              this.GrouppermissionsemployeeReport = Array.from(uniquePermissionsMap.values());
      
              console.log('Filtered Unique Permissions:', this.GrouppermissionsemployeeReport);
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

          console.log('schemastore', selectedSchema);
        
          if (selectedSchema) {
            this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
              (result: any[]) => {
                // Specify the codenames you want to filter
                const requiredCodenames = ['add_doc_report', 'change_doc_report', 'delete_doc_report', 'export_document_report','view_doc_report'];
        
                // Filter and remove duplicates based on codename
                const uniquePermissionsMap = new Map();
                result.forEach(permission => {
                  const codename = permission.codename.trim().toLowerCase();
                  if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
                    uniquePermissionsMap.set(codename, permission);
                  }
                });
        
                // Convert map values to an array
                this.GrouppermissionsdocumnetReport = Array.from(uniquePermissionsMap.values());
        
                console.log('Filtered Unique Permissions:', this.GrouppermissionsdocumnetReport);
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
            case 'export_document_report':
              return 'Export';
              case 'view_doc_report':
                return 'View';
            default:
              return permissionCodename;
          }
        }



        loadpermissionsGenReport(): void {
          const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

  console.log('schemastore', selectedSchema);

  if (selectedSchema) {
    this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
      (result: any[]) => {
        // Specify the codenames you want to filter
        const requiredCodenames = ['add_generalrequestreport', 'change_generalrequestreport', 'delete_generalrequestreport', 'export_general_request_report','view_generalrequestreport'];

        // Filter and remove duplicates based on codename
        const uniquePermissionsMap = new Map();
        result.forEach(permission => {
          const codename = permission.codename.trim().toLowerCase();
          if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
            uniquePermissionsMap.set(codename, permission);
          }
        });

        // Convert map values to an array
        this.GrouppermissiionsgeneralReport = Array.from(uniquePermissionsMap.values());

        console.log('Filtered Unique Permissions:', this.GrouppermissiionsgeneralReport);
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


          loadpermissionsLeaveReport(): void {
            const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
  
    console.log('schemastore', selectedSchema);
  
    if (selectedSchema) {
      this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
        (result: any[]) => {
          // Specify the codenames you want to filter
          const requiredCodenames = ['add_leavereport', 'change_leavereport', 'delete_leavereport', 'export_report','view_leavereport'];
  
          // Filter and remove duplicates based on codename
          const uniquePermissionsMap = new Map();
          result.forEach(permission => {
            const codename = permission.codename.trim().toLowerCase();
            if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
              uniquePermissionsMap.set(codename, permission);
            }
          });
  
          // Convert map values to an array
          this.GrouppermissiionsLeaveReport = Array.from(uniquePermissionsMap.values());
  
          console.log('Filtered Unique Permissions:', this.GrouppermissiionsLeaveReport);
        },
        (error: any) => {
          console.error('Error fetching permissions:', error);
        }
      );
    }
          }





  
  
        
            //Display Name  add view delte code for Company master-------
        
            getDisplayNameLeaveReport(permissionCodename: string): string {
              switch (permissionCodename.trim().toLowerCase()) {
                case 'add_leavereport':
                  return 'Add';
                case 'change_leavereport':
                  return 'Edit';
                case 'delete_leavereport':
                  return 'Delete';
                case 'export_report':
                  return 'Export';
                  case 'view_leavereport':
                    return 'View';
                default:
                  return permissionCodename;
              }
            }
  


          
        
        
        
          // loadpermissionsAddweekDetail
            loadpermissionsAddweekDetail(): void {
              const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

              console.log('schemastore', selectedSchema);
            
              if (selectedSchema) {
                this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
                  (result: any[]) => {
                    // Specify the codenames you want to filter
                    const requiredCodenames = ['add_weekend_calendar', 'change_weekend_calendar', 'delete_weekend_calendar', 'view_weekend_calendar'];
            
                    // Filter and remove duplicates based on codename
                    const uniquePermissionsMap = new Map();
                    result.forEach(permission => {
                      const codename = permission.codename.trim().toLowerCase();
                      if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
                        uniquePermissionsMap.set(codename, permission);
                      }
                    });
            
                    // Convert map values to an array
                    this.Grouppermissionsaddweek = Array.from(uniquePermissionsMap.values());
            
                    console.log('Filtered Unique Permissions:', this.Grouppermissionsaddweek);
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

  console.log('schemastore', selectedSchema);

  if (selectedSchema) {
    this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
      (result: any[]) => {
        // Specify the codenames you want to filter
        const requiredCodenames = ['add_assign_weekend', 'change_assign_weekend', 'delete_assign_weekend', 'view_assign_weekend'];

        // Filter and remove duplicates based on codename
        const uniquePermissionsMap = new Map();
        result.forEach(permission => {
          const codename = permission.codename.trim().toLowerCase();
          if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
            uniquePermissionsMap.set(codename, permission);
          }
        });

        // Convert map values to an array
        this.Grouppermisionsassignweek = Array.from(uniquePermissionsMap.values());

        console.log('Filtered Unique Permissions:', this.Grouppermisionsassignweek);
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

                  console.log('schemastore', selectedSchema);
                
                  if (selectedSchema) {
                    this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
                      (result: any[]) => {
                        // Specify the codenames you want to filter
                        const requiredCodenames = ['add_holiday', 'change_holiday', 'delete_holiday', 'view_holiday'];
                
                        // Filter and remove duplicates based on codename
                        const uniquePermissionsMap = new Map();
                        result.forEach(permission => {
                          const codename = permission.codename.trim().toLowerCase();
                          if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
                            uniquePermissionsMap.set(codename, permission);
                          }
                        });
                
                        // Convert map values to an array
                        this.Grouppermissionsaddholiday = Array.from(uniquePermissionsMap.values());
                
                        console.log('Filtered Unique Permissions:', this.Grouppermissionsaddholiday);
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

                    console.log('schemastore', selectedSchema);
                  
                    if (selectedSchema) {
                      this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
                        (result: any[]) => {
                          // Specify the codenames you want to filter
                          const requiredCodenames = ['add_assign_holiday', 'change_assign_holiday', 'delete_assign_holiday', 'view_assign_holiday'];
                  
                          // Filter and remove duplicates based on codename
                          const uniquePermissionsMap = new Map();
                          result.forEach(permission => {
                            const codename = permission.codename.trim().toLowerCase();
                            if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
                              uniquePermissionsMap.set(codename, permission);
                            }
                          });
                  
                          // Convert map values to an array
                          this.Grouppermissionsassisgnholiday = Array.from(uniquePermissionsMap.values());
                  
                          console.log('Filtered Unique Permissions:', this.Grouppermissionsassisgnholiday);
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







                    loadpermissionsLeaveaprv(): void {
                      const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

                      console.log('schemastore', selectedSchema);
                    
                      if (selectedSchema) {
                        this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
                          (result: any[]) => {
                            // Specify the codenames you want to filter
                            const requiredCodenames = ['add_leaveapproval', 'change_leaveapproval', 'delete_leaveapproval', 'view_leaveapproval'];
                    
                            // Filter and remove duplicates based on codename
                            const uniquePermissionsMap = new Map();
                            result.forEach(permission => {
                              const codename = permission.codename.trim().toLowerCase();
                              if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
                                uniquePermissionsMap.set(codename, permission);
                              }
                            });
                    
                            // Convert map values to an array
                            this.GrouppermissionsLeaveaprv = Array.from(uniquePermissionsMap.values());
                    
                            console.log('Filtered Unique Permissions:', this.GrouppermissionsLeaveaprv);
                          },
                          (error: any) => {
                            console.error('Error fetching permissions:', error);
                          }
                        );
                      }
                    }
                  
                  
                      //Display Name add view delte code for emplotee master-------
                  
                      getDisplayNameLeaveaprv(permissionCodename: string): string {
                        switch (permissionCodename.trim().toLowerCase()) {
                          case 'add_leaveapproval':
                            return 'Add';
                          case 'change_leaveapproval':
                            return 'Edit';
                          case 'delete_leaveapproval':
                            return 'Delete';
                          case 'view_leaveapproval':
                            return 'View';
                          default:
                            return permissionCodename;
                        }
                      }


                      
                    loadpermissionsLeavetype(): void {
                      const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

                      console.log('schemastore', selectedSchema);
                    
                      if (selectedSchema) {
                        this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
                          (result: any[]) => {
                            // Specify the codenames you want to filter
                            const requiredCodenames = ['add_leave_type', 'change_leave_type', 'delete_leave_type', 'view_leave_type'];
                    
                            // Filter and remove duplicates based on codename
                            const uniquePermissionsMap = new Map();
                            result.forEach(permission => {
                              const codename = permission.codename.trim().toLowerCase();
                              if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
                                uniquePermissionsMap.set(codename, permission);
                              }
                            });
                    
                            // Convert map values to an array
                            this.GrouppermissionsLeavetype = Array.from(uniquePermissionsMap.values());
                    
                            console.log('Filtered Unique Permissions:', this.GrouppermissionsLeavetype);
                          },
                          (error: any) => {
                            console.error('Error fetching permissions:', error);
                          }
                        );
                      }
                    }
                  
                  
                      //Display Name add view delte code for emplotee master-------
                  
                      getDisplayNameLeavetype(permissionCodename: string): string {
                        switch (permissionCodename.trim().toLowerCase()) {
                          case 'add_leave_type':
                            return 'Add';
                          case 'change_leave_type':
                            return 'Edit';
                          case 'delete_leave_type':
                            return 'Delete';
                          case 'view_leave_type':
                            return 'View';
                          default:
                            return permissionCodename;
                        }
                      }

                      loadpermissionsLeavemaster(): void {
                        const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

                        console.log('schemastore', selectedSchema);
                      
                        if (selectedSchema) {
                          this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
                            (result: any[]) => {
                              // Specify the codenames you want to filter
                              const requiredCodenames = ['add_leave_entitlement', 'change_leave_entitlement', 'delete_leave_entitlement', 'view_leave_entitlement'];
                      
                              // Filter and remove duplicates based on codename
                              const uniquePermissionsMap = new Map();
                              result.forEach(permission => {
                                const codename = permission.codename.trim().toLowerCase();
                                if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
                                  uniquePermissionsMap.set(codename, permission);
                                }
                              });
                      
                              // Convert map values to an array
                              this.GrouppermissionsLeavemaster = Array.from(uniquePermissionsMap.values());
                      
                              console.log('Filtered Unique Permissions:', this.GrouppermissionsLeavemaster);
                            },
                            (error: any) => {
                              console.error('Error fetching permissions:', error);
                            }
                          );
                        }
                      }
                    
                    
                        //Display Name add view delte code for emplotee master-------
                    
                        getDisplayNameLeavemaster(permissionCodename: string): string {
                          switch (permissionCodename.trim().toLowerCase()) {
                            case 'add_leave_entitlement':
                              return 'Add';
                            case 'change_leave_entitlement':
                              return 'Edit';
                            case 'delete_leave_entitlement':
                              return 'Delete';
                            case 'view_leave_entitlement':
                              return 'View';
                            default:
                              return permissionCodename;
                          }
                        }

                        loadpermissionsLeavereq(): void {
                          const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

                          console.log('schemastore', selectedSchema);
                        
                          if (selectedSchema) {
                            this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
                              (result: any[]) => {
                                // Specify the codenames you want to filter
                                const requiredCodenames = ['add_employee_leave_request', 'change_employee_leave_request', 'delete_employee_leave_request', 'view_employee_leave_request'];
                        
                                // Filter and remove duplicates based on codename
                                const uniquePermissionsMap = new Map();
                                result.forEach(permission => {
                                  const codename = permission.codename.trim().toLowerCase();
                                  if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
                                    uniquePermissionsMap.set(codename, permission);
                                  }
                                });
                        
                                // Convert map values to an array
                                this.GrouppermissionsLeavereq = Array.from(uniquePermissionsMap.values());
                        
                                console.log('Filtered Unique Permissions:', this.GrouppermissionsLeavereq);
                              },
                              (error: any) => {
                                console.error('Error fetching permissions:', error);
                              }
                            );
                          }
                        }
                      
                          //Display Name add view delte code for emplotee master-------
                      
                          getDisplayNameLeavereq(permissionCodename: string): string {
                            switch (permissionCodename.trim().toLowerCase()) {
                              case 'add_employee_leave_request':
                                return 'Add';
                              case 'change_employee_leave_request':
                                return 'Edit';
                              case 'delete_employee_leave_request':
                                return 'Delete';
                              case 'view_employee_leave_request':
                                return 'View';
                              default:
                                return permissionCodename;
                            }
                          }

                          
                        loadpermissionsLeavecom(): void {
                          const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

                          console.log('schemastore', selectedSchema);
                        
                          if (selectedSchema) {
                            this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
                              (result: any[]) => {
                                // Specify the codenames you want to filter
                                const requiredCodenames = ['add_compensatoryleavetransaction', 'change_compensatoryleavetransaction', 'delete_compensatoryleavetransaction', 'view_compensatoryleavetransaction'];
                        
                                // Filter and remove duplicates based on codename
                                const uniquePermissionsMap = new Map();
                                result.forEach(permission => {
                                  const codename = permission.codename.trim().toLowerCase();
                                  if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
                                    uniquePermissionsMap.set(codename, permission);
                                  }
                                });
                        
                                // Convert map values to an array
                                this.GrouppermissionsLeavecom = Array.from(uniquePermissionsMap.values());
                        
                                console.log('Filtered Unique Permissions:', this.GrouppermissionsLeavecom);
                              },
                              (error: any) => {
                                console.error('Error fetching permissions:', error);
                              }
                            );
                          }
                        }
                      
                          //Display Name add view delte code for emplotee master-------
                      
                          getDisplayNameLeavecom(permissionCodename: string): string {
                            switch (permissionCodename.trim().toLowerCase()) {
                              case 'add_compensatoryleavetransaction':
                                return 'Add';
                              case 'change_compensatoryleavetransaction':
                                return 'Edit';
                              case 'delete_compensatoryleavetransaction':
                                return 'Delete';
                              case 'view_compensatoryleavetransaction':
                                return 'View';
                              default:
                                return permissionCodename;
                            }
                          }



                          loadpermissionsLeaveaprvlvl(): void {
                            const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

                            console.log('schemastore', selectedSchema);
                          
                            if (selectedSchema) {
                              this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
                                (result: any[]) => {
                                  // Specify the codenames you want to filter
                                  const requiredCodenames = ['add_leaveapprovallevels', 'change_leaveapprovallevels', 'delete_leaveapprovallevels', 'view_leaveapprovallevels'];
                          
                                  // Filter and remove duplicates based on codename
                                  const uniquePermissionsMap = new Map();
                                  result.forEach(permission => {
                                    const codename = permission.codename.trim().toLowerCase();
                                    if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
                                      uniquePermissionsMap.set(codename, permission);
                                    }
                                  });
                          
                                  // Convert map values to an array
                                  this.GrouppermissionsLeaveaprvlvl = Array.from(uniquePermissionsMap.values());
                          
                                  console.log('Filtered Unique Permissions:', this.GrouppermissionsLeaveaprvlvl);
                                },
                                (error: any) => {
                                  console.error('Error fetching permissions:', error);
                                }
                              );
                            }
                          }
                        
                        
                            //Display Name add view delte code for emplotee master-------
                        
                            getDisplayNameLeaveaprvlvl(permissionCodename: string): string {
                              switch (permissionCodename.trim().toLowerCase()) {
                                case 'add_leaveapprovallevels':
                                  return 'Add';
                                case 'change_leaveapprovallevels':
                                  return 'Edit';
                                case 'delete_leaveapprovallevels':
                                  return 'Delete';
                                case 'view_leaveapprovallevels':
                                  return 'View';
                                default:
                                  return permissionCodename;
                              }
                            }
      

                            loadpermissionsLeaveaprvlvltemp(): void {
                              const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema

                              console.log('schemastore', selectedSchema);
                            
                              if (selectedSchema) {
                                this.UserMasterService.getPermissionByRoleGrouping(selectedSchema).subscribe(
                                  (result: any[]) => {
                                    // Specify the codenames you want to filter
                                    const requiredCodenames = ['add_lvemailtemplate', 'change_lvemailtemplate', 'delete_lvemailtemplate', 'view_lvemailtemplate'];
                            
                                    // Filter and remove duplicates based on codename
                                    const uniquePermissionsMap = new Map();
                                    result.forEach(permission => {
                                      const codename = permission.codename.trim().toLowerCase();
                                      if (requiredCodenames.includes(codename) && !uniquePermissionsMap.has(codename)) {
                                        uniquePermissionsMap.set(codename, permission);
                                      }
                                    });
                            
                                    // Convert map values to an array
                                    this.GrouppermissionsLeaveaprvlvltemp = Array.from(uniquePermissionsMap.values());
                            
                                    console.log('Filtered Unique Permissions:', this.GrouppermissionsLeaveaprvlvltemp);
                                  },
                                  (error: any) => {
                                    console.error('Error fetching permissions:', error);
                                  }
                                );
                              }
                            }
                          
                          
                              //Display Name add view delte code for emplotee master-------
                          
                              getDisplayNameLeaveaprvlvltemp(permissionCodename: string): string {
                                switch (permissionCodename.trim().toLowerCase()) {
                                  case 'add_lvemailtemplate':
                                    return 'Add';
                                  case 'change_lvemailtemplate':
                                    return 'Edit';
                                  case 'delete_lvemailtemplate':
                                    return 'Delete';
                                  case 'view_lvemailtemplate':
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



  onCheckboxChangeGen(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
    this.updateGenMasterCheckbox();
    this.updateSelectAll();
  }

  updateGenMasterCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsGen.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.GenMasterChecked = allPermissionsSelected;
    this.GenMasterInderminate = this.isGenMasterIndeterminate();

  }



  
  onCheckboxChangeReqtype(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
    this.updateReqtypeMasterCheckbox();
    this.updateSelectAll();
  }

  updateReqtypeMasterCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsReqtype.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.ReqtypeMasterChecked = allPermissionsSelected;
    this.ReqtypeMasterInderminate = this.isReqtypeMasterIndeterminate();

  }


  onCheckboxChangeApr(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
    this.updateAprMasterCheckbox();
    this.updateSelectAll();
  }

  updateAprMasterCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsApr.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.AprMasterChecked = allPermissionsSelected;
    this.AprMasterInderminate = this.isAprMasterIndeterminate();

  }



  
  onCheckboxChangeAprlvl(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
    this.updateAprlvlMasterCheckbox();
    this.updateSelectAll();
  }

  updateAprlvlMasterCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsAprlvl.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.AprlvlMasterChecked = allPermissionsSelected;
    this.AprlvlMasterInderminate = this.isAprlvlMasterIndeterminate();

  }


  
  onCheckboxChangeAtd(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
    this.updateAtdMasterCheckbox();
    this.updateSelectAll();
  }

  updateAtdMasterCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsAtd.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.AtdMasterChecked = allPermissionsSelected;
    this.AtdMasterInderminate = this.isAtdMasterIndeterminate();

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


  onCheckboxChangesDn(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateDnMasterCheckbox();
    this.updateSelectAlls();

  }

  updateDnMasterCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsDnMaster.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.DnMasterChecked = allPermissionsSelected;
    this.DnMasterInderminate = this.isDnmasterIndeterminate();
  }

  onCheckboxChangesCp(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateCpMasterCheckbox();
    this.updateSelectAlls();

  }

  updateCpMasterCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsCpMaster.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.CpMasterChecked = allPermissionsSelected;
    this.CpMasterInderminate = this.isCpmasterIndeterminate();
  }

  onCheckboxChangesEmt(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateEmtMasterCheckbox();
    this.updateSelectAlls();

  }

  updateEmtMasterCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsEmtMaster.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.EmtMasterChecked = allPermissionsSelected;
    this.EmtMasterInderminate = this.isEmtmasterIndeterminate();
  }


  onCheckboxChangesFormdes(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateFormdesMasterCheckbox();
    this.updateSelectAlls();

  }

  updateFormdesMasterCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsFormdesMaster.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.FormdesMasterChecked = allPermissionsSelected;
    this.FormdesMasterInderminate = this.isFormdesmasterIndeterminate();
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


  onCheckboxChangesLeaveReport(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateLeaveReportCheckbox();
    this.updateReport();

  }

  updateLeaveReportCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissiionsLeaveReport.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.LeaveReportChecked= allPermissionsSelected;
    this.LeaveReportInderminate = this.isLeaveReportIndeterminate();
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






  onCheckboxChangesLeaveaprv(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateLeaveaprvCheckbox();
    this.updateLeave();

  }

  updateLeaveaprvCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsLeaveaprv.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.LeaveaprvChecked = allPermissionsSelected;
    this.LeaveaprvInderminate = this.isLeaveaprvIndeterminate();
  }


  onCheckboxChangesLeavetype(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateLeavetypeCheckbox();
    this.updateLeave();

  }

  updateLeavetypeCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsLeavetype.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.LeavetypeChecked = allPermissionsSelected;
    this.LeavetypeInderminate = this.isLeavetypeIndeterminate();
  }

  onCheckboxChangesLeavemaster(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateLeavemasterCheckbox();
    this.updateLeave();

  }

  updateLeavemasterCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsLeavemaster.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.LeavemasterChecked = allPermissionsSelected;
    this.LeavemasterInderminate = this.isLeavemasterIndeterminate();
  }



  onCheckboxChangesLeavereq(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateLeavereqCheckbox();
    this.updateLeave();

  }

  updateLeavereqCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsLeavereq.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.LeavereqChecked = allPermissionsSelected;
    this.LeavereqInderminate = this.isLeavereqIndeterminate();
  }


  onCheckboxChangesLeavecom(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateLeavecomCheckbox();
    this.updateLeave();

  }

  updateLeavecomCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsLeavecom.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.LeavecomChecked = allPermissionsSelected;
    this.LeavecomInderminate = this.isLeavecomIndeterminate();
  }



  onCheckboxChangesLeaveaprvlvl(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateLeaveaprvlvlCheckbox();
    this.updateLeave();

  }

  updateLeaveaprvlvlCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsLeaveaprvlvl.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.LeaveaprvlvlChecked = allPermissionsSelected;
    this.LeaveaprvlvlInderminate = this.isLeaveaprvlvlIndeterminate();
  }

  onCheckboxChangesLeaveaprvlvltemp(permission: string): void {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  
   
    // Update selectAll checkbox status
    this.updateLeaveaprvlvltempCheckbox();
    this.updateLeave();

  }

  updateLeaveaprvlvltempCheckbox(): void {
    const allPermissionsSelected = this.GrouppermissionsLeaveaprvlvltemp.every(permission => 
      this.selectedPermissions.includes(permission.id)
    );
    this.LeaveaprvlvltempChecked = allPermissionsSelected;
    this.LeaveaprvlvltempInderminate = this.isLeaveaprvlvltempIndeterminate();
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
    this.updateGenMasterCheckbox();
    this.updateReqtypeMasterCheckbox();
    this.updateAprMasterCheckbox();
    this.updateAprlvlMasterCheckbox();
    this.updateAtdMasterCheckbox();





    this.updateBranchCheckbox();
    this.updateuserMasterCheckbox();
    this.updateUsergroupMasterCheckbox();
    this.updateassignMasterCheckbox();
    this.updateStateMasterCheckbox();
    this.updatedoctypeMasterCheckbox();
    this.updateexpiryMasterCheckbox();
    this.updatelocMasterCheckbox();
    this.updateDnMasterCheckbox();
    this.updateFormdesMasterCheckbox();



    this.updateEmpReportCheckbox();
    this.updateGenReportCheckbox();
    this.updatedocReportCheckbox();


    this.updateAddHolidayCheckbox();
    this.updateAddWeekCheckbox();
    this.updateAssignHolidayCheckbox();
    this.updateAssignweekCheckbox();


    this.updateLeaveaprvCheckbox();

    this.updateSelectAll();
    this.updateSelectAlls();
    this.updateReport();
    this.updateCalender();
    this.updateLeave();

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

  onGenMasterChange(): void {
    if (this.GenMasterChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsGen.map(permission => permission.id));
    } else {  
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsGen.map(p => p.id).includes(permission));
    }
  
    // Update related checkboxes
    this.updateEmployeeManagementCheckbox();
    // this.selectAllChecked = this.categoryMasterChecked;

  }

  onReqtypeMasterChange(): void {
    if (this.ReqtypeMasterChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsReqtype.map(permission => permission.id));
    } else {  
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsReqtype.map(p => p.id).includes(permission));
    }
  
    // Update related checkboxes
    this.updateEmployeeManagementCheckbox();
    // this.selectAllChecked = this.categoryMasterChecked;

  }

  onAprMasterChange(): void {
    if (this.AprMasterChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsApr.map(permission => permission.id));
    } else {  
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsApr.map(p => p.id).includes(permission));
    }
  
    // Update related checkboxes
    this.updateEmployeeManagementCheckbox();
    // this.selectAllChecked = this.categoryMasterChecked;

  }

  onAprlvlMasterChange(): void {
    if (this.AprlvlMasterChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsAprlvl.map(permission => permission.id));
    } else {  
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsAprlvl.map(p => p.id).includes(permission));
    }
  
    // Update related checkboxes
    this.updateEmployeeManagementCheckbox();
    // this.selectAllChecked = this.categoryMasterChecked;

  }

  onAtdMasterChange(): void {
    if (this.AtdMasterChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsAtd.map(permission => permission.id));
    } else {  
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsAtd.map(p => p.id).includes(permission));
    }
  
    // Update related checkboxes
    this.updateEmployeeManagementCheckbox();
    // this.selectAllChecked = this.categoryMasterChecked;

  }

  updateEmployeeManagementCheckbox() {
    this.selectAllChecked = this.employeeMasterChecked && 
                            this.departmentMasterChecked && 
                            this.designationMasterChecked && 
                            this.categoryMasterChecked &&
                            this.GenMasterChecked &&
                            this.ReqtypeMasterChecked&&
                            this.AprMasterChecked &&
                            this.AprlvlMasterChecked&&
                            this.AtdMasterChecked;
}

selectAll(): void {
  const allPermissions = [
    ...this.GrouppermissionsEmp,
    ...this.GrouppermissionsDept,
    ...this.GrouppermissionsCat,
    ...this.GrouppermissionsDis,
    ...this.GrouppermissionsGen,
    ...this.GrouppermissionsReqtype,
    ...this.GrouppermissionsApr,
    ...this.GrouppermissionsAprlvl,
    ...this.GrouppermissionsAtd,





    
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
  this.updateGenMasterCheckbox();
  this.updateReqtypeMasterCheckbox();
  this.updateAprMasterCheckbox();
  this.updateAprlvlMasterCheckbox();
  this.updateAtdMasterCheckbox();





  this.updateEmployeeManagementCheckbox();
}

isEmpDeptDisCatPermission(permission: string): boolean {
  return [...this.GrouppermissionsEmp, ...this.GrouppermissionsDept, ...this.GrouppermissionsDis, 
    ...this.GrouppermissionsCat, ...this.GrouppermissionsGen,...this.GrouppermissionsReqtype,
    ...this.GrouppermissionsApr, ...this.GrouppermissionsAprlvl,...this.GrouppermissionsAtd,]
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
  this.updateGenMasterCheckbox();
  this.updateReqtypeMasterCheckbox();
  this.updateAprMasterCheckbox();
  this.updateAprlvlMasterCheckbox();
  this.updateAtdMasterCheckbox();




  this.updateEmployeeManagementCheckbox();
}
isemployee(): boolean {
  
  const employeeMasterIndeterminate = this.isEmployeeMasterIndeterminate();
  const departmentMasterInderminate = this.isDepartmentMasterIndeterminate();
  const designationMasterInderminate = this.isDesignationMasterIndeterminate();
  const categoryMasterInderminate = this.isCategoryMasterIndeterminate();
  const GenMasterInderminate = this.isGenMasterIndeterminate();
  const ReqtypeMasterInderminate = this.isReqtypeMasterIndeterminate();
  const AprMasterInderminate = this.isAprMasterIndeterminate();
  const AprlvlMasterInderminate = this.isAprlvlMasterIndeterminate();
  const AtdMasterInderminate = this.isAtdMasterIndeterminate();





    const otherGroupIndeterminate = false; // Add indeterminate checks for other groups like Dept, Dis, Cat

    // Return true only if some but not all checkboxes are selected
    return employeeMasterIndeterminate || departmentMasterInderminate || designationMasterInderminate || categoryMasterInderminate|| 
    GenMasterInderminate|| ReqtypeMasterInderminate|| AprMasterInderminate|| AprlvlMasterInderminate|| AtdMasterInderminate||  otherGroupIndeterminate;
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
  const DnMasterInderminate = this.isDnmasterIndeterminate();
  const CpMasterInderminate = this.isCpmasterIndeterminate();
  const EmtMasterInderminate = this.isEmtmasterIndeterminate();

  const FormdesMasterInderminate = this.isFormdesmasterIndeterminate();


    const otherGroupIndeterminate = false; // Add indeterminate checks for other groups like Dept, Dis, Cat

    // Return true only if some but not all checkboxes are selected
    return branchMasterInderminate || userMasterInderminate || userGroupMasterInderminate || assignMasterInderminate||stateMasterInderminate || documentMasterInderminate || userGroupMasterInderminate || expiredMasterInderminate||locationMasterInderminate||
    DnMasterInderminate || CpMasterInderminate || EmtMasterInderminate || FormdesMasterInderminate || otherGroupIndeterminate;
}
isreports(): boolean {
  const emportReportInderminate = this.isEmployeeReportIndeterminate();
  const documentReportInderminate = this.isDocumentReportIndeterminate();
  const generalReportInderminate = this.isGeneralReportIndeterminate();
  const LeaveReportInderminate = this.isLeaveReportIndeterminate();

    const otherGroupIndeterminate = false; // Add indeterminate checks for other groups like Dept, Dis, Cat

    // Return true only if some but not all checkboxes are selected
    return emportReportInderminate || documentReportInderminate || 
    generalReportInderminate ||  LeaveReportInderminate || otherGroupIndeterminate;
}

iscalenders(): boolean {
  const addweekInderminate = this.isAddWeekIndeterminate();
  const assignweekInderminate = this.isAssignWeekIndeterminate();
  const addholidayInderminate = this.isAddHolidayIndeterminate();
  const assignholidayInderminate = this.isAssignHolidayIndeterminate();

  const otherGroupIndeterminate = false;
  return addweekInderminate || assignweekInderminate || addholidayInderminate || assignholidayInderminate || otherGroupIndeterminate;
}  

isLeaves(): boolean {
  const LeaveaprvInderminate = this.isLeaveaprvIndeterminate();
  const LeavetypeInderminate = this.isLeavetypeIndeterminate();
  const LeavemasterInderminate = this.isLeavemasterIndeterminate();
  const LeavereqInderminate = this.isLeavereqIndeterminate();
  const LeavecomInderminate = this.isLeavecomIndeterminate();
  const LeaveaprvlvlInderminate = this.isLeaveaprvlvlIndeterminate();
  const LeaveaprvlvltempInderminate = this.isLeaveaprvlvltempIndeterminate();

  // const addholidayInderminate = this.isAddHolidayIndeterminate();
  // const assignholidayInderminate = this.isAssignHolidayIndeterminate();

  const otherGroupIndeterminate = false;
  return LeaveaprvInderminate || LeavetypeInderminate ||LeavemasterInderminate ||
  LeavereqInderminate ||  LeavecomInderminate || LeaveaprvlvlInderminate ||  LeaveaprvlvltempInderminate || otherGroupIndeterminate;
} 
// emportReportInderminate= false;
// documentReportInderminate = false;
// generalReportInderminate= false;
isIndeterminate(): boolean {
  const hasSelectedPermissions = [
    ...this.GrouppermissionsEmp,
    ...this.GrouppermissionsDept,
    ...this.GrouppermissionsDis,
    ...this.GrouppermissionsCat,
    ...this.GrouppermissionsGen,
    ...this.GrouppermissionsReqtype,
    ...this.GrouppermissionsApr,
    ...this.GrouppermissionsAprlvl,
    ...this.GrouppermissionsAtd,


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


  onUserDnChange(): void {
    if (this.DnMasterChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsDnMaster.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsDnMaster.map(p => p.id).includes(permission));
    }
    this.updateSettingsCheckbox();
    // this.updateSelectedPermissions(this.locationMasterChecked, this.GrouppermissionslocationMaster);
    // this.settingsChecked = this.locationMasterChecked;


  }

  onUserCpChange(): void {
    if (this.CpMasterChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsCpMaster.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsCpMaster.map(p => p.id).includes(permission));
    }
    this.updateSettingsCheckbox();
    // this.updateSelectedPermissions(this.locationMasterChecked, this.GrouppermissionslocationMaster);
    // this.settingsChecked = this.locationMasterChecked;


  }

  onUserEmtChange(): void {
    if (this.EmtMasterChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsEmtMaster.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsEmtMaster.map(p => p.id).includes(permission));
    }
    this.updateSettingsCheckbox();
    // this.updateSelectedPermissions(this.locationMasterChecked, this.GrouppermissionslocationMaster);
    // this.settingsChecked = this.locationMasterChecked;


  }

  onUserFormdesChange(): void {
    if (this.FormdesMasterChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsFormdesMaster.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsFormdesMaster.map(p => p.id).includes(permission));
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

  onLeaveReportChange(): void {
    if (this.LeaveReportChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissiionsLeaveReport.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissiionsLeaveReport.map(p => p.id).includes(permission));
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



  onLeaveaprvChange(): void {
    if (this.LeaveaprvChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsLeaveaprv.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsLeaveaprv.map(p => p.id).includes(permission));
    }
    this.updateLeaveCheckbox();
    // this.updateSelectedPermissions(this.locationMasterChecked, this.GrouppermissionslocationMaster);
    // this.settingsChecked = this.locationMasterChecked;


  }

  
  onLeavetypeChange(): void {
    if (this.LeavetypeChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsLeavetype.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsLeavetype.map(p => p.id).includes(permission));
    }
    this.updateLeaveCheckbox();
    // this.updateSelectedPermissions(this.locationMasterChecked, this.GrouppermissionslocationMaster);
    // this.settingsChecked = this.locationMasterChecked;


  }

  onLeavemasterChange(): void {
    if (this.LeavemasterChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsLeavemaster.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsLeavemaster.map(p => p.id).includes(permission));
    }
    this.updateLeaveCheckbox();
    // this.updateSelectedPermissions(this.locationMasterChecked, this.GrouppermissionslocationMaster);
    // this.settingsChecked = this.locationMasterChecked;


  }


  onLeavereqChange(): void {
    if (this.LeavereqChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsLeavereq.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsLeavereq.map(p => p.id).includes(permission));
    }
    this.updateLeaveCheckbox();
    // this.updateSelectedPermissions(this.locationMasterChecked, this.GrouppermissionslocationMaster);
    // this.settingsChecked = this.locationMasterChecked;


  }


  onLeavecomChange(): void {
    if (this.LeavecomChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsLeavecom.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsLeavecom.map(p => p.id).includes(permission));
    }
    this.updateLeaveCheckbox();
    // this.updateSelectedPermissions(this.locationMasterChecked, this.GrouppermissionslocationMaster);
    // this.settingsChecked = this.locationMasterChecked;


  }


  onLeaveaprvlvlChange(): void {
    if (this.LeaveaprvlvlChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsLeaveaprvlvl.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsLeaveaprvlvl.map(p => p.id).includes(permission));
    }
    this.updateLeaveCheckbox();
    // this.updateSelectedPermissions(this.locationMasterChecked, this.GrouppermissionslocationMaster);
    // this.settingsChecked = this.locationMasterChecked;


  }

  onLeaveaprvlvltempChange(): void {
    if (this.LeaveaprvlvltempChecked) {
      this.selectedPermissions = this.selectedPermissions.concat(this.GrouppermissionsLeaveaprvlvltemp.map(permission => permission.id));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !this.GrouppermissionsLeaveaprvlvltemp.map(p => p.id).includes(permission));
    }
    this.updateLeaveCheckbox();
    // this.updateSelectedPermissions(this.locationMasterChecked, this.GrouppermissionslocationMaster);
    // this.settingsChecked = this.locationMasterChecked;


  }




  updateCalenderCheckbox(): void {
    this.calenderchecked = this.isCalenderMangementMasterChecked();
  }


  updateLeaveCheckbox(): void {
    this.Leavechecked = this.isLeaveMangementMasterChecked();
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
      ...this.GrouppermissionslocationMaster,
      ...this.GrouppermissionsDnMaster,
      ...this.GrouppermissionsCpMaster,
      ...this.GrouppermissionsEmtMaster,

      ...this.GrouppermissionsFormdesMaster


      
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
    this.updateDnMasterCheckbox();
    this.updateCpMasterCheckbox();
    this.updateEmtMasterCheckbox();

    this.updateFormdesMasterCheckbox();

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
    this.updateDnMasterCheckbox();
    this.updateCpMasterCheckbox();
    this.updateEmtMasterCheckbox();

    this.updateFormdesMasterCheckbox();



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
      ...this.GrouppermissionslocationMaster,
      ...this.GrouppermissionsDnMaster,
      ...this.GrouppermissionsCpMaster,
      ...this.GrouppermissionsEmtMaster,

      ...this.GrouppermissionsFormdesMaster


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
      ...this.GrouppermissiionsgeneralReport,
      ...this.GrouppermissiionsLeaveReport

    ].map(permission => permission.id);
  
    if (this.reportchecked) {
      this.selectedPermissions = Array.from(new Set([...this.selectedPermissions, ...allPermissions]));
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(permission => !allPermissions.includes(permission));
    }
  
    this.updateEmpReportCheckbox();
    this.updatedocReportCheckbox();
    this.updateGenReportCheckbox();
    this.updateLeaveReportCheckbox();



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
  this.updateLeaveReportCheckbox();


  this.updateIndeterminateReports();
}



isReportInderminate(): boolean {
  const hasSelectedPermissions = [
    ...this.GrouppermissionsemployeeReport,
    ...this.GrouppermissionsdocumnetReport,
    ...this.GrouppermissiionsgeneralReport,
    ...this.GrouppermissiionsLeaveReport

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


selectLeave(): void {
  const allPermissions = [
    ...this.GrouppermissionsLeaveaprv,
    ...this.GrouppermissionsLeavetype,
    ...this.GrouppermissionsLeavemaster,
    ...this.GrouppermissionsLeavereq,
    ...this.GrouppermissionsLeavecom,
    ...this.GrouppermissionsLeaveaprvlvl,
    ...this.GrouppermissionsLeaveaprvlvltemp,

    // ...this.Grouppermisionsassignweek,
    // ...this.Grouppermissionsaddholiday,
    // ...this.Grouppermissionsassisgnholiday
  ].map(permission => permission.id);

  if (this.Leavechecked) {
    this.selectedPermissions = Array.from(new Set([...this.selectedPermissions, ...allPermissions]));
  } else {
    this.selectedPermissions = this.selectedPermissions.filter(permission => !allPermissions.includes(permission));
  }

  this.updateLeaveaprvCheckbox();

  this.updateLeavetypeCheckbox();
  this.updateLeavemasterCheckbox();
  this.updateLeavereqCheckbox();
  this.updateLeavecomCheckbox();
  this.updateLeaveaprvlvlCheckbox();
  this.updateLeaveaprvlvltempCheckbox();

  // this.updateAddHolidayCheckbox();
  // this.updateAssignHolidayCheckbox();
  // this.updateAssignweekCheckbox();
  // this.updateCalenderCheckbox();
}

updateCalender():void{
  this.updateAddHolidayCheckbox();
  this.updateAssignHolidayCheckbox();
  this.updateAddWeekCheckbox();
  this.updateAssignweekCheckbox();

  this.updateInderminateCalenders();
  this.updateCalenderCheckbox();

}

updateLeave():void{
  this.updateLeaveaprvCheckbox();
  this.updateLeavetypeCheckbox();
  this.updateLeavemasterCheckbox();
  this.updateLeavereqCheckbox();
  this.updateLeavecomCheckbox();
  this.updateLeaveaprvlvlCheckbox();
  this.updateLeaveaprvlvltempCheckbox();


  
  // this.updateAssignHolidayCheckbox();
  // this.updateAddWeekCheckbox();
  // this.updateAssignweekCheckbox();
  // this.updateInderminateCalenders();
  // this.updateCalenderCheckbox();


  this.updateInderminateLeave();
  this.updateLeaveCheckbox();

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



isLeaveInderminate(): boolean {
  const hasSelectedPermissions = [
    ...this.GrouppermissionsLeaveaprv,
    ...this.GrouppermissionsLeavetype,
    ...this.GrouppermissionsLeavemaster,
    ...this.GrouppermissionsLeavereq,
    ...this.GrouppermissionsLeavecom,
    ...this.GrouppermissionsLeaveaprvlvl,
    ...this.GrouppermissionsLeaveaprvlvltemp,

    // ...this.Grouppermisionsassignweek,
    // ...this.Grouppermissionsaddholiday,
    // ...this.Grouppermissionsassisgnholiday
  ].some(permission => this.selectedPermissions.includes(permission.id));

  return hasSelectedPermissions && !this.isLeaveMangementMasterChecked();
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


showLeaves(): void{
  this.LeaveMastersvalue =!this.LeaveMastersvalue;
}


onSubmit(): void {
  const selectedSchema = localStorage.getItem('selectedSchema');
  
  if (!selectedSchema) {
    console.error('No schema selected.');
    return;
  }

  const formData = {
    name: this.groupName,
    permissions: this.selectedPermissions
  };

  this.http.post(`${this.apiUrl}/organisation/api/Group/?schema=${selectedSchema}`, formData)
    .subscribe(
      (response) => {
        console.log('Data saved successfully:', response);
        alert('Permission Group Added');
        

        // ✅ Force reload the page
        (window as any).location.reload();

      },
      (error) => {
        console.error('Failed to save data:', error);
        alert(`Fail to save data! ${error}`);
      }
    );
}

 




  ClosePopup() {
    this.ref.close('Closed using function');
    (window as any).location.reload();
  

    
  }
}
