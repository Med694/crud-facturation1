import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {

    // 🔥 Vérifier si user vient de forgot-password
    const email = localStorage.getItem('resetEmail');

    if (!email) {
      // ❌ accès direct → redirection
      this.router.navigate(['/forgot-password']);
      return false;
    }

    return true; // ✅ autorisé
  }
}