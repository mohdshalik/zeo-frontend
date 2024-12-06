import { Component } from '@angular/core';
import { CountryService } from '../country.service';
import { AuthenticationService } from '../login/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assignweek-calendar-days',
  templateUrl: './assignweek-calendar-days.component.html',
  styleUrl: './assignweek-calendar-days.component.css'
})
export class AssignweekCalendarDaysComponent {

  
  registerButtonClicked = false;

  calander_title:any='';
  description:any='';
  calendar_code:any='';
  year:any='';
  day_type:any='';
  weekday:any='';
  month_of_year:any='';



  // monday:any='';
  // tuesday:any='';
  // wednesday:any='';
  // thursday:any='';
  // friday:any='';
  // saturday:any='';
  // sunday:any='';


  calendars: any[] = [];
  selectedCalendar: any;
  yearDays: any[] = [];
  months: any[] = [];




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


  selectCalendar(event: Event): void {
    const selectedCalendarId = (event.target as HTMLSelectElement).value;
    this.selectedCalendar = this.calendars.find(calendar => calendar.id == selectedCalendarId);
    if (this.selectedCalendar) {
      this.generateYearDays(this.selectedCalendar.year);
    }
  }
  
  generateYearDays(year: number): void {
    this.months = [];
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const monthDays = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        monthDays.push({
          date: date,
          dayName: dayName,
          status: this.selectedCalendar[dayName.toLowerCase()]
        });
      }
      this.months.push({
        name: new Date(year, month).toLocaleString('en-US', { month: 'long' }),
        days: monthDays
      });
       console.log(monthDays);

    }
  }


  registerweekCalendar(): void {
    this.registerButtonClicked = true;
    const companyData = {
      calander_title: this.calander_title,
    
      description:this.description,
      calendar_code:this.calendar_code,
      year:this.year,
      // monday:this.monday,
      // tuesday:this.tuesday,
      // wednesday:this.wednesday,
      // thursday:this.thursday,
      // friday:this.friday,
      // saturday:this.saturday,
      // sunday:this.sunday,

   

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

  

}
