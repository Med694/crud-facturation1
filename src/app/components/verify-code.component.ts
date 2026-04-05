import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent {
  code: string = '';
  message: string = '';
  email: string = localStorage.getItem("email") || '';

  constructor(private http: HttpClient, private router: Router) {}

  verifyCode() {
    if (!this.email || !this.code) {
      this.message = 'Email ou code manquant !';
      return;
    }

    const body = { email: this.email, code: this.code };

    this.http.post<any>(
  `https://localhost:7002/api/auth/verify-code?email=${this.email}&code=${this.code}`,
  {}
)
      .subscribe({
        next: () => {
          alert('Code validé !');
          this.router.navigate(['/reset-password']);
        },
        error: (err) => {
          console.error(err);
          this.message = err?.error?.message || 'Erreur lors de la vérification du code';
        }
      });
  }
}