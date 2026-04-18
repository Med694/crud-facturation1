import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-finance-manager-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-finance-manager-details.component.html',
  styleUrls: ['./create-finance-manager-details.component.css']

})
export class CreateFinanceManagerDetailsComponent {

  formData = {
    fullName: '',
    matricule: '',
    telephone: '',
    ville: '',
    service: ''
  };

  constructor(private router: Router) {}

  submit() {

    // 🔴 validations
    if (!this.formData.fullName ||
        !this.formData.matricule ||
        !this.formData.telephone ||
        !this.formData.ville ||
        !this.formData.service) {

      alert("⚠️ Tous les champs sont obligatoires !");
      return;
    }

    if (this.formData.telephone.length !== 8) {
      alert("❌ Le numéro doit contenir 8 chiffres !");
      return;
    }

    const matriculeRegex = /^FL[0-9]+$/;
    if (!matriculeRegex.test(this.formData.matricule)) {
      alert("❌ Le matricule doit être sous forme FL1234");
      return;
    }

    // ✅ stocker dans localStorage
    localStorage.setItem('fmData', JSON.stringify(this.formData));

    this.router.navigate(['/create-finance-manager']);
  }
}