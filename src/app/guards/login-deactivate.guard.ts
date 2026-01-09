import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginDeactivateGuard implements CanDeactivate<any> {

  canDeactivate(component: any): boolean {
    const token = localStorage.getItem('token');
    console.log('Token in guard:', token);

    if (!token) {
      return confirm('You are not logged in. Do you want to continue?');
    }

    return true;
  }
}
