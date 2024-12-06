import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hrms-project';
  onsubmit() {
    // Add the logic you want to execute when the form is submitted
  }
  data: any = {}; // Assuming data is an object with a userName property

  // Other properties and methods may be present
}
