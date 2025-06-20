import { NO_ERRORS_SCHEMA, NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule   } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';
import { SubSidebarComponent } from './sub-sidebar/sub-sidebar.component';
import { SubNavigationComponent } from './sub-navigation/sub-navigation.component';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { ClickOutsideDirective } from './click-outside.directive';
import { ActiveHighlightDirective } from './active-highlight.directive';
import { CompanySelectionComponent } from './company-selection/company-selection.component';
import {MatTabsModule} from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { CompanyRegistrationService } from './company-registration.service';
import { BranchCreationComponent } from './branch-creation/branch-creation.component';
import { SettingsComponent } from './settings/settings.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './auth.guard';
import { AuthenticationService } from './login/authentication.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor.service';
import { CompanyMasterComponent } from './company-master/company-master.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BranchMasterComponent } from './branch-master/branch-master.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { DepartmentMasterComponent } from './department-master/department-master.component';
import { DepartmentCreationComponent } from './department-creation/department-creation.component';
import { DesignationMasterComponent } from './designation-master/designation-master.component';
import { DesignationCreationComponent } from './designation-creation/designation-creation.component';
import { CatogaryMasterComponent } from './catogary-master/catogary-master.component';
import { CatogaryCrationComponent } from './catogary-cration/catogary-cration.component';
import { UserMasterComponent } from './user-master/user-master.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { CatogaryEditComponent } from './catogary-edit/catogary-edit.component';
import { EmployeeFamilyComponent } from './employee-family/employee-family.component';
import { SuccesModalComponent } from './succes-modal/succes-modal.component';
import { MatNativeDateModule } from '@angular/material/core';
import { DepartmentEditComponent } from './department-edit/department-edit.component';
import { DesignationEditComponent } from './designation-edit/designation-edit.component';
import { BranchEditComponent } from './branch-edit/branch-edit.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';

import { MatSelectModule } from '@angular/material/select';
import { UserGroupingMasterComponent } from './user-grouping-master/user-grouping-master.component';
import { NgSlimScrollModule } from 'ngx-slimscroll';
import {MatTableModule} from '@angular/material/table';
import { UserRoleGroupingCreateComponent } from './user-role-grouping-create/user-role-grouping-create.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTreeModule} from '@angular/material/tree';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { PermissionDirective } from './catogary-master/permission.directive';
import { UserGroupingEditComponent } from './user-grouping-edit/user-grouping-edit.component';
import { StateMasterComponent } from './state-master/state-master.component';
import { DocumentTypeMasterComponent } from './document-type-master/document-type-master.component';
 
import { NotificationServiceService } from './notification-service.service';

import { DocumentExpiredComponent } from './document-expired/document-expired.component';
import { DocumentEditComponent } from './document-edit/document-edit.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SchemaSelectionComponent } from './schema-selection/schema-selection.component';
import {MatMenuModule} from '@angular/material/menu';
import { SchemaCreationComponent } from './schema-creation/schema-creation.component';

