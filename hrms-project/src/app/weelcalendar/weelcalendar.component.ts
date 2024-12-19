import { Component } from '@angular/core';
import { CountryService } from '../country.service';
import { AuthenticationService } from '../login/authentication.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-weelcalendar',
  templateUrl: './weelcalendar.component.html',
  styleUrl: './weelcalendar.component.css'
})
export class WeelcalendarComponent {


  private apiUrl = `${environment.apiBaseUrl}`; // Use the correct `apiBaseUrl` for live and local


  registerButtonClicked = false;

  calander_title:any='';
  description:any='';
  calendar_code:any='';
  year:any='';
  monday:any='';
  tuesday:any='';
  wednesday:any='';
  thursday:any='';
  friday:any='';
  saturday:any='';
  sunday:any='';


  calendars: any[] = [];
  selectedCalendar: any;
  yearDays: any[] = [];
  months: any[] = [];

  isEditModalOpen = false;
  editDateDetails: any = {};


  searchQuery: string = '';
  isSearchVisible: boolean = false;  // Add this line


  constructor(
    private countryService: CountryService, 
    private authService: AuthenticationService, 

    private http: HttpClient,
    
  ) {}


  ngOnInit(): void {
    
    this.countryService.getWeekendCalendars().subscribe(data => {
      this.calendars = data;
    });
  }

  // selectCalendar(event: Event): void {
  //   const selectedCalendarId = (event.target as HTMLSelectElement).value;
  //   this.selectedCalendar = this.calendars.find(calendar => calendar.id == selectedCalendarId);
  //   if (this.selectedCalendar) {
  //     this.generateYearDays(this.selectedCalendar.year);
  //   }
  // }

  selectCalendar(event: any): void {
    const selectedId = event.target.value;
    this.selectedCalendar = this.calendars.find(calendar => calendar.id == selectedId);
  }

  filteredDetails(): any[] {
    if (!this.searchQuery) {
      return this.selectedCalendar.details;
    }
  
    const query = this.searchQuery.toLowerCase();
    return this.selectedCalendar.details.filter((detail: { date: string }) => {
      const formattedDate = this.formatDate(detail.date).toLowerCase();
      return formattedDate.includes(query);
    });
  }

  groupDetailsByMonth(): any {
    if (!this.selectedCalendar) return {};

    return this.selectedCalendar.details.reduce((acc: any, detail: any) => {
      const month = this.getMonthName(detail.month_of_year);
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(detail);
      return acc;
    }, {});
  }

  getMonthKeys(): string[] {
    const groupedDetails = this.groupDetailsByMonth();
    return Object.keys(groupedDetails);
  }

  getMonthName(monthIndex: string): string {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    const index = parseInt(monthIndex, 10) - 1;
    return monthNames[index] || "Unknown";
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit'
    };
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', options);
  }

  getDayName(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', options);
  }
  toggleSearchDisplay(): void {
    this.isSearchVisible = !this.isSearchVisible;  // Add this method
  }
  
  // generateYearDays(year: number): void {
  //   this.months = [];
  //   for (let month = 0; month < 12; month++) {
  //     const daysInMonth = new Date(year, month + 1, 0).getDate();
  //     const monthDays = [];
  //     for (let day = 1; day <= daysInMonth; day++) {
  //       const date = new Date(year, month, day);
  //       const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  //       monthDays.push({
  //         date: date,
  //         dayName: dayName,
  //         status: this.selectedCalendar[dayName.toLowerCase()]
  //       });
  //     }
  //     this.months.push({
  //       name: new Date(year, month).toLocaleString('en-US', { month: 'long' }),
  //       days: monthDays
  //     });
  //   }
  // }


  registerweekCalendar(): void {
    this.registerButtonClicked = true;
    const companyData = {
      calander_title: this.calander_title,
    
      description:this.description,
      calendar_code:this.calendar_code,
      year:this.year,
      monday:this.monday,
      tuesday:this.tuesday,
      wednesday:this.wednesday,
      thursday:this.thursday,
      friday:this.friday,
      saturday:this.saturday,
      sunday:this.sunday,

   

      // Add other form field values to the companyData object
    };
  

    this.countryService.registerWeekCalendar(companyData).subscribe(
      (response) => {
        console.log('Registration successful', response);
      
            alert('week calendar has been Added ');
            window.location.reload();
            // window.location.reload();
       

      },
      (error) => {
        console.error('Added failed', error);
        alert('enter all field!')
        // Handle the error appropriately, e.g., show a user-friendly error message.
      }
    );
  }

  openEditModal(detail: any): void {

    
    this.isEditModalOpen = true;
    // Fetch the details for the selected date

    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      // return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
    this.http.get<any>(`${this.apiUrl}/calendars/api/assign-days/${detail.id}/?schema=${selectedSchema}`)
      .subscribe(data => {
        this.editDateDetails = data;
      });
  }


  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editDateDetails = {};
  }

  updateDate(): void {
    // Update the date details in the backend
    const selectedSchema = localStorage.getItem('selectedSchema');
    if (!selectedSchema) {
      console.error('No schema selected.');
      // return throwError('No schema selected.'); // Return an error observable if no schema is selected
    }
   
    this.http.put(`${this.apiUrl}/calendars/api/assign-days/${this.editDateDetails.id}/?schema=${selectedSchema}`, this.editDateDetails)
      .subscribe(() => {
        // Update the local data to reflect the changes
        const updatedDetail = this.selectedCalendar.details.find((detail: any) => detail.id === this.editDateDetails.id);
        if (updatedDetail) {
          updatedDetail.day_type = this.editDateDetails.day_type;
        }
        this.closeEditModal();
        // this.generateMonthWiseData();

      });
  }

  
}
