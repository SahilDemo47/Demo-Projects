import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDto } from 'src/models/login.model';
import { LoginResponse } from 'src/models/login-response.model';
import { environment } from '../environments/environment.prod';
import { ChangePasswordRequest } from 'src/models/change-password.model';
import { ChangePasswordResponse } from 'src/models/change-password-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(data: LoginDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/User/Login`,
      data
    );
  }

  register(data: any) {
  return this.http.post(
    `${this.baseUrl}/auth/RegisterUser`,
    data,
    { responseType: 'text' }  
  );
}


  saveAuthData(res: LoginResponse) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('userName', res.userName);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.clear();
  }
  changePassword(data: ChangePasswordRequest): Observable<ChangePasswordResponse> {
  return this.http.post<ChangePasswordResponse>(
    `${this.baseUrl}/User/ChangePassword`,
    data
  );
 }
}
