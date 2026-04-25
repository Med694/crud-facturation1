import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { forkJoin, map, switchMap } from 'rxjs';

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

    return this.service.getFullDetails(id).pipe(
      switchMap((employee: any) => {

        const requests = employee.projects.map((p: any) =>
          this.service.getWorkLogs(employee.id, p.id)
        );

        return forkJoin(requests).pipe(
          map((worklogsArray: any) => {

            // 🔥 injecter worklogs dans chaque projet
            employee.projects.forEach((p: any, index: number) => {
              p.worklogs = worklogsArray[index];
            });

            return employee;
          })
        );
      })
    );
  }
}