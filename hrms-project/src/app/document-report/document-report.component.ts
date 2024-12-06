
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EmployeeService } from '../employee-master/employee.service';
import {MatExpansionModule} from '@angular/material/expansion';
import {ChangeDetectionStrategy,  signal} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { drop } from 'lodash';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { DocumentService } from './document.service';
import { DocumentDialogComponent } from './document-dialog/document-dialog.component';

import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';

import * as fileSaver from 'file-saver'; // Import file-saver.js
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { DatePipe } from '@angular/common';

import { combineLatest } from 'rxjs';
import { IOlympicData } from '../report-generate/interfaces';
import { ReportDialogComponent } from '../report-generate/report-dialog/report-dialog.component';


import {DateRange, MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReportGenerateService } from '../report-generate/report-generate.service';
import { AuthenticationService } from '../login/authentication.service';
import { SessionService } from '../login/session.service';



interface Report {
  id: number;
  file_name: string;
  report_data: string; // Assuming this is the URL for JSON data
  file_path: string;

}

interface Field {
  value: string;
  displayName: string;
  selected: boolean; // Added to track selection state
}
interface EmployeeField {
  value: string;
  displayName: string;
  selected: boolean;
}

interface Report {
  id: number;
  file_name: string;
  report_data: string;
}

interface Employee {
  emp_first_name: string;
    emp_active_date: string;
    emp_branch_id: string;
    emp_dept_id: string;
    emp_desgntn_id: string;
    emp_ctgry_id: string;
    emp_id: string;
    emp_doc_type:string;
    emp_doc_number:string;
    emp_doc_issued_date:string;
    emp_doc_expiry_date:string;
  is_active: boolean;


 
    [key: string]: any; // Define an index signature to allow any string key
}
interface KeyValue {
  key: string;
  values: string[];
}
interface DateFilteredData {
  [key: string]: any;
}
@Component({
  selector: 'app-document-report',
  templateUrl: './document-report.component.html',
  styleUrl: './document-report.component.css',

})
export class DocumentReportComponent implements OnInit {
// Initialize directly where they are declared
public datePipe: DatePipe;

  @ViewChild('filteredReportModal') filteredReportModal!: ElementRef;

  public baseUrls = 'http://127.0.0.1:8000/employee/api/doc-report'; // Define the base URL property

  readonly panelOpenState = signal(false);
  selectedReportId: number | null = null; // Track selected report ID
  report: Report | null = null; // Ensure report is declared and initialized

  // savedReports: any[] = []; // Array to hold saved reports
  availableFields: any[] = []; // Array to hold available fields
  reportContent: string = ''; // Variable to hold report content
  uniqueValues: any = {}; // Object to hold unique values for selected fields
  filterCriteria: any = {}; // Object to hold filter criteria
  savedReports: Report[] = [];
  jsonData: Employee[] = [];
  jsonDatas: { key: string, values: any[] }[] = [];
  selectedFileName: string = '';
  // selectedFields: { value: string, displayName: string }[] = [];
  selectedFields: Field[] = []; // Array of fields with 'selected' property
  // reportData: any[] = []; // Initialize with an empty array
  reportData: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  startDate!: Date;
  endDate!: Date;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort
  cardOpen = false;
  dateFilteredData: any[] = [];

  fileName: string = '';
  available_fields:string[]=[];
  // employeefields: { value: string, displayName: string }[] = [];
  // employeefields: EmployeeField[] = [];
  selectedReportData: Report | null = null;
  filterQuery: string = ''; // Variable to hold filter query
  filteredReports: Report[] = []; // Array to hold filtered reports
  // selectedFields: EmployeeField[] = []; // Array to hold selected fields for table display
  tableData: any[] = []; // Array to hold data for displaying in the table
  showTableForReportId: any; // Ensure this is initialized appropriately
  activeReport: any = null; // Add this property to track the active report
  showReportTables: boolean = false; // Variable to toggle report table visibility
  showReportTablevalue: boolean = false; // Variable to toggle report table visibility
  isPreviewVisible = false; // Track visibility of preview modal or panel
  previewData: any[] = []; // Store preview data to display
  filteredContent: any[] = [];
  hasAddPermission: boolean = false;
  hasDeletePermission: boolean = false;
  hasViewPermission: boolean =false;
  hasEditPermission: boolean = false;
  hasExportPermission: boolean = false;
  isAdvancedFilter: boolean = false;
  userId: number | null | undefined;
  userDetails: any;
  selectedSchema: string | null = null;
  username: any;
  userDetailss: any;
  schemas: string[] = []; // Array to store schema names
  // dateRange: { start: Date | null, end: Date | null } = { start: null, end: null };
  // dateRange: { start: Date | null, end: Date | null } = { start: null, end: null };
  dateRange: { start: Date | null, end: Date | null } = { start: null, end: null };



  generatingReport: boolean = false; // Flag to indicate if report is being generated
  display_names: { [key: string]: string } = {



    emp_first_name: "First Name",
    emp_active_date: "Active Date",
    emp_branch_id: "Branch",
    emp_dept_id: "Department",
    emp_desgntn_id: "Designation",
    emp_ctgry_id: "Category",
    emp_id:"Emp Id",
    emp_doc_type:"Doc Type",
    emp_doc_number:" Doc Number",
    emp_doc_issued_date:"Issue Date",
    emp_doc_expiry_date:"Expiry Date",
    is_active: "Active"
  }; // Your display names object

 
  displayedColumns: string[] = [
    'emp_first_name',
    'emp_active_date',
    'emp_branch_id',
    'emp_dept_id',
    'emp_desgntn_id',
    'emp_ctgry_id',
    'emp_id',
    'emp_doc_type',  // Ensure this is present
    'emp_doc_number',
    'emp_doc_issued_date',
    'emp_doc_expiry_date',
    'is_active'
  ];
  
  isEditModalOpen=false;

 
  


  
 

  // selectedReportData: any = null; // To hold selected report data for display

  constructor(private http: HttpClient,
    private employeeService: EmployeeService,
    private documetService: DocumentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    datePipe: DatePipe,
    private changeDetectorRef: ChangeDetectorRef,
    private reportgenerateService: ReportGenerateService,
    private authService: AuthenticationService,
    private sessionService: SessionService,
  ) { 
    this.datePipe = datePipe; // Initialize datePipe in the constructor

  }

