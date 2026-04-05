import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-create-employee-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-employee-details.component.html',
  styleUrls: ['./create-employee-details.component.css']
})
export class CreateEmployeeDetailsComponent implements OnInit {

  formData = {
    fullName: '',
    phoneNumber: '',
    matricule: '',
    city: '',
    speciality: '',
    grade: ''
  };

  projects: any[] = [];
  selectedProjectIds: number[] = [];

  constructor(
    private service: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.getProjects().subscribe((res: any) => {
      this.projects = res;
    });
  }

  submit() {

    // 🔴 validation
    if (!this.formData.fullName ||
        !this.formData.phoneNumber ||
        !this.formData.matricule ||
        !this.formData.city ||
        !this.formData.speciality ||
        !this.formData.grade) {

      alert("⚠️ Tous les champs sont obligatoires !");
      return;
    }

    if (this.formData.phoneNumber.length !== 8) {
      alert("❌ Le numéro doit contenir 8 chiffres !");
      return;
    }

    if (!this.selectedProjectIds.length) {
      alert("⚠️ Sélectionnez au moins un projet !");
      return;
    }

    const matriculeRegex = /^FL[0-9]+$/;
    if (!matriculeRegex.test(this.formData.matricule)) {
      alert("❌ Matricule doit être FL1234");
      return;
    }

    // 🔥 stocker
    localStorage.setItem('empData', JSON.stringify({
      ...this.formData,
      projectIds: this.selectedProjectIds
    }));

    this.router.navigate(['/create-employee']);
  }
}