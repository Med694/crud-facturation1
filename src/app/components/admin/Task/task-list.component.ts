import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrls:['./task-list.component.css']
  
})
export class TaskListComponent implements OnInit {

  tasks: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    // si tu utilises resolver
    this.route.data.subscribe(data => {
      this.tasks = data['tasks'];
      console.log(this.tasks);
    });

    
  }

  loadTasks() {
    this.service.getTasks().subscribe((res: any) => {
      this.tasks = res;
    });
  }

  delete(id: number) {
    const confirmDelete = confirm("Voulez-vous vraiment supprimer cette tâche ?");

    if (!confirmDelete) return;

    const deletedItem = this.tasks.find(t => t.id === id);

    this.tasks = this.tasks.filter(t => t.id !== id);

    this.service.deleteTask(id).subscribe({
      next: () => {
        console.log("Supprimé côté serveur");
      },
      error: (err) => {
        console.error(err);
        alert("❌ Erreur suppression côté serveur");

        if (deletedItem) {
          this.tasks = [...this.tasks, deletedItem];
        }
      }
    });
  }

  edit(id: number) {
    this.router.navigate(['/edit-task', id]);
  }

  create() {
    this.router.navigate(['/create-task']);
  }

  view(id: number) {
    this.router.navigate(['/view-task', id]);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}