import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { CommonModule } from '@angular/common'; // ✅ AJOUT

@Component({
  selector: 'app-employee-details',
  standalone: true, // ✅ important
  imports: [CommonModule], // ✅ AJOUT ICI
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
  
})
export class EmployeeDetailsComponent implements OnInit {

  employee: any;
  results: any[] = [];


  constructor(
    private service: EmployeeService,
    private route: ActivatedRoute
    
  ) {}

  ngOnInit(): void {
  this.route.data.subscribe((data) => {
    this.employee = data['details'];
    
  });
}

  onFileSelected(event: any, projectId: number) {
    
  const file = event.target.files[0];
  if (!file) return;

  const employeeId = this.employee?.id || this.employee?.Id;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('employeeId', employeeId.toString());
  formData.append('projectId', projectId.toString());

  this.service.importExcel(formData).subscribe({
    next: (res: any) => {
      const employeeId = this.employee?.id || this.employee?.Id;
  // 🔥 charger uniquement ce projet
  this.service.getWorkLogs(employeeId, projectId)
    .subscribe((data: any) => {
      const project = this.employee.projects.find((p: any) => p.id === projectId);
      if (project) {
        project.worklogs = data;
      }
    });
    // ✅ ALERTE SUCCESS
      alert('✅ Import réussi ! ' + res.length + ' ligne(s) ajoutée(s)');
    },
    error: (err) => {
      console.error(err);

      // ❌ ALERTE ERREUR (message backend)
      const msg = err?.error || 'Erreur inconnue';
      alert('❌ ' + msg);
    }
  });
}
}