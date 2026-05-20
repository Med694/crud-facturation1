import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { forkJoin, Observable } from 'rxjs';

import { ProjectManagerStatisticsService } from '../../services/project-manager-statistics.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerStatisticsResolver
  implements Resolve<any> {

  constructor(
    private statisticsService: ProjectManagerStatisticsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
   
  ): Observable<any> {

    const pmId = Number(route.paramMap.get('id'));

    return forkJoin({
      stats: this.statisticsService.getStatistics(pmId),
      bestEmployees: this.statisticsService.getBestEmployees(pmId)
    });
  }
}