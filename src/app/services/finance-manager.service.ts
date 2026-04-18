import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceManagerService {

  private apiUrl = 'https://localhost:7002/api/FinanceManager';

  constructor(private http: HttpClient) {}

  createFull(data: any) {
    return this.http.post(`${this.apiUrl}/create-full`, data);
  }
    getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getall(id: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/view/${id}`);
}
update(id: number, data: any) {
  return this.http.put(`${this.apiUrl}/edit/${id}`, data);
}

getById(id: number) {
  return this.http.get(`${this.apiUrl}/edit/${id}`);
}
}