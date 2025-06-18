import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeaveService } from '../leave-master/leave.service';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthenticationService } from '../login/authentication.service';
import { EmployeeService } from '../employee-master/employee.service';



@Component({
  selector: 'app-payroll-details',
  templateUrl: './payroll-details.component.html',
  styleUrl: './payroll-details.component.css'
})
export class PayrollDetailsComponent {


  @ViewChild('payslipContent') payslipContent!: ElementRef;


  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local


  payslipId: string | null = null;
  payslipDetails: any;

  earnings: any[] = [];
  deductions: any[] = [];

  selectedPayslipDesign = 'default';  // other value could be 'design2'
  send_email: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private leaveService: LeaveService,
    private authService: AuthenticationService,
    private employeeService: EmployeeService,


  ) {}


  ngOnInit(): void {
    this.payslipId = this.route.snapshot.paramMap.get('id');
    if (this.payslipId) {
      this.leaveService.getSinglePayslip(this.payslipId).subscribe(
        data => {
          this.payslipDetails = data;
  
          // Split components into earnings and deductions
          this.earnings = data.components.filter((comp: { component_type: string; }) => comp.component_type === 'Addition');
          this.deductions = data.components.filter((comp: { component_type: string; }) => comp.component_type === 'Deduction');
        },
        error => {
          console.error('Failed to fetch payslip details', error);
        }
      );
    }
  }


  downloadPayslip() {
    const element = this.payslipContent.nativeElement;

    html2canvas(element, {
      scale: 2, // Higher scale = better resolution
      useCORS: true
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Payslip-${this.payslipDetails.employee}.pdf`);
    }); 
  }


  getComponentName(componentId: number): string {
    const componentMap: { [key: number]: string } = {
      1: 'Basic',
      2: 'HRA',
      3: 'Allowance',
      4: 'Bonus',
      5: 'OT',
      6: 'Incentive',
      7: 'Telephone Allowance',
      8: 'Vehicle Variable',
      // Add more if needed
    };
    return componentMap[componentId] || 'Other';
  }


  

  iscreateLoanApp: boolean = false;




  openPopus():void{
    this.iscreateLoanApp = true;

  }

  closeapplicationModal():void{
    this.iscreateLoanApp = false;

  }

  approvePayslip(): void {
    const element = this.payslipContent.nativeElement;
  
    html2canvas(element, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  
      const pdfBlob = pdf.output('blob');
      const file = new File([pdfBlob], `Payslip-${this.payslipDetails.employee}.pdf`, {
        type: 'application/pdf',
      });
  
      const payslipId = this.payslipDetails.id;
  
      // Use the separate service method
      this.employeeService.uploadPayslipPdf(payslipId, file, this.send_email).subscribe({
        next: () => {
          alert('Payslip uploaded successfully.');
          this.closeapplicationModal();
        },
        error: (error) => {
          alert('Failed to upload payslip.');
          console.error(error);
        }
      });
    });
  }



}
