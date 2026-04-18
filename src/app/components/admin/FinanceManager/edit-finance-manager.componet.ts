import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FinanceManagerService } from '../../../services/finance-manager.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-finance-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-finance-manager.component.html',
    styleUrls: ['./edit-finance-manager.component.css']
  
})
export class EditFinanceManagerComponent implements OnInit {

  id!: number;

  formData = {
    fullName: '',
    matricule: '',
    telephone: '',
    ville: '',
    service: ''
  };

  constructor(
    private service: FinanceManagerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getById(this.id).subscribe((res: any) => {
      this.formData = {
        fullName: res.fullName,
        matricule: res.matricule,
        telephone: res.telephone,
        ville: res.ville,
        service: res.service
      };
    });
  }

  submit() {

    if (!this.formData.fullName ||
        !this.formData.matricule ||
        !this.formData.telephone ||
        !this.formData.ville ||
        !this.formData.service) {

      alert("⚠️ Tous les champs sont obligatoires");
      return;
    }

    // 👉 passage vers step 2
    this.router.navigate(
      ['/edit-finance-manager-account', this.id],
      { state: { step1Data: this.formData } }
    );
  }
}