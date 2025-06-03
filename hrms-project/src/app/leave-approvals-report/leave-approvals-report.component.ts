import { HttpClient } from '@angular/common/http';
import { Component, OnInit  } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { SessionService } from '../login/session.service';
import { LeaveService } from '../leave-master/leave.service';
import { DesignationService } from '../designation-master/designation.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-leave-approvals-report',
  templateUrl: './leave-approvals-report.component.html',
  styleUrl: './leave-approvals-report.component.css'
})
export class LeaveApprovalsReportComponent {

  Users: any[] = [];

  hasAddPermission: boolean = false;
  hasDeletePermission: boolean = false;
  hasViewPermission: boolean =false;
  hasEditPermission: boolean = false;
  
  userId: number | null | undefined;
  userDetails: any;
  userDetailss: any;
  schemas: string[] = []; // Array to store schema names


  selectedFile: File | null = null;


    approvalReportData: any[] = [];



  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private leaveService:LeaveService,
    private DesignationService: DesignationService,
  
    ) {}

    ngOnInit(): void {
      this.fetchStandardReport();
    }
  
// your.component.ts

fetchStandardReport() {
  this.leaveService.getApprovalReport().subscribe(
    (response) => {
      if (response.length > 0 && response[0].report_data) {
        const jsonUrl = response[0].report_data;
        this.leaveService.fetchApprovalJsonData(jsonUrl).subscribe((jsonData: any) => {
          const flatData = jsonData.flatMap((entry: any) =>
            entry.approvals.map((approval: any) => ({
              ...approval,
              request_id: entry.request_id,
            }))
          );
          this.approvalReportData = flatData;
        });
      }
    },
    (error) => {
      console.error('Error fetching report:', error);
    }
  );
}

  
    downloadExcel() {
      // Step 1: Define custom headers mapping
      const headerMap: { [key: string]: string } = {
        emp_first_name: 'First Name',
        leave_request: 'Leave Request',
        approver: 'Approver',
        status: 'Status',
        emp_dept_id:'Department',
        emp_desgntn_id:'Designation',
        emp_ctgry_id:'Category',

        rejection_reason: 'Rejection Reason',
        note: 'Note',
        created_at: 'Created At',
        request_id: 'Request ID',
      };
    
      // Step 2: Transform the data
      const exportData = this.approvalReportData.map(item => {
        const transformed: any = {};
        for (const key in headerMap) {
          if (item.hasOwnProperty(key)) {
            transformed[headerMap[key]] = item[key];
          }
        }
        return transformed;
      });
    
      // Step 3: Export to Excel
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Leave Approval Report');
      XLSX.writeFile(workbook, 'Leave_Approval_Report.xlsx');
    }
    
}
