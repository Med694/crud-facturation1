import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
  
})
export class EditEmployeeComponent implements OnInit {

  id!: number;

  formData = {
    fullName: '',
    email: '',
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.service.getProjects().subscribe((res: any) => {
      this.projects = res;
    });

    this.service.getForEdit(this.id).subscribe((res: any) => {
      this.formData = res;
      this.selectedProjectIds = res.projectIds;
    });
  }

  submit() {
    const payload = {
      ...this.formData,
      projectIds: this.selectedProjectIds
    };

    this.service.update(this.id, payload).subscribe({
      next: () => {
        alert("✅ Modifié avec succès");
        this.router.navigate(['/employee-list']);
      },
      error: (err) => {
        alert(err.error?.message || "❌ Erreur");
      }
    });
  }
}