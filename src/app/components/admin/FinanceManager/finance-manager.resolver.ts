import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { FinanceManagerService } from '../../../services/finance-manager.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FinanceManagerResolver implements Resolve<any> {

  constructor(private service: FinanceManagerService) {}

  resolve(): Observable<any> {
    return this.service.getAll();
  }
}