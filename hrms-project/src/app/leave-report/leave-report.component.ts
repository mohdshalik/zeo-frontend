import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { EmployeeService } from '../employee-master/employee.service';
import {MatExpansionModule} from '@angular/material/expansion';
import {ChangeDetectionStrategy,  signal} from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { drop } from 'lodash';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ReportService } from '../report-generate/report.service'; 
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { ReportDialogComponent } from '../report-generate/report-dialog/report-dialog.component'; 
import * as fileSaver from 'file-saver'; // Import file-saver.js
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { catchError, combineLatest, throwError } from 'rxjs';
import { ReportGenerateService } from '../report-generate/report-generate.service'; 
import { AuthenticationService } from '../login/authentication.service';
import { SessionService } from '../login/session.service';
import { LeaveDialogComponent } from './leave-dialog/leave-dialog.component';
import { DataService } from '../report-generate/data.service';


interface ColumnDefinition {
  key: string;
  name: string;
}

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
  emp_code: string;
  emp_first_name: string;
  emp_last_name: string;
  emp_gender: string;
  emp_date_of_birth: string;
  emp_personal_email: string;
  emp_mobile_number_1: string;
  emp_mobile_number_2: string;
  emp_country_id: string;
  emp_state_id: string;
  emp_city: string;
  emp_permenent_address: string;
  emp_present_address: string;
  emp_status: string;
  emp_hired_date: string;
  emp_active_date: string;
  emp_relegion: string;
  emp_blood_group: string;
  emp_nationality_id: string;
  emp_marital_status: string;
  emp_father_name: string;
  emp_mother_name: string;
  emp_posting_location: string;
  is_active: boolean;
  epm_ot_applicable: boolean;
  emp_company_id: string;
  emp_branch_id: string;
  emp_dept_id: string;
  emp_desgntn_id: string;
  emp_ctgry_id: string;
  date: string;
  sdd: string;
  zipcode: string;
    [key: string]: any; // Define an index signature to allow any string key
}
interface KeyValue {
  key: string;
  values: string[];
}


@Component({
  selector: 'app-leave-report',
  templateUrl: './leave-report.component.html',
  styleUrl: './leave-report.component.css'
})
export class LeaveReportComponent {

  @ViewChild('filteredReportModal') filteredReportModal!: ElementRef;

  public baseUrls = 'http://127.0.0.1:8000/leave-report'; // Define the base URL property


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
  reportData = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  cardOpen = false;
  dataSource = new MatTableDataSource<Employee>([]);
  
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

  isAdvancedFilter: boolean = false;

  hasAddPermission: boolean = false;
  hasDeletePermission: boolean = false;
  hasViewPermission: boolean =false;
  hasEditPermission: boolean = false;
  hasExportPermission: boolean = false;
  userId: number | null | undefined;
  userDetails: any;
  selectedSchema: string | null = null;
  username: any;
  userDetailss: any;
  schemas: string[] = []; // Array to store schema names
  empCodeFieldName: string = '';
  firstNameFieldName: string = '';
  lastNameFieldName: string = '';
  emailFieldName: string = '';
  dobFieldName: string = '';
  cmpnoFieldName: string = '';
  pernoFieldName: string = '';
  peraddressFieldName: string = '';
  preaddressFieldName: string = '';
  cityFieldName: string = '';
  nationFieldName: string = '';
  genderFieldName: string = '';
  maritalFieldName: string = '';
  religionFieldName: string = '';
  bloodFieldName: string = '';
  fatherFieldName: string = '';
  motherFieldName: string = '';
  locationFieldName: string = '';
  cntryFieldName: string = '';
  brchFieldName: string = '';
  deptFieldName: string = '';
  desFieldName: string = '';
  catFieldName: string = '';
  hiredFieldName: string = '';
  joinFieldName: string = '';

  generatingReport: boolean = false; // Flag to indicate if report is being generated
  display_names: { [key: string]: string } = {};


 
  displayedColumns: string[] = [];
  columnDefinitions: ColumnDefinition[] = [];

  isEditModalOpen=false;

 
  


  
 

  // selectedReportData: any = null; // To hold selected report data for display

  constructor(private http: HttpClient,
    private employeeService: EmployeeService,
    private reportService: ReportService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private changeDetectorRef: ChangeDetectorRef,
    private reportgenerateService: ReportGenerateService,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    EmployeeService:EmployeeService,
    private cdr: ChangeDetectorRef,
    private dataService:DataService

    
    
  ) { 
 
  }

  hideButton = false;


