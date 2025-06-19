import { Component } from '@angular/core';
import { CountryService } from '../country.service';
import { AuthenticationService } from '../login/authentication.service';
import { HttpClient } from '@angular/common/http';
import { LeaveService } from '../leave-master/leave.service';
import { DesignationService } from '../designation-master/designation.service';
import { SessionService } from '../login/session.service';
import { EmployeeService } from '../employee-master/employee.service';
import * as XLSX from 'xlsx';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-wps',
  templateUrl: './wps.component.html',
  styleUrl: './wps.component.css'
})
export class WpsComponent {

  
  repayment_date:any='';
  amount_paid:any='';
  remaining_balance:any='';


  loan:any='';




  


  LoanTypes:any []=[];
  LoanRepayements:any []=[];



  selectedFile!: File | null;

  hasAddPermission: boolean = false;
hasDeletePermission: boolean = false;
hasViewPermission: boolean =false;
hasEditPermission: boolean = false;

userId: number | null | undefined;
userDetails: any;
userDetailss: any;
schemas: string[] = []; // Array to store schema names
  
  constructor(
    private leaveervice: LeaveService, 
    private authService: AuthenticationService, 

    private http: HttpClient,
    private DesignationService: DesignationService,
private sessionService: SessionService,
private employeeService: EmployeeService,

  ) {}

  ngOnInit(): void {

    const selectedSchema = this.authService.getSelectedSchema();
      if (selectedSchema) {
        this.LoadPayroll(selectedSchema);

      }

    this.userId = this.sessionService.getUserId();
    if (this.userId !== null) {
      this.authService.getUserData(this.userId).subscribe(
        async (userData: any) => {
          this.userDetails = userData; // Store user details in userDetails property
    
    
          console.log('User ID:', this.userId); // Log user ID
          console.log('User Details:', this.userDetails); // Log user details
    
          // Check if user is_superuser is true or false
          let isSuperuser = this.userDetails.is_superuser || false; // Default to false if is_superuser is undefined
          const selectedSchema = this.authService.getSelectedSchema();
          if (!selectedSchema) {
            console.error('No schema selected.');
            return;
          }
        
        
          if (isSuperuser) {
            console.log('User is superuser or ESS user');
            
            // Grant all permissions
            this.hasViewPermission = true;
            this.hasAddPermission = true;
            this.hasDeletePermission = true;
            this.hasEditPermission = true;
        
            // Fetch designations without checking permissions
            // this.fetchDesignations(selectedSchema);
          } else {
            console.log('User is not superuser');
    
            const selectedSchema = this.authService.getSelectedSchema();
            if (selectedSchema) {
             
              
              
              try {
                const permissionsData: any = await this.DesignationService.getDesignationsPermission(selectedSchema).toPromise();
                console.log('Permissions data:', permissionsData);
    
                if (Array.isArray(permissionsData) && permissionsData.length > 0) {
                  const firstItem = permissionsData[0];
    
                  if (firstItem.is_superuser) {
                    console.log('User is superuser according to permissions API');
                    // Grant all permissions
                    this.hasViewPermission = true;
                    this.hasAddPermission = true;
                    this.hasDeletePermission = true;
                    this.hasEditPermission = true;
                  } else if (firstItem.groups && Array.isArray(firstItem.groups) && firstItem.groups.length > 0) {
                    const groupPermissions = firstItem.groups.flatMap((group: any) => group.permissions);
                    console.log('Group Permissions:', groupPermissions);
    
                   
                    this.hasAddPermission = this.checkGroupPermission('add_leave_type', groupPermissions);
                    console.log('Has add permission:', this.hasAddPermission);
                    
                    this.hasEditPermission = this.checkGroupPermission('change_leave_type', groupPermissions);
                    console.log('Has edit permission:', this.hasEditPermission);
      
                   this.hasDeletePermission = this.checkGroupPermission('delete_leave_type', groupPermissions);
                   console.log('Has delete permission:', this.hasDeletePermission);
      
    
                    this.hasViewPermission = this.checkGroupPermission('view_leave_type', groupPermissions);
                    console.log('Has view permission:', this.hasViewPermission);
    
    
                  } else {
                    console.error('No groups found in data or groups array is empty.', firstItem);
                  }
                } else {
                  console.error('Permissions data is not an array or is empty.', permissionsData);
                }
    
                // Fetching designations after checking permissions
                // this.fetchDesignations(selectedSchema);
              }
              
              catch (error) {
                console.error('Error fetching permissions:', error);
              }
            } else {
              console.error('No schema selected.');
            }
              
          }
        },
        (error) => {
          console.error('Failed to fetch user details:', error);
        }
      );
  }
}
// checkViewPermission(permissions: any[]): boolean {
//   const requiredPermission = 'add_leave_type' ||'change_leave_type' ||'delete_leave_type' ||'view_leave_type';
  
  
//   // Check user permissions
//   if (permissions.some(permission => permission.codename === requiredPermission)) {
//     return true;
//   }
  
//   // Check group permissions (if applicable)
//   // Replace `// TODO: Implement group permission check`
//   // with your logic to retrieve and check group permissions
//   // (consider using a separate service or approach)
//   return false; // Replace with actual group permission check
//   }
  
  
  
  
  checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
  return groupPermissions.some(permission => permission.codename === codeName);
  }
  


  

  registerButtonClicked = false;
  Payrolls: any[] = [];


  LoadPayroll(selectedSchema: string) {
    this.leaveervice.getPayroll(selectedSchema).subscribe(
      (data: any) => {
        this.Payrolls = data;

      
        console.log('Payrolls:', this.Payrolls);
      },
      (error: any) => {
        console.error('Error fetching Payrolls:', error);
      }
    );
  }

  selectedPayrollId: number | null = null;
  sifData: any = null;

  
