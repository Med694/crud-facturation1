import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router'; // ✅ ajouter Router
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule,RouterOutlet,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stats: any = {
    admins: 0,
    projectManagers: 0,
    financeManagers: 0,
    employees: 0,
    clients: 0,
    projects: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router // ✅ injecter Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ stats }) => {
      this.stats = stats;
    });
  }
  

  // ✅ LOGOUT FUNCTION
  logout() {
    localStorage.clear(); // supprimer session
    this.router.navigate(['/login'], { replaceUrl: true }); // redirection
  }
}