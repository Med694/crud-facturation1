import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProjectManagerDashboardService } from '../../services/project-manager-dashboard.service';

@Injectable({ providedIn: 'root' })
export class ProjectManagerDashboardResolver implements Resolve<any> {

  constructor(private service: ProjectManagerDashboardService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = Number(route.paramMap.get('id'));
    return this.service.getFullDetails(id);
  }
}