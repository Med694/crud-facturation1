import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email = '';
  code = '';
  password = '';
  confirmPassword = '';
  isError = false;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  // Récupération depuis sessionStorage
  const storedEmail = sessionStorage.getItem('resetEmail');
  const storedCode = sessionStorage.getItem('resetCode');

  if (storedEmail && storedCode) {
    this.email = storedEmail;
    this.code = storedCode;
    // Ne pas supprimer tout de suite (pour gérer un éventuel rechargement)
  } else {
    // Fallback sur l'état du router (au cas où sessionStorage échoue)
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { email: string; code: string };
    if (state?.email && state?.code) {
      this.email = state.email;
      this.code = state.code;
    } else {
      // Redirection si aucune donnée
      this.router.navigate(['/forgot-password']);
    }
  }
}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.message = 'Passwords do not match';
      this.isError = true;
      return;
    }

    this.authService.resetPassword(this.email, this.code, this.password).subscribe({
      next: (res) => {
        this.message = 'Password changed successfully';
        this.isError = false;
        sessionStorage.removeItem('resetEmail');
        sessionStorage.removeItem('resetCode');
        localStorage.removeItem('email'); // nettoyage
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.message = err.error || 'Reset failed';
        this.isError = true;
      }
    });
  }
}