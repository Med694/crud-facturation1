import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-admin-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-admin-details.component.html',
  styleUrls: ['./create-admin-details.component.css']
})
export class CreateAdminDetailsComponent {

  formData = {
    fullName: '',
    city: '',
    phone: '',
    matricule: ''
  };

  constructor(private router: Router) {}

  submit() {

    if (!this.formData.fullName ||
        !this.formData.city ||
        !this.formData.phone ||
        !this.formData.matricule) {
      alert("⚠️ Tous les champs sont obligatoires !");
      return;
    }

   if (this.formData.phone.toString().length !== 8) {
  alert("❌ Le numéro doit contenir 8 chiffres !");
  return;
}

    const matriculeRegex = /^FL[0-9]+$/;
    if (!matriculeRegex.test(this.formData.matricule)) {
      alert("❌ Matricule format FL1234");
      return;
    }

    // 🔥 stockage temporaire
    localStorage.setItem('adminData', JSON.stringify(this.formData));

    this.router.navigate(['/create-admin']);
  }
}