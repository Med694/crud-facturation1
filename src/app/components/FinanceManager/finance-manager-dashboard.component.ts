import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceManagerDashboardService } from '../../services/finance-manager-dashboard.service';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../Pop Up/info-dialog.component'; // adapte le chemin



@Component({
  selector: 'app-finance-manager-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './finance-manager-dashboard.component.html',
  styleUrls: ['./finance-manager-dashboard.component.css']
  
})
export class FinanceManagerDashboardComponent implements OnInit {

  worklogs: any[] = [];


  constructor(private service: FinanceManagerDashboardService, private route: ActivatedRoute,private router: Router,private dialog: MatDialog) {}

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
openPopup(title: string, message: string) {
  this.dialog.open(InfoDialogComponent, {
    data: {
      title,
      message
    },
    width: '400px'
  });
}
openInvoice(clientId: number) {

  this.service.getInvoicePdf(clientId).subscribe({
    next: (blob) => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    },

    error: async (err) => {

      let reason = "Erreur inconnue";

      try {
        if (err.error instanceof Blob) {
          const text = await err.error.text();
          const json = JSON.parse(text);
          reason = json.reason || json.message || reason;
        }
        else if (err.error?.reason) {
          reason = err.error.reason;
        }
        else if (err.error?.message) {
          reason = err.error.message;
        }
        else if (typeof err.error === 'string') {
          reason = err.error;
        }
      } catch (e) {}

      this.openPopup("Facture bloquée par l'IA", reason);
    }
  });
}
sendInvoice(clientId: number) {
  this.service.sendInvoice(clientId).subscribe({
    next: (res) => {
      this.openPopup("Succès", "Facture envoyée par email avec succès.");
    },
    error: (err) => {
      console.error(err);
     this.openPopup("Erreur", "Erreur lors de l'envoi de la facture.");
    }
  });
}

logout() {
  localStorage.clear(); // ou token remove
  this.router.navigate(['/login']); // si router injecté
}

}