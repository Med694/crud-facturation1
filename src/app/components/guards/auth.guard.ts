import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (token) {
    return true; // ✅ autorisé
  }

  // ❌ pas connecté → redirection login
  router.navigate(['/login']);
  return false;
};