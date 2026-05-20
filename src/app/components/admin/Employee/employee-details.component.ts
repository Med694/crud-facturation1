import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employee: any;

  constructor(
    private service: EmployeeService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
     private router: Router // ✅ AJOUT

  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.employee = data['details'];

      // 🔥 charger les worklogs
      this.loadWorkLogs();
    });
  }

  // ✅ BONNE FONCTION
  loadWorkLogs() {
    const employeeId = this.employee?.id || this.employee?.Id;

    this.employee.projects.forEach((p: any) => {
      this.service.getWorkLogs(employeeId, p.id)
        .subscribe((data: any) => {
          p.worklogs = data;
        });
    });
  }
  logout(){
    this.router.navigate(['/login']);
  }

  // ✅ IMPORT
  onFileSelected(event: any, projectId: number) {
    const file = event.target.files[0];
    if (!file) return;

    const employeeId = this.employee?.id || this.employee?.Id;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('employeeId', employeeId.toString());
    formData.append('projectId', projectId.toString());

    this.service.importExcelGlobal(formData).subscribe({
      next: (res: any) => {

        // 🔥 reload après import
        this.loadWorkLogs();

        this.dialogService.openInfo(
          "Succès",
          `Import réussi !`
        );
      },

      error: (err: any) => { // ✅ correction TS7006
        console.error(err);

        const msg = err?.error || 'Erreur inconnue';

        this.dialogService.openInfo(
          "Erreur",
          msg
        );
      }
    });
  }
}