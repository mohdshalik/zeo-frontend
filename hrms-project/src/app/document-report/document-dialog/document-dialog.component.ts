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
import { environment } from '../../../environments/environment';

interface DocumentItem {
  emp_doc_expiry_date: string; // Adjust the type if it's not a string
  // Add other fields if necessary
}

@Component({
  selector: 'app-document-dialog',
  templateUrl: './document-dialog.component.html',
  styleUrl: './document-dialog.component.css'
})


export class DocumentDialogComponent implements OnInit, AfterViewInit  {

  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local

  // export class ReportDialogComponent implements AfterViewInit {

  // dataSource = new MatTableDataSource<any>(); // Initialize data source for table
  selectedValues: { [key: string]: any[] } = {};
  commonData: any[] = []; // Add this property

  jsonDatas: any[] = [];
  selectedFields: { [key: string]: any[] } = {};
  @Input() reportId: number | null;
  searchText: { [key: string]: string } = {};
  filteredData: any[] = [];
  originalData: any[] = [];
  displayedColumns: string[] = [];
  filteredReportContent: any[] = [];
  selectedGroupFields: string[] = [];
  groupedData: any[] = [];
 groupfalse: boolean = false;
 selectedSortFields: string[] = []; // Define selectedSortFields here
displaygroup: boolean = true;
showTable: boolean = true;  // Initially show the table section
display_names: { [key: string]: string } = {
  // emp_first_name: "First Name",
  // emp_active_date: "Active Date",
  // emp_branch_id: "Branch",
  // emp_dept_id: "Department",
  // emp_desgntn_id: "Designation",
  // emp_ctgry_id: "Category",
  // emp_id:"Emp Id",
  // emp_doc_type:"Doc Type",
  // emp_doc_number:" Doc Number",
  // emp_doc_issued_date:"Issue Date",
  // emp_doc_expiry_date:"Expiry Date"

 EMP_FIRST_NAME: "First Name",
 EMP_ACTIVE_DATE: "Active Date",
 EMP_BRANCH_ID: "Branch",
 EMP_DEPT_ID: "Department",
 EMP_DESGNTN_ID: "Designation",
 EMP_CTGRY_ID: "Category",
 IS_ACTIVE: "Active",
EMP_ID:"Emp Id",
DOCUMENT_TYPE:"Document Type",
EMP_DOC_NUMBER:"Doc Number",
EMP_DOC_ISSUED_DATE:"Issue Date",
EMP_DOC_EXPIRY_DATE:"Expiry Date",
// DOCUMENT_TYPE:"Document Type"
};



  dragSource: 'thead' | 'tbody' | null = null;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<any>;

  // dataSource = new MatTableDataSource<any>(this.filteredData);

  constructor(
    public dialogRef: MatDialogRef<DocumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private excelService: ApiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer

  ) {
    // this.jsonDatas = data.jsonDatas;
    // this.originalData = [...this.jsonDatas]; // Copy original data
    this.reportId = data.reportId;
    this.dataSource = new MatTableDataSource<any>();
  
  }

  // ngOnInit() {
  //   this.initializeFields();
  //   this.filteredReportContent = this.data.filteredReportContent || [];
  //   this.filteredReportContent = this.filteredReportContent.filter((item: any) => {
  //     const today = new Date();
  //     const currentYear = today.getFullYear();
  //     const currentMonth = today.getMonth() + 1; // Months are 0-based
  //     const currentDay = today.getDate();
    
  //     const expiryDate = new Date(item.emp_doc_expiry_date);
  //     const expiryYear = expiryDate.getFullYear();
  //     const expiryMonth = expiryDate.getMonth() + 1; // Months are 0-based
  //     const expiryDay = expiryDate.getDate();
    
  //     return expiryYear >= currentYear && expiryMonth >= currentMonth && expiryDay >= currentDay;
  //   });
  //   this.jsonDatas = this.data.jsonDatas || [];
  //   this.dataSource = new MatTableDataSource(this.data);
  //   this.dataSource.sort = this.sort;
  //   this.dataSource = new MatTableDataSource(this.groupedData);
  //   console.log('Filtered Report Content:', this.filteredReportContent);
  //   console.log('Displayed Columns:', this.displayedColumns);
  //   console.log('JSON Data:', this.jsonDatas);
  //   console.log('Unique Values:', this.data.uniqueValues);

