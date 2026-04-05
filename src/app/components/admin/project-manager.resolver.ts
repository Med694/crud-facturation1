// project-manager.resolver.ts
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ProjectManagerService } from '../../services/project-manager.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectManagerResolver implements Resolve<any> {
  constructor(private service: ProjectManagerService) {}

  resolve(): Observable<any> {
    // Retourne directement l'Observable de getAll()
    return this.service.getAll();
  }
}
