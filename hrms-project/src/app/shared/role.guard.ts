import { CanActivate, CanActivateFn } from '@angular/router';

export class roleGuard implements CanActivate  {

  constructor(){}
  
  canActivate() {

    return true;
    
  }
  
 
};
