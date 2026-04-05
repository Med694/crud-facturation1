import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute ,Router} from '@angular/router';
import { ProjectManagerService } from '../../services/project-manager.service';

@Component({
  selector: 'app-project-manager-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // 🔹 RouterModule pour routerLink
  templateUrl: './project-manager-list.component.html',
styleUrls: ['./project-manager-list.component.css']
})
export class ProjectManagerListComponent implements OnInit {

  data: any[] = [];

  // 🔹 Injecter ActivatedRoute ici
  constructor(
    private route: ActivatedRoute,
    private service: ProjectManagerService,
    private router: Router
  ) {}

  ngOnInit() {
    // 🔹 Récupère les données préchargées par le resolver
    this.data = this.route.snapshot.data['data'];
  }

  delete(id: number) {
  const confirmDelete = confirm("Voulez-vous vraiment supprimer ce Project Manager ?");

  if (!confirmDelete) return;

  // Supprime immédiatement dans l'UI
  this.data = this.data.filter(x => x.id !== id);

  // Appel serveur
  this.service.delete(id).subscribe({
    next: () => console.log('Supprimé côté serveur'),
    error: (err) => {
      console.error(err);
      alert('Erreur lors de la suppression côté serveur !');
      // Remettre l'élément dans la liste si erreur
      // this.data = [...this.data, deletedItem]; // optionnel
    }
  });
}
logout() {
    // Supprime les données de session/localStorage si besoin
    localStorage.clear();

    // Redirection vers la page login
    this.router.navigate(['/login']);
  }
}