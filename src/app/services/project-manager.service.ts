import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {

  private apiUrl = 'https://localhost:7002/api/ProjectManager';

  constructor(private http: HttpClient) {}

   // ✅ 🔥 NOUVELLE API (CREATE FULL)
  createFull(data: any) {
    return this.http.post(`${this.apiUrl}/create-full`, data);
  }
  checkProject(projectId: number) {
  return this.http.get(`${this.apiUrl}/check-project/${projectId}`);
}

  // 🔹 3. GET ALL
  getAll() {
    return this.http.get(this.apiUrl);
  }

  // 🔹 4. GET BY ID
  getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  getPMById(id: number) {
  return this.http.get(`${this.apiUrl}/edit/${id}`);
}

  // 🔹 5. UPDATE
 updatePM(id: number, data: any) {
  return this.http.put(`${this.apiUrl}/edit/${id}`, data);
}

  // 🔹 6. UPDATE STATUS
  updateStatus(id: number, status: string) {
    return this.http.put(`${this.apiUrl}/status/${id}?status=${status}`, {});
  }
  getProjects() {
  return this.http.get('https://localhost:7002/api/Project');
}

  // 🔹 7. ASSIGN PROJECT
  assignProject(projectId: number, pmId: number) {
    return this.http.put(`${this.apiUrl}/assign-project?projectId=${projectId}&projectManagerId=${pmId}`, {});
  }
  getPMDetails(id: number) {
  return this.http.get(`https://localhost:7002/api/ProjectManager/view/${id}`);
}



  // 🔹 8. DELETE
  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}