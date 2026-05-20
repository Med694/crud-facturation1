import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']

})
export class CreateTaskComponent implements OnInit {

  formData = {
    title: '',
    projectId: null as number | null
  };

  projects: any[] = [];

  constructor(
    private service: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    // charger les projets pour dropdown
    this.service.getProjects().subscribe((res: any) => {
      this.projects = res;
    });
  }

  submit() {

    if (!this.formData.title) {
      alert("⚠️ Titre obligatoire");
      return;
    }

    this.service.createTask(this.formData).subscribe({
      next: () => {
        alert("✅ Tâche créée !");
        this.router.navigate(['/task-list']);
      },
      error: (err) => {
        alert("❌ " + (err.error?.message || err.error));
      }
    });
  }

  cancel() {
    this.router.navigate(['/task-list']);
  }

  view(id: number) {
    this.router.navigate(['/view-task', id]);
  }
}