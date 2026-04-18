import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, // Composant standalone
  imports: [ReactiveFormsModule, CommonModule,RouterModule], // <- IMPORTANT
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
  if (this.loginForm.valid) {

    const dto = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    };

    this.auth.login(dto).subscribe({

      next: (res: any) => {
        console.log("Response =", res);

        // ✅ stockage
        localStorage.setItem('token', res.token || '');
        localStorage.setItem('role', res.role || '');
        localStorage.setItem('userId', res.userId || '');

        const role = (res.role || '').toLowerCase().replace(/\s/g, '');
        console.log("ROLE =", role);

        switch (role) {

          case 'admin':
            this.router.navigate(['/dashboard']);
            break;

          case 'projectmanager':
            const pmId = res.projectManagerId; // ✅ IMPORTANT

            if (!pmId) {
              alert('❌ Aucun Project Manager lié à cet utilisateur');
              return;
            }

            localStorage.setItem('pmId', pmId); // optionnel

            this.router.navigate(['/project-manager-dashboard', pmId]); // ✅ BON ID
            break;

          case 'financemanager':
            this.router.navigate(['/finance-manager-dashboard']);
            break;

          case 'user':
            this.router.navigate(['/employee-dashboard']);
            break;

          default:
            alert('❌ Rôle inconnu: ' + res.role);
            this.router.navigate(['/']);
            break;
        }
      },

      error: (err: any) => {
        console.error(err);
        alert(err?.error || 'Identifiants invalides');
      }
    });
  }
}
}