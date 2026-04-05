import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectManagerService } from '../../services/project-manager.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-create-project-manager-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-project-manager-details.component.html',
  styleUrls: ['./create-project-manager-details.component.css']
})
export class CreateProjectManagerDetailsComponent implements OnInit {

  formData = {
    fullName: '',
    city: '',
    phone: '',
    matricule: ''
  };

  projects: any[] = [];          // 🔹 liste des projets
  selectedProjectIds: number[] = [];
  tempId: string = '';


  constructor(
    private service: ProjectManagerService,
    private router: Router
  ) {}

  ngOnInit() {
    // 🔥 récupérer les projets depuis API
    this.service.getProjects().subscribe((res: any) => {
      this.projects = res;
      console.log("Projects:", this.projects);
    });
  }
submit() {

  // 🔴 validations
  if (!this.formData.fullName ||
      !this.formData.city ||
      !this.formData.phone ||
      !this.formData.matricule) {

    alert("⚠️ Tous les champs sont obligatoires !");
    return;
  }

  if (this.formData.phone.length !== 8) {
    alert("❌ Le numéro doit contenir 8 chiffres !");
    return;
  }

  if (!this.selectedProjectIds || this.selectedProjectIds.length === 0) {
    alert("⚠️ Veuillez sélectionner au moins un projet !");
    return;
  }

  const matriculeRegex = /^FL[0-9]+$/;
  if (!matriculeRegex.test(this.formData.matricule)) {
    alert("❌ Le matricule doit être sous forme FL1234");
    return;
  }

  // 🔥 appels API en parallèle
  const requests = this.selectedProjectIds.map(id =>
    this.service.checkProject(id)
  );

  forkJoin(requests).subscribe({
    next: (results: any[]) => {

      const hasAssigned = results.some(r => r.isAssigned);

      if (hasAssigned) {
        alert("❌ Un ou plusieurs projets sont déjà assignés !");
        return;
      }

      // ✅ STOCKAGE OK
      localStorage.setItem('pmData', JSON.stringify({
        fullName: this.formData.fullName,
        city: this.formData.city,
        phone: this.formData.phone,
        matricule: this.formData.matricule,
        projectIds: this.selectedProjectIds
      }));

      this.router.navigate(['/create-project-manager']);
    },
    error: () => {
      alert("❌ Erreur lors de la vérification !");
    }
  });
}
}
  