  ngOnInit(): void {
    // Load available fields when the component initializes

    this.loadPreviouslySelectedFieldsFromLocalStorage();
     this.loadFieldNames();
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
    
                      this.hasViewPermission = this.checkGroupPermission('view_leavereport', groupPermissions);
                 console.log('Has view permission:', this.hasViewPermission);
            
                   this.hasAddPermission = this.checkGroupPermission('add_leavereport', groupPermissions);
                  console.log('Has add permission:', this.hasAddPermission);
            
                 this.hasDeletePermission = this.checkGroupPermission('delete_leavereport', groupPermissions);
              console.log('Has delete permission:', this.hasDeletePermission);
            
                  this.hasEditPermission = this.checkGroupPermission('change_leavereport', groupPermissions);
                 console.log('Has edit permission:', this.hasEditPermission);

                 
                 this.hasExportPermission = this.checkGroupPermission('export_leavereport', groupPermissions);
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


  loadFieldNames(): void {
    // Define the mapping of localStorage keys to field names
    const fieldMappings: { [key: string]: string } = {
      empCodeFieldName: 'emp_code',
      firstNameFieldName: 'emp_first_name',
      lastNameFieldName: 'emp_last_name',
      emailFieldName: 'emp_personal_email',
      dobFieldName: 'emp_date_of_birth',
      cmpnoFieldName: 'emp_mobile_number_1',
      pernoFieldName: 'emp_mobile_number_2',
      peraddressFieldName: 'emp_permenent_address',
      preaddressFieldName: 'emp_present_address',
      cityFieldName: 'emp_city',
      nationFieldName: 'emp_country_id',
      genderFieldName: 'emp_gender',
      maritalFieldName: 'emp_marital_status',
      religionFieldName: 'emp_relegion',
      bloodFieldName: 'emp_blood_group',
      fatherFieldName: 'emp_father_name',
      motherFieldName: 'emp_mother_name',
      locationFieldName: 'emp_posting_location',
      cntryFieldName: 'emp_country_id',
      brchFieldName: 'emp_branch_id',
      deptFieldName: 'emp_dept_id',
      desFieldName: 'emp_desgntn_id',
      catFieldName: 'emp_ctgry_id',
      hiredFieldName: 'emp_hired_date',
      joinFieldName: 'emp_active_date',
      zipcodeFieldName: 'zipcode',
      sddFieldName: 'sdd',
      dateFieldName: 'date'
    };
  
    // Initialize display_names as an empty object
    this.display_names = {};
  
    // Iterate over fieldMappings and populate display_names from localStorage
    Object.entries(fieldMappings).forEach(([localStorageKey, fieldName]) => {
      const savedFieldName = localStorage.getItem(localStorageKey);
      if (savedFieldName) {
        this.display_names[fieldName] = savedFieldName;
      } else {
        // Optional: Set default values if desired
        this.display_names[fieldName] = this.getDefaultDisplayName(fieldName);
      }
    });
  
    // Log the display names to verify
    console.log('Loaded field names:', this.display_names);
  }
  
  getDefaultDisplayName(key: string): string {
    const defaultNames: { [key: string]: string } = {
      emp_code: "Employee Code",
      emp_first_name: "First Name",
      emp_last_name: "Last Name",
      emp_gender: "Gender",
      emp_date_of_birth: "Date of Birth",
      emp_personal_email: "Email",
      emp_mobile_number_1: "Mobile Number 1",
      emp_mobile_number_2: "Mobile Number 2",
      emp_country_id: "Country",
      emp_city: "City",
      emp_permenent_address: "Permanent Address",
      emp_present_address: "Present Address",
      emp_status: "Status",
      emp_hired_date: "Hired Date",
      emp_active_date: "Active Date",
      emp_relegion: "Religion",
      emp_blood_group: "Blood Group",
      emp_nationality_id: "Nationality",
      emp_marital_status: "Marital Status",
      emp_father_name: "Father Name",
      emp_mother_name: "Mother Name",
      emp_posting_location: "Posting Location",
      is_active: "Active",
      epm_ot_applicable: "OT Applicable",
      emp_company_id: "Company",
      emp_branch_id: "Branch",
      emp_dept_id: "Department",
      emp_desgntn_id: "Designation",
      emp_ctgry_id: "Category",
      date: "Date",
      sdd: "SDD",
      zipcode: "Zipcode"
    };
    return defaultNames[key] || key;
  }
  

  ngAfterViewInit() {
    this.reportData.sort = this.sort;
    this.reportData.paginator = this.paginator;
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


  fetchStandardReport(): void {
    this.dataService.getStandardReportLeave().subscribe(
      (response: any) => {
        console.log('Report response:', response);
        if (response.report_data) {
          this.http.get<any>(response.report_data).subscribe(
            (data: any) => {
              console.log('Report data:', data);
              if (data.length > 0) {
                // Dynamically set columns based on data
                const dataKeys = Object.keys(data[0]);
                this.displayedColumns = dataKeys;

                // Create column definitions based on field names from localStorage
                this.columnDefinitions = this.displayedColumns.map(key => {
                  const fieldName = (this as any)[`${key}FieldName`] || this.formatColumnName(key);
                  return {
                    key,
                    name: fieldName
                  };
                });

                // Refresh the table data and sort/paginator
                this.dataSource.data = data;
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;

                // Trigger change detection to update table
                this.cdr.detectChanges();
              } else {
                console.error('No data available.');
              }
            },
            (error: any) => {
              console.error('Error fetching report data:', error);
            }
          );
        } else {
          console.error('Invalid response format - report_data not found:', response);
        }
      },
      (error: any) => {
        console.error('Error fetching standard report:', error);
      }
    );
  }

  formatColumnName(key: string): string {
    // Convert snake_case or camelCase to Human Readable format
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }




 // Example method to get object keys
getObjectKeys(obj: any): string[] {
  return Object.keys(obj);
}






StandardDownload(): void {
  if (!this.dataSource.data || this.dataSource.data.length === 0) {
    this.snackBar.open('No valid report data to download.', 'Error', {
      duration: 3000,
    });
    console.error('No valid report data to download.');
    return;
  }

  try {
    // Use display_names to map column headers
    const displayNames: { [key: string]: string } = this.display_names;

    // Prepare worksheet data
    const worksheetData: any[][] = [];
    const title = 'Employee Master Standard Report';

    // Prepare headers
    const headers = Object.keys(displayNames).map(key => displayNames[key]);

    // Add title row
    const titleRow = new Array(headers.length).fill('');
    titleRow[0] = title;
    worksheetData.push(titleRow);

    // Add headers row
    worksheetData.push(headers);

    // Map data to match display names
    const mappedData = this.dataSource.data.map((item: { [key: string]: any }) => {
      const newItem: { [key: string]: any } = {};
      for (const key in item) {
        if (item.hasOwnProperty(key) && displayNames[key]) {
          newItem[displayNames[key]] = item[key];
        }
      }
      return newItem;
    });

    // Add data rows
    mappedData.forEach(row => {
      const values = headers.map(header => row[header] || '');
      worksheetData.push(values);
    });

    // Create a worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Merge and center align title cell
    if (!worksheet['!merges']) worksheet['!merges'] = [];
    worksheet['!merges'].push({ s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } });

    // Style title cell
    worksheet['A1'].s = {
      alignment: { horizontal: 'center' },
      font: { sz: 14, bold: true, color: { rgb: 'FF0000' } }
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

    // Create workbook and save
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
  const url = window.URL.createObjectURL(data);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.xlsx`;
  link.click();
  window.URL.revokeObjectURL(url);
}



  toggleCard(): void {
    this.cardOpen = !this.cardOpen;
  }


  loadSavedReported(): void {
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
    }
  
    // const url = `http://${selectedSchema}.localhost:8000/employe
    // Replace with your actual API to fetch saved reports
    this.http.get<any[]>(`http://${selectedSchema}.localhost:8000/calendars/api/leave-report/`).subscribe(
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
      const wb: XLSX.WorkBook = { Sheets: { 'Employee Report': ws }, SheetNames: ['Employee Report'] };

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
  
    const url = `http://${selectedSchema}.localhost:8000/employee/api/emp-report/`;
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
  // drop(event: CdkDragDrop<EmployeeField[]>) {
  //   moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  // }
  
  drops(event: CdkDragDrop<any[]>): void {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }
  // drops(event: CdkDragDrop<any[]>): void {
  //   moveItemInArray(this.savedReports, event.previousIndex, event.currentIndex);
  // }

  fetchReportFields(reportId: number): void {
    // Ensure that field names are loaded from localStorage
    this.loadFieldNames(); // Ensure this is done before fetching report fields
  
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      return;
    }
  
    const url = `http://${selectedSchema}.localhost:8000/employee/api/emp-report/select_filter_fields/?report_id=${reportId}`;
  
    this.http.get<any>(url).subscribe(
      (response: { available_fields: { [key: string]: { value: string, name: string } }, selected_fields: string[] }) => {
        // Map the fields to include display names from localStorage
        this.employeefields = Object.values(response.available_fields).map((field: { value: string, name: string }) => ({
          ...field,
          selected: response.selected_fields.includes(field.value),
          displayName: this.display_names[field.value] || field.name // Use the display name from localStorage if available
        }));
  
        // Log the fetched fields with display names to verify
        console.log('Fetched employee fields with display names:', this.employeefields);
  
        // Log the loaded field names to compare
        console.log('Loaded field names:', this.display_names);
  
        // Set report ID for display
        this.showTableForReportId = reportId;
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
  employeefields: { value: string, displayName: string, selected: boolean }[] = [];
  defaultFields: { value: string, displayName: string, selected: boolean }[] = []; // Define the default fields
  isAddFieldsModalOpen: boolean = false; // State for the add fields modal
  
  loadAvailableFields(): void {
    this.reportgenerateService.getEmployeeFieldsLeave().subscribe(
      (fields: { value: string, displayName: string }[]) => {
        this.employeefields = fields.map(field => ({
          ...field,
          selected: false,
          displayName: this.display_names[field.value] || field.displayName // Use loaded display names
        }));
  
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
  
        console.log('Updated employee fields with display names:', this.employeefields);
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
  
    const url = `http://${selectedSchema}.localhost:8000/employee/api/emp-report/generate_employee_filter_table/`;
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
  
          this.openReportDialog(this.selectedReportId);
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




  generateReportstest(): void {
    if (!this.selectedReportId) {
      this.snackBar.open('No valid report selected.', 'Error');
      console.error('No valid report selected.');
      return;
    }
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      // return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
  
    // const url = `http://${selectedSchema}.localhost:8000/employee/api/emp-report/`;
    const url = `http://${selectedSchema}.localhost:8000/calendars/api/leave-report/generate_filter_table/`;
    const formData = new FormData();
    formData.append('report_id', this.selectedReportId.toString());
  
    // Append selected_fields
    this.selectedFields.forEach(field => formData.append('selected_fields', field.value));
  
    this.generatingReport = true;
  
    this.http.post<any>(url, formData).subscribe(
      response => {
        if (response && response.unique_values) {
          // Assuming response.unique_values is an object with column keys and corresponding data
          this.jsonDatas = Object.entries(response.unique_values).map(([key, value]) => ({
            key,
            values: Array.isArray(value) ? value : [value]
          }));
  
          // Open report dialog if necessary
          this.openReportDialog(this.selectedReportId); // Ensure it's a number
          
          // Set selected file name if provided in response
          if (response.selectedFileName) {
            this.selectedFileName = response.selectedFileName;
          }
  
          console.log('Report generated successfully', this.jsonDatas);
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
  }
  
  



/////////////////////////////////////////////////////////



  onAdditionalFieldSelectionChanged(event: any, empField: any): void {
    const matchingField = this.employeefields.find(field => field.value === empField.value);
    if (matchingField) {
      matchingField.selected = event.checked;
    }
  }
  

  
  
  
  openReportDialog(reportId: number | null): void {
    if (reportId === null) {
      console.error('Report ID is null, cannot open report dialog.');
      return;
    }
  
    const dialogRef = this.dialog.open(LeaveDialogComponent, {
      data: { jsonDatas: this.jsonDatas, reportId: reportId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  

  
  shouldDisplayField(fieldName: string): boolean {
    const field = this.selectedFields.find(f => f.value === fieldName);
    if (!field) return false;
    return this.jsonData.some(emp => emp[field.value] !== null && emp[field.value] !== undefined);
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
  
    const url = `http://${selectedSchema}.localhost:8000/calendars/api/leave-report/generate_leave_report/`;
    const formData = new FormData();
    formData.append('file_name', this.fileName);
  
    // Log selected fields
    console.log('Selected fields:', this.selectedFields);
    console.log('Previously selected fields:', this.previouslySelectedFields);
  
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
  
    // Log combined fields
    console.log('All fields to submit:', allFieldsToSubmit);
  
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
  
    // Log FormData content manually
    console.log('FormData content manually:');
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  
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
        } else if (response.status === 'empty') {
          this.snackBar.open('No data to write into report.', 'Close', {
            duration: 5000,
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

    const url = `http://${selectedSchema}.localhost:8000/calendars/api/leave-report/`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    this.http.get<any[]>(url, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Unauthorized access. Redirect to login page or handle as needed.');
          // Handle unauthorized access here (e.g., redirect to login page)
        }
        console.error('Error fetching saved reports:', error);
        return throwError('Error fetching saved reports. Please try again later.');
      })
    ).subscribe(
      (response: any[]) => {
        this.savedReports = response;
        this.filteredReports = response; // Initialize filtered reports with all saved reports
        console.log('Saved Reports:', response);
      },
      (error) => {
        console.error('Error handling response:', error);
        // Handle error responses here
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
