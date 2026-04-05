import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectManagerService } from '../../services/project-manager.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-project-manager-account.component.html',
 styleUrls: ['./edit-project-manager-account.component.css']
})
export class EditAccountComponent implements OnInit {

  id!: number;

  // 🔹 données étape 1
  step1Data: any;

  // 🔹 formulaire étape 2
  formData = {
    username: '',
    email: '',
    password: ''
  };

  constructor(
    private service: ProjectManagerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
  this.id = Number(this.route.snapshot.paramMap.get('id'));

  this.step1Data = history.state.step1Data;

  if (!this.step1Data) {
    alert("⚠️ Données étape 1 manquantes !");
    this.router.navigate(['/project-manager-list']);
    return;
  }

  

  // 🔥 UN SEUL appel API
  this.service.getPMById(this.id).subscribe((res: any) => {
    this.formData.email = res.email || '';
    this.formData.username = res.username || '';
  });
}

  submit() {

    if (!this.formData.email || !this.formData.username) {
      alert("⚠️ Email et Username obligatoires");
      return;
    }

    // 🔥 fusion des données (étape 1 + étape 2)
    const finalData = {
      ...this.step1Data,
      username: this.formData.username,
      email: this.formData.email,
      password: this.formData.password
    };

    console.log("DATA ENVOYÉE :", finalData);

    // 🔥 appel API UNIQUE
    this.service.updatePM(this.id, finalData).subscribe({
      next: () => {
        alert("✅ Modification complète réussie");
        this.router.navigate(['/project-manager-list']);
      },
      error: (err) => {
        console.log(err);
        alert("❌ " + err.error);
      }
    });
  }
  cancel() {
  this.router.navigate(['/project-manager-list']);
}
}