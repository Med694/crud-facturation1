import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-finance-manager-statistics',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './finance-manager-statistics.component.html',
  styleUrls: ['./finance-manager-statistics.component.css']


})
export class FinanceManagerStatisticsComponent implements OnInit {

  stats: any = {
    totalWorkLogs: 0,
    totalClients: 0,
    totalProjects: 0,
    totalEmployees: 0,
    totalRevenue: 0
  };

  topClients: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    // 👇 IDENTIQUE AU PROJECT MANAGER
    this.route.data.subscribe((data) => {

      const result = data['data'];

      console.log(result);

   this.stats = result.dashboard.stats;
      this.topClients = result.topClients;

    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}