import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectManagerService } from '../../services/project-manager.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs'; // 🔥 important

@Component({
  selector: 'app-edit-project-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-project-manager.component.html',
  styleUrls: ['./edit-project-manager.component.css']
})
export class EditProjectManagerComponent implements OnInit {

  id!: number;

  formData = {
    fullName: '',
    city: '',
    phone: '',
    matricule: '',
    projectIds: [] as number[]   // ✅ MULTI
  };

  projects: any[] = [];

  // 🔥 ancien → remplacé par liste
  currentProjectIds: number[] = [];

  constructor(
    private service: ProjectManagerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getPMById(this.id).subscribe((res: any) => {

      // ✅ mapping propre
      this.formData = {
        fullName: res.fullName,
        city: res.city,
        phone: res.phone,
        matricule: res.matricule,
        projectIds: res.projectIds || []   // 🔥 important
      };

      // 🔥 sauvegarder projets actuels
      this.currentProjectIds = [...this.formData.projectIds];
    });

    this.service.getProjects().subscribe((res: any) => {
      this.projects = res;
    });
  }

  submit() {

    // 🔴 validation
    if (!this.formData.fullName ||
        !this.formData.city ||
        !this.formData.phone ||
        !this.formData.matricule ||
        !this.formData.projectIds ||
        this.formData.projectIds.length === 0) {

      alert("⚠️ Tous les champs sont obligatoires");
      return;
    }

    // 🔥 vérifier si projets inchangés
    const sameProjects =
      this.formData.projectIds.length === this.currentProjectIds.length &&
      this.formData.projectIds.every(id => this.currentProjectIds.includes(id));

    if (sameProjects) {
      this.goToStep2();
      return;
    }

    // 🔥 vérifier chaque projet
    const requests = this.formData.projectIds.map(id =>
      this.service.checkProject(id)
    );

    forkJoin(requests).subscribe({
      next: (results: any[]) => {

        const hasAssigned = results.some((r, index) => {
          const projectId = this.formData.projectIds[index];

          // 🔥 autoriser les projets déjà assignés à CE PM
          return r.isAssigned && !this.currentProjectIds.includes(projectId);
        });

        if (hasAssigned) {
          alert("❌ Un projet est déjà assigné !");
          return;
        }

        this.goToStep2();
      },
      error: () => {
        alert("❌ erreur vérification projet");
      }
    });
  }

  goToStep2() {
    this.router.navigate(['/edit-project-manager-account', this.id], {
      state: { step1Data: this.formData }
    });
  }
}