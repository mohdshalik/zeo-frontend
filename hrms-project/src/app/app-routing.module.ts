import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';
import { SubSidebarComponent } from './sub-sidebar/sub-sidebar.component';
import { SubNavigationComponent } from './sub-navigation/sub-navigation.component';
import { CompanySelectionComponent } from './company-selection/company-selection.component';
import { BranchCreationComponent } from './branch-creation/branch-creation.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './auth.guard';
import { CompanyMasterComponent } from './company-master/company-master.component';
import { BranchMasterComponent } from './branch-master/branch-master.component';
import { DepartmentMasterComponent } from './department-master/department-master.component';
import { DesignationMasterComponent } from './designation-master/designation-master.component';
import { CatogaryMasterComponent } from './catogary-master/catogary-master.component';
import { UserMasterComponent } from './user-master/user-master.component';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { UserGroupingMasterComponent } from './user-grouping-master/user-grouping-master.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { roleGuard } from './shared/role.guard';
import { StateMasterComponent } from './state-master/state-master.component';
import { DocumentTypeMasterComponent } from './document-type-master/document-type-master.component';
import { DocumentExpiredComponent } from './document-expired/document-expired.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SchemaSelectionComponent } from './schema-selection/schema-selection.component';
import { PermissionAssignedComponent } from './permission-assigned/permission-assigned.component';
import { LocationMasterComponent } from './location-master/location-master.component';
import { EmployeeSchemaSelectionComponent } from './employee-schema-selection/employee-schema-selection.component';
import { GeneralRequestComponent } from './general-request/general-request.component';
import { RequestTypeComponent } from './request-type/request-type.component';
import { DocumentNumberingComponent } from './document-numbering/document-numbering.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { FiscalYearComponent } from './fiscal-year/fiscal-year.component';
import { EmployeeSctionComponent } from './employee-sction/employee-sction.component';
import { WeelcalendarComponent } from './weelcalendar/weelcalendar.component';
import { AssignWeekcalendarComponent } from './assign-weekcalendar/assign-weekcalendar.component';
import { HolidayCalendarComponent } from './holiday-calendar/holiday-calendar.component';
import { AssignweekCalendarDaysComponent } from './assignweek-calendar-days/assignweek-calendar-days.component';
import { AssignHolidayCalendarComponent } from './assign-holiday-calendar/assign-holiday-calendar.component';
import { LeaveOptionsComponent } from './leave-options/leave-options.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { LeaveMasterComponent } from './leave-master/leave-master.component';
import { ReportGenerateComponent } from './report-generate/report-generate.component';
import { DocumentReportComponent } from './document-report/document-report.component';
import { GeneralRequestReportComponent } from './general-request-report/general-request-report.component';
import { DepartmentReportComponent } from './department-report/department-report.component';
import { DesignationReportComponent } from './designation-report/designation-report.component';
import { FromDesignerComponent } from './from-designer/from-designer.component';
import { ApprovalLevelComponent } from './approval-level/approval-level.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { AttendaceMarkingComponent } from './attendace-marking/attendace-marking.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { LeaveApprovalLevelComponent } from './leave-approval-level/leave-approval-level.component';
import { LeaveTemplateComponent } from './leave-template/leave-template.component';
import { LeaveApprovalsComponent } from './leave-approvals/leave-approvals.component';
import { CompensatoryLeaveComponent } from './compensatory-leave/compensatory-leave.component';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { CompanyPolicyComponent } from './company-policy/company-policy.component';
import { LeaveReportComponent } from './leave-report/leave-report.component';
import { EmployeeApprovalsComponent } from './employee-approvals/employee-approvals.component';
import { EmployeeLeaveComponent } from './employee-leave/employee-leave.component';
import { DashboardContentsComponent } from './dashboard-contents/dashboard-contents.component';
import { ShiftsComponent } from './shifts/shifts.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full', },
   { path: 'login', component: LoginComponent ,  },
  

   { path: 'company-selection', component: CompanySelectionComponent },
   { path: 'main-dashboard', component: MainDashboardComponent },
   { path: 'schema-selection', component: SchemaSelectionComponent , canActivate: [AuthGuard],},
   { path: 'employee-schema-selection', component: EmployeeSchemaSelectionComponent , canActivate: [AuthGuard],},




  {
    path: 'main-sidebar',
    component: MainSidebarComponent, canActivate: [AuthGuard],
    children: [

      {
        path: 'sub-sidebar',
        component: SubSidebarComponent,
        children:[
          {
            path:'department-master',
            component:DepartmentMasterComponent,
          },
          {
            path:'designation-master',
            component:DesignationMasterComponent
          },
          {
            path:'catogary-master',
            component:CatogaryMasterComponent
          },
          {
            path:'employee-master',
            component:EmployeeMasterComponent,
          },
          {
            path:'employee-details/:id/details',
            component:EmployeeDetailsComponent
          },

          {
            path:'general-request',
            component:GeneralRequestComponent,
          },

          {
            path:'request-type',
            component:RequestTypeComponent,
          },
          {
            path:'approval-level',
            component:ApprovalLevelComponent,
          },
          {
            path:'approvals',
            component:ApprovalsComponent,
          },

          {
            path:'attendace-marking',
            component:AttendaceMarkingComponent,
          },

          
          { path: 'report-generate',
             component: ReportGenerateComponent },
          
        ], 
      },
      {
        path: 'settings',
        component: SettingsComponent,
        children:[
          {
            path:'company-master',
            component:CompanyMasterComponent
          },
          {
            path:'branch-master',
            component:BranchMasterComponent
          },
          {
            path:'user-master',
            component:UserMasterComponent
          },
          {
            path:'company-details/:id/details',
            component:CompanyDetailsComponent
          },
          {
            path:'user-grouping-master',
            component:UserGroupingMasterComponent
          },
          {
            path:'state-master',
            component:StateMasterComponent
          },
          {
            path:'document-type-master',
            component:DocumentTypeMasterComponent
          },

          {
            path:'document-expired',
            component:DocumentExpiredComponent
          },
          {
            path:'user-details/:id/details',
            component:UserDetailsComponent
          },
          {
            path:'permission-assigned',
            component:PermissionAssignedComponent
          },

          {
            path:'location-master',
            component:LocationMasterComponent
          },
          {
            path:'document-numbering',
            component:DocumentNumberingComponent
          },
          {
            path:'weelcalendar',
            component:WeelcalendarComponent
          },
          {
            path:'assign-weekcalendar',
            component:AssignWeekcalendarComponent
          },
          {
            path:'assignweek-calendar-days',
            component:AssignweekCalendarDaysComponent
          },
          {
            path:'holiday-calendar',
            component:HolidayCalendarComponent
          },
          {
            path:'assign-holiday-calendar',
            component:AssignHolidayCalendarComponent
          },

          {
            path:'shifts',
            component:ShiftsComponent
          },

          {
            path:'report-generate',
            component:ReportGenerateComponent,
          },
          {
            path:'document-report',
            component:DocumentReportComponent,
          },
          {
            path:'general-request-report',
            component:GeneralRequestReportComponent
          },
          {
            path:'department-report',
            component:DepartmentReportComponent
          },
          {
            path:'designation-report',
            component:DesignationReportComponent
          },
          {
            path:'from-designer',
            component:FromDesignerComponent
          },
          {
            path:'email-template',
            component:EmailTemplateComponent
          },
             {
            path:'company-policy',
            component:CompanyPolicyComponent
          },
          {
            path:'leave-report',
            component:LeaveReportComponent
          },

        ],
      },
{
  path: 'leave-options',
  component: LeaveOptionsComponent,
  children:[
    {
      path:'leave-type',
      component:LeaveTypeComponent,
    },

    {
      path:'leave-master',
      component:LeaveMasterComponent,
    },
    {
      path:'leave-request',
      component:LeaveRequestComponent,
    },
    {
      path:'leave-approval-level',
      component:LeaveApprovalLevelComponent,
    },
    {
      path:'leave-template',
      component:LeaveTemplateComponent,
    },

    {
      path:'leave-approvals',
      component:LeaveApprovalsComponent,
    },
    {
      path:'compensatory-leave',
      component:CompensatoryLeaveComponent,
    },

  ]

},
{
  path: 'dashboard-contents',
  component: DashboardContentsComponent,
},

      {
        path: 'fiscal-year',
        component: FiscalYearComponent,
      }
     
    ]
  },
  {
    path: 'sub-navigation',
    component: SubNavigationComponent
  },

  {
    path: 'employee-dashboard',
    component: EmployeeDashboardComponent,
    children:[
      {
        path:'employee-sction',
        component:EmployeeSctionComponent,
      },
      {
        path:'employee-approvals',
        component:EmployeeApprovalsComponent,
      },
      {
        path:'employee-leave',
        component:EmployeeLeaveComponent,
      },
      
    ]
  },
  
  {
    path: 'branch-creation',
    component: BranchCreationComponent
  },
  {
    path: '',
    redirectTo: '/main-content',
    pathMatch: 'full'
  }
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  // { path: 'dashboard', component: DashboardComponent },


//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },

//  {
//    path: 'main-sidebar', 
//    component: MainSidebarComponent,
//    children: [
//      { path: 'sub-sidebar', component: SubSidebarComponent },
    
//    ],
//  },
//  { path: 'sub-sidebar/:subNavId', component: SubNavigationComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
