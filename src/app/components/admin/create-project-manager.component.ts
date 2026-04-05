import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectManagerService } from '../../services/project-manager.service';

@Component({
  selector: 'app-create-project-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-project-manager.component.html',
    styleUrls: ['./create-project-manager.component.css']
})
export class CreateProjectManagerComponent implements OnInit {

  pmId!: number;
  username!: string;

  formData = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private service: ProjectManagerService,private router: Router) {}

  ngOnInit() {
  const pmData = JSON.parse(localStorage.getItem('pmData') || '{}');

  this.username = pmData.fullName || '';
}

  submit() {

  // 🔴 Vérification champs vides
  if (!this.formData.email || !this.formData.password) {
    alert("⚠️ Email et mot de passe obligatoires");
    return;
  }

  if (this.formData.password !== this.formData.confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  // 🔥 récupérer données étape 1
  const pmData = JSON.parse(localStorage.getItem('pmData') || '{}');

  const data = {
    fullName: pmData.fullName,
    city: pmData.city,
    phone: pmData.phone,
    matricule: pmData.matricule,
    projectIds: pmData.projectIds,

    username: this.username,
    email: this.formData.email,
    password: this.formData.password
  };

  this.service.createFull(data)
    .subscribe({
      next: () => {
        alert("✅ Compte créé !");
        
        // 🔥 nettoyage
        localStorage.removeItem('pmData');

        this.router.navigate(['/project-manager-list']);
      },
      error: (err) => {
        alert("❌ " + err.error);
      }
    });
}
}