  //   this.dataSource.sort = this.sort; // Connect sorting to MatTableDataSource
  //   this.dataSource = new MatTableDataSource<any>(this.filteredData);
  //   this.filteredReportContent = this.data.filteredReportContent || [];
  //   this.jsonDatas = this.data.jsonDatas || [];
  //   this.dataSource = new MatTableDataSource(this.filteredReportContent); // Update with initial data
  //   this.dataSource.sort = this.sort;
  //   this.displayedColumns = this.tableHeaders;
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.width = '80%';
  //   dialogConfig.height = '80%';
  //   this.dialogRef.updateSize(dialogConfig.width, dialogConfig.height);
  //   this.displayedColumns = this.tableHeaders;
  //   this.filteredData = this.data.filteredData || [];
  //   this.updateTableHeaders();
  // }

  // initializeFields(): void {
  //   this.tableHeaders.forEach(header => {
  //     this.selectedFields[header] = []; // Initialize with empty arrays
  //   });
  // }

  ngOnInit() {
    this.initializeFields();
    this.filteredReportContent = this.data.filteredReportContent || [];
    this.filteredData = this.filteredReportContent;
    this.jsonDatas = this.data.jsonDatas || [];
    this.dataSource = new MatTableDataSource(this.filteredData);
    this.dataSource.sort = this.sort;
    this.displayedColumns = this.tableHeaders;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    this.dialogRef.updateSize(dialogConfig.width, dialogConfig.height);
    this.displayedColumns = this.tableHeaders;
    this.updateTableHeaders();
  
    // Group and sort the filteredData
    this.groupData();
    this.sortGroupedData();
  }
  

  hasKey(obj: any): any {
    return Object.keys(obj).filter(key => obj[key] !== null && obj[key] !== undefined);
  }
  getSelectedFieldsDisplayNames(): string {
    return Object.keys(this.selectedFields)
      .map(field => this.display_names[field.toUpperCase()] || field.toUpperCase())
      .join(', ');
  }
 
 ngAfterViewInit() {
  this.dataSource.sort = this.sort;
  this.sortGroupedData();


}


announceSortChange(sortState: Sort) {
  if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.active} ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
}
  showTableSection(): void {
    // Logic to show the table section
    this.showTable = true;
  }
//  groupData(): void {
//     this.groupedData = this.filteredReportContent;  // Placeholder logic
  
//     if (this.selectedGroupFields.length === 0) {
//       this.groupedData = [...this.filteredReportContent];
//     } else {
//       this.groupedData = this.groupByFields(this.filteredReportContent, this.selectedGroupFields);
//     }
  
//     // Flatten grouped data for sorting
//     this.groupedData = this.groupedData.reduce((acc, group) => {
//       acc.push(group);
//       acc.push(...group.__rows);
//       return acc;
//     }, []);
  
//     // Sort groupedData
//     this.sortGroupedData();
  