  ngOnInit(): void {
    // Load available fields when the component initializes

    this.loadPreviouslySelectedFieldsFromLocalStorage();

    this.loadAvailableFields();
    this.loadSavedReports();
    this.loadSavedReportss();
    this.loadSavedReported();
    this.generateReports();
    this.generateReport();
    this.selectedFields = this.employeefields.filter(field => field.selected);
    this.fetchStandardReport();
 
    this.userId = this.sessionService.getUserId();

    // Fetch user details using the obtained user ID
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
              // try {
              //   const userData: any = await this.EmployeeService.getDesignationsPermission(selectedSchema).toPromise();
              //   console.log('permissions:', userData);
            
              //   if (userData && userData.length > 0 && userData[0].groups) {
              //     const groupPermissions = userData[0].groups.flatMap((group: any) => group.permissions);
              //     console.log('Group Permissions:', groupPermissions);
            
              //     this.hasViewPermission = this.checkGroupPermission('view_emp_master', groupPermissions);
              //     console.log('Has view permission:', this.hasViewPermission);
            
              //     this.hasAddPermission = this.checkGroupPermission('add_emp_master', groupPermissions);
              //     console.log('Has add permission:', this.hasAddPermission);
            
              //     this.hasDeletePermission = this.checkGroupPermission('delete_emp_master', groupPermissions);
              //     console.log('Has delete permission:', this.hasDeletePermission);
            
              //     this.hasEditPermission = this.checkGroupPermission('change_emp_master', groupPermissions);
              //     console.log('Has edit permission:', this.hasEditPermission);
              //   } else {
              //     console.error('No groups found in data or data format is incorrect.', userData);
              //   }
            
              //   // Fetching designations after checking permissions
              //   this.fetchDesignations(selectedSchema);
              // } 
              
              
    
              
              // try {
              //   const permissionsData: any = await this.EmployeeService.getDesignationsPermission(selectedSchema).toPromise();
              //   console.log('Permissions data:', permissionsData);
      
              //   if (permissionsData && permissionsData.length > 0 && permissionsData[0].groups) {
              //     // Check if user is superuser according to the permissions API
              //     isSuperuser = permissionsData[0].is_superuser || false;
                  
              //     if (isSuperuser) {
              //       console.log('User is superuser according to permissions API');
              //       // Grant all permissions
              //       this.hasViewPermission = true;
              //       this.hasAddPermission = true;
              //       this.hasDeletePermission = true;
              //       this.hasEditPermission = true;
                
              //     } else {
              //       const groupPermissions = userData[0].groups.flatMap((group: any) => group.permissions);
              //     console.log('Group Permissions:', groupPermissions);
            
              //      this.hasViewPermission = this.checkGroupPermission('view_emp_master', groupPermissions);
              //      console.log('Has view permission:', this.hasViewPermission);
            
              //     this.hasAddPermission = this.checkGroupPermission('add_emp_master', groupPermissions);
              //     console.log('Has add permission:', this.hasAddPermission);
            
              //    this.hasDeletePermission = this.checkGroupPermission('delete_emp_master', groupPermissions);
              //     console.log('Has delete permission:', this.hasDeletePermission);
            
              //    this.hasEditPermission = this.checkGroupPermission('change_emp_master', groupPermissions);
              //     console.log('Has edit permission:', this.hasEditPermission);
              //     }
              //   } else {
              //     console.error('No groups found in data or data format is incorrect.', permissionsData);
              //   }
      
              //   // Fetching designations after checking permissions
              //   this.fetchDesignations(selectedSchema);
              // }
              
    
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
                    this.hasExportPermission= true;

                  } else if (firstItem.groups && Array.isArray(firstItem.groups) && firstItem.groups.length > 0) {
                    const groupPermissions = firstItem.groups.flatMap((group: any) => group.permissions);
                    console.log('Group Permissions:', groupPermissions);
    
                      this.hasViewPermission = this.checkGroupPermission('view_doc_report', groupPermissions);
                 console.log('Has view permission:', this.hasViewPermission);
            
                   this.hasAddPermission = this.checkGroupPermission('add_doc_report', groupPermissions);
                  console.log('Has add permission:', this.hasAddPermission);
            
                 this.hasDeletePermission = this.checkGroupPermission('delete_doc_report', groupPermissions);
              console.log('Has delete permission:', this.hasDeletePermission);
            
                  this.hasEditPermission = this.checkGroupPermission('change_doc_report', groupPermissions);
                 console.log('Has edit permission:', this.hasEditPermission);
                 
                 this.hasExportPermission = this.checkGroupPermission('export_doc_report', groupPermissions);
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
    
            
    
            // // Extract group permissions from user details
            // const groupPermissions = this.userDetails.groups.map((group: { permissions: any; }) => group.permissions).flat();
            // console.log('Group Permissions:', groupPermissions);
    
            // // Check permissions for various actions
            // this.hasViewPermission = this.checkGroupPermission('view_dept_master', groupPermissions);
            // console.log('Has View Permission:', this.hasViewPermission);
    
            // this.hasAddPermission = this.checkGroupPermission('add_dept_master', groupPermissions);
            // console.log('Has Add Permission:', this.hasAddPermission);
    
            // this.hasDeletePermission = this.checkGroupPermission('delete_dept_master', groupPermissions);
            // console.log('Has Delete Permission:', this.hasDeletePermission);
    
            // this.hasEditPermission = this.checkGroupPermission('change_dept_master', groupPermissions);
            // console.log('Has Edit Permission:', this.hasEditPermission);
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
  openEditModal(): void {
    this.isEditModalOpen = true;
    this.Filter();
    // Fetch the details for the selected date

 
  }
  togglePreview(): void {
    if (this.isPreviewVisible) {
      // Closing the preview
      this.snackBar.open('Preview closed', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      this.previewData = [];
      this.isPreviewVisible = false;
    } else {
      // Opening the preview
      this.previewData = this.jsonData.map(item => ({ ...item }));
      this.snackBar.open('View List', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      this.isPreviewVisible = true;
    }
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }


  

  // Define the full list of all possible fields somewhere in your component


  ngAfterViewInit(): void {
    // You can optionally check if filteredReportModal is defined here
    // and perform any initialization or setup
  }
  

  fetchStandardReport(): void {
    this.documetService.getStandardReport().subscribe(
      (response: any) => {
        console.log('Report response:', response);
        if (response.report_data) {
          this.http.get<any>(response.report_data).subscribe(
            (data: any) => {
              console.log('Report data:', data);
              this.reportData = new MatTableDataSource<any>(data);
              this.reportData.sort = this.sort;
              this.reportData.paginator = this.paginator;
            },
            (error: any) => {
              console.error('Error fetching report data:', error);
              // Handle error as needed
            }
          );
        } else {
          console.error('Invalid response format - report_data not found:', response);
        }
      },
      (error: any) => {
        console.error('Error fetching standard report:', error);
        // Handle error as needed
      }
    );
  }

 // Example method to get object keys
getObjectKeys(obj: any): string[] {
  return Object.keys(obj);
}





StandardDownload(): void {
  if (!this.reportData || this.reportData.data.length === 0) {
    this.snackBar.open('No valid report data to download.', 'Error', {
      duration: 3000,
    });
    console.error('No valid report data to download.');
    return;
  }

  try {
    const displayNames: { [key: string]: string } = {
      emp_first_name: "First Name",
      emp_active_date: "Active Date",
      emp_branch_id: "Branch",
      emp_dept_id: "Department",
      emp_desgntn_id: "Designation",
      emp_ctgry_id: "Category",
      emp_id: "Emp Id",
      emp_doc_type: "Doc Type",
      emp_doc_number: "Doc Number",
      emp_doc_issued_date: "Issue Date",
      emp_doc_expiry_date: "Expiry Date",
      is_active: "Active"
    };

    const worksheetData: any[][] = [];
    const title = 'Document Master Standard Report';

    const headers = Object.keys(displayNames).map(key => displayNames[key]);

    const titleRow = new Array(headers.length).fill('');
    titleRow[0] = title;

    worksheetData.push(titleRow);
    worksheetData.push(headers);

    const filteredData = this.reportData.data.filter((item: any) => {
      const activeDate = new Date(item.emp_doc_expiry_date );
      return (!this.startDate || activeDate >= this.startDate) &&
             (!this.endDate || activeDate <= this.endDate);
    });

    console.log('Filtered Data:', filteredData); // Log filtered data

    const mappedData = filteredData.map((item: { [key: string]: any }) => {
      const newItem: { [key: string]: any } = {};
      for (const key in item) {
        if (item.hasOwnProperty(key) && displayNames[key]) {
          newItem[displayNames[key]] = item[key];
        }
      }
      return newItem;
    });

    console.log('Mapped Data:', mappedData); // Log mapped data

    mappedData.forEach(row => {
      const values = headers.map(header => row[header] || '');
      worksheetData.push(values);
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(worksheetData);

    if (!worksheet['!merges']) worksheet['!merges'] = [];
    worksheet['!merges'].push({ s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } });
    
    worksheet['A1'].s = {
      alignment: { horizontal: 'center' },
      font: { sz: 14, bold: true, color: { rgb: 'FF0000' } }
    };

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
    this.saveAsExcelFile(excelBuffer, 'standard_report');
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



  toggleCard(): void {
    this.cardOpen = !this.cardOpen;
  }


  loadSavedReported(): void {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
    }
  
    // Replace with your actual API to fetch saved reports
    this.http.get<any[]>(`http://${selectedSchema}.localhost:8000/employee/api/doc-report/`).subscribe(
      reports => {
        this.savedReports = reports;
      },
      error => {
        console.error('Error fetching saved reports:', error);
      }
    );
  }

  toggleReportTable(): void {
    this.showReportTables = !this.showReportTables;
    // Handle logic related to the report
  }

  openPreview(): void {
    // Prepare data for preview (in this example, using all jsonData)
    this.previewData = this.jsonData.map(item => ({ ...item }));
  
    // Show a snack bar notification
    this.snackBar.open('View List', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  
    // Show preview modal or panel
    this.isPreviewVisible = true;
  }
  

  // Method to close preview modal or panel
  closePreview(): void {
    // Show a snack bar notification for closing the preview
    this.snackBar.open('Preview closed', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  
    // Reset preview data and hide preview
    this.previewData = [];
    this.isPreviewVisible = false;
  }
  
  exportToExcels(): void {
    try {
      // Notify user download is starting
      this.snackBar.open('Preparing file for download...', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });

      // Prepare data for Excel export with customized headers
      const dataToExport = this.jsonData.map(item => {
        const newItem: any = {};
        Object.keys(item).forEach(key => {
          newItem[this.display_names[key] || key] = item[key]; // Map to display name if available
        });
        return newItem;
      });

      // Create worksheet
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);

      // Example: Set cell A1 style (title cell)
      const cellA1 = ws['A1'];
      cellA1.s = { // s is for style
        font: { bold: true, color: { rgb: 'FFFF0000' } }, // Red font color (example)
        alignment: { horizontal: 'center', vertical: 'center' }, // Center align text vertically and horizontally
        fill: { bgColor: { indexed: 64 }, fgColor: { rgb: 'FFFFCCFF' } }, // Light purple background color (example)
      };

      // Set column widths (adjust as needed)
      const columnWidths = [
        { wch: 20 }, // Column A width
        { wch: 25 }, // Column B width
        { wch: 15 }, // Column C width
        // Add more as needed for each column
      ];

      // Apply column widths
      columnWidths.forEach((width, idx) => {
        const col = XLSX.utils.encode_col(idx);
        ws['!cols'] = ws['!cols'] || [];
        ws['!cols'][idx] = width;
      });

      // Example: Set row height (adjust as needed)
      const rowHeight = { hpx: 30 }; // Set row height to 30 pixels
      ws['!rows'] = ws['!rows'] || [];
      ws['!rows'][0] = rowHeight; // Set row height for the first row

      // Create workbook
      const wb: XLSX.WorkBook = { Sheets: { 'Document Report': ws }, SheetNames: ['Document Report'] };

      // Convert workbook to array buffer
      const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

      // Save Excel file using file-saver.js
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      fileSaver.saveAs(blob, `${this.selectedFileName}.xlsx`);

      // Notify user download is complete
      this.snackBar.open('File downloaded successfully.', 'Close', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    } catch (error) {
      console.error('Error during file download:', error);
      // Notify user about the error
      this.snackBar.open('Error downloading file. Please try again later.', 'Close', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    }
  }
  

  exportToExcel(): void {
    const selectedFieldValues = this.selectedFields.map(field => field.value);
  
    // Assuming you have an array of employees or mock data
    const employees: any[] = [
      { id: 1, name: 'John Doe', department: 'IT' },
      { id: 2, name: 'Jane Smith', department: 'HR' }
      // Add more data as needed
    ];
  
    // Create array to hold data for export
    const dataToExport: any[] = [];
  
    // Iterate through each employee and extract selected fields
    employees.forEach(employee => {
      const row: any = {}; // Define a type for row if necessary
  
      // Iterate through selected fields and assign values to row
      selectedFieldValues.forEach(field => {
        if (employee.hasOwnProperty(field)) {
          row[field] = employee[field];
        } else {
          console.error(`Field '${field}' does not exist in employee data.`);
        }
      });
  
      // Push the populated row into the data for export
      dataToExport.push(row);
    });
  
    // Create worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
  
    // Create workbook
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  
    // Convert workbook to array buffer
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Save Excel file
    this.saveExcelFile(excelBuffer, 'exported_data');
  }
  
 private saveExcelFile(buffer: any, fileName: string): void {
    // Convert buffer to Blob
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
  
    // Using file-saver.js to save the Blob
    saveAs(data, `${fileName}.xlsx`);
  }
  
  

  // updateSelectedFields(): void {
  //   this.selectedFields = this.employeefields.filter(field => field.selected);
  //   console.log('Selected fields:', this.selectedFields);
  // }
  
  loadSavedReports(): void {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
    }
  
    const url = `http://${selectedSchema}.localhost:8000/employee/api/doc-report/`;
    this.http.get<any[]>(url).subscribe(
      (reports: any[]) => {
        this.savedReports = reports;
        console.log('Saved Reports:', reports);
      },
      (error) => {
        console.error('Error fetching saved reports:', error);
      }
    );
  }
  drop(event: CdkDragDrop<EmployeeField[]>): void {
    moveItemInArray(this.employeefields, event.previousIndex, event.currentIndex);
    this.changeDetectorRef.detectChanges();
  }
  

  drops(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.savedReports, event.previousIndex, event.currentIndex);
  }


  fetchReportFields(reportId: number): void {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
    }
  
    const url = `http://${selectedSchema}.localhost:8000/employee/api/doc-report/select_document_fields/?report_id=${reportId}`;
    this.http.get<any>(url).subscribe(
      response => {
        // Assuming response.available_fields is an object and we want to convert it to an array
        this.employeefields = Object.values(response.available_fields).map((field: any) => ({
          ...field,
          selected: response.selected_fields.includes(field.value)
        }));
        this.showTableForReportId = reportId;
        console.log('Fetched fields:', this.employeefields);
      },
      error => {
        console.error('Error fetching fields:', error);
      }
    );
  }
  getValuesFromObject(object: any): any[] {
    return Object.values(object);
  }
  downloadReportList(): void {
    // Prepare data for export
    const reportListData = this.savedReports.map(report => ({
      id: report.id,
      file_name: report.file_name,
      report_data: report.report_data
      // Add more fields as needed
    }));

    // Create worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(reportListData);

    // Create workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report List');

    // Convert workbook to array buffer
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Save Excel file using file-saver.js
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    fileSaver.saveAs(blob, 'report-list.xlsx');
  }
 
  onFieldSelectionChanged(event: MatCheckboxChange, empField: any): void {
    if (!event || !empField) {
      console.error('Invalid parameters for onFieldSelectionChanged', { event, empField });
      return;
    }

    empField.selected = event.checked;
    console.log(`Field ${empField.displayName} selected: ${event.checked}`);
    this.updateSelectedFields(); // Update the list of selected fields
  }
  
  Filter(): void {
    this.updateSelectedFields();
    this.showReportTablevalue = !this.showReportTablevalue;
    this.selectedFields = this.employeefields.filter(field => field.selected);
    this.isAdvancedFilter = !this.isAdvancedFilter;
  
    // Show a notification when fields are ready to filter
    if (this.showReportTablevalue) {
      this.snackBar.open('Your field selection is ready to filter', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    }
  }
  updateSelectedFields(): void {
    this.selectedFields = this.employeefields.filter(field => field.selected);
    console.log('Updated Selected Fields:', this.selectedFields);
  }

  ///////////////////////////////

  previouslySelectedFields: { value: string, displayName: string, selected: boolean }[] = [];
  showPreviouslySelectedFields: boolean = false;
  // employeefields: { value: string, displayName: string, selected: boolean }[] = [];
  employeefields: EmployeeField[] = [
    { value: 'emp_first_name', displayName: 'First Name', selected: false },
    { value: 'emp_active_date', displayName: 'Active Date', selected: false },
    { value: 'emp_branch_id', displayName: 'Branch', selected: false },
    { value: 'emp_dept_id', displayName: 'Department', selected: false },
    { value: 'emp_desgntn_id', displayName: 'Designation', selected: false },
    { value: 'emp_ctgry_id', displayName: 'Category', selected: false },
    { value: 'emp_id', displayName: 'Emp Id', selected: false },
    { value: 'emp_doc_type', displayName: 'Doc Type', selected: false },
    { value: 'emp_doc_number', displayName: 'Doc Number', selected: false },
    { value: 'emp_doc_issued_date', displayName: 'Issue Date', selected: false },
    { value: 'emp_doc_expiry_date', displayName: 'Expiry Date', selected: false },
    { value: 'is_active', displayName: 'Active', selected: false }
  ];
  defaultFields: { value: string, displayName: string, selected: boolean }[] = []; // Define the default fields
  isAddFieldsModalOpen: boolean = false; // State for the add fields modal
  
  loadAvailableFields(): void {
    this.reportgenerateService.getdocumentFields().subscribe(
      (fields: { value: string, displayName: string }[]) => {
        this.employeefields = fields.map(field => ({ ...field, selected: false })); // Initialize with selected flag
  
        // Check if previously selected fields exist in local storage
        const storedFieldsString = localStorage.getItem('previouslySelectedFields');
        if (storedFieldsString) {
          const storedFields: { value: string, displayName: string, selected: boolean }[] = JSON.parse(storedFieldsString);
          if (storedFields && storedFields.length > 0) {
            storedFields.forEach((storedField: { value: string, displayName: string, selected: boolean }) => {
              const matchingField = this.employeefields.find(empField => empField.value === storedField.value);
              if (matchingField) {
                matchingField.selected = true;
              }
            });
          }
        }
  
        console.log('Fetching employee fields:', fields);
      },
      (error) => {
        console.error('Error fetching employee fields:', error);
      }
    );
  }
  
  loadPreviouslySelectedFieldsFromLocalStorage(): void {
    const storedFieldsString = localStorage.getItem('previouslySelectedFields');
    if (storedFieldsString) {
      const storedFields: { value: string, displayName: string, selected: boolean }[] = JSON.parse(storedFieldsString);
      if (storedFields && storedFields.length > 0) {
        this.previouslySelectedFields = storedFields;
        this.employeefields.forEach(field => {
          const matchingStoredField = this.previouslySelectedFields.find(storedField => storedField.value === field.value);
          if (matchingStoredField) {
            field.selected = true;
          }
        });
      } else {
        console.warn('No previously selected fields found in local storage.');
      }
    } else {
      console.warn('No previously selected fields found in local storage.');
    }
  }
  
  togglePreviouslySelectedFields(): void {
    this.showPreviouslySelectedFields = !this.showPreviouslySelectedFields;
  }
  
  applyDefaultFilter(): void {
    this.previouslySelectedFields = this.employeefields.filter(field => field.selected);
    this.snackBar.open('Default fields applied.', 'Success', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
  
  generateReports(): void {
    if (!this.selectedReportId) {
      this.snackBar.open('No valid report selected.', 'Error');
      console.error('No valid report selected.');
      return;
    }
  
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
    }
  
    const url = `http://${selectedSchema}.localhost:8000/employee/api/doc-report/generate_doc_filter_table/`;
    const formData = new FormData();
    formData.append('report_id', this.selectedReportId.toString());
  
    this.previouslySelectedFields.forEach(field => formData.append('selected_fields', field.value));
  
    this.generatingReport = true;
  
    this.http.post<any>(url, formData).subscribe(
      response => {
        if (response && response.unique_values) {
          this.jsonDatas = Object.entries(response.unique_values).map(([key, value]) => ({
            key,
            values: Array.isArray(value) ? value : [value]
          }));
  
          // this.openReportDialog(this.selectedReportId);
          this.openReportDialog(this.selectedReportId, this.uniqueValues);

          this.selectedFileName = response.selectedFileName;
          console.log('Report generated successfully', this.jsonDatas);
          this.snackBar.open('Report generated successfully', 'Success');
  
          this.previouslySelectedFields = [...this.previouslySelectedFields];
          localStorage.setItem('previouslySelectedFields', JSON.stringify(this.previouslySelectedFields));
        } else {
          console.error('Invalid response format:', response);
          this.snackBar.open('Invalid response format', 'Error');
        }
        this.generatingReport = false;
      },
      error => {
        console.error('Error generating report:', error);
        this.snackBar.open('Error generating report. Please try again later.', 'Error');
        this.generatingReport = false;
      }
    );
  }
  
  openAddFieldsModal(): void {
    this.isAddFieldsModalOpen = true;
  }
  
  closeAddFieldsModal(): void {
    this.isAddFieldsModalOpen = false;
  }
  
  applyAdditionalFields(): void {
    // Update previouslySelectedFields based on the selection in the modal
    this.previouslySelectedFields = this.employeefields.filter(field => field.selected);
  
    // Update local storage
    localStorage.setItem('previouslySelectedFields', JSON.stringify(this.previouslySelectedFields));
  
    this.snackBar.open('Additional fields applied.', 'Success', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  
    this.closeAddFieldsModal();
  }




  // generateReportstest(): void {
  //   if (!this.selectedReportId) {
  //     this.snackBar.open('No valid report selected.', 'Error');
  //     console.error('No valid report selected.');
  //     return;
  //   }
  //   const selectedSchema = localStorage.getItem('selectedSchema');
  //   if (!selectedSchema) {
  //     console.error('No schema selected.');
  //     // return throwError('No schema selected.'); // Return an error observable if no schema is selected
  //   }
  
  //   // const url = `http://${selectedSchema}.localhost:8000/employee/api/emp-report/`;
  //   const url = `http://${selectedSchema}.localhost:8000/employee/api/doc-report/generate_doc_filter_table/`;
  //   const formData = new FormData();
  //   formData.append('report_id', this.selectedReportId.toString());
  
  //   // Append selected_fields
  //   this.selectedFields.forEach(field => formData.append('selected_fields', field.value));
  
  //   this.generatingReport = true;
  
  //   this.http.post<any>(url, formData).subscribe(
  //     response => {
  //       if (response && response.unique_values) {
  //         // Assuming response.unique_values is an object with column keys and corresponding data
  //         this.jsonDatas = Object.entries(response.unique_values).map(([key, value]) => ({
  //           key,
  //           values: Array.isArray(value) ? value : [value]
  //         }));
  
  //         // Open report dialog if necessary
  //         this.openReportDialog(this.selectedReportId); // Ensure it's a number
          
  //         // Set selected file name if provided in response
  //         if (response.selectedFileName) {
  //           this.selectedFileName = response.selectedFileName;
  //         }
  
  //         console.log('Report generated successfully', this.jsonDatas);
  //         this.snackBar.open('Report generated successfully', 'Success');
  //       } else {
  //         console.error('Invalid response format:', response);
  //         this.snackBar.open('Invalid response format', 'Error');
  //       }
  //       this.generatingReport = false;
  //     },
  //     error => {
  //       console.error('Error generating report:', error);
  //       this.snackBar.open('Error generating report. Please try again later.', 'Error');
  //       this.generatingReport = false;
  //     }
  //   );
  // }
  

  // generateReportstest(): void {
  //   if (!this.selectedReportId) {
  //     this.snackBar.open('No valid report selected.', 'Error');
  //     console.error('No valid report selected.');
  //     return;
  //   }
  //   const selectedSchema = localStorage.getItem('selectedSchema');
  //   if (!selectedSchema) {
  //     console.error('No schema selected.');
  //     return;
  //   }

  //   const url = `http://${selectedSchema}.localhost:8000/employee/api/doc-report/generate_doc_filter_table/`;
  //   const formData = new FormData();
  //   formData.append('report_id', this.selectedReportId.toString());

  //   // Append selected_fields
  //   this.selectedFields.forEach(field => formData.append('selected_fields', field.value));

  //   this.generatingReport = true;

  //   this.http.post<any>(url, formData).subscribe(
  //     response => {
  //       if (response && response.unique_values) {
  //         this.jsonDatas = Object.entries(response.unique_values).map(([key, value]) => ({
  //           key,
  //           values: Array.isArray(value) ? value : [value]
  //         }));

  //         this.openReportDialog(this.selectedReportId);

  //         if (response.selectedFileName) {
  //           this.selectedFileName = response.selectedFileName;
  //         }

  //         console.log('Report generated successfully', this.jsonDatas);
  //         this.snackBar.open('Report generated successfully', 'Success');
  //       } else {
  //         console.error('Invalid response format:', response);
  //         this.snackBar.open('Invalid response format', 'Error');
  //       }
  //       this.generatingReport = false;
  //     },
  //     error => {
  //       console.error('Error generating report:', error);
  //       this.snackBar.open('Error generating report. Please try again later.', 'Error');
  //       this.generatingReport = false;
  //     }
  //   );
  // }

  




  // generateReportstest(): void {
  //   const selectedReportId = this.selectedReportId;
  
  //   if (!selectedReportId) {
  //     this.snackBar.open('No valid report selected.', 'Error');
  //     console.error('No valid report selected.');
  //     return;
  //   }
  
  //   if (!this.dateRange.start || !this.dateRange.end) {
  //     this.snackBar.open('Please select both start and end dates.', 'Error');
  //     console.error('Date range is not fully selected.');
  //     return;
  //   }
  
  //   const selectedSchema = localStorage.getItem('selectedSchema');
  //   if (!selectedSchema) {
  //     this.snackBar.open('No schema selected.', 'Error');
  //     console.error('No schema selected.');
  //     return;
  //   }
  
  //   // Format dates as yyyy/MM/dd
  //   const startDateFormatted = this.datePipe.transform(this.dateRange.start, 'yyyy/MM/dd');
  //   const endDateFormatted = this.datePipe.transform(this.dateRange.end, 'yyyy/MM/dd');
  
  //   // Date filter API URL
  //   const filterByDateUrl = `http://${selectedSchema}.localhost:8000/employee/api/doc-report/filter_by_date/`;
  //   const filterByDateFormData = new FormData();
  //   filterByDateFormData.append('report_id', selectedReportId.toString());
  //   filterByDateFormData.append('start_date', startDateFormatted!);
  //   filterByDateFormData.append('end_date', endDateFormatted!);
  
  //   this.http.post<any>(filterByDateUrl, filterByDateFormData).subscribe(
  //     filterResponse => {
  //       if (filterResponse && filterResponse.date_filtered_data) {
  //         // Filter the response data based on the selected date range
  //         const filteredReportContent = filterResponse.date_filtered_data.filter((data: any) => {
  //           const empDocExpiryDate = new Date(data['emp_doc_expiry_date']);
  //           return empDocExpiryDate >= new Date(this.dateRange.start!) && empDocExpiryDate <= new Date(this.dateRange.end!);
  //         });
  
  //         // Handle filtering field selection in the response
  //         const filteredFields = this.selectedFields.filter(field => {
  //           return filteredReportContent.some((data: any) => data.hasOwnProperty(field.value));
  //         });
  
  //         // Generate report API URL
  //         const generateReportUrl = `http://${selectedSchema}.localhost:8000/employee/api/doc-report/generate_doc_filter_table/`;
  //         const generateReportFormData = new FormData();
  //         generateReportFormData.append('report_id', selectedReportId.toString());
  
  //         // Append filtered fields
  //         filteredFields.forEach(field => generateReportFormData.append('selected_fields', field.value));
  
  //         // Append filtered report content for specific date range
  //         generateReportFormData.append('filtered_report_content', JSON.stringify(filteredReportContent));
  
  //         this.generatingReport = true;
  
  //         this.http.post<any>(generateReportUrl, generateReportFormData).subscribe(
  //           response => {
  //             if (response && response.unique_values) {
  //               this.jsonDatas = Object.entries(response.unique_values).map(([key, value]) => ({
  //                 key,
  //                 values: Array.isArray(value) ? value : [value]
  //               }));
  
  //               this.openReportDialog(selectedReportId);
  
  //               if (response.selectedFileName) {
  //                 this.selectedFileName = response.selectedFileName;
  //               }
  
  //               this.snackBar.open('Report generated successfully', 'Success');
  //             } else {
  //               console.error('Invalid response format:', response);
  //               this.snackBar.open('Invalid response format', 'Error');
  //             }
  //             this.generatingReport = false;
  //           },
  //           error => {
  //             console.error('Error generating report:', error);
  //             this.snackBar.open('Error generating report. Please try again later.', 'Error');
  //             this.generatingReport = false;
  //           }
  //         );
  //       } else {
  //         console.error('Invalid response format from date filter:', filterResponse);
  //         this.snackBar.open('Error filtering data by date range. Please try again later.', 'Error');
  //         this.generatingReport = false;
  //       }
  //     },
  //     error => {
  //       console.error('Error filtering data by date range:', error);
  //       this.snackBar.open('Error filtering data by date range. Please try again later.', 'Error');
  //       this.generatingReport = false;
  //     }
  //   );
  // }

  //
  // generateReportstest(): void {
  //   const selectedReportId = this.selectedReportId;
  
  //   if (!selectedReportId) {
  //     this.snackBar.open('No valid report selected.', 'Error');
  //     console.error('No valid report selected.');
  //     return;
  //   }
  
  //   if (!this.dateRange.start || !this.dateRange.end) {
  //     this.snackBar.open('Please select both start and end dates.', 'Error');
  //     console.error('Date range is not fully selected.');
  //     return;
  //   }
  
  //   const selectedSchema = localStorage.getItem('selectedSchema');
  //   if (!selectedSchema) {
  //     this.snackBar.open('No schema selected.', 'Error');
  //     console.error('No schema selected.');
  //     return;
  //   }
  
  //   // Format dates as yyyy/MM/dd
  //   const startDateFormatted = this.datePipe.transform(this.dateRange.start, 'yyyy/MM/dd');
  //   const endDateFormatted = this.datePipe.transform(this.dateRange.end, 'yyyy/MM/dd');
  
  //   // Date filter API URL
  //   const filterByDateUrl = `http://${selectedSchema}.localhost:8000/employee/api/doc-report/filter_by_date/`;
  //   const filterByDateFormData = new FormData();
  //   filterByDateFormData.append('report_id', selectedReportId.toString());
  //   filterByDateFormData.append('start_date', startDateFormatted!);
  //   filterByDateFormData.append('end_date', endDateFormatted!);
  
  //   this.http.post<any>(filterByDateUrl, filterByDateFormData).subscribe(
  //     filterResponse => {
  //       if (filterResponse && filterResponse.date_filtered_data) {
  //         // Filter the response data based on the selected date range
  //         const filteredReportContent = filterResponse.date_filtered_data.filter((data: any) => {
  //           const empDocExpiryDate = new Date(data['emp_doc_expiry_date']);
  //           return empDocExpiryDate >= new Date(this.dateRange.start!) && empDocExpiryDate <= new Date(this.dateRange.end!);
  //         });
  
  //         // Handle filtering field selection in the response
  //         const filteredFields = this.selectedFields.filter(field => {
  //           return filteredReportContent.some((data: any) => data.hasOwnProperty(field.value));
  //         });
  
  //         // Generate report API URL
  //         const generateReportUrl = `http://${selectedSchema}.localhost:8000/employee/api/doc-report/generate_doc_filter_table/`;
  //         const generateReportFormData = new FormData();
  //         generateReportFormData.append('report_id', selectedReportId.toString());
  
  //         // Append filtered fields
  //         filteredFields.forEach(field => generateReportFormData.append('selected_fields', field.value));
  
  //         // Append filtered report content for specific date range
  //         generateReportFormData.append('filtered_report_content', JSON.stringify(filteredReportContent));
  
  //         this.generatingReport = true;
  
  //         this.http.post<any>(generateReportUrl, generateReportFormData).subscribe(
  //           response => {
  //             if (response && response.unique_values) {
  //               this.jsonDatas = Object.entries(response.unique_values).map(([key, value]) => ({
  //                 key,
  //                 values: Array.isArray(value) ? value : [value]
  //               }));
  
  //               this.openReportDialog(selectedReportId);
  
  //               if (response.selectedFileName) {
  //                 this.selectedFileName = response.selectedFileName;
  //               }
  
  //               this.snackBar.open('Report generated successfully', 'Success');
  //             } else {
  //               console.error('Invalid response format:', response);
  //               this.snackBar.open('Invalid response format', 'Error');
  //             }
  //             this.generatingReport = false;
  //           },
  //           error => {
  //             console.error('Error generating report:', error);
  //             this.snackBar.open('Error generating report. Please try again later.', 'Error');
  //             this.generatingReport = false;
  //           }
  //         );
  //       } else {
  //         console.error('Invalid response format from date filter:', filterResponse);
  //         this.snackBar.open('Error filtering data by date range. Please try again later.', 'Error');
  //         this.generatingReport = false;
  //       }
  //     },
  //     error => {
  //       console.error('Error filtering data by date range:', error);
  //       this.snackBar.open('Error filtering data by date range. Please try again later.', 'Error');
  //       this.generatingReport = false;
  //     }
  //   );
  // }
  
 

  // generateReportstest(): void {
  //   const selectedReportId = this.selectedReportId;
  
  //   if (!selectedReportId) {
  //     this.snackBar.open('No valid report selected.', 'Error');
  //     console.error('No valid report selected.');
  //     return;
  //   }
  
  //   if (!this.dateRange.start || !this.dateRange.end) {
  //     this.snackBar.open('Please select both start and end dates.', 'Error');
  //     console.error('Date range is not fully selected.');
  //     return;
  //   }
  
  //   const selectedSchema = localStorage.getItem('selectedSchema');
  //   if (!selectedSchema) {
  //     this.snackBar.open('No schema selected.', 'Error');
  //     console.error('No schema selected.');
  //     return;
  //   }
  
  //   // Format dates as yyyy/MM/dd
  //   const startDateFormatted = this.datePipe.transform(this.dateRange.start, 'yyyy/MM/dd');
  //   const endDateFormatted = this.datePipe.transform(this.dateRange.end, 'yyyy/MM/dd');
  
  //   // Date filter API URL
  //   const filterByDateUrl = `http://${selectedSchema}.localhost:8000/employee/api/doc-report/filter_by_date/`;
  //   const filterByDateFormData = new FormData();
  //   filterByDateFormData.append('report_id', selectedReportId.toString());
  //   filterByDateFormData.append('start_date', startDateFormatted!);
  //   filterByDateFormData.append('end_date', endDateFormatted!);
  
  //   this.http.post<any>(filterByDateUrl, filterByDateFormData).subscribe(
  //     filterResponse => {
  //       if (filterResponse && filterResponse.date_filtered_data) {
  //         const filteredReportContent = filterResponse.date_filtered_data.filter((data: any) => {
  //           const empDocExpiryDate = new Date(data['emp_doc_expiry_date']);
  //           return empDocExpiryDate >= new Date(this.dateRange.start!) && empDocExpiryDate <= new Date(this.dateRange.end!);
  //         });
  
  //         const filteredFields = this.selectedFields.filter(field => {
  //           return filteredReportContent.some((data: any) => data.hasOwnProperty(field.value));
  //         });
  
  //         const generateReportUrl = `http://${selectedSchema}.localhost:8000/employee/api/doc-report/generate_doc_filter_table/`;
  //         const generateReportFormData = new FormData();
  //         generateReportFormData.append('report_id', selectedReportId.toString());
  //         filteredFields.forEach(field => generateReportFormData.append('selected_fields', field.value));
  //         const selectedFieldKeys = this.selectedFields.map(field => field.value);
  
  //         generateReportFormData.append('filtered_report_content', JSON.stringify(
  //           filteredReportContent.map((data: any) => {
  //             const filteredData: any = {};
  //             selectedFieldKeys.forEach(key => {
  //               if (data.hasOwnProperty(key)) {
  //                 filteredData[key] = data[key];
  //               }
  //             });
  //             return filteredData;
  //           })
  //         ));
  
  //         this.generatingReport = true;
  
  //         this.http.post<any>(generateReportUrl, generateReportFormData).subscribe(
  //           response => {
  //             if (response && response.unique_values) {
  //               this.jsonDatas = Object.entries(response.unique_values).map(([key, value]) => ({
  //                 key,
  //                 values: Array.isArray(value) ? value : [value]
  //               }));
  
  //               this.filteredContent = filteredReportContent;
  //               this.displayedColumns = filteredFields.map(field => field.value);
  
  //               this.openReportDialog(selectedReportId);
  
  //               if (response.selectedFileName) {
  //                 this.selectedFileName = response.selectedFileName;
  //               }
  
  //               this.snackBar.open('Report generated successfully', 'Success');
  //             } else {
  //               console.error('Invalid response format:', response);
  //               this.snackBar.open('Invalid response format', 'Error');
  //             }
  //             this.generatingReport = false;
  //           },
  //           error => {
  //             console.error('Error generating report:', error);
  //             this.snackBar.open('Error generating report. Please try again later.', 'Error');
  //             this.generatingReport = false;
  //           }
  //         );
  //       } else {
  //         console.error('Invalid response format from date filter:', filterResponse);
  //         this.snackBar.open('Error filtering data by date range. Please try again later.', 'Error');
  //         this.generatingReport = false;
  //       }
  //     },
  //     error => {
  //       console.error('Error filtering data by date range:', error);
  //       this.snackBar.open('Error filtering data by date range. Please try again later.', 'Error');
  //       this.generatingReport = false;
  //     }
  //   );
  // }
  
  // generateReportstest(): void {
  //   const selectedReportId = this.selectedReportId;
  
  //   if (!selectedReportId) {
  //     this.snackBar.open('No valid report selected.', 'Error');
  //     console.error('No valid report selected.');
  //     return;
  //   }
  
  //   if (!this.dateRange.start || !this.dateRange.end) {
  //     this.snackBar.open('Please select both start and end dates.', 'Error');
  //     console.error('Date range is not fully selected.');
  //     return;
  //   }
  
  //   const selectedSchema = localStorage.getItem('selectedSchema');
  //   if (!selectedSchema) {
  //     this.snackBar.open('No schema selected.', 'Error');
  //     console.error('No schema selected.');
  //     return;
  //   }
  
  //   // Format dates as yyyy/MM/dd
  //   const startDateFormatted = this.datePipe.transform(this.dateRange.start, 'yyyy/MM/dd');
  //   const endDateFormatted = this.datePipe.transform(this.dateRange.end, 'yyyy/MM/dd');
  
  //   // Date filter API URL
  //   const filterByDateUrl = `http://${selectedSchema}.localhost:8000/employee/api/doc-report/filter_by_date/`;
  //   const filterByDateFormData = new FormData();
  //   filterByDateFormData.append('report_id', selectedReportId.toString());
  //   filterByDateFormData.append('start_date', startDateFormatted!);
  //   filterByDateFormData.append('end_date', endDateFormatted!);
  
  //   this.http.post<any>(filterByDateUrl, filterByDateFormData).subscribe(
  //     filterResponse => {
  //       if (filterResponse && filterResponse.date_filtered_data) {
  //         const filteredReportContent = filterResponse.date_filtered_data.filter((data: any) => {
  //           const empDocExpiryDate = new Date(data['emp_doc_expiry_date']);
  //           return empDocExpiryDate >= new Date(this.dateRange.start!) && empDocExpiryDate <= new Date(this.dateRange.end!);
  //         });
  
  //         const selectedFieldKeys = this.selectedFields.map(field => field.value);
  
  //         // Filter the report content to contain only selected fields
  //         const filteredReportContentSelectedFields = filteredReportContent.map((data: any) => {
  //           const filteredData: any = {};
  //           selectedFieldKeys.forEach(key => {
  //             if (data.hasOwnProperty(key)) {
  //               filteredData[key] = data[key];
  //             }
  //           });
  //           return filteredData;
  //         });
  
  //         const filteredFields = this.selectedFields.filter(field => {
  //           return filteredReportContentSelectedFields.some((data: any) => data.hasOwnProperty(field.value));
  //         });
  
  //         const generateReportUrl = `http://${selectedSchema}.localhost:8000/employee/api/doc-report/generate_doc_filter_table/`;
  //         const generateReportFormData = new FormData();
  //         generateReportFormData.append('report_id', selectedReportId.toString());
  //         filteredFields.forEach(field => generateReportFormData.append('selected_fields', field.value));
  
  //         generateReportFormData.append('filtered_report_content', JSON.stringify(filteredReportContentSelectedFields));
  
  //         this.generatingReport = true;
  
  //         this.http.post<any>(generateReportUrl, generateReportFormData).subscribe(
  //           response => {
  //             if (response && response.unique_values) {
  //               this.jsonDatas = Object.entries(response.unique_values).map(([key, value]) => ({
  //                 key,
  //                 values: Array.isArray(value) ? value : [value]
  //               }));
  
  //               this.filteredContent = filteredReportContentSelectedFields;
  //               this.displayedColumns = filteredFields.map(field => field.value);
  
  //               this.openReportDialog(selectedReportId);
  
  //               if (response.selectedFileName) {
  //                 this.selectedFileName = response.selectedFileName;
  //               }
  
  //               this.snackBar.open('Report generated successfully', 'Success');
  //             } else {
  //               console.error('Invalid response format:', response);
  //               this.snackBar.open('Invalid response format', 'Error');
  //             }
  //             this.generatingReport = false;
  //           },
  //           error => {
  //             console.error('Error generating report:', error);
  //             this.snackBar.open('Error generating report. Please try again later.', 'Error');
  //             this.generatingReport = false;
  //           }
  //         );
  //       } else {
  //         console.error('Invalid response format from date filter:', filterResponse);
  //         this.snackBar.open('Error filtering data by date range. Please try again later.', 'Error');
  //         this.generatingReport = false;
  //       }
  //     },
  //     error => {
  //       console.error('Error filtering data by date range:', error);
  //       this.snackBar.open('Error filtering data by date range. Please try again later.', 'Error');
  //       this.generatingReport = false;
  //     }
  //   );
  // }
  
  generateReportstest(): void {
    const selectedReportId = this.selectedReportId;
  
    if (!selectedReportId) {
      this.snackBar.open('No valid report selected.', 'Error');
      console.error('No valid report selected.');
      return;
    }
  
    if (!this.dateRange.start || !this.dateRange.end) {
      this.snackBar.open('Please select both start and end dates.', 'Error');
      console.error('Date range is not fully selected.');
      return;
    }
  
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      this.snackBar.open('No schema selected.', 'Error');
      console.error('No schema selected.');
      return;
    }
  
    const startDateFormatted = this.datePipe.transform(this.dateRange.start, 'yyyy/MM/dd');
    const endDateFormatted = this.datePipe.transform(this.dateRange.end, 'yyyy/MM/dd');
  
    const filterByDateUrl = `http://${selectedSchema}.localhost:8000/employee/api/doc-report/filter_by_date/`;   
     const filterByDateFormData = new FormData();
    filterByDateFormData.append('report_id', selectedReportId.toString());
    filterByDateFormData.append('start_date', startDateFormatted!);
    filterByDateFormData.append('end_date', endDateFormatted!);
  
    this.http.post<any>(filterByDateUrl, filterByDateFormData).subscribe(
      filterResponse => {
        if (filterResponse && filterResponse.date_filtered_data) {
          const filteredReportContent = filterResponse.date_filtered_data;
          const selectedFieldKeys = this.selectedFields.map(field => field.value);
  
          // Filter the report content to include only selected fields
          const filteredReportContentSelectedFields = filteredReportContent.map((data: any) => {
            const filteredData: any = {};
            selectedFieldKeys.forEach(key => {
              if (data.hasOwnProperty(key)) {
                filteredData[key] = data[key];
              }
            });
            return filteredData;
          });
  
          console.log('Filtered Report Content with Selected Fields:', filteredReportContentSelectedFields);
  
          // Extract unique values for the selected fields from filtered data
          const uniqueValues = this.getUniqueValues(filteredReportContentSelectedFields, selectedFieldKeys);
  
          console.log('Unique Values:', uniqueValues);
  
          // Prepare FormData for backend request
   const generateReportUrl = `http://${selectedSchema}.localhost:8000/employee/api/doc-report/generate_doc_filter_table/`;          
   const generateReportFormData = new FormData();
          generateReportFormData.append('report_id', selectedReportId.toString());
          selectedFieldKeys.forEach(key => generateReportFormData.append('selected_fields', key));
  
          this.generatingReport = true;
  
          this.http.post<any>(generateReportUrl, generateReportFormData).subscribe(
            response => {
              if (response) {
                // Update jsonDatas with unique values from the filtered data
                this.jsonDatas = selectedFieldKeys.map(key => ({
                  key,
                  values: uniqueValues[key] ? Array.isArray(uniqueValues[key]) ? uniqueValues[key] : [uniqueValues[key]] : []
                }));
  
                console.log('Filtered JSON Data:', this.jsonDatas);
  
                this.filteredContent = filteredReportContentSelectedFields;
                this.displayedColumns = selectedFieldKeys;
  
                this.openReportDialog(this.selectedReportId, uniqueValues);

                // this.openReportDialog(selectedReportId);
  
                if (response.selectedFileName) {
                  this.selectedFileName = response.selectedFileName;
                }
  
                this.snackBar.open('Report generated successfully', 'Success');
              } else {
                console.error('Invalid response format:', response);
                this.snackBar.open('Invalid response format', 'Error');
              }
              this.generatingReport = false;
            },
            error => {
              console.error('Error generating report:', error);
              this.snackBar.open('Error generating report. Please try again later.', 'Error');
              this.generatingReport = false;
            }
          );
        } else {
          console.error('Invalid response format from date filter:', filterResponse);
          this.snackBar.open('Error filtering data by date range. Please try again later.', 'Error');
          this.generatingReport = false;
        }
      },
      error => {
        console.error('Error filtering data by date range:', error);
        this.snackBar.open('Error filtering data by date range. Please try again later.', 'Error');
        this.generatingReport = false;
      }
    );
  }
  
  // Utility function to get unique values for selected fields
  getUniqueValues(data: any[], selectedFields: string[]): { [key: string]: any[] } {
    const uniqueValues: { [key: string]: Set<any> } = {};
    selectedFields.forEach(field => uniqueValues[field] = new Set());
  
    data.forEach(record => {
      selectedFields.forEach(field => {
        if (record[field] !== undefined) {
          uniqueValues[field].add(record[field]);
        }
      });
    });
  
    // Convert Sets to Arrays
    const result: { [key: string]: any[] } = {};
    Object.keys(uniqueValues).forEach(field => {
      result[field] = Array.from(uniqueValues[field]);
    });
  
    return result;
  }
  
  
  
  getMaxRowLength(): number {
    let maxLength = 0;
    this.jsonDatas.forEach(data => {
      if (data && data.values) {
        const length = data.values.length || 0; // Safely access length
        if (length > maxLength) {
          maxLength = length;
        }
      }
    });
    return maxLength;
  }
  
  
  
  
  
  
openReportDialog(reportId: number | null, uniqueValues: any): void {
  if (reportId === null) {
    console.error('Report ID is null, cannot open report dialog.');
    return;
  }

  const dialogRef = this.dialog.open(DocumentDialogComponent, {
    data: {
      filteredReportContent: this.filteredContent || [],
      displayedColumns: this.displayedColumns || [],
      jsonDatas: this.jsonDatas || [],
      reportId: reportId,
      uniqueValues: uniqueValues // Pass uniqueValues to the dialog
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
  
  
  
  
  
  
  
  
  
  
  
  
  



/////////////////////////////////////////////////////////



  onAdditionalFieldSelectionChanged(event: any, empField: any): void {
    const matchingField = this.employeefields.find(field => field.value === empField.value);
    if (matchingField) {
      matchingField.selected = event.checked;
    }
  }
  

  
  
  
  // openReportDialog(reportId: number | null): void {
  //   if (reportId === null) {
  //     console.error('Report ID is null, cannot open report dialog.');
  //     return;
  //   }
  
  //   const dialogRef = this.dialog.open(DocumentDialogComponent, {
  //     data: { jsonDatas: this.jsonDatas, reportId: reportId }
  //   });
  
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }
  
  

  
  shouldDisplayField(fieldName: string): boolean {
    const field = this.selectedFields.find(f => f.value === fieldName);
    if (!field) return false;
    return this.jsonData.some(emp => emp[field.value] !== null && emp[field.value] !== undefined);
  }
  // onFieldSelectionChanges(event: Event, empField: EmployeeField): void {
  //   empField.selected = (event.target as HTMLInputElement).checked;
  // }

  onFieldSelectionChanges(event: any, field: EmployeeField): void {
    field.selected = event.target.checked;
    console.log('Field selection changed:', field.displayName, 'Selected:', field.selected);
  
    if (field.selected) {
      const existingField = this.selectedFields.find(f => f.value === field.value);
      if (!existingField) {
        this.selectedFields.push(field);
        console.log('Field added to selectedFields:', field);
      }
    } else {
      this.selectedFields = this.selectedFields.filter(f => f.value !== field.value);
      console.log('Field removed from selectedFields:', field);
    }
  
    console.log('Current selectedFields:', this.selectedFields);
  }
  // onFieldSelectionChanges(event: Event, empField: any): void {
  //   empField.selected = (event.target as HTMLInputElement).checked;
  // }

  onStartDateChange(event: any): void {
    this.dateRange = { start: event.value, end: this.dateRange?.end || null };
  }
  
  onEndDateChange(event: any): void {
    this.dateRange = { start: this.dateRange?.start || null, end: event.value };
  }

  // onFieldSelectionChanges(event: any, field: EmployeeField): void {
  //   field.selected = event.target.checked;
  //   console.log(field.selected)
  //   if (field.selected) {
  //     const existingField = this.selectedFields.find(f => f.value === field.value);
  //     if (!existingField) {
  //       this.selectedFields.push(field);
  //     }
  //   } else {
  //     this.selectedFields = this.selectedFields.filter(f => f.value !== field.value);
  //   }
  // }
  
  showSelectedFields(report: any): void {
    // Set selected report data to display in the template
    this.selectedReportData = report;
    console.log('Selected Report Data:', this.selectedReportData);

  }
  allFields: EmployeeField[] = Object.keys(this.display_names).map(key => ({
    value: key,
    displayName: this.display_names[key],
    selected: false
  }));
  generateReport(): void {
    if (!this.fileName.trim()) {
      this.snackBar.open('Please enter a file name.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      return;
    }
  
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      this.snackBar.open('No schema selected.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      return;
    }
  
    const url = `http://${selectedSchema}.localhost:8000/employee/api/doc-report/generate_document_report/`;
    const formData = new FormData();
    formData.append('file_name', this.fileName);
  
    // Extract selected fields to submit
    const fieldsToSubmit = this.selectedFields
      .filter(field => field.selected && field.value.trim() !== 'N/A' && field.value.trim() !== '')
      .map(field => field.value.trim());
  
    // Extract previously selected fields to submit
    const previouslySelectedFieldsToSubmit = this.previouslySelectedFields
      .filter(field => field.selected && field.value.trim() !== 'N/A' && field.value.trim() !== '')
      .map(field => field.value.trim());
  
    // Combine both arrays and remove duplicates
    const allFieldsToSubmit = Array.from(new Set([...fieldsToSubmit, ...previouslySelectedFieldsToSubmit]));
  
    if (allFieldsToSubmit.length === 0) {
      this.snackBar.open('Please select at least one field.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      return;
    }
  
    // Append selected fields to FormData with the key 'fields'
    allFieldsToSubmit.forEach(fieldValue => {
      formData.append('fields', fieldValue);
    });
  
    // Append date range if set
    if (this.dateRange.start && this.dateRange.end) {
      const startDate = this.datePipe.transform(this.dateRange.start, 'dd-MM-yyyy');
      const endDate = this.datePipe.transform(this.dateRange.end, 'dd-MM-yyyy');
      if (startDate && endDate) {
        formData.append('from_date', startDate);
        formData.append('to_date', endDate);
      } else {
        this.snackBar.open('Invalid date format.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        return;
      }
    }
  
    this.generatingReport = true;
  
    this.http.post<any>(url, formData).subscribe(
      response => {
        console.log('Report generated successfully:', response);
        if (response.status === 'success' && response.file_path) {
          this.snackBar.open(`Report generated successfully. File saved at: ${response.file_path}`, 'Close', {
            duration: 10000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          window.location.reload();
        } else if (response.status === 'error' && response.message) {
          this.snackBar.open(`Error generating report: ${response.message}`, 'Close', {
            duration: 10000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        } else {
          console.error('Error generating report. Response:', response);
          this.snackBar.open('Error generating report. Please try again later.', 'Close', {
            duration: 10000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
        this.generatingReport = false;
      },
      error => {
        console.error('Error generating report:', error);
        this.snackBar.open('Error generating report. Please try again later.', 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        this.generatingReport = false;
      }
    );
  }
  
  
  
  
  
  
  // setUsualDateRange(): void {
  //   this.dateRange = { start: new Date(), end: new Date() };
  // }
  // setToDateRange(): void {
  //   this.dateRange = { start: new Date(), end: new Date() }; // Example: Replace with logic
  // }
  // setOneMonthDateRange(): void {
  //   const today = new Date();
  //   const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  //   this.dateRange = { start: oneMonthAgo, end: today };
  // }
  loadSavedReportss(): void {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return;
    }

    // Example: Fetch authentication token from local storage or API service
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      console.error('No authentication token found.');
      // Handle the case where no token is found, e.g., redirect to login page
      return;
    }

    const url = `http://${selectedSchema}.localhost:8000/employee/api/doc-report`;
    this.http.get<Report[]>(url).subscribe(
      (reports: Report[]) => {
        this.savedReports = reports;
        this.filteredReports = reports; // Initialize filtered reports with all saved reports
        console.log('Saved Reports:', reports);
      },
      (error) => {
        console.error('Error fetching saved reports:', error);
      }
    );
  }
 

  showReportTable(report: Report): void {
    this.activeReport = report;
    this.selectedFileName = report.file_name;  // Set the selected file name

    this.showTableForReportId = report.id; // Set the report ID to show its table
    this.selectedReportId = report.id; // Set the selected report ID

    const url = report.report_data; // Assuming report_data contains the URL for JSON data
  
    this.http.get<Employee[]>(url).subscribe(
      (response: Employee[]) => {
        console.log('Table Data:', response);
        this.jsonData = response; // Assign JSON data to the component property
      },
      (error) => {
        console.error('Error fetching report data:', error);
      }
    );
  }
  

  clearTable(): void {
    this.showTableForReportId = null;
    this.tableData = []; // Clear table data when hiding the table
  }
 
  
}
