import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsResolver implements Resolve<any> {

  constructor(private service: EmployeeService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = Number(route.paramMap.get('id'));

    if (isNaN(id)) {
      throw new Error('ID invalide');
    }

    return this.service.getFullDetails(id);
  }
}
