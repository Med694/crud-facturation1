import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin } from 'rxjs';
import { FinanceManagerStatisticsService } from '../../services/finance-manager-statistics.service';

@Injectable({ providedIn: 'root' })
export class FinanceManagerStatisticsResolver implements Resolve<any> {

  constructor(private service: FinanceManagerStatisticsService) {}

  resolve() {

    return forkJoin({
      dashboard: this.service.getDashboardFull(),
      topClients: this.service.getTopClients()
    });

  }
}