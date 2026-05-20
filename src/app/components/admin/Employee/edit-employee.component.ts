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
  tasks: any[] = [];
selectedTaskIds: number[] = [];

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
      this.selectedTaskIds = res.taskIds; // 🔥 IMPORTANT
    });
  }
  onProjectsChange() {
  this.tasks = [];

  if (!this.selectedProjectIds.length) return;

  this.selectedProjectIds.forEach(projectId => {
    this.service.getTasksByProject(projectId).subscribe((res: any) => {

      this.tasks = [
        ...this.tasks,
        ...res.filter((t: any) =>
          !this.tasks.some(x => x.id === t.id)
        )
      ];

    });
  });
}
toggleTask(id: number) {
  if (this.selectedTaskIds.includes(id)) {
    this.selectedTaskIds = this.selectedTaskIds.filter(x => x !== id);
  } else {
    this.selectedTaskIds.push(id);
  }
}


  submit() {
    const payload = {
      ...this.formData,
      projectIds: this.selectedProjectIds,
      taskIds: this.selectedTaskIds   // ✅ AJOUT IMPORTANT
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