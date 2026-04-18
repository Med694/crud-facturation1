import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerDashboardService {

  private baseUrl = 'https://localhost:7002/api';

  constructor(private http: HttpClient) {}

  getFullDetails(pmId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/project-manager/${pmId}/full-details`
    );
  }
  deleteWorklog(id: number) {
  return this.http.delete(`https://localhost:7002/api/worklog/${id}`)
}
approveWorklog(id: number) {
  return this.http.put(`https://localhost:7002/api/worklog/${id}/approve`, {});
}
}