import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerStatisticsService {

  private apiUrl = 'https://localhost:7002/api/ProjectManagerStats';

  constructor(private http: HttpClient) {}

  getStatistics(pmId: number): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/${pmId}`
    );

  }
    // ✅ Top clients
  getTopClients(): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/finance/top-clients`
    );

  }
   getBestEmployees(pmId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/best-employees/${pmId}`);
  }
}