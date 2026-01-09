import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginDeactivateGuard implements CanDeactivate<any> {

 canDeactivate(): boolean {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  }
  return confirm('You have unsaved changes. Leave?');
}

}
