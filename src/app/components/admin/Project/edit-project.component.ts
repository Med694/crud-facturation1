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
  tasks: any[] = [];
selectedTasks: number[] = [];

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

      // 🔥 charger tasks après projet
      this.loadTasks();
    }
  });

  // 🔹 Charger PM
  this.service.getProjectManagers().subscribe((res: any) => {
    this.projectManagers = res;
  });
}
loadTasks() {
  this.service.getTasks().subscribe((res: any) => {
    this.tasks = res;

    this.selectedTasks = this.tasks
      .filter(t => t.projectId === this.project.id)
      .map(t => t.id);
  });
}

  // 🔹 UPDATE
  save() {
  if (!this.project.name) {
    alert("Le nom du projet est obligatoire");
    return;
  }

  const payload = {
    ...this.project,
    taskIds: this.selectedTasks
  };

  this.service.updateProject(this.project.id, payload)
    .subscribe({
      next: () => {
        alert("Projet modifié avec succès");
        this.router.navigate(['/project-list']);
      },
      error: (err) => {
        alert(err.error);
      }
    });
}

  // 🔹 CANCEL
  cancel() {
    this.router.navigate(['/project-list']);
  }
}