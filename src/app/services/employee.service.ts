import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://localhost:7002/api/Employee';

  constructor(private http: HttpClient) {}

  // =========================
  // 🔹 CREATE FULL
  // =========================
  createFull(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-full`, data);
  }
  getProjects() {
  return this.http.get('https://localhost:7002/api/Project');
}

  // =========================
  // 🔹 GET ALL
  // =========================
  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // =========================
  // 🔹 GET BY ID (VIEW)
  // =========================
  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/view/${id}`);
  }

  // =========================
  // 🔹 GET FOR EDIT
  // =========================
  getForEdit(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/edit/${id}`);
  }

  // =========================
  // 🔹 UPDATE
  // =========================
  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/edit/${id}`, data);
  }
  


  // =========================
  // 🔹 DELETE
  // =========================
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  // ============================
  // 🔹 Emploee Details Timesheet 

  // ============================
  getFullDetails(id: number) {
  return this.http.get(`https://localhost:7002/api/employee/details-full/${id}`);
}
importExcel(formData: FormData) {
  return this.http.post<any[]>(
    `${this.apiUrl}/import-excel`,
    formData
  );
}
  
}