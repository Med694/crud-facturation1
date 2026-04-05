import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProjectManagerService } from '../../services/project-manager.service';

@Injectable({ providedIn: 'root' })
export class ProjectManagerViewResolver implements Resolve<any> {

  constructor(private service: ProjectManagerService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = Number(route.paramMap.get('id'));
    return this.service.getPMDetails(id);
  }
}