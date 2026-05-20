import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-create-employee-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-employee-details.component.html',
  styleUrls: ['./create-employee-details.component.css']
})
export class CreateEmployeeDetailsComponent implements OnInit {

  formData = {
    fullName: '',
    email: '',
    phoneNumber: '',
    matricule: '',
    city: '',
    speciality: '',
    grade: ''
  };

  projects: any[] = [];
  selectedProjectIds: number[] = [];
  
  tasks: any[] = [];
  selectedTaskIds: number[] = [];

  constructor(
    private service: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
  this.service.getProjects().subscribe((res: any) => {
    this.projects = res;
  });

  const stored = JSON.parse(localStorage.getItem('selectedTasks') || '[]');
  this.selectedTaskIds = stored.map((t: any) => t.id);
}

  onProjectChange() {
  this.tasks = [];

  this.selectedProjectIds.forEach(projectId => {
    this.service.getTasksByProject(projectId)
      .subscribe((res: any) => {

        // éviter doublons
        const newTasks = res.filter(
          (task: any) => !this.tasks.some(t => t.id === task.id)
        );

        this.tasks = [...this.tasks, ...newTasks];
      });
  });

  // reload depuis localStorage
  const stored = JSON.parse(localStorage.getItem('selectedTasks') || '[]');
  this.selectedTaskIds = stored.map((t: any) => t.id);
}
  toggleTask(task: any) {

  let storedTasks = JSON.parse(
    localStorage.getItem('selectedTasks') || '[]'
  );

  const exists = storedTasks.some((t: any) => t.id === task.id);

  if (!exists) {
    storedTasks.push(task);
  } else {
    storedTasks = storedTasks.filter(
      (t: any) => t.id !== task.id
    );
  }

  localStorage.setItem(
    'selectedTasks',
    JSON.stringify(storedTasks)
  );

  this.selectedTaskIds = storedTasks.map(
    (t: any) => t.id
  );
}

  submit() {

    // 🔴 validation (inchangé)
    if (!this.formData.fullName ||
        !this.formData.email ||
        !this.formData.phoneNumber ||
        !this.formData.matricule ||
        !this.formData.city ||
        !this.formData.speciality ||
        !this.formData.grade) {

      alert("⚠️ Tous les champs sont obligatoires !");
      return;
    }

    if (this.formData.phoneNumber.length !== 8) {
      alert("❌ Le numéro doit contenir 8 chiffres !");
      return;
    }

    if (!this.selectedProjectIds.length) {
      alert("⚠️ Sélectionnez au moins un projet !");
      return;
    }

    const matriculeRegex = /^FL[0-9]+$/;
    if (!matriculeRegex.test(this.formData.matricule)) {
      alert("❌ Matricule doit être FL1234");
      return;
    }

    // 🔥 NOUVEAU : envoi direct au backend (plus de localStorage)
    const storedTasks = JSON.parse(localStorage.getItem('selectedTasks') || '[]');

const payload = {
  ...this.formData,
  projectIds: this.selectedProjectIds,
  taskIds: storedTasks.map((t: any) => t.id)
};

    this.service.createFull(payload).subscribe({
      next: () => {
          localStorage.removeItem('selectedTasks');
        alert("✅ Employee créé avec succès");
        this.router.navigate(['/employee-list']);
      },
      error: (err) => {
        console.error(err);

        if (err.error?.message) {
          alert("❌ " + err.error.message);
        } else {
          alert("❌ Erreur lors de la création");
        }
      }
    });
  }
}