import { PermissionAssignedComponent } from './permission-assigned/permission-assigned.component';
import { LocationMasterComponent } from './location-master/location-master.component';
import { EmployeeUploadedDetailsComponent } from './employee-uploaded-details/employee-uploaded-details.component';
import { EmployeeSchemaSelectionComponent } from './employee-schema-selection/employee-schema-selection.component';
import { EmployeeCreateLanguageComponent } from './employee-create-language/employee-create-language.component';
import { GeneralRequestComponent } from './general-request/general-request.component';
import { RequestTypeComponent } from './request-type/request-type.component';
import { DocumentNumberingComponent } from './document-numbering/document-numbering.component';
import { BranchChooseComponent } from './branch-choose/branch-choose.component';
import { WeelcalendarComponent } from './weelcalendar/weelcalendar.component';
import { EmployeeSctionComponent } from './employee-sction/employee-sction.component';
import { AssignWeekcalendarComponent } from './assign-weekcalendar/assign-weekcalendar.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { HolidayCalendarComponent } from './holiday-calendar/holiday-calendar.component';
import { AssignweekCalendarDaysComponent } from './assignweek-calendar-days/assignweek-calendar-days.component';
import { AssignHolidayCalendarComponent } from './assign-holiday-calendar/assign-holiday-calendar.component';
import { LeaveOptionsComponent } from './leave-options/leave-options.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { LeaveMasterComponent } from './leave-master/leave-master.component';
import { GeneralRequestReportComponent } from './general-request-report/general-request-report.component';
import { DepartmentReportComponent } from './department-report/department-report.component';
import { DesignationReportComponent } from './designation-report/designation-report.component';
import { DocumentReportComponent } from './document-report/document-report.component';
import { MatSortModule } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { ReportGenerateComponent } from './report-generate/report-generate.component';
import { EmployeeAddMoreFieldComponent } from './employee-add-more-field/employee-add-more-field.component';
import { UesrEmployeeComponent } from './uesr-employee/uesr-employee.component';
import { DocumentDialogComponent } from './document-report/document-dialog/document-dialog.component';
import { ReportDialogComponent } from './report-generate/report-dialog/report-dialog.component';
import { GeneralDialogComponent } from './general-request-report/general-dialog/general-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FromDesignerComponent } from './from-designer/from-designer.component';
import { ApprovalLevelComponent } from './approval-level/approval-level.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { AttendaceMarkingComponent } from './attendace-marking/attendace-marking.component';
import { CompensatoryLeaveComponent } from './compensatory-leave/compensatory-leave.component';
import { EmployeeLeaveComponent } from './employee-leave/employee-leave.component';
import { LeaveApprovalsComponent } from './leave-approvals/leave-approvals.component';
import { LeaveApprovalLevelComponent } from './leave-approval-level/leave-approval-level.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { LeaveTemplateComponent } from './leave-template/leave-template.component';
import { EmailTemplateEditComponent } from './email-template-edit/email-template-edit.component';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { CompanyPolicyComponent } from './company-policy/company-policy.component';
import { LeaveReportComponent } from './leave-report/leave-report.component';
import { LeaveDialogComponent } from './leave-report/leave-dialog/leave-dialog.component';
import { EmployeeApprovalsComponent } from './employee-approvals/employee-approvals.component';
import { DashboardContentsComponent } from './dashboard-contents/dashboard-contents.component';
import { MatStepperModule } from '@angular/material/stepper';  
import { ShiftsComponent } from './shifts/shifts.component';
import { PayRollComponent } from './pay-roll/pay-roll.component';
import { SalaryComponent } from './salary/salary.component';
import { CreateLeavetypeComponent } from './create-leavetype/create-leavetype.component';
import { PayrollDetailsComponent } from './payroll-details/payroll-details.component';
import { NotificationSettingsComponent } from './notification-settings/notification-settings.component';
import { SalaryOptionsComponent } from './salary-options/salary-options.component';
import { LeaveBalanceComponent } from './leave-balance/leave-balance.component';
import { EmailConfigurationComponent } from './email-configuration/email-configuration.component';
import { ImmediateRejectionComponent } from './immediate-rejection/immediate-rejection.component';
import { LeaveApprovalsReportComponent } from './leave-approvals-report/leave-approvals-report.component';
import { EmployeeLeaveRejoinComponent } from './employee-leave-rejoin/employee-leave-rejoin.component';
import { DocExpEmailtemplateComponent } from './doc-exp-emailtemplate/doc-exp-emailtemplate.component';
import { LeaveAccruvalComponent } from './leave-accruval/leave-accruval.component';
import { EmployeeOvertimeComponent } from './employee-overtime/employee-overtime.component';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { LoanSidebarComponent } from './loan-sidebar/loan-sidebar.component';
import { LoanTypeComponent } from './loan-type/loan-type.component';
import { LoanApplicationComponent } from './loan-application/loan-application.component';
import { LoanRepaymentComponent } from './loan-repayment/loan-repayment.component';
import { LoanApprovelLevelComponent } from './loan-approvel-level/loan-approvel-level.component';
import { LoanApprovalComponent } from './loan-approval/loan-approval.component';
import { LeaveBalanceReportComponent } from './leave-balance-report/leave-balance-report.component';
import { AnnouncementMasterComponent } from './announcement-master/announcement-master.component';
import { AssetOptionsComponent } from './asset-options/asset-options.component';
import { AssetTypesComponent } from './asset-types/asset-types.component';
import { AssetMasterComponent } from './asset-master/asset-master.component';
import { AssetAllocationComponent } from './asset-allocation/asset-allocation.component';
import { AssetRequestComponent } from './asset-request/asset-request.component';
import { AssetUdfComponent } from './asset-udf/asset-udf.component';
import { PayrollAppovalLevelComponent } from './payroll-appoval-level/payroll-appoval-level.component';
import { PayslipApprovalComponent } from './payslip-approval/payslip-approval.component';
import { WpsComponent } from './wps/wps.component';
import { AssetReportComponent } from './asset-report/asset-report.component';
// import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MainSidebarComponent,
    SubSidebarComponent,
    SubNavigationComponent,
    ClickOutsideDirective,
    ActiveHighlightDirective,
    CompanySelectionComponent,
    BranchCreationComponent,
    SettingsComponent,
    CompanyMasterComponent,
    BranchMasterComponent,
    CompanyEditComponent,
    DepartmentMasterComponent,
    DepartmentCreationComponent,
    DesignationMasterComponent,
    DesignationCreationComponent,
    CatogaryMasterComponent,
    CatogaryCrationComponent,
    UserMasterComponent,
    UserCreationComponent,
    EmployeeMasterComponent,
    EmployeeDetailsComponent,
    CreateEmployeeComponent,
    EmployeeEditComponent,
    CatogaryEditComponent,
    EmployeeFamilyComponent,
    SuccesModalComponent,
    DepartmentEditComponent,
    DesignationEditComponent,
    BranchEditComponent,
    UserEditComponent,
    UserDetailsComponent,
    CompanyDetailsComponent,
    UserGroupingMasterComponent,
    UserRoleGroupingCreateComponent,
    MainDashboardComponent,
    PermissionDirective,
    UserGroupingEditComponent,
    StateMasterComponent,
    DocumentTypeMasterComponent,
    DocumentExpiredComponent,
    DocumentEditComponent,
    SchemaSelectionComponent,
    SchemaCreationComponent,
    PermissionAssignedComponent,
    LocationMasterComponent,
    EmployeeUploadedDetailsComponent,
    EmployeeSchemaSelectionComponent,
    EmployeeCreateLanguageComponent,
    GeneralRequestComponent,
    RequestTypeComponent,
    DocumentNumberingComponent,
    BranchChooseComponent,
    WeelcalendarComponent,
    AssignWeekcalendarComponent,
    EmployeeSctionComponent,
    EmployeeDashboardComponent,
    HolidayCalendarComponent,
    AssignweekCalendarDaysComponent,
    AssignHolidayCalendarComponent,
    LeaveOptionsComponent,
    LeaveTypeComponent,
    LeaveMasterComponent,
    ReportGenerateComponent,
    GeneralRequestReportComponent,
    DepartmentReportComponent,
    DesignationReportComponent,
    DocumentReportComponent,
    EmployeeAddMoreFieldComponent,
    UesrEmployeeComponent,
    DocumentDialogComponent,
    ReportDialogComponent,
    GeneralDialogComponent,
    FromDesignerComponent,
    ApprovalLevelComponent,
    ApprovalsComponent,
    AttendaceMarkingComponent,
    CompensatoryLeaveComponent,
    EmployeeLeaveComponent,
    LeaveApprovalsComponent,
     LeaveApprovalLevelComponent,
     LeaveRequestComponent,
     LeaveTemplateComponent,
     EmailTemplateEditComponent,
     EmailTemplateComponent,
     CompanyPolicyComponent,
     LeaveReportComponent,
     LeaveDialogComponent,
     EmployeeLeaveComponent,
     EmployeeApprovalsComponent,
     DashboardContentsComponent,
     ShiftsComponent,
     PayRollComponent,
     SalaryComponent,
     CreateLeavetypeComponent,
     PayrollDetailsComponent,
     NotificationSettingsComponent,
     SalaryOptionsComponent,
     LeaveBalanceComponent,
     EmailConfigurationComponent,
     ImmediateRejectionComponent,
     LeaveApprovalsReportComponent,
     EmployeeLeaveRejoinComponent,
     DocExpEmailtemplateComponent,
     LeaveAccruvalComponent,
     EmployeeOvertimeComponent,
     EmployeeAttendanceComponent,
     LoanSidebarComponent,
     LoanTypeComponent,
     LoanApplicationComponent,
     LoanRepaymentComponent,
     LoanApprovelLevelComponent,
     LoanApprovalComponent,
     LeaveBalanceReportComponent,
     AnnouncementMasterComponent,
     AssetOptionsComponent,
     AssetTypesComponent,
     AssetMasterComponent,
     AssetAllocationComponent,
     AssetRequestComponent,
     AssetUdfComponent,
     PayrollAppovalLevelComponent,
     PayslipApprovalComponent,
     WpsComponent,
     AssetReportComponent
     
     


  ],
  imports: [
    
    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    // FormGroup,
    MatTabsModule,
    HttpClientModule ,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    NgSlimScrollModule,
    MatTableModule,
    MatAutocompleteModule,
    MatTreeModule,
    MatProgressBarModule,
    
    DragDropModule,
    MatMenuModule,
    MatTabsModule,
    MatSortModule,
    MatStepperModule,
    
    
    
  ],
  providers: [AuthGuard, CompanyRegistrationService,AuthenticationService,NotificationServiceService,DatePipe,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }],
    
   

  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class AppModule { }
