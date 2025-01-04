import { Component, OnInit } from '@angular/core';
import { DepartmentService } from './department.service';
import * as XLSX from 'xlsx';
import * as fileSaver from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DesignationService } from '../designation-master/designation.service';
import { SessionService } from '../login/session.service';
import { AuthenticationService } from '../login/authentication.service';
import { EmployeeService } from '../employee-master/employee.service';
@Component({
  selector: 'app-department-report',
  templateUrl: './department-report.component.html',
  styleUrl: './department-report.component.css'
})
export class DepartmentReportComponent  implements OnInit  {

  departmentData: any[] = []; // Initialize as an empty array
  displayedColumns: string[] = ['Department Name', 'Department Code', 'Description', 'Active'];
  cardOpen = false;

  hasAddPermission: boolean = false;
hasDeletePermission: boolean = false;
hasViewPermission: boolean =false;
hasEditPermission: boolean = false;
hasExportPermission: boolean = false;


username: any;


userId: number | null | undefined;
userDetails: any;
userDetailss: any;
schemas: string[] = []; // Array to store schema names

  constructor(private departmentService: DepartmentService,
    private snackBar: MatSnackBar,
    private DesignationService: DesignationService,
private sessionService: SessionService,
    private authService: AuthenticationService,
        private employeeService: EmployeeService,
    

  ) { }

  displayNames: { [key: string]: string } = {
    'Department Name': 'Department Name',
    'Department Code': 'Department Code',
    Description: 'Description',
    Active: 'Active'
  };

  ngOnInit(): void {
    this.getDepartmentReport();

    this.userId = this.sessionService.getUserId();

    if (this.userId !== null) {
      this.authService.getUserData(this.userId).subscribe(
        async (userData: any) => {
          this.userDetails = userData; // Store user details in userDetails property
          console.log('User ID:', this.userId); // Log user ID
          console.log('User Details:', this.userDetails); // Log user details
    
          this.username = this.userDetails.username;
          // Check if user is_superuser is true or false
          let isSuperuser = this.userDetails.is_superuser || false;
          const isEssUser = this.userDetails.is_ess || false; // Default to false if is_superuser is undefined
          const selectedSchema = this.authService.getSelectedSchema();
      if (!selectedSchema) {
        console.error('No schema selected.');
        return;
      }
    
          if (isSuperuser || isEssUser) {
            console.log('User is superuser or ESS user');
            // Grant all permissions
            this.hasViewPermission = true;
            this.hasAddPermission = true;
            this.hasDeletePermission = true;
            this.hasEditPermission = true;
        this.hasExportPermission=true;
            // Fetch designations without checking permissions
            // this.fetchDesignations(selectedSchema);
    
          } else {
            console.log('User is not superuser');
    
            const selectedSchema = this.authService.getSelectedSchema();
            if (selectedSchema) {
             
              
    
              try {
                const permissionsData: any = await this.employeeService.getDesignationsPermission(selectedSchema).toPromise();
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
                    this.hasExportPermission=true;

                  } else if (firstItem.groups && Array.isArray(firstItem.groups) && firstItem.groups.length > 0) {
                    const groupPermissions = firstItem.groups.flatMap((group: any) => group.permissions);
                    console.log('Group Permissions:', groupPermissions);
    
                      this.hasViewPermission = this.checkGroupPermission('view_report', groupPermissions);
                 console.log('Has view permission:', this.hasViewPermission);
            
                   this.hasAddPermission = this.checkGroupPermission('add_report', groupPermissions);
                  console.log('Has add permission:', this.hasAddPermission);
            
                 this.hasDeletePermission = this.checkGroupPermission('delete_report', groupPermissions);
              console.log('Has delete permission:', this.hasDeletePermission);
            
                  this.hasEditPermission = this.checkGroupPermission('change_report', groupPermissions);
                 console.log('Has edit permission:', this.hasEditPermission);

                 
                 this.hasExportPermission = this.checkGroupPermission('export_report', groupPermissions);
                 console.log('Has export permission:', this.hasExportPermission);
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
    
      this.authService.getUserSchema(this.userId).subscribe(
        (userData:any)=>{
          this.userDetailss=userData;
          console.log('Schema :',this.userDetailss);
             // Extract schema names from userData and add them to the schemas array
        this.schemas = userData.map((schema: any) => schema.schema_name);
    
        }
        
    
      );
    } else {
      console.error('User ID is null.');
    }
    

  }

  checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
    return groupPermissions.some(permission => permission.codename === codeName);
  }


  toggleCard(): void {
    this.cardOpen = !this.cardOpen;
  }

  getDepartmentReport(): void {
    this.departmentService.getDepartmentReport().subscribe(
      data => {
        this.departmentData = data;
        console.log('Department Data:', this.departmentData);
      },
      error => {
        console.error('Error fetching department report:', error);
      }
    );
  }

 StandardDownload(): void {
    if (!this.departmentData || this.departmentData.length === 0) {
      this.snackBar.open('No valid report data to download.', 'Error', {
        duration: 3000,
      });
      console.error('No valid report data to download.');
      return;
    }

    try {
      const worksheetData: any[][] = [];
      const title = 'Department Report';

      const headers = Object.keys(this.displayNames).map(key => this.displayNames[key]);

      // Create an empty row for title
      const titleRow = new Array(headers.length).fill('');
      titleRow[0] = title;  // Set the title at the start of the row

      worksheetData.push(titleRow);
      worksheetData.push(headers);

      // Map data to match the headers
      const mappedData = this.departmentData.map((item: { [key: string]: any }) => {
        const newItem: { [key: string]: any } = {};
        for (const key in item) {
          if (item.hasOwnProperty(key) && this.displayNames[key]) {
            newItem[this.displayNames[key]] = item[key];
          }
        }
        return newItem;
      });

      mappedData.forEach(row => {
        const values = headers.map(header => row[header] || '');
        worksheetData.push(values);
      });

      const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(worksheetData);

      // Merge and center align title cell
      if (!worksheet['!merges']) worksheet['!merges'] = [];
      worksheet['!merges'].push({ s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } });
      
      // Custom cell style for title
      worksheet['A1'].s = {
        alignment: { horizontal: 'center' },
        font: { sz: 14, bold: true, color: { rgb: 'FF0000' } } // Red color font
      };

      // Set column widths
      const maxWidths: number[] = [];
      worksheetData.forEach(row => {
        row.forEach((value, colIdx) => {
          const colWidth = value ? value.toString().length : 10;
          if (!maxWidths[colIdx] || maxWidths[colIdx] < colWidth) {
            maxWidths[colIdx] = colWidth;
          }
        });
      });
      worksheet['!cols'] = maxWidths.map(width => ({ wch: width }));

      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'department_report');
      this.snackBar.open('Report downloaded successfully.', 'Success', {
        duration: 3000,
      });
    } catch (error) {
      this.snackBar.open('Failed to download report.', 'Error', {
        duration: 3000,
      });
      console.error('Failed to download report:', error);
    }
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    fileSaver.saveAs(data, `${fileName}.xlsx`);
  }

}
