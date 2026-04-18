import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  client: any = {
    id: 0,
    fullName: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    projectIds: []
  };

  allProjects: any[] = []; // 🔥 liste de tous les projets
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private service: ClientService,
    private router: Router
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.id = +idParam;

      // 🔹 1. charger client
      this.service.edit(this.id).subscribe({
        next: (res) => {
          this.client = res;
        },
        error: () => {
          alert('Client introuvable');
          this.router.navigate(['/client-list']);
        }
      });

      // 🔹 2. charger TOUS les projets
      this.service.getProjects().subscribe({
        next: (res) => {
          this.allProjects = res;
        },
        error: () => {
          alert('Erreur chargement projets');
        }
      });
    }
  }

  // 🔥 UPDATE
  update() {
    this.service.update(this.id, this.client).subscribe({
      next: () => {
        alert('Client modifié avec succès');
        this.router.navigate(['/client-list']);
      },
      error: (err) => {
        alert(err.error.message);
      }
    });
  }

  back() {
    this.router.navigate(['/client-list']);
  }
}