import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FinanceManagerStatisticsService {

  // ✅ BASE URL
  private apiUrl = 'https://localhost:7002/api/FinanceManagerStatistics';

  constructor(private http: HttpClient) {}

  // dashboard stats
  getDashboardFull(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/finance/dashboard/full`
    );
  }

  // top clients
  getTopClients(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/finance/top-clients`
    );
  }
}