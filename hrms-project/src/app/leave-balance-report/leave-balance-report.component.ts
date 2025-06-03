import { HttpClient } from '@angular/common/http';
import { Component, OnInit  } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { SessionService } from '../login/session.service';
import { LeaveService } from '../leave-master/leave.service';
import { DesignationService } from '../designation-master/designation.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-leave-balance-report',
  templateUrl: './leave-balance-report.component.html',
  styleUrl: './leave-balance-report.component.css'
})
export class LeaveBalanceReportComponent {


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
  this.leaveService.getLeavebalanceReport().subscribe(
    (response) => {
      if (response.length > 0 && response[0].report_data) {
        const jsonUrl = response[0].report_data;
        this.leaveService.fetchLeavebalanceJsonData(jsonUrl).subscribe((jsonData: any) => {
          // Directly assign the data since it's already flat
          this.approvalReportData = jsonData;
        });
      }
    },
    (error) => {
      console.error('Error fetching report:', error);
    }
  );
}



downloadExcel() {
  const headerMap: { [key: string]: string } = {
    employee: 'Employee',
    emp_first_name: 'First Name',
    emp_dept_id: 'Department',
    emp_desgntn_id: 'Designation',
    emp_ctgry_id: 'Category',
    leave_type: 'Leave Type',
    balance: 'Balance',
    openings: 'Openings',
    created_at: 'Created At'
  };

  const exportData = this.approvalReportData.map(item => {
    const transformed: any = {};
    for (const key in headerMap) {
      if (item.hasOwnProperty(key)) {
        transformed[headerMap[key]] = item[key];
      }
    }
    return transformed;
  });

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Leave Balance Report');
  XLSX.writeFile(workbook, 'Leave_Balance_Report.xlsx');
}

    
}
