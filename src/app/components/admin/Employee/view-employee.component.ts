import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  employee: any;

  constructor(private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    // 🔹 récupérer la donnée résolue
    this.route.data.subscribe((data) => {
      this.employee = data['employee'];
    });
  }
  cancel() {
    this.router.navigate(['/employee-list']);
  }
}