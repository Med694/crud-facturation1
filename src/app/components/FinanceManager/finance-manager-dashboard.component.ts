import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceManagerDashboardService } from '../../services/finance-manager-dashboard.service';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  selector: 'app-finance-manager-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './finance-manager-dashboard.component.html',
  styleUrls: ['./finance-manager-dashboard.component.css']
  
})
export class FinanceManagerDashboardComponent implements OnInit {

  worklogs: any[] = [];

  constructor(private service: FinanceManagerDashboardService, private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
  this.worklogs = this.route.snapshot.data['worklogs'];
}

  loadData() {
    this.service.getApprovedWorklogs().subscribe(data => {
      this.worklogs = data;
      console.log(this.worklogs);
    });
  }

  parseDetails(detailsJson: string) {
  try {
    return JSON.parse(detailsJson);
  } catch {
    return [];
  }
}
openInvoice(clientId: number) {
  this.service.getInvoicePdf(clientId).subscribe(blob => {
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  });
}
logout() {
  localStorage.clear(); // ou token remove
  this.router.navigate(['/login']); // si router injecté
}

}