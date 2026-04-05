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

        // ✅ sécuriser le token
        const token = res.token || 'fake-token';

        localStorage.setItem('token', token);
        localStorage.setItem('role', res.role || '');

        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => alert('Identifiants invalides')
    });
  }
}
}