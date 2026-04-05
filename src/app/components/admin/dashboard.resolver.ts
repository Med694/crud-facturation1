// dashboard.resolver.ts
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';

@Injectable({ providedIn: 'root' })
export class DashboardResolver implements Resolve<any> {
  constructor(private dashboardService: DashboardService) {}
  resolve() {
    return this.dashboardService.getStats();
  }
}