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

    groupedApprovalData: any[] = [];


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
        this.leaveService.fetchApprovalJsonData(jsonUrl).subscribe((jsonData: any[]) => {
          this.groupedApprovalData = jsonData.map(entry => ({
            request_id: entry.request_id,
            approvals: entry.approvals
          }));
        });
      }
    },
    (error) => {
      console.error('Error fetching report:', error);
    }
  );
}

  
downloadExcel(): void {
  const exportData: any[] = [];

  this.groupedApprovalData.forEach(group => {
    group.approvals.forEach((approval: any, index: number) => {
      exportData.push({
        'Employee': approval.emp_first_name || 'N/A',
        'Branch': approval.emp_branch_id || '-',
        'Department': approval.emp_dept_id || '-',
        'Designation': approval.emp_desgntn_id || '-',
        'Category': approval.emp_ctgry_id || '-',
        'Leave Request': approval.leave_request || '-',
        'Compensatory Request': approval.compensatory_request || '-',

        'Level': approval.level || '-',
        'Approver': approval.approver || '-',
        'Role': approval.role || '-',
        'Status': approval.status || '-',
        'Rejection Reason': approval.rejection_reason || '-',
        'Note': approval.note || '-',
        'Updated At': approval.updated_at ? new Date(approval.updated_at).toLocaleString() : '-',
      });
    });
  });

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Leave Approval Report');

  XLSX.writeFile(workbook, `Leave_Approval_Report_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

    
}
