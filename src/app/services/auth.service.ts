import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7002/api/auth'; // adapte ton URL

  constructor(private http: HttpClient) {}

  register(dto: RegisterDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, dto);
  }

  login(dto: LoginDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, dto);
}
 forgotPassword(email: string){
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  verifyCode(email: string, code: string){
    return this.http.post(`${this.apiUrl}/verify-code?email=${email}&code=${code}`, {});
  }

  resetPassword(email: string, newPassword: string){
    return this.http.post(`${this.apiUrl}/reset-password?email=${email}&newPassword=${newPassword}`, {});
  }
}