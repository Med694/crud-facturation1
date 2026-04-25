import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private apiUrl = 'https://localhost:7002/api/Admin';

  constructor(private http: HttpClient) {}

  create(data: any) {
    return this.http.post(`${this.apiUrl}/create`, data);
  }
  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }
  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
   // 🔹 GET ADMIN BY ID
  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // 🔹 UPDATE ADMIN
  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  viewAdmin(id: number) {
  return this.http.get(`https://localhost:7002/api/admin/view/${id}`);
}
  
}