import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-list.component.html',
styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients: any[] = [];

  constructor(
    private route: ActivatedRoute, // 🔥 pour récupérer des données du resolver si besoin
    private service: ClientService,
    private router: Router
  ) {}

  ngOnInit() {
    // 🔹 Si tu utilises un resolver, sinon appeler loadClients()
    if (this.route.snapshot.data['clients']) {
      this.clients = this.route.snapshot.data['clients'];
    } else {
      this.loadClients();
    }
  }

  loadClients() {
    this.service.getAllClients().subscribe({
      next: (data) => this.clients = data,
      error: (err) => console.error('Erreur chargement clients', err)
    });
  }

  // 🔹 NAVIGATION
  create() {
    this.router.navigate(['/create-client']); // adapter la route
  }

  view(id: number) {
    this.router.navigate(['/view-client', id]);
  }

  edit(id: number) {
    this.router.navigate(['/edit-client', id]);
  }

  // 🔹 DELETE
  delete(id: number) {
    const confirmDelete = confirm("Voulez-vous supprimer ce client ?");
    if (!confirmDelete) return;

    // UI instant
    this.clients = this.clients.filter(c => c.id !== id);

    // backend
    this.service.delete(id).subscribe({
      next: () => console.log("Client supprimé"),
      error: (err) => {
        console.error(err);
        alert("Erreur lors de la suppression");
        // 🔹 remettre le client dans la liste si erreur
        this.loadClients();
      }
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }
}