import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { FinanceManagerService } from '../../../services/finance-manager.service';

@Injectable({ providedIn: 'root' })
export class FinanceManagerViewResolver implements Resolve<any> {

  constructor(private service: FinanceManagerService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    return this.service.getById(Number(id));
  }
}