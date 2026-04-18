
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FinanceManagerService } from '../../../services/finance-manager.service';

@Component({
  selector: 'app-finance-manager-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './finance-manager-list.component.html',
  styleUrls: ['./finance-manager-list.component.css']
  
})
export class FinanceManagerListComponent implements OnInit {

  data: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: FinanceManagerService,
    private router: Router
  ) {}

 ngOnInit() {
  this.data = this.route.snapshot.data['data'];
}

  delete(id: number) {
    const confirmDelete = confirm("Voulez-vous vraiment supprimer ce Finance Manager ?");

    if (!confirmDelete) return;

    // suppression UI immédiate
    this.data = this.data.filter(x => x.id !== id);

    this.service.delete(id).subscribe({
      next: () => console.log('Supprimé côté serveur'),
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la suppression !');
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}