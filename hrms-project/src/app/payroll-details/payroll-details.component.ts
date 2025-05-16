import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeaveService } from '../leave-master/leave.service';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-payroll-details',
  templateUrl: './payroll-details.component.html',
  styleUrl: './payroll-details.component.css'
})
export class PayrollDetailsComponent {


  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local


  payslipId: string | null = null;
  payslipDetails: any;


  constructor(
    private route: ActivatedRoute,
    private leaveService: LeaveService
  ) {}


  ngOnInit(): void {
    this.payslipId = this.route.snapshot.paramMap.get('id');
    if (this.payslipId) {
      this.leaveService.getSinglePayslip(this.payslipId).subscribe(
        data => {
          this.payslipDetails = data;
        },
        error => {
          console.error('Failed to fetch payslip details', error);
        }
      );
    }
  }


  

  downloadPayslip(): void {
    if (!this.payslipDetails || !this.payslipDetails.employee || !this.payslipDetails.payroll_run?.start_date) {
      console.error('Missing payslip details');
      return;
    }
  
    const employeeId = this.payslipDetails.employee;
    const startDateStr = this.payslipDetails.payroll_run.start_date;
  
    const [year, month] = startDateStr.split('-'); // month will be '04'
  
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return;
    }
  
    const url = `${this.apiUrl}/payroll/api/payslip/employee/${employeeId}/download/${year}/${month}/?schema=${selectedSchema}`;
  
    this.leaveService.downloadFile(url).subscribe(
      (response: Blob) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = `Payslip_${employeeId}_${year}_${month}.pdf`;
        a.click();
        URL.revokeObjectURL(fileURL);
      },
      error => {
        console.error('Download failed', error);
      }
    );
  }
  

  approvePayslip() {
    if (!this.payslipDetails || !this.payslipId) {
      console.error("No payslip details loaded.");
      return;
    }
  
    const updatedPayslip = {
      ...this.payslipDetails,
      status: 'processed'
    };
  
    this.leaveService.updatePayslip(this.payslipId, updatedPayslip).subscribe(
      response => {
        console.log('Payslip approved:', response);
        this.payslipDetails = response; // update UI
      },
      error => {
        console.error('Failed to approve payslip', error);
      }
    );
  }
  
}
