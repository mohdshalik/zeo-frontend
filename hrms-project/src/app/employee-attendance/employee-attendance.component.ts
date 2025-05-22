import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { SessionService } from '../login/session.service';
import { LeaveService } from '../leave-master/leave.service';
import { DesignationService } from '../designation-master/designation.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrl: './employee-attendance.component.css'
})
export class EmployeeAttendanceComponent {


  attendanceSummary: any[] = [];

  allAttendanceData: any[] = []; // All employees attendance

  Employees: any[] = [];

  year: any = '';
  month: any = '';

  employee_id: any = '';


  hasAddPermission: boolean = false;
  hasDeletePermission: boolean = false;
  hasViewPermission: boolean = false;
  hasEditPermission: boolean = false;

  userId: number | null | undefined;
  userDetails: any;
  userDetailss: any;
  schemas: string[] = []; // Array to store schema names

  daysArray: number[] = [];



  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private leaveService: LeaveService,
    private DesignationService: DesignationService,

  ) { }

  ngOnInit(): void {

    this.daysArray = Array.from({ length: 31 }, (_, i) => i + 1);

    const selectedSchema = this.authService.getSelectedSchema();
    if (selectedSchema) {


      this.LoadEmployee(selectedSchema);

      this.loadAllAttendance(selectedSchema); // Load all on init


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


                    this.hasAddPermission = this.checkGroupPermission('add_employee_leave_request', groupPermissions);
                    console.log('Has add permission:', this.hasAddPermission);

                    this.hasEditPermission = this.checkGroupPermission('change_employee_leave_request', groupPermissions);
                    console.log('Has edit permission:', this.hasEditPermission);

                    this.hasDeletePermission = this.checkGroupPermission('delete_employee_leave_request', groupPermissions);
                    console.log('Has delete permission:', this.hasDeletePermission);


                    this.hasViewPermission = this.checkGroupPermission('view_employee_leave_request', groupPermissions);
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

      // this.fetchingApprovals();


      this.authService.getUserSchema(this.userId).subscribe(
        (userData: any) => {
          this.userDetailss = userData;
          this.schemas = userData.map((schema: any) => schema.schema_name);
          console.log('scehmas-de', userData)
        },
        (error) => {
          console.error('Failed to fetch user schemas:', error);
        }
      );
    } else {
      console.error('User ID is null.');
    }


  }



  exportToExcel(): void {
    const data: any[][] = [];
  
    const reportTitle = `Attendance Report - ${this.attendanceData.month} /${this.attendanceData.year}`;
    const headerRow = ['Employee Name', ...this.daysArray, 'Present Days', 'Absent Days'];
    const titleRow = [reportTitle];
  
    data.push(titleRow);
    data.push([]); // spacing row
    data.push(headerRow);
  
    const employeeRow: any[] = [this.attendanceData.employee_name];
    for (let day of this.daysArray) {
      const status = this.getStatusForDay(day, this.attendanceData.summary_data);
      employeeRow.push(status);
    }
    employeeRow.push(this.attendanceData.total_present);
    employeeRow.push(this.attendanceData.total_absent);
    data.push(employeeRow);
  
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
  
    // Merge title row
    const mergeRef = XLSX.utils.encode_range({
      s: { r: 0, c: 0 },
      e: { r: 0, c: headerRow.length - 1 }
    });
    if (!worksheet['!merges']) worksheet['!merges'] = [];
    worksheet['!merges'].push(XLSX.utils.decode_range(mergeRef));
  
    // Apply center style to merged title
    worksheet['A1'].s = {
      alignment: { horizontal: 'center', vertical: 'center' },
      font: { bold: true, sz: 14 }
    };
  
    // Apply styles to "Absent" or "A" cells
    const dataRowIndex = 3; // since it's the 4th row (0-indexed)
    for (let col = 1; col <= this.daysArray.length; col++) {
      const cellRef = XLSX.utils.encode_cell({ r: dataRowIndex, c: col });
      const cell = worksheet[cellRef];
      if (cell && (cell.v === 'Absent' || cell.v === 'A')) {
        cell.s = {
          font: { color: { rgb: "FF0000" }, bold: true },
          alignment: { horizontal: "center" }
        };
      }
    }
  
    // Create workbook and save
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Attendance Report': worksheet },
      SheetNames: ['Attendance Report']
    };
  
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
      cellStyles: true // Important for styles to apply
    });
  
    const fileData: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });
  
    FileSaver.saveAs(
      fileData,
      `Attendance_Report_${this.attendanceData.employee_name}_${this.attendanceData.month}_${this.attendanceData.year}.xlsx`
    );
  }
  

  getStatusForDay(day: number, summary_data: any[]): string {
    const entry = summary_data.find((d: { date: string }) => {
      const dateObj = new Date(d.date);
      return dateObj.getDate() === day;
    });
    return entry ? this.getShortStatus(entry.status) : '-';
  }
  

  getShortStatus(status: string): string {
    switch (status.toLowerCase()) {
      case 'present': return 'P';
      case 'absent': return 'A';
      case 'leave': return 'L';
      case 'holiday': return 'H';

      default: return status;
    }
  }
  
  checkGroupPermission(codeName: string, groupPermissions: any[]): boolean {
    return groupPermissions.some(permission => permission.codename === codeName);
  }



  LoadEmployee(selectedSchema: string): void {
    this.leaveService.getEmployee(selectedSchema).subscribe(
      (data: any) => {
        // Filter only approved leave requests
        this.Employees = data;

        console.log('Approved leave requests:', this.Employees);
      },
      (error: any) => {
        console.error('Error fetching leave requests:', error);
      }
    );
  }


  loadAllAttendance(schema: string): void {
    this.leaveService.getAllAttendance(schema).subscribe(
      (data) => {
        this.allAttendanceData = data;
      },
      (error) => {
        console.error('Error loading all attendance', error);
      }
    );
  }




  // generateAttendanceReport(): void {
  //   if (!this.year || !this.month || !this.employee) {
  //     alert('Please select year, month, and employee.');
  //     return;
  //   }

  //   const payload = {
  //     year: this.year,
  //     month: this.month,
  //     employee: this.employee
  //   };

  //   this.leaveService.generateAttendanceReport(this.selectedSchema, payload).subscribe(
  //     (response: any) => {
  //       this.attendanceData = response;
  //       console.log('Attendance Report:', response);
  //     },
  //     (error) => {
  //       console.error('Error fetching attendance report:', error);
  //     }
  //   );
  // }


  attendanceData: any = null; // Define this at the class level


generateAttendanceReport(): void {
    if (!this.year || !this.month || !this.employee_id) {
      alert('Please enter Year, Month, and Employee');
      return;
    }

    const formData = new FormData();
    formData.append('year', this.year.toString());
    formData.append('month', this.month.toString());
    formData.append('employee_id', this.employee_id.toString());

    this.leaveService.CreateEmployeeattendance(formData).subscribe(
      (response) => {
        console.log('Report data received', response);
        this.attendanceData = response[0]; // Assuming response is an array as shown in your backend example
      },
      (error) => {
        console.error('Error generating report', error);
        alert('Failed to generate report. Please try again.');
      }
    );
  }


}