//     // Update data source
//     this.dataSource.data = this.groupedData;
//     this.dataSource.sort = this.sort; // Reapply sorting
//   } 
groupData(): void {
  this.groupedData = this.filteredData; // Placeholder logic

  if (this.selectedGroupFields.length === 0) {
    this.groupedData = [...this.filteredData];
  } else {
    this.groupedData = this.groupByFields(this.filteredData, this.selectedGroupFields);
  }

  // Flatten grouped data for sorting
  this.groupedData = this.groupedData.reduce((acc, group) => {
    acc.push(group);
    acc.push(...group.__rows);
    return acc;
  }, []);

  // Update data source
  this.dataSource.data = this.groupedData;
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

  sortGroupedData(): void {
    if (!this.sort) {
      console.error('MatSort directive is not initialized.');
      return;
    }
  
    if (this.sort.active && this.sort.direction !== '') {
      this.filteredData.sort((a, b) => {
        const isAsc = this.sort.direction === 'asc';
        return this.compare(a[this.sort.active], b[this.sort.active], isAsc);
      });
    }
  }
  
  // sortGroupedData(): void {
  //   if (!this.sort) {
  //     console.error('MatSort directive is not initialized.');
  //     return;
  //   }
  
  //   if (this.sort.active && this.sort.direction !== '') {
  //     this.groupedData.sort((a, b) => {
  //       const isAsc = this.sort.direction === 'asc';
  //       return this.compare(a[this.sort.active], b[this.sort.active], isAsc);
  //     });
  //   }
  // }
  
  
  
  compare(a: any, b: any, isAsc: boolean): number {
    if (typeof a === 'boolean' && typeof b === 'boolean') {
      // If comparing boolean values
      const aValue = a ? 1 : 0;
      const bValue = b ? 1 : 0;
      return (aValue - bValue) * (isAsc ? 1 : -1);
    } else {
      // Normal comparison for other types
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
  
  
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
  

  // groupByFields(data: any[], fields: string[]): any[] {
  //   const grouped = data.reduce((acc, currentValue) => {
  //     const groupKey = fields.map(field => currentValue[field]).join('|');
  //     if (!acc[groupKey]) {
  //       acc[groupKey] = [];
  //     }
  //     acc[groupKey].push(currentValue);
  //     return acc;
  //   }, {});
  
  //   const result = [];
  //   for (const key in grouped) {
  //     const group = grouped[key];
  //     result.push({ __group: key, __rows: group });
  //   }
  
  //   return result;
  // }
  

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';
    this.dialog.open(DocumentDialogComponent, dialogConfig);
  }

  toggleSelection(key: string, rowIndex: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const checked = inputElement.checked;
  
    const entry = this.jsonDatas.find(e => e.key === key);
    if (entry && entry.values && entry.values.length > rowIndex) {
      let selectedValue = entry.values[rowIndex];
  
      // Convert string values to objects with a `value` and `checked` property
      if (typeof selectedValue === 'string') {
        selectedValue = { value: selectedValue, checked: false };
      }
  
      if (typeof selectedValue === 'object' && !Array.isArray(selectedValue)) {
        // Update the `checked` state based on the event
        selectedValue.checked = checked;
  
        // Update the selectedFields based on the new `checked` state
        if (checked) {
          if (!this.selectedFields[key]) {
            this.selectedFields[key] = [];
          }
          if (!this.selectedFields[key].includes(selectedValue.value)) {
            this.selectedFields[key].push(selectedValue.value);
          }
        } else {
          const index = this.selectedFields[key]?.indexOf(selectedValue.value);
          if (index !== -1) {
            this.selectedFields[key].splice(index, 1);
          }
        }
      } else {
        console.error('Expected an object with `value` and `checked` properties but found:', selectedValue);
      }
    } else {
      console.error('Entry or value at rowIndex not found:', { key, rowIndex, entry });
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
    // Display all headers including non-selected ones
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
      return;
    }
  
    const url = `${this.apiUrl}/employee/api/doc-report/filter_document_report/?schema=${selectedSchema}`;
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
          this.updateTableHeaders();
          this.dataSource.data = this.filteredData;
  
          this.snackBar.open('Filter applied successfully', 'OK', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
  
          // Check if uniqueValues and filteredData are properly set
          if (this.data.uniqueValues && this.data.uniqueValues.emp_doc_expiry_date) {
            const filteredDates = this.filteredData.map((item: any) => item.emp_doc_expiry_date);
            const uniqueDates = this.data.uniqueValues.emp_doc_expiry_date;
            const commonDates = filteredDates.filter(date => uniqueDates.includes(date));
  
            console.log('Common Expiry Dates:', commonDates);
  
            if (commonDates.length > 0) {
              const commonDataPayload = new FormData();
              commonDataPayload.append('report_id', reportId.toString());
              commonDates.forEach(date => commonDataPayload.append('emp_doc_expiry_date', date));
  
              const commonDataUrl = `${this.apiUrl}/employee/api/doc-report/filter_document_report/?schema=${selectedSchema}`;
  
              // this.http.post<any>(commonDataUrl, commonDataPayload).subscribe(
              //   commonResponse => {
              //     console.log('Common data posted successfully:', commonResponse);
              //     this.handleCommonResponse(commonResponse); // Handle second response
              //   },
              //   commonError => {
              //     console.error('Error posting common data:', commonError);
              //   }
              // );
              this.http.post<any>(commonDataUrl, commonDataPayload).subscribe(
                commonResponse => {
                  console.log('Common data posted successfully:', commonResponse);
                  if (commonResponse.filtered_data) {
                    this.filteredData = commonResponse.filtered_data;
                    this.updateTableHeaders();
                    this.dataSource.data = this.filteredData;
              
                    this.snackBar.open('Common data posted successfully', 'OK', {
                      duration: 3000,
                      verticalPosition: 'top',
                      horizontalPosition: 'center'
                    });
                  }
                },
                commonError => {
                  console.error('Error posting common data:', commonError);
                }
              );
            } else {
              this.groupedData = [];
              this.filteredData = [];
              this.updateTableHeaders();
              this.dataSource.data = this.filteredData;
            }
          } else {
            console.error('uniqueValues does not contain emp_doc_expiry_date:', this.data.uniqueValues);
            this.groupedData = [];
            this.filteredData = [];
            this.updateTableHeaders();
            this.dataSource.data = this.filteredData;
          }
        } else {
          this.groupedData = [];
          this.filteredData = [];
          this.updateTableHeaders();
          this.dataSource.data = this.filteredData;
        }
      },
      error => {
        console.error('Error applying filter:', error);
      }
    );
  }
  


  // postSelectedFields(): void {
  //   this.groupfalse = true;
  //   this.displaygroup = false;
  //   const reportId = this.reportId;
  
  //   if (!reportId) {
  //     console.error('Report ID is missing or invalid:', reportId);
  //     return;
  //   }
  
  //   const selectedSchema = localStorage.getItem('selectedSchema');
  //   if (!selectedSchema) {
  //     console.error('No schema selected.');
  //     return;
  //   }
  
  //   const commonDataUrl = `http://${selectedSchema}.localhost:8000/employee/api/doc-report/filter_document_report/`;
  
  //   // Prepare common data payload
  //   const commonDataPayload = new FormData();
  //   commonDataPayload.append('report_id', reportId.toString());
  
  //   if (this.data.uniqueValues && this.data.uniqueValues.emp_doc_expiry_date) {
  //     const filteredDates = this.filteredData.map((item: any) => item.emp_doc_expiry_date);
  //     const uniqueDates = this.data.uniqueValues.emp_doc_expiry_date;
  //     const commonDates = filteredDates.filter(date => uniqueDates.includes(date));
  
  //     console.log('Common Expiry Dates:', commonDates);
  
  //     if (commonDates.length > 0) {
  //       commonDates.forEach(date => commonDataPayload.append('emp_doc_expiry_date', date));
  
  //       this.http.post<any>(commonDataUrl, commonDataPayload).subscribe(
  //         commonResponse => {
  //           console.log('Common data posted successfully:', commonResponse);
  //           if (commonResponse.filtered_data) {
  //             this.filteredData = commonResponse.filtered_data;
  //             this.updateTableHeaders();
  //             this.dataSource.data = this.filteredData;
          
  //             this.snackBar.open('Common data posted successfully', 'OK', {
  //               duration: 3000,
  //               verticalPosition: 'top',
  //               horizontalPosition: 'center'
  //             });
  //           }
  //         },
  //         commonError => {
  //           console.error('Error posting common data:', commonError);
  //         }
  //       );
  //     } else {
  //       this.groupedData = [];
  //       this.filteredData = [];
  //       this.updateTableHeaders();
  //       this.dataSource.data = this.filteredData;
  //     }
  //   } else {
  //     console.error('uniqueValues does not contain emp_doc_expiry_date:', this.data.uniqueValues);
  //     this.groupedData = [];
  //     this.filteredData = [];
  //     this.updateTableHeaders();
  //     this.dataSource.data = this.filteredData;
  //   }
  // }
  
  
  updateTableHeaders(): void {
    if (this.filteredData && this.filteredData.length > 0) {
      this.displayedColumns = Object.keys(this.filteredData[0]);
    } else {
      this.displayedColumns = [];
    }
    this.dataSource.data = this.filteredData;
  }

  // Handle API response
  // handleCommonResponse(commonResponse: any): void {
  //   this.commonData = commonResponse.common_data || [];
  //   this.filteredData = this.commonData; // Update the data source
  //   this.updateTableHeaders();
  //   this.dataSource.data = this.filteredData;
  // }
  
  handleCommonResponse(commonResponse: any): void {
    this.commonData = commonResponse.common_data || [];
    this.filteredData = this.commonData; // Update the filteredData
    this.dataSource = new MatTableDataSource(this.filteredData); // Create a new data source with updated data
  }
  postCommonData(): void {
    // Check if reportId is not null or undefined
    if (this.reportId === null || this.reportId === undefined) {
      console.error('Report ID is not set.');
      return;
    }
  
    // Ensure selectedSchema is defined
    const selectedSchema = 'yourSchema'; // Replace with actual value or logic to get schema
  
    // Construct the URL
    const commonDataUrl = `${this.apiUrl}/employee/api/doc-report/filter_document_report/?schema=${selectedSchema}`;
  
    // Create FormData object and append necessary fields
    const commonDataPayload = new FormData();
    commonDataPayload.append('report_id', this.reportId.toString());
  
    // Send the POST request
    this.http.post<any>(commonDataUrl, commonDataPayload).subscribe(
      commonResponse => {
        console.log('Common data posted successfully:', commonResponse);
        this.handleCommonResponse(commonResponse);
      },
      error => {
        console.error('Error posting common data:', error);
      }
    );
  }
  
  
  sortGroupedDatas(): void {
    // Check if `sort` is defined
    if (!this.sort) {
      console.error('Sort is not defined.');
      return;
    }
  
    // Apply sorting to groupedData based on MatSort
    if (this.sort.active && this.sort.direction !== '') {
      this.groupedData.sort((a, b) => {
        const isAsc = this.sort.direction === 'asc';
        return this.compares(a[this.sort.active], b[this.sort.active], isAsc);
      });
    }
  }

  compares(a: any, b: any, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  
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
      if (entry.values && entry.values.length > maxLength) {
        maxLength = entry.values.length;
      }
    });
    return Array.from({ length: maxLength }, (_, i) => i);
  }
  
  

  isChecked(key: string, index: number): boolean {
    const entry = this.jsonDatas.find(e => e.key === key);
    if (!entry || !entry.values || entry.values.length <= index) {
      return false;
    }
    return this.selectedFields[key]?.includes(entry.values[index]);
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
      emp_first_name: "First Name",
      emp_active_date: "Active Date",
      emp_branch_id: "Branch",
      emp_dept_id: "Department",
      emp_desgntn_id: "Designation",
      emp_ctgry_id: "Category",
      emp_id:"Emp Id",
      // document_type:"Doc Type",
      // emp_doc_type:,
      emp_doc_number:" Doc Number",
      emp_doc_issued_date:"Issue Date",
      emp_doc_expiry_date:"Expiry Date",
      is_active: "Active",
      document_type:"Document Type"
    
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

  updateDisplayedColumns(): void {
    this.displayedColumns = [...this.tableHeaders]; // Adjust based on your specific logic
  }

  
  
sortData(sort: Sort) {
  const data = this.dataSource.data.slice();
  if (!sort.active || sort.direction === '') {
    this.dataSource.data = data;
    return;
  }

  this.dataSource.data = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'emp_code': return compare(a.emp_code, b.emp_code, isAsc);
      case 'emp_first_name': return compare(a.emp_first_name, b.emp_first_name, isAsc);
      case 'emp_last_name': return compare(a.emp_last_name, b.emp_last_name, isAsc);
      case 'emp_gender': return compare(a.emp_gender, b.emp_gender, isAsc);
      case 'emp_date_of_birth': return compare(a.emp_date_of_birth, b.emp_date_of_birth, isAsc);
      default: return 0;
    }
  });
}
}

function compare(a: number | string, b: number | string, isAsc: boolean): number {
return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
  
