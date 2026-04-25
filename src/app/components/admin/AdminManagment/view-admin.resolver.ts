import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Injectable({ providedIn: 'root' })
export class ViewAdminResolver implements Resolve<any> {

  constructor(private service: AdminService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    return this.service.viewAdmin(Number(id));
  }
}