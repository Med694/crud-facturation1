import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeResolver implements Resolve<any[]> {
  constructor(private employeeService: EmployeeService) {}

  resolve(): Observable<any[]> {
    // 🔹 on récupère tous les employés avec leur ID
    return this.employeeService.getAll();
  }
}