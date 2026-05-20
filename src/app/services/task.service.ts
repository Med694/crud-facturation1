import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'https://localhost:7002/api'; // 🔥 adapte selon ton backend

  constructor(private http: HttpClient) { }

  // 🔹 GET ALL TASKS
  getTasks() {
    return this.http.get(this.apiUrl + '/task');
  }

  // 🔹 GET TASK BY ID (DETAILS)
  getTaskById(id: number) {
    return this.http.get(this.apiUrl + `/task/details/${id}`);
  }

  // 🔹 GET TASKS BY PROJECT
  getTasksByProject(projectId: number) {
    return this.http.get(this.apiUrl + `/task/project/${projectId}`);
  }

  // 🔹 CREATE TASK
  createTask(data: any) {
    return this.http.post(this.apiUrl + '/task', data);
  }

  // 🔹 UPDATE TASK
  updateTask(id: number, data: any) {
    return this.http.put(this.apiUrl + `/task/${id}`, data);
  }

  // 🔹 DELETE TASK
  deleteTask(id: number) {
    return this.http.delete(this.apiUrl + `/task/${id}`);
  }

  // 🔹 GET ALL PROJECTS (pour dropdown dans create-task)
  getProjects() {
    return this.http.get(this.apiUrl + '/project');
  }
}