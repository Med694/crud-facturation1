import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  data: any[] = [];

  constructor(
    private service: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    
  this.data = this.route.snapshot.data['data'];

  }

  loadData() {
    this.service.getAll().subscribe({
      next: (res) => this.data = res,
      error: (err) => console.error(err)
    });
  }

  delete(id: number) {
    const confirmDelete = confirm("Voulez-vous vraiment supprimer cet Admin ?");

    if (!confirmDelete) return;

    this.data = this.data.filter(x => x.id !== id);

    this.service.delete(id).subscribe({
      next: () => console.log("Admin supprimé"),
      error: () => alert("Erreur suppression serveur")
    });
  }
  edit(id: number) {
  this.router.navigate(['/edit-admin', id]);
}
view(id: number) {
  this.router.navigate(['/view-admin', id]);
}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}