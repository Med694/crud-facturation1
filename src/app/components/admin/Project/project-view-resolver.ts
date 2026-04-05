import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProjectService } from '../../../services/projet.service';

@Injectable({ providedIn: 'root' })
export class ProjectViewResolver implements Resolve<any> {

  constructor(private service: ProjectService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = Number(route.paramMap.get('id'));
    return this.service.getProjectById(id);
  }
}