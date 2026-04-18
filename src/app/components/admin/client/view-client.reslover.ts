// client.resolver.ts
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ViewClientResolver implements Resolve<any> {

  constructor(
    private clientService: ClientService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');

    if (id) {
      return this.clientService.view(+id).pipe(
        catchError(() => {
          alert('Client introuvable');
          this.router.navigate(['/client-list']);
          return of(null);
        })
      );
    }

    return of(null);
  }
}