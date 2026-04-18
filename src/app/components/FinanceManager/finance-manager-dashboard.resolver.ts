// finance-dashboard.resolver.ts
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { FinanceManagerDashboardService } from '../../services/finance-manager-dashboard.service';

@Injectable({ providedIn: 'root' })
export class FinanceDashboardResolver implements Resolve<any> {

  constructor(private service: FinanceManagerDashboardService) {}

  resolve() {
    return this.service.getApprovedWorklogs();
  }
}