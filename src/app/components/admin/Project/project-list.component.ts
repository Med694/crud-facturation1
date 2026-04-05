import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProjectService } from '../../../services/projet.service';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
  
})
export class ProjectListComponent implements OnInit {

  projects: any[] = [];

  constructor(
      private route: ActivatedRoute,
    private service: ProjectService,
    private router: Router
  ) {}

  ngOnInit() {
  this.route.data.subscribe(data => {
    this.projects = data['projects'];
    console.log(this.projects);
  });
}

  loadProjects() {
    this.service.getProjects().subscribe((res: any) => {
      this.projects = res;
    });
  }

  delete(id: number) {
  const confirmDelete = confirm("Voulez-vous vraiment supprimer ce projet ?");

  if (!confirmDelete) return;

  // 🔥 sauvegarder l’élément supprimé (pour rollback)
  const deletedItem = this.projects.find(p => p.id === id);

  // ✅ suppression immédiate UI (comme PM)
  this.projects = this.projects.filter(p => p.id !== id);

  // 🔥 appel backend
  this.service.deleteProject(id).subscribe({
    next: () => {
      console.log("Supprimé côté serveur");
    },
    error: (err) => {
      console.error(err);
      alert("❌ Erreur suppression côté serveur");

      // 🔁 rollback si erreur
      if (deletedItem) {
        this.projects = [...this.projects, deletedItem];
      }
    }
  });
}

  edit(id: number) {
    this.router.navigate(['/edit-project', id]);
  }

  create() {
    this.router.navigate(['/create-project']);
  }
  view(id: number) {
  this.router.navigate(['/view-project', id]); 
}
logout() {
  // Exemple simple : redirection vers login
  this.router.navigate(['/login']);

 
}
}