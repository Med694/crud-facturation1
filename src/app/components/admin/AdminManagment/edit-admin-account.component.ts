import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-admin-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-admin-account.component.html',
  styleUrls: ['./edit-admin-account.component.css']
  
 
})
export class EditAdminAccountComponent implements OnInit {

  id!: number;

  step1Data: any;

  formData = {
    username: '',
    email: '',
    password: ''
  };

  constructor(
    private service: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.step1Data = history.state.step1Data;

    if (!this.step1Data) {
      alert("⚠️ Données manquantes !");
      this.router.navigate(['/admin-list']);
      return;
    }

    this.service.getById(this.id).subscribe((res: any) => {
      this.formData.username = res.username;
      this.formData.email = res.email;
    });
  }

  submit() {

    if (!this.formData.email || !this.formData.username) {
      alert("⚠️ Email et Username obligatoires");
      return;
    }

    const finalData = {
      ...this.step1Data,
      username: this.formData.username,
      email: this.formData.email,
      password: this.formData.password
    };

    this.service.update(this.id, finalData).subscribe({
      next: () => {
        alert("✅ Admin modifié");
        this.router.navigate(['/admin-list']);
      },
      error: (err) => {
        alert("❌ " + err.error);
      }
    });
  }

  cancel() {
    this.router.navigate(['/admin-list']);
  }
}