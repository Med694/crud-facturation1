import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: any[] = [];

  constructor(
    private route: ActivatedRoute, // 🔥 important
    private service: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    // 🔥 récupérer les données du resolver
    this.employees = this.route.snapshot.data['employees'];
  }

  // 🔹 NAVIGATION
  create() {
    this.router.navigate(['/create-employee-details']);
  }

  view(id: number) {
    this.router.navigate(['/view-employee', id]);
  }

  edit(id: number) {
    this.router.navigate(['/edit-employee', id]);
  }

  // 🔹 DELETE
  delete(id: number) {
    const confirmDelete = confirm("Voulez-vous supprimer cet employee ?");
    if (!confirmDelete) return;

    // UI instant
    this.employees = this.employees.filter(e => e.id !== id);

    // backend
    this.service.delete(id).subscribe({
      next: () => console.log("Deleted"),
      error: (err) => {
        console.error(err);
        alert("Erreur suppression");
      }
    });
  }
  employeeDetails(id: number) {
  this.router.navigate(['/employee-details', id]);
}
  logout(){
    this.router.navigate(['/login']);
  }
}