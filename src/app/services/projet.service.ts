import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'https://localhost:7002/api/Project';

  constructor(private http: HttpClient) {}

  // 🔹 GET ALL
  getProjects() {
    return this.http.get(this.apiUrl);
  }
  // 🔹 GET ALL PMs (pour dropdown)
  getProjectManagers() {
  return this.http.get('https://localhost:7002/api/ProjectManager');
}

  // 🔹 GET BY ID
 getProjectById(id: number) {
  return this.http.get(`https://localhost:7002/api/project/details/${id}`);
}

  // 🔹 CREATE
  createProject(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  // 🔹 UPDATE
  updateProject(id: number, data: any) {
  return this.http.put(`https://localhost:7002/api/project/${id}`, data);
}

  // 🔹 DELETE
  deleteProject(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // 🔹 ASSIGN MULTIPLE PROJECTS → PM
  assignProjects(pmId: number, projectIds: number[]) {
    return this.http.put(
      `${this.apiUrl}/assign-projects?projectManagerId=${pmId}`,
      projectIds
    );
  }

  // 🔹 UNASSIGN
  unassignProject(projectId: number) {
    return this.http.put(
      `${this.apiUrl}/unassign/${projectId}`,
      {}
    );
  }
}