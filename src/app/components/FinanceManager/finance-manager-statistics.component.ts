import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Chart, registerables } from 'chart.js';
import { FormsModule } from '@angular/forms';
import{HttpClient} from '@angular/common/http';

Chart.register(...registerables);
@Component({
  selector: 'app-finance-manager-statistics',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    FormsModule
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
  chart: any;
financeClientChart: any;
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

  topClients: any[] = [];
  projectCostChart: any;
  projectCostData: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    // 👇 IDENTIQUE AU PROJECT MANAGER
    this.route.data.subscribe((data) => {

      const result = data['data'];

      console.log(result);

   this.stats = result.dashboard.stats;
      this.topClients = result.topClients;
      this.loadProjectCost();
       setTimeout(() => {
      this.createFinanceChart();
        this.createTopClientsChart(); // ⭐ NEW CHART
          this.createProjectCostChart(); // ⭐ ADD THIS
    }, 100);

    });
  }
  createFinanceChart() {

  const ctx = document.getElementById('financeChart') as HTMLCanvasElement;

  // ✅ destroy ancien chart si existe
  if (this.chart) {
    this.chart.destroy();
  }

  this.chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Approved WorkLogs', 'Projects', 'Clients', 'Employees'],
      datasets: [{
        label: 'Finance KPIs',
        data: [
          this.stats.totalWorkLogsApproved,
          this.stats.totalProjects,
          this.stats.totalClients,
          this.stats.totalEmployees
        ],
        backgroundColor: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0']
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
createTopClientsChart() {

  const ctx = document.getElementById('financeClientChart') as HTMLCanvasElement;

  // ✅ destroy ancien chart si existe
  if (this.financeClientChart) {
    this.financeClientChart.destroy();
  }

  const labels = [
    'Total Revenue',
    ...this.topClients.map(c => c.clientName)
  ];

  const values = [
    this.stats.totalRevenue,
    ...this.topClients.map(c => c.totalRevenue)
  ];

  this.financeClientChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Revenue Breakdown',
        data: values,
        backgroundColor: [
          '#4CAF50',
          ...this.topClients.map(() => '#2196F3')
        ]
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      scales: {
        x: { beginAtZero: true }
      }
    }
  });
}
loadProjectCost() {
  this.http.get<any>(
    `https://localhost:7002/api/FinanceManagerStatistics/finance/projects-cost?month=${this.selectedMonth}&year=${this.selectedYear}`
  ).subscribe(res => {
    this.projectCostData = res || [];

    setTimeout(() => {
      this.createProjectCostChart();
    }, 50);
  });
}
createProjectCostChart() {

  const canvas = document.getElementById('projectCostChart') as HTMLCanvasElement;

  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  if (this.projectCostChart) {
    this.projectCostChart.destroy();
  }

  if (!this.projectCostData || this.projectCostData.length === 0) {
    console.log("No project cost data");
    return;
  }

  const labels = this.projectCostData.map(p => p.projectName);
  const values = this.projectCostData.map(p => p.cost);

  this.projectCostChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Project Cost',
        data: values,
        backgroundColor: '#3b82f6'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}



applyFilter() {
  // recharge dashboard + top clients avec filtre

  // ⚡ dashboard
  this.http.get<any>(
    `https://localhost:7002/api/FinanceManagerStatistics/finance/dashboard/full?month=${this.selectedMonth}&year=${this.selectedYear}`
  ).subscribe(res => {
    this.stats = res.stats;

    this.createFinanceChart();
  });

  // ⚡ top clients
  this.http.get<any>(
    `https://localhost:7002/api/FinanceManagerStatistics/finance/top-clients?month=${this.selectedMonth}&year=${this.selectedYear}`
  ).subscribe(res => {
    this.topClients = res;

    this.createTopClientsChart();
  });
   // 🔥 NEW: projects cost
 this.loadProjectCost();
}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}