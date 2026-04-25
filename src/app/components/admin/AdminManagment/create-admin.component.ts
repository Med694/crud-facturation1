import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-create-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-admin.component.html',
styleUrls: ['./create-admin.component.css']
 
})
export class CreateAdminComponent implements OnInit {

  username!: string;

  formData = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private service: AdminService, private router: Router) {}

  ngOnInit() {
    const data = JSON.parse(localStorage.getItem('adminData') || '{}');
    this.username = data.fullName || '';
  }

  submit() {

    if (!this.formData.email || !this.formData.password) {
      alert("⚠️ Email et mot de passe obligatoires");
      return;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      alert("❌ Passwords do not match");
      return;
    }

    const adminData = JSON.parse(localStorage.getItem('adminData') || '{}');

    const data = {
      fullName: adminData.fullName,
      city: adminData.city,
      phone: adminData.phone,
      matricule: adminData.matricule,

      username: this.username,
      email: this.formData.email,
      password: this.formData.password
    };

    this.service.create(data).subscribe({
      next: () => {
        alert("✅ Admin créé !");
        localStorage.removeItem('adminData');
        this.router.navigate(['/admin-list']);
      },
      error: (err) => {
        alert("❌ " + err.error);
      }
    });
  }
}