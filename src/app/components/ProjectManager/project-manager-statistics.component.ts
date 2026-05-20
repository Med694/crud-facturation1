import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ProjectManagerStatisticsService } from '../../services/project-manager-statistics.service';

@Component({
  selector: 'app-project-manager-statistics',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './project-manager-statistics.component.html',
  styleUrls: ['./project-manager-statistics.component.css']
})
export class ProjectManagerStatisticsComponent implements OnInit {

  pmId!: number;


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
    private statisticsService: ProjectManagerStatisticsService
  ) {}

  ngOnInit(): void {

    this.pmId = Number(this.route.snapshot.paramMap.get('id'));

    // ✅ statistics
   this.route.data.subscribe((data) => {

  const result = data['data']; // 👈 important

  console.log(result);

  this.stats = result.stats;
  this.bestEmployees = result.bestEmployees;

});

   
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}