import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientResolver implements Resolve<any> {
  constructor(private clientService: ClientService) {}

  resolve(): Observable<any> {
    // 🔹 récupère tous les clients via le service
    return this.clientService.getAllClients();
  }
}