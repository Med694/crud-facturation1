import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FinanceManagerStatisticsService {

  // ✅ BASE URL
  private apiUrl = 'https://localhost:7002/api/FinanceManagerStatistics';

  constructor(private http: HttpClient) {}

  // dashboard stats
 getDashboardFull(month?: number, year?: number): Observable<any> {
  let url = `${this.apiUrl}/finance/dashboard/full`;

  if (month && year) {
    url += `?month=${month}&year=${year}`;
  }

  return this.http.get<any>(url);
}

  // top clients
 getTopClients(month?: number, year?: number): Observable<any> {
  let url = `${this.apiUrl}/finance/top-clients`;

  if (month && year) {
    url += `?month=${month}&year=${year}`;
  }

  return this.http.get<any>(url);
}
}