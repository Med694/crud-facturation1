import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FinanceManagerService } from '../../../services/finance-manager.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-finance-manager-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-finance-manager-account.component.html',
  styleUrls: ['./edit-finance-manager-account.component.css']
  
})
export class EditFinanceManagerAccountComponent implements OnInit {

  id!: number;

  step1Data: any;

  formData = {
    username: '',
    email: '',
    password: ''
  };

  constructor(
    private service: FinanceManagerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.step1Data = history.state.step1Data;

    if (!this.step1Data) {
      alert("⚠️ Données manquantes");
      this.router.navigate(['/finance-manager-list']);
      return;
    }

    this.service.getById(this.id).subscribe((res: any) => {
      this.formData.email = res.email || '';
      this.formData.username = res.username || '';
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
        alert("✅ Finance Manager modifié avec succès");
        this.router.navigate(['/finance-manager-list']);
      },
      error: (err) => {
        console.log(err);
        alert("❌ " + err.error);
      }
    });
  }

  cancel() {
    this.router.navigate(['/finance-manager-list']);
  }
}