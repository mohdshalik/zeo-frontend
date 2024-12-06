import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IdleService {

  private timeout: ReturnType<typeof setTimeout> | undefined;
  private readonly IDLE_TIME = 30 * 60 * 1000; // 30 minutes

  constructor(private router: Router) {
    this.resetTimer();
    this.initListener();
  }

  private initListener() {
    window.addEventListener('mousemove', () => this.resetTimer());
    window.addEventListener('keydown', () => this.resetTimer());
  }

  private resetTimer() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.handleTimeout(), this.IDLE_TIME);
  }

  private handleTimeout() {
    alert('Session expired due to inactivity. You will be redirected to the login page.');
    this.router.navigate(['/login']);
  }
}
