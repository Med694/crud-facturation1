import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  model = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  message = '';
  isError = false;
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {

    if (!this.model.email || !this.model.password || !this.model.confirmPassword) {
      this.message = "Tous les champs sont obligatoires";
      this.isError = true;
      return;
    }

    if (this.model.password !== this.model.confirmPassword) {
      this.message = "Les mots de passe ne correspondent pas";
      this.isError = true;
      return;
    }

    this.loading = true;

    const url = `https://localhost:7002/api/auth/reset-password?email=${this.model.email}&newPassword=${this.model.password}`;

    this.http.post<any>(url, {}).subscribe({
      next: (res) => {
        this.message = res.message + " | Role: " + res.role;
        this.isError = false;
        this.loading = false;

        // 🔐 Nettoyage
        localStorage.removeItem('resetEmail');

        // ✅ Redirection vers login
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        this.message = err.error || "Erreur lors du reset";
        this.isError = true;
        this.loading = false;
      }
    });
  }
}