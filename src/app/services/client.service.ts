import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'https://localhost:7002/api/Client'; // adapter le port si nécessaire
  private projectUrl = 'https://localhost:7002/api/Project';

  constructor(private http: HttpClient) {}

  // =========================
  // 🔹 CREATE FULL
  // =========================
  createFull(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  // =========================
  // 🔹 GET ALL PROJECTS (pour le formulaire)
  // =========================
  getProjects(): Observable<any> {
    return this.http.get(this.projectUrl);
  }

  // =========================
  // 🔹 GET ALL CLIENTS
  // =========================
   // 🔹 GET ALL
   getAllClients(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
  // =========================
  // 🔹 GET CLIENT BY ID
  // =========================
  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  
  // 🔹 GET FOR EDIT 🔥
  edit(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/edit/${id}`);
  }

  // 🔹 UPDATE 🔥
  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }


  // =========================
  // 🔹 DELETE CLIENT
  // =========================
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  // =========================
  // 🔹 VIEW CLIENT
  // =========================
 view(id: number) {
  return this.http.get(`${this.apiUrl}/view/${id}`);
}
}