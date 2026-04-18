import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectManagerDashboardService } from '../../services/project-manager-dashboard.service';

@Component({
  selector: 'app-project-manager-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-manager-dashboard.component.html',
  styleUrls: ['./project-manager-dashboard.component.css']
})
export class ProjectManagerDashboardComponent implements OnInit {

  data: any;

  constructor(private route: ActivatedRoute,
                private service: ProjectManagerDashboardService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(res => {
      this.data = res['pmData']; // 🔥 vient du resolver
      console.log(this.data);
    });
  }
  parseDetails(detailsJson: string) {
  try {
    return JSON.parse(detailsJson);
  } catch {
    return [];
  }
}
refuseWorklog(project: any, employee: any, worklog: any) {

  if (!worklog?.id) {
    alert("ID worklog manquant !");
    return;
  }

  if (!confirm('❌ Refuser ce worklog ?')) return;

  this.service.deleteWorklog(worklog.id).subscribe(() => {

    // ✅ rebuild propre du state Angular
    this.data = this.data.map((p: any) => {
      if (p !== project) return p;

      return {
        ...p,
        employees: p.employees.map((e: any) => {
          if (e !== employee) return e;

          return {
            ...e,
            workLogs: e.workLogs.filter(
              (w: any) => w.id !== worklog.id
            )
          };
        })
      };
    });

    alert('❌ Worklog supprimé');
  });
}
approveWorklog(worklog: any) {

  if (!worklog?.id) {
    alert("ID manquant !");
    return;
  }

  if (!confirm('✅ Approuver ce worklog ?')) return;

  this.service.approveWorklog(worklog.id).subscribe(() => {

    // supprimer de la liste PM (car déjà envoyé au finance)
    this.data = this.data.map((p: any) => ({
      ...p,
      employees: p.employees.map((e: any) => ({
        ...e,
        workLogs: e.workLogs.filter((w: any) => w.id !== worklog.id)
      }))
    }));

    alert('✅ Worklog envoyé au Finance Manager');
  });
}
}