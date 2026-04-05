import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ProjectService } from '../../../services/projet.service';

@Injectable({ providedIn: 'root' })
export class ProjectResolver implements Resolve<any> {

  constructor(private projectService: ProjectService) {}

  resolve() {
    return this.projectService.getProjects();
  }
}