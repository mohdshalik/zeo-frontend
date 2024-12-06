// auth-interceptor.service.ts

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './login/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService,
    private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 403) {
          // Handle unauthorized access here, e.g., re-login or redirect to login page
          console.error('Unauthorized access. Redirecting to login page...');
          alert('Unauthorized access. Redirecting to login page...');
          this.authService.handleSessionExpiration();
          // You may want to clear the user's session or perform other actions
        }
        // alert('Session expired. You will be redirected to the login page.');
        // this.router.navigate(['/login']);
        return throwError(error);
      })
      
    );


    
  }

  
}
