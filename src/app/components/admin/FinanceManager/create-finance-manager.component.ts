import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FinanceManagerService } from '../../../services/finance-manager.service';

@Component({
  selector: 'app-create-finance-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-finance-manager.component.html',
  styleUrls: ['./create-finance-manager.component.css']
 
})
export class CreateFinanceManagerComponent implements OnInit {

  username: string = '';

  formData = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private service: FinanceManagerService,
    private router: Router
  ) {}

  ngOnInit() {
    const fmData = JSON.parse(localStorage.getItem('fmData') || '{}');
    this.username = fmData.fullName || '';
  }

  submit() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(this.formData.email)) {
  alert("❌ Format d'email invalide !");
  return;
}

    if (!this.formData.email || !this.formData.password) {
      alert("⚠️ Email et mot de passe obligatoires");
      return;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      alert("❌ Les mots de passe ne correspondent pas");
      return;
    }

    // 🔥 récupérer étape 1
    const fmData = JSON.parse(localStorage.getItem('fmData') || '{}');

    const data = {
      fullName: fmData.fullName,
      matricule: fmData.matricule,
      telephone: fmData.telephone,
      ville: fmData.ville,
      service: fmData.service,

      username: this.username,
      email: this.formData.email,
      password: this.formData.password
    };

    this.service.createFull(data)
      .subscribe({
        next: () => {
          alert("✅ Finance Manager créé !");
          localStorage.removeItem('fmData');
          this.router.navigate(['/finance-manager-list']);
        },
        error: (err) => {
          alert("❌ " + err.error);
        }
      });
  }
}