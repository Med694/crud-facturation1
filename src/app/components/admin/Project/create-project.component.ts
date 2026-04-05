import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../services/projet.service';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
  
})
export class CreateProjectComponent implements OnInit {

  formData = {
    name: '',
    projectManagerId: null as number | null
  };

  projectManagers: any[] = [];

  constructor(
    private service: ProjectService,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.getProjectManagers().subscribe((res: any) => {
      this.projectManagers = res;
    });
  }

  submit() {

  if (!this.formData.name) {
    alert("⚠️ Nom obligatoire");
    return;
  }

 /* if (!this.formData.projectManagerId) {
    alert("⚠️ Veuillez sélectionner un Project Manager");
    return;
  } */

  this.service.createProject(this.formData).subscribe({
    next: () => {
      alert("✅ Projet créé !");
      this.router.navigate(['/project-list']);
    },
    error: (err) => {
      alert("❌ " + err.error);
    }
  });
}
cancel() {
  this.router.navigate(['/project-list']);
}
view(id: number) {
  this.router.navigate(['/view-project', id]);
}
}