import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceManagerDashboardService {

  private apiUrl = 'https://localhost:7002/api/finance/worklogs';

  constructor(private http: HttpClient) {}

  getApprovedWorklogs(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getInvoicePdf(clientId: number): Observable<Blob> {
  return this.http.get(`https://localhost:7002/api/finance/invoice/client/${clientId}/pdf`, {
    responseType: 'blob'
  });
}

}