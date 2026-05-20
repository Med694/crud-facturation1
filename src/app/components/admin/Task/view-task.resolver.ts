import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TaskService } from '../../../services/task.service';

@Injectable({ providedIn: 'root' })
export class ViewTaskResolver implements Resolve<any> {

  constructor(private service: TaskService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = Number(route.paramMap.get('id'));
    return this.service.getTaskById(id);
  }
}