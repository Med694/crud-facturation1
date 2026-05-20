import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { ProjectManagerDashboardService } from '../../services/project-manager-dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { RejectDialogComponent } from '../Pop Up/reject-dialog.component';
import { DialogService } from '../../services/dialog.service';
import { ConfirmDialogComponent } from '../Pop Up/confirm-dialog.component';


@Component({
  selector: 'app-project-manager-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './project-manager-dashboard.component.html',
  styleUrls: ['./project-manager-dashboard.component.css']
})
export class ProjectManagerDashboardComponent implements OnInit {

  data: any;

  constructor(private route: ActivatedRoute,
                private router: Router,
                private service: ProjectManagerDashboardService,
                 private dialog: MatDialog,
        
                 private dialogService: DialogService
  ) {}
  pmId!: number;

  ngOnInit(): void {
    this.route.data.subscribe(res => {
       this.pmId = Number(localStorage.getItem('pmId'));
      this.data = res['pmData']; // 🔥 vient du resolver
      console.log(this.data);
    });
  }
  selectedWorklogs: any[] = [];

toggleSelection(worklog: any, event: any) {
  if (event.target.checked) {
    this.selectedWorklogs.push(worklog);
  } else {
    this.selectedWorklogs = this.selectedWorklogs.filter(
      w => w.id !== worklog.id
    );
  }
}
  parseDetails(detailsJson: string) {
  try {
    return JSON.parse(detailsJson);
  } catch {
    return [];
  }
}
rejectSelected() {

  if (this.selectedWorklogs.length === 0) {
    this.dialogService.openInfo("Info", "Aucun worklog sélectionné");
    return;
  }

  const dialogRef = this.dialog.open(RejectDialogComponent, {
    width: '400px'
  });

  dialogRef.afterClosed().subscribe(comment => {

    if (!comment) return;

    const ids = this.selectedWorklogs.map(w => w.id);

    this.service.rejectMultiple(ids, comment).subscribe(() => {

      this.data = this.data.map((p: any) => ({
        ...p,
        employees: p.employees.map((e: any) => ({
          ...e,
          workLogs: e.workLogs.map((w: any) => {
            if (!ids.includes(w.id)) return w;

            return {
              ...w,
              status: 'Rejected',
              rejectionComment: comment
            };
          })
        }))
      }));

      this.selectedWorklogs = [];

      this.dialogService.openInfo("Rejet", "Worklogs rejetés !");
    });
  });
}
approveSelected() {

  if (this.selectedWorklogs.length === 0) {
    this.dialogService.openInfo("Info", "Aucun worklog sélectionné");
    return;
  }

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '400px',
    data: {
      title: 'Confirmation',
      message: `Approuver ${this.selectedWorklogs.length} worklogs ?`
    }
  });

  dialogRef.afterClosed().subscribe(result => {

    if (!result) return;

    const ids = this.selectedWorklogs.map(w => w.id);

    this.service.approveMultiple(ids).subscribe(() => {

      this.data = this.data.map((p: any) => ({
        ...p,
        employees: p.employees.map((e: any) => ({
          ...e,
          workLogs: e.workLogs.filter((w: any) => !ids.includes(w.id))
        }))
      }));

      this.selectedWorklogs = [];

      this.dialogService.openInfo("Succès", "Worklogs approuvés !");
    });

  });
}
logout() {
  localStorage.clear(); // supprime token + user data
  sessionStorage.clear();

  // redirection vers login
  this.router.navigate(['/login']);
}
}