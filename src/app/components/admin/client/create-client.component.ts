import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  formData = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    company: ''
  };

  projects: any[] = [];
  selectedProjectIds: number[] = [];

  constructor(
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProjects();
  }

  // 🔥 Charger projets + marquer ceux déjà assignés
  loadProjects() {
  this.clientService.getProjects().subscribe({
    next: (res: any) => {
      this.projects = res; // 🔥 simple
    },
    error: (err) => console.error('Erreur chargement projets', err)
  });
}

  // 🔥 empêcher sélection si déjà assigné
  toggleProject(project: any) {

  // 🔥 CHECK SIMPLE
  if (project.clientId) {
    alert("❌ Ce projet est déjà assigné !");
    return;
  }

  if (this.selectedProjectIds.includes(project.id)) {
    this.selectedProjectIds = this.selectedProjectIds.filter(x => x !== project.id);
  } else {
    this.selectedProjectIds.push(project.id);
  }
}

  submit() {
    if (!this.formData.fullName || !this.formData.email || !this.formData.phone ||
        !this.formData.address || !this.formData.company) {
      alert('⚠️ Tous les champs sont obligatoires !');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(this.formData.email)) {
      alert('❌ Email invalide !');
      return;
    }

    if (this.formData.phone.length !== 8) {
      alert('❌ Le numéro doit contenir 8 chiffres !');
      return;
    }

    if (!this.selectedProjectIds.length) {
      alert('⚠️ Sélectionnez au moins un projet !');
      return;
    }

    const payload = {
      ...this.formData,
      projectIds: this.selectedProjectIds
    };

    this.clientService.createFull(payload).subscribe({
      next: () => {
        alert('✅ Client créé avec succès');
        this.router.navigate(['/client-list']);
      },
      error: (err) => {
        console.error(err);

        // 🔥 afficher les projets en conflit
        if (err.error?.projects) {
         
          alert(`❌ Projets déjà assignés`);
        } else if (err.error?.message) {
          alert('❌ ' + err.error.message);
        } else {
          alert('❌ Erreur lors de la création');
        }
      }
    });
  }
}