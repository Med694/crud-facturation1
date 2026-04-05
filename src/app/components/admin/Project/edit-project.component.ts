import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../services/projet.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  project: any = {};

  constructor(
    private route: ActivatedRoute,
    private service: ProjectService,
    private router: Router
  ) {}

projects: any = {};
projectManagers: any[] = [];

ngOnInit() {
  const id = this.route.snapshot.params['id'];

  // 🔹 Charger projet
  this.service.getProjectById(id).subscribe({
    next: (data: any) => {
      this.project = {
        id: data.id,
        name: data.name,
        projectManagerId: data.projectManager?.id || null
      };
    }
  });

  // 🔹 Charger liste PM
  this.service.getProjectManagers().subscribe((res: any) => {
    this.projectManagers = res;
  });
}

  // 🔹 UPDATE
  save() {
  if (!this.project.name) {
    alert("Le nom du projet est obligatoire");
    return;
  }

  this.service.updateProject(this.project.id, this.project)
    .subscribe({
      next: () => {
        alert("Projet modifié avec succès");
        this.router.navigate(['/project-list']);
      },
      error: (err) => {
        console.error(err);

        // 🔥 récupérer message backend
        if (err.error) {
          alert("❌ " + err.error);
        } else {
          alert("Erreur lors de la modification");
        }
      }
    });
}

  // 🔹 CANCEL
  cancel() {
    this.router.navigate(['/project-list']);
  }
}