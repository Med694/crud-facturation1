import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { ProjectManagerStatisticsService } from '../../services/project-manager-statistics.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-project-manager-statistics',
  standalone: true,
  imports: [
    CommonModule,
     FormsModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './project-manager-statistics.component.html',
  styleUrls: ['./project-manager-statistics.component.css']
})
export class ProjectManagerStatisticsComponent implements OnInit {

  pmId!: number;
  chart: any;
  employeesChart: any;
  selectedMonth: number = new Date().getMonth() + 1;
selectedYear: number = new Date().getFullYear();
months = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' }
];

years = [2024, 2025, 2026];


  stats: any = {
    totalWorkLogs: 0,
    pendingWorkLogs: 0,
    approvedWorkLogs: 0,
    rejectedWorkLogs: 0
  };
 

  // ✅ liste best employees
  
  bestEmployees: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private statisticsService: ProjectManagerStatisticsService,
    private http: HttpClient
    
  ) {}

  ngOnInit(): void {

    this.pmId = Number(this.route.snapshot.paramMap.get('id'));

    // ✅ statistics
   this.route.data.subscribe((data) => {

  const result = data['data']; // 👈 important

  console.log(result);

  this.stats = result.stats;
  this.bestEmployees = result.bestEmployees;
    this.createBarChart(); // 👈 AJOUT ICI
      this.createEmployeesChart(); // ⭐ AJOUT ICI

});

   
  }
  createBarChart() {
  const ctx = document.getElementById('worklogsChart') as HTMLCanvasElement;

  this.chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        'Total',
        'Pending',
        'Approved',
        'Rejected'
      ],
      datasets: [{
        label: 'Worklogs',
        data: [
          this.stats.totalWorkLogs,
          this.stats.pendingWorkLogs,
          this.stats.approvedWorkLogs,
          this.stats.rejectedWorkLogs
        ],
        backgroundColor: [
          '#42A5F5',
          '#FFA726',
          '#66BB6A',
          '#EF5350'
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
createEmployeesChart() {

  const ctx = document.getElementById('employeesChart') as HTMLCanvasElement;

  const labels = this.bestEmployees.map(e => e.fullName);
  const scores = this.bestEmployees.map(e => e.score);

  this.employeesChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Employee Score',
        data: scores,
        backgroundColor: '#42A5F5'
      }]
    },
    options: {
      indexAxis: 'y', // ⭐ IMPORTANT → horizontal bar
      responsive: true,
      scales: {
        x: {
          beginAtZero: true
        }
      }
    }
  });
}
applyFilter() {

  this.http.get<any>(
    `https://localhost:7002/api/ProjectManagerStats/${this.pmId}?month=${this.selectedMonth}&year=${this.selectedYear}`
  ).subscribe(res => {

    this.stats = res;

    // 🔥 supprimer l'ancien chart
    if (this.chart) {
      this.chart.destroy();
    }

    this.createBarChart();
  });

  this.http.get<any>(
    `https://localhost:7002/api/ProjectManagerStats/best-employees/${this.pmId}?month=${this.selectedMonth}&year=${this.selectedYear}`
  ).subscribe(res => {

    this.bestEmployees = res;

    // 🔥 supprimer l'ancien chart
    if (this.employeesChart) {
      this.employeesChart.destroy();
    }

    this.createEmployeesChart();
  });
}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

}