fetchSIFData(): void {
  const selectedSchema = localStorage.getItem('selectedSchema');
  if (!selectedSchema || !this.selectedPayrollId) {
    alert('Please select a schema and payroll.');
    return;
  }

  const payload = { payroll_run_id: this.selectedPayrollId };

  this.leaveervice.postSIFData(payload, selectedSchema).subscribe(
    (response: any) => {
      if (response.status === 'success') {
        this.sifData = response.data;
        console.log('SIF Data:', this.sifData);
      } else {
        alert('Failed to fetch SIF data.');
      }
    },
    (error) => {
      console.error('Error fetching SIF data:', error);
      alert('Error while fetching SIF data');
    }
  );
}


getObjectKeys(obj: any): string[] {
  return Object.keys(obj);
}


getUnifiedSIFKeys(): string[] {
  if (!this.sifData) return [];

  // Merge keys from hdr, scr, and edr[]
  const hdrKeys = Object.keys(this.sifData.hdr || {});
  const scrKeys = Object.keys(this.sifData.scr || {});
  const edrKeys = this.sifData.edr && this.sifData.edr.length > 0 ? Object.keys(this.sifData.edr[0]) : [];

  // Merge all and remove duplicates
  const allKeys = [...hdrKeys, ...scrKeys, ...edrKeys];
  return Array.from(new Set(allKeys));
}


downloadSIFStyledExcel(): void {
  const data = this.sifData;
  if (!data) return;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('SIF Report');

  // Set column headers with formatting
  const headerRow = [
    'Type', 'Employee ID', 'Routing Code', 'IBAN',
    'From Date (yyyy/mm/dd)', 'To Date (yyyy/mm/dd)',
    'No of Days', 'Fixed Salary', 'Variable Pay', 'Days on Leave'
  ];

  worksheet.addRow([]); // Empty row
  worksheet.addRow([
    'Column A - EDR (Employee Detail Record) for a single employee',
    'Column B - 14 digit EID issued by MOHRE',
    'Column C - 9-digit routing code',
    'Column D - IBAN (employee’s bank number)',
    'Column E - Start date of salary',
    'Column F - End date of salary',
    'Column G - Total number of working days',
    'Column H - Basic or fixed salary',
    'Column I - Variable salary',
    'Column J - Days on Leave'
  ]);

  worksheet.addRow([]); // Empty row

  const header = worksheet.addRow(headerRow);
  header.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '002060' }, // dark blue
    };
    cell.border = {
      bottom: { style: 'thin' },
      top: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' },
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  // Add EDR rows
  data.edr.forEach((edr: any) => {
    worksheet.addRow([
      'EDR',
      edr['Person ID'] || '',
      edr['Routing Code'] || '',
      edr['IBAN Number'] || '',
      edr['Pay Start Date'] || '',
      edr['Pay End Date'] || '',
      edr['Number of Days'] || '',
      edr['Fixed Income'] || '',
      edr['Variable Income'] || '',
      edr['Days on Leave'] || '',
    ]);
  });

  // Add SCR row
  const scr = data.scr;
  worksheet.addRow([
    'SCR',
    scr['Person ID'] || '',
    scr['Routing Code'] || '',
    scr['IBAN Number'] || '',
    scr['Pay Start Date'] || '',
    scr['Pay End Date'] || '',
    scr['Number of Days'] || '',
    scr['Fixed Income'] || '',
    scr['Variable Income'] || '',
    scr['Days on Leave'] || '',
  ]);

  // Adjust column widths
  worksheet.columns.forEach((column) => {
    column.width = 18;
  });

  // Export as Excel file
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    FileSaver.saveAs(blob, 'SIF_Styled_Report.xlsx');
  });
}


}
