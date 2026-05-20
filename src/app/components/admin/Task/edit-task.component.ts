import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaskService } from '../../../services/task.service';
import { ProjectService } from '../../../services/projet.service';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-task.component.html',
  styleUrls :['./edit-task.component.css']
  
})
export class EditTaskComponent implements OnInit {

  task: any = {};

  projects: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit() {

    const id = this.route.snapshot.params['id'];

    // 🔹 Charger la tâche
    this.taskService.getTaskById(id).subscribe({
      next: (data: any) => {

        this.task = {
          id: data.id,
          title: data.title,
          projectId: data.project?.id || null
        };
      },
      error: (err) => {
        console.error(err);
      }
    });

    // 🔹 Charger les projets
    this.projectService.getProjects().subscribe({
      next: (res: any) => {
        this.projects = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // 🔹 UPDATE TASK
  save() {

    if (!this.task.title) {
      alert("Le titre de la tâche est obligatoire");
      return;
    }

    this.taskService.updateTask(this.task.id, this.task)
      .subscribe({
        next: () => {

          alert("✅ Tâche modifiée avec succès");

          this.router.navigate(['/task-list']);
        },

        error: (err) => {

          console.error(err);

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
    this.router.navigate(['/task-list']);
  }
}