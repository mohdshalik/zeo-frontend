import { Component, ViewChild } from '@angular/core';
import { CountryService } from '../country.service';
import { AuthenticationService } from '../login/authentication.service';
import { HttpClient } from '@angular/common/http';
import { CatogaryService } from '../catogary-master/catogary.service';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-holiday-calendar',
  templateUrl: './holiday-calendar.component.html',
  styleUrl: './holiday-calendar.component.css'
})
export class HolidayCalendarComponent {

  @ViewChild('select') select: MatSelect | undefined;


  description:any='';
  start_date:any='';
  end_date:any='';
  year:any='';
  calendar_title:any='';

  calendar:any='';


  HolidaysCalendar:any []=[];



  
  restricted: boolean = false;


  allSelected=false;

  registerButtonClicked = false;

  selectedCalendar: any;
  calendars: any[] = [];


  constructor(
    private countryService: CountryService, 
    private authService: AuthenticationService, 
    private categoryService: CatogaryService,

    private http: HttpClient,
  
    
  ) {}



  ngOnInit(): void {
    this.loadholidayCalendar();


    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
  
    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {

    this.countryService.getholidayCalendars(selectedSchema).subscribe(data => {
      this.calendars = data;
    });
  }
    }


    selectCalendar(event: any): void {
      const selectedId = event.target.value;
      this.selectedCalendar = this.calendars.find(calendar => calendar.id == selectedId);
      console.log('cal',this.selectedCalendar)
    }
  

    toggleAllSelection(): void {
      if (this.select) {
        if (this.allSelected) {
          this.select.options.forEach((item: MatOption) => item.select());
        } else {
          this.select.options.forEach((item: MatOption) => item.deselect());
        }
      }
    }

  registerHolidayCalendar(): void {
    this.registerButtonClicked = true;

    if (!this.description || !this.start_date || !this.end_date|| !this.calendar) {
      alert('Please fill out all required fields.');
      return;
    }

    const companyData = {
      description: this.description,
      start_date: this.start_date,
      end_date: this.end_date,
      restricted: this.restricted,
      calendar: this.calendar,
    };

    this.countryService.registerHolidayCalendar(companyData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        alert('Holiday calendar has been added.');
        window.location.reload();
      },
      (error) => {
        console.error('Registration failed', error);
        alert('Registration failed. Please try again.');
      }
    );
  }


  registerHolidayCalendarYear(): void {
    this.registerButtonClicked = true;

    if (!this.year || !this.calendar_title ) {
      alert('Please fill out all required fields.');
      return;
    }

    const companyData = {
      year: this.year,
      calendar_title: this.calendar_title,
      
    
    };

    this.countryService.registerHolidayCalendarYear(companyData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        alert('Holiday calendar has been added.');
        window.location.reload();
      },
      (error) => {
        console.error('Registration failed', error);
        alert('Registration failed. Please try again.');
      }
    );
  }

  loadholidayCalendar(): void {
    
    const selectedSchema = this.authService.getSelectedSchema(); // Assuming you have a method to get the selected schema
  
    console.log('schemastore',selectedSchema )
    // Check if selectedSchema is available
    if (selectedSchema) {
      this.countryService.getholidayCalendars(selectedSchema).subscribe(
        (result: any) => {
          this.HolidaysCalendar = result;
          console.log(' fetching Companies:');
  
        },
        (error) => {
          console.error('Error fetching Companies:', error);
        }
      );
    }
    }


}
