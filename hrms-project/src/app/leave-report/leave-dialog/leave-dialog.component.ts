import { Component, Inject, Input, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { ApiService } from '../../report-generate/api.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

interface DocumentItem {
  created_at_date: string; // Adjust the type if it's not a string
  // Add other fields if necessary
}

@Component({
  selector: 'app-leave-dialog',
  templateUrl: './leave-dialog.component.html',
  styleUrl: './leave-dialog.component.css'
})
export class LeaveDialogComponent implements OnInit, AfterViewInit  {
  
// export class ReportDialogComponent implements AfterViewInit {
 
  //  dataSource = new MatTableDataSource<any>(); // Initialize data source for table
  @ViewChild(MatSort) sort!: MatSort;

   jsonDatas: any[] = [];
   selectedFields: { [key: string]: any[] } = {};
   @Input() reportId: number | null;
   searchText: { [key: string]: string } = {};
   filteredData: any[] = [];
   originalData: any[] = [];
   displayedColumns: string[] = [];
   selectedGroupFields: string[] = [];
   groupedData: any[] = [];
  groupfalse: boolean = false;
  selectedSortFields: string[] = []; // Define selectedSortFields here
 displaygroup: boolean = true;
 showTable: boolean = true;  // Initially show the table section
display_names: { [key: string]: string } = {
  EMP_CODE: "Employee Code",
  EMP_FIRST_NAME: "First Name",
  EMP_LAST_NAME: "Last Name",
  EMP_GENDER: "Gender",
  EMP_DATE_OF_BIRTH: "Date of Birth",
  EMP_PERSONAL_EMAIL: "Email",
  EMP_MOBILE_NUMBER_1: "Mobile Number",
  EMP_MOBILE_NUMBER_2: "Mobile Number2",
  EMP_COUNTRY_ID: "Country",
  EMP_STATE_ID: "State",
  EMP_CITY: "City",
  EMP_PERMENENT_ADDRESS: "Permanent Address",
  EMP_PRESENT_ADDRESS: "Present Address",
  EMP_STATUS: "Status",
  EMP_HIRED_DATE: "Hired Date",
  EMP_ACTIVE_DATE: "Active Date",
  EMP_RELEGION: "Religion",
  EMP_BLOOD_GROUP: "Blood Group",
  EMP_NATIONALITY_ID: "Nationality",
  EMP_MARITAL_STATUS: "Marital Status",
  EMP_FATHER_NAME: "Father Name",
  EMP_MOTHER_NAME: "Mother Name",
  EMP_POSTING_LOCATION: "Posting Location",
  IS_ACTIVE: "Active",
  EPM_OT_APPLICABLE: "OT Applicable",
  EMP_COMPANY_ID: "Company",
  EMP_BRANCH_ID: "Branch",
  EMP_DEPT_ID: "Department",
  EMP_DESGNTN_ID: "Designation",
  EMP_CTGRY_ID: "Category",
  DATE: "Date",
  SDD: "SDD",
  ZIPCODE: "Zipcode"
};


 
   dragSource: 'thead' | 'tbody' | null = null;
 
  //  dataSource = new MatTableDataSource<any>();
 
  dataSource = new MatTableDataSource<any>(this.filteredData);
  constructor(
    public dialogRef: MatDialogRef<LeaveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private excelService: ApiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    this.jsonDatas = data.jsonDatas;
    this.originalData = [...this.jsonDatas]; // Copy original data
    this.reportId = data.reportId;
    this.filteredData = [...this.jsonDatas]; // Initialize filteredData here
    this.dataSource = new MatTableDataSource(this.filteredData); // Initialize dataSource
  }
  
 
   ngOnInit() {
     this.initializeFields();
    //  this.dataSource = new MatTableDataSource(this.data);
    //  this.dataSource.sort = this.sort;
    //  this.dataSource = new MatTableDataSource(this.groupedData);
 
     // this.dataSource.sort = this.sort; // Connect sorting to MatTableDataSource
     // this.dataSource = new MatTableDataSource<any>(this.filteredData);
 
     const dialogConfig = new MatDialogConfig();
     dialogConfig.width = '80%';
     dialogConfig.height = '80%';
     this.dialogRef.updateSize(dialogConfig.width, dialogConfig.height);
     this.displayedColumns = this.tableHeaders;
   }
 
   // initializeFields(): void {
   //   this.tableHeaders.forEach(header => {
   //     this.selectedFields[header] = []; // Initialize with empty arrays
   //   });
   // }
  
   getSelectedFieldsDisplayNames(): string {
    return this.selectedGroupFields
      .map(field => this.display_names[field.toUpperCase()] || field.toUpperCase())
      .join(', ');
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  
  
  

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.active} ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  
  //  ngAfterViewInit() {
  //    // Check if MatSort is initialized
  //    this.dataSource.sort = this.sort; 
 
  //    if (!this.sort) {
  //      console.error('MatSort directive is not initialized.');
  //    }
  //  }
   showTableSection(): void {
     // Logic to show the table section
     this.showTable = true;
   }
   groupData(): void {
    if (this.selectedGroupFields.length === 0) {
      this.groupedData = [...this.filteredData];
    } else {
      this.groupedData = this.groupByFields(this.filteredData, this.selectedGroupFields);
      this.groupedData = this.groupedData.reduce((acc, group) => {
        acc.push(group);
        acc.push(...group.__rows);
        return acc;
      }, []);
    }
    this.dataSource.data = this.groupedData; // Update data source
    this.dataSource.sort = this.sort; // Reapply sorting
  }
  
   exportToExcelvalue(): void {
     const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.filteredData);
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
     const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
     this.saveExcelFile(excelBuffer, 'exported-data');
   }
 
   saveExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
     saveAs(data, fileName + '.xlsx');
   }
 
  //  sortGroupedData() {
  //    // Ensure MatSort is initialized
  //    if (!this.sort) {
  //      console.error('MatSort directive is not initialized.');
  //      return;
  //    }
   
  //    // Apply sorting to groupedData based on MatSort
  //    if (this.sort.active && this.sort.direction !== '') {
  //      this.groupedData.sort((a, b) => {
  //        const isAsc = this.sort.direction === 'asc';
   
  //        // Handle sorting by multiple fields
  //        for (const sortField of this.selectedSortFields) {
  //          const comparison = this.comparevalue(a[sortField], b[sortField], isAsc);
  //          if (comparison !== 0) {
  //            return comparison;
  //          }
  //        }
   
  //        return 0; // If all fields are equal
  //      });
  //    }
  //  }
   
   
  //  comparevalue(a: any, b: any, isAsc: boolean): number {
  //    if (typeof a === 'boolean' && typeof b === 'boolean') {
  //      // If comparing boolean values
  //      const aValue = a ? 1 : 0;
  //      const bValue = b ? 1 : 0;
  //      return (aValue - bValue) * (isAsc ? 1 : -1);
  //    } else {
  //      // Normal comparison for other types
  //      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  //    }
  //  }
   
   
   
   
 
   groupByFields(data: any[], fields: string[]): any[] {
     const grouped = data.reduce((acc, currentValue) => {
       const groupKey = fields.map(field => currentValue[field]).join('|');
       if (!acc[groupKey]) {
         acc[groupKey] = [];
       }
       acc[groupKey].push(currentValue);
       return acc;
     }, {});
   
     const result = [];
     for (const key in grouped) {
       const group = grouped[key];
       result.push({ __group: key, __rows: group });
     }
   
     return result;
   }
   
 
   openDialog() {
     const dialogConfig = new MatDialogConfig();
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     dialogConfig.width = '80%';
     dialogConfig.height = '80%';
     this.dialog.open(LeaveDialogComponent, dialogConfig);
   }
 
   toggleSelection(key: string, rowIndex: number): void {
    const entry = this.jsonDatas.find(entry => entry.key === key);
    if (entry && entry.values && entry.values[0].values[rowIndex]) {
      let selectedValue = entry.values[0].values[rowIndex];
      if (typeof selectedValue === 'string') {
        selectedValue = { value: selectedValue, checked: false };
      }
      if (typeof selectedValue === 'object' && !Array.isArray(selectedValue)) {
        selectedValue.checked = !selectedValue.checked;
        if (selectedValue.checked) {
          if (!this.selectedFields[key]) {
            this.selectedFields[key] = [];
          }
          this.selectedFields[key].push(selectedValue.value);
        } else {
          const index = this.selectedFields[key].indexOf(selectedValue.value);
          if (index !== -1) {
            this.selectedFields[key].splice(index, 1);
          }
        }
      }
    }
  }
   toggleAllSelection(key: string, checked: boolean): void {
     const entry = this.jsonDatas.find(entry => entry.key === key);
     if (entry) {
       entry.values[0].values.forEach((value: any) => {
         if (typeof value === 'string') {
           value = { value: value, checked: checked };
         } else {
           value.checked = checked;
         }
 
         if (checked) {
           if (!this.selectedFields[key]) {
             this.selectedFields[key] = [];
           }
           if (!this.selectedFields[key].includes(value.value)) {
             this.selectedFields[key].push(value.value);
           }
         } else {
           const index = this.selectedFields[key].indexOf(value.value);
           if (index !== -1) {
             this.selectedFields[key].splice(index, 1);
           }
         }
       });
     }
   }
   get tableHeaders(): string[] {
    if (this.filteredData.length === 0) {
      return [];
    }
    return Object.keys(this.filteredData[0]);
  }
 
   onDragStart(event: DragEvent, source: 'thead' | 'tbody'): void {
     this.dragSource = source;
     event.dataTransfer?.setData('text', ''); // Clear dataTransfer for simplicity
   }
 
   onDragOver(event: DragEvent): void {
     event.preventDefault();
   }
 
   onDrop(event: DragEvent, target: 'thead' | 'tbody'): void {
     if (this.dragSource === 'thead' && target === 'tbody') {
       console.log('Dropped from thead to tbody');
     } else if (this.dragSource === 'tbody' && target === 'thead') {
       console.log('Dropped from tbody to thead');
     }
     event.preventDefault();
   }
 
   
 
   
   postSelectedFields(): void {
 
    
     this.groupfalse = true;
     this.displaygroup = false;
     const reportId = this.reportId;
     if (!reportId) {
       console.error('Report ID is missing or invalid:', reportId);
       return;
     }
     const selectedSchema = localStorage.getItem('selectedSchema');
     if (!selectedSchema) {
       console.error('No schema selected.');
     }
   
     const url = `http://${selectedSchema}.localhost:8000/calendars/api/leave-report/general_filter_report/`;
     const formData = new FormData();
     formData.append('report_id', reportId.toString());
 
     Object.keys(this.selectedFields).forEach(key => {
       this.selectedFields[key].forEach(value => {
         formData.append(key, value);
       });
     });
 
     this.http.post<any>(url, formData).subscribe(
       response => {
         console.log('Filter applied successfully:', response);
         if (response.filtered_data) {
           this.filteredData = response.filtered_data;
           this.snackBar.open('Filter applied successfully', 'OK', {
             duration: 3000,
             verticalPosition: 'top',
             horizontalPosition: 'center'
           });
           this.groupData();
         } else {
           this.groupedData = [];
           this.filteredData = [];
         }
       },
       error => {
         console.error('Error applying filter:', error);
       }
     );
   }
   
 
 
  //  sortGroupedDatas(): void {
  //    // Check if `sort` is defined
  //    if (!this.sort) {
  //      console.error('Sort is not defined.');
  //      return;
  //    }
   
  //    // Apply sorting to groupedData based on MatSort
  //    if (this.sort.active && this.sort.direction !== '') {
  //      this.groupedData.sort((a, b) => {
  //        const isAsc = this.sort.direction === 'asc';
  //        return this.compares(a[this.sort.active], b[this.sort.active], isAsc);
  //      });
  //    }
  //  }
 
  //  compares(a: any, b: any, isAsc: boolean): number {
  //    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  //  }
   
   groupByFieldss(data: any[], fields: string[]): any[] {
     // Implementation for grouping data by fields
     // Placeholder function; implement according to your requirements
     return data; // Modify this to return grouped data
   }
  
 
   searchByKey(key: string, searchText: string): void {
     this.searchText[key] = searchText.toLowerCase();
     this.jsonDatas = this.originalData.map(entry => {
       const filteredValues = entry.values[0].values.filter((value: any) => {
         const textToSearch = typeof value === 'object' && value !== null ? value.value || '' : value || '';
         return textToSearch.toString().toLowerCase().includes(this.searchText[key]);
       });
       return {
         ...entry,
         values: [{ values: filteredValues }]
       };
     });
   }
 
   clearSearchText(key: string): void {
     this.searchText[key] = '';
     this.jsonDatas = [...this.originalData];
   }
 
   getMaxRowLength(): number[] {
     let maxLength = 0;
     this.jsonDatas.forEach(entry => {
       const length = entry.values[0].values.length;
       if (length > maxLength) {
         maxLength = length;
       }
     });
     return Array(maxLength).fill(0).map((_, i) => i);
   }
 
   isChecked(key: string, rowIndex: number): boolean {
     const entry = this.jsonDatas.find(entry => entry.key === key);
     if (entry && entry.values && entry.values[0].values[rowIndex]) {
       const value = entry.values[0].values[rowIndex];
       return typeof value === 'object' ? value.checked : false;
     }
     return false;
   }
 
   onNoClick(): void {
     this.showTable = false;
 
     this.dialogRef.close();
     this.snackBar.open('Dialog closed', 'OK', {
       duration: 3000,
       verticalPosition: 'top',
       horizontalPosition: 'center'
     });
   }
  //  downloadGroupedData() {
  //    const csvData = this.convertToCSV(this.groupedData, this.tableHeaders);
  //    const blob = new Blob([csvData], { type: 'text/csv' });
  //    const url = window.URL.createObjectURL(blob);
  //    const a = document.createElement('a');
  //    a.setAttribute('style', 'display: none');
  //    a.href = url;
  //    a.download = 'grouped_data.csv';
  //    document.body.appendChild(a);
  //    a.click();
  //    window.URL.revokeObjectURL(url);
  //    a.remove();
  //  }
  //  convertToCSV(data: any[], headers: string[]): string {
  //    const csvRows = [];
  //    const headerRow = headers.join(',');
  //    csvRows.push(headerRow);
   
  //    data.forEach(row => {
  //      if (row.__group) {
  //        // Format grouped row with bold text for each part
  //        csvRows.push(`${row.__group.split('|').join('\n')}\n`);
  //        // Check if __rows exists and is an array
  //        if (Array.isArray(row.__rows)) {
  //          row.__rows.forEach((innerRow :any)=> {
  //            const values = headers.map(header => `"${innerRow[header]}"`);
  //            csvRows.push(values.join(','));
  //          });
  //        }
  //      } else {
  //        // Format regular row
  //        const values = headers.map(header => `"${row[header]}"`);
  //        csvRows.push(values.join(','));
  //      }
  //    });
   
  //    return csvRows.join('\n');
  //  }
   
 

  downloadGroupedData(): void {
    if (!this.groupedData || this.groupedData.length === 0) {
      this.snackBar.open('No grouped data to download.', 'Error', {
        duration: 3000,
      });
      console.error('No grouped data to download.');
      return;
    }
  
    try {
      // Define headers and display names
      const displayNames: { [key: string]: string } = {
        emp_code: 'Employee Code',
        emp_first_name: 'First Name',
        emp_last_name: 'Last Name',
        emp_gender: 'Gender',
        emp_date_of_birth: 'Date of Birth',
        emp_personal_email: 'Email',
        emp_mobile_number_1: 'Mobile Number',
        emp_mobile_number_2: 'Mobile Number 2',
        emp_country_id: 'Country',
        emp_state_id: 'State',
        emp_city: 'City',
        emp_permenent_address: 'Permanent Address',
        emp_present_address: 'Present Address',
        emp_status: 'Status',
        emp_hired_date: 'Hired Date',
        emp_active_date: 'Active Date',
        emp_relegion: 'Religion',
        emp_blood_group: 'Blood Group',
        emp_nationality_id: 'Nationality',
        emp_marital_status: 'Marital Status',
        emp_father_name: 'Father Name',
        emp_mother_name: 'Mother Name',
        emp_posting_location: 'Posting Location',
        is_active: 'Active',
        epm_ot_applicable: 'OT Applicable',
        emp_company_id: 'Company ID',
        emp_branch_id: 'Branch ID',
        emp_dept_id: 'Department ID',
        emp_desgntn_id: 'Designation ID',
        emp_ctgry_id: 'Category ID',
        date: 'Date',
        sdd: 'SDD',
        zipcode: 'Zipcode'
      };
  
      // Convert grouped data to Excel-compatible format
      const worksheetData: any[][] = [];
      const title = 'Employee Master Custom Report';
      worksheetData.push([title]);
  
      // Add headers row
      const headers = this.tableHeaders.map(header => displayNames[header] || header);
      worksheetData.push(headers);
  
      this.groupedData.forEach(row => {
        if (row.__group) {
          worksheetData.push([row.__group.split('|').join(' '), '', '', '']); // Adjust number of empty cells as needed
          if (Array.isArray(row.__rows)) {
            row.__rows.forEach((innerRow: any) => {
              const values = this.tableHeaders.map(header => innerRow[header]);
              worksheetData.push(values);
            });
          }
        } else {
          const values = this.tableHeaders.map(header => row[header]);
          worksheetData.push(values);
        }
      });
  
      // Create worksheet from AoA
      const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(worksheetData);
  
      // Merge title cell
      worksheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } }];
  
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
      this.saveAsExcelFile(excelBuffer, 'grouped_data');
      this.snackBar.open('Grouped data downloaded successfully.', 'Success', {
        duration: 3000,
      });
    } catch (error) {
      this.snackBar.open('Failed to download grouped data.', 'Error', {
        duration: 3000,
      });
      console.error('Failed to download grouped data:', error);
    }
  }
  
  // Helper function to save Excel file
  private saveAsExcelFile(buffer: any, fileName: string): void {
    try {
      const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
      const a: HTMLAnchorElement = document.createElement('a');
      document.body.appendChild(a);
      a.href = window.URL.createObjectURL(data);
      a.download = fileName + '.xlsx';
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to save Excel file:', error);
      this.snackBar.open('Failed to save Excel file.', 'Error', {
        duration: 3000,
      });
    }
  
  }
   
   
   // Ensure displayedColumns is updated whenever tableHeaders changes
 initializeFields(): void {
   this.tableHeaders.forEach(header => {
     this.selectedFields[header] = [];
   });
   this.displayedColumns = [...this.tableHeaders];
 }
 
 // Function to update displayedColumns based on selected fields or other criteria
 updateDisplayedColumns(): void {
   this.displayedColumns = [...this.tableHeaders]; // Adjust based on your specific logic
 }
 
   
//  sortData(sort: Sort) {
//   const data = this.dataSource.data.slice();
//   if (!sort.active || sort.direction === '') {
//     this.dataSource.data = data;
//     return;
//   }

//   this.dataSource.data = data.sort((a, b) => {
//     const isAsc = sort.direction === 'asc';
//     return this.compare(a[sort.active], b[sort.active], isAsc);
//   });
// }

compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
}


