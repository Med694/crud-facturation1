import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [CommonModule, FormsModule], // HttpClientModule non nécessaire ici
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent {
  code: string = '';
  message: string = '';      // ← propriété bien déclarée
  email: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.email = localStorage.getItem('email') || '';
  }
  

  verifyCode() {
    const email = localStorage.getItem('email');
    if (!email || !this.code) {
      this.message = 'Email ou code manquant !';
      return;
    }

    this.http.post(
      `https://localhost:7002/api/auth/verify-code?email=${encodeURIComponent(email)}&code=${encodeURIComponent(this.code)}`,
      {}
    ).subscribe({
      next: () => {
        alert('Code validé !');
        sessionStorage.setItem('resetEmail', email);
        sessionStorage.setItem('resetCode', this.code);
        this.router.navigate(['/reset-password'], {
           state: { email, code: this.code }
        });
      },
      error: (err) => {
        console.error(err);
        this.message = err?.error || 'Erreur lors de la vérification du code';
      }
    });
  }
}