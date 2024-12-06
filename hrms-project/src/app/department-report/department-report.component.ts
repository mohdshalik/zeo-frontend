import { Component, OnInit } from '@angular/core';
import { DepartmentService } from './department.service';
import * as XLSX from 'xlsx';
import * as fileSaver from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-department-report',
  templateUrl: './department-report.component.html',
  styleUrl: './department-report.component.css'
})
export class DepartmentReportComponent  implements OnInit  {

  departmentData: any[] = []; // Initialize as an empty array
  displayedColumns: string[] = ['Department Name', 'Department Code', 'Description', 'Active'];
  cardOpen = false;

  constructor(private departmentService: DepartmentService,
    private snackBar: MatSnackBar
  ) { }

  displayNames: { [key: string]: string } = {
    'Department Name': 'Department Name',
    'Department Code': 'Department Code',
    Description: 'Description',
    Active: 'Active'
  };

  ngOnInit(): void {
    this.getDepartmentReport();
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
