import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.css']
 
})
export class ViewAdminComponent implements OnInit {

  admin: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.admin = data['admin']; // 🔥 récupéré du resolver
    });
  }

  cancel() {
    this.router.navigate(['/admin-list']);
  }
}