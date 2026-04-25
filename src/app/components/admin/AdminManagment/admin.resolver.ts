import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Injectable({ providedIn: 'root' })
export class AdminResolver implements Resolve<any> {

  constructor(private service: AdminService) {}

  resolve() {
    return this.service.getAll();
  }
}