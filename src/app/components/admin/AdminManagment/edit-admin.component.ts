import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
  
})
export class EditAdminComponent implements OnInit {

  id!: number;

  formData = {
    fullName: '',
    city: '',
    phone: '',
    matricule: ''
  };

  constructor(
    private service: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getById(this.id).subscribe((res: any) => {
      this.formData = {
        fullName: res.fullName,
        city: res.city,
        phone: res.phone,
        matricule: res.matricule
      };
    });
  }

  submit() {

    if (!this.formData.fullName ||
        !this.formData.city ||
        !this.formData.phone ||
        !this.formData.matricule) {

      alert("⚠️ Tous les champs sont obligatoires");
      return;
    }

    // 🔥 aller étape 2
    this.router.navigate(['/edit-admin-account', this.id], {
      state: { step1Data: this.formData }
    });
  }
}