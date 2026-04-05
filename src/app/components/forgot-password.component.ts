import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls:['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendCode(){
  console.log("Button clicked");

  const email = this.form.value.email;

  this.auth.forgotPassword(email).subscribe({
    next: (res: any) => {
      alert(res.message);
      localStorage.setItem("email", email);
      this.router.navigate(['/verify-code']);
    },
    error: (err) => alert(err.error)
  });
}

}