import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { TaskService } from '../../../services/task.service';

@Injectable({ providedIn: 'root' })
export class TaskResolver implements Resolve<any> {

  constructor(private taskService: TaskService) {}

  resolve() {
    return this.taskService.getTasks();
  }
}