import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import jwt_decode from 'jwt-decode';
import { jwtDecode, JwtHeader } from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private SELECTED_SCHEMA_KEY = 'selectedSchema';

   // Method to set the selected schema
   setSelectedSchema(schema: string): void {
    localStorage.setItem(this.SELECTED_SCHEMA_KEY, schema);
  }

  // Method to get the selected schema
  getSelectedSchema(): string | null {
    return localStorage.getItem(this.SELECTED_SCHEMA_KEY);
  }


  constructor(private authService: AuthenticationService) { }

  getUserId(): number | null {
    
    const token = this.authService.getAuthToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.user_id;
    }
    return null;
  }

  
}
