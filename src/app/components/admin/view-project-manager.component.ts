import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectManagerService } from '../../services/project-manager.service';

@Component({
  selector: 'app-view-project-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-project-manager.component.html',
  styleUrls: ['./view-project-manager.component.css']
})
export class ViewProjectManagerComponent implements OnInit {

  pm: any;

  constructor(
    private service: ProjectManagerService,
    private route: ActivatedRoute,
    private router: Router // ✅
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.pm = data['pm'];
      console.log(this.pm);
    });
  }

  cancel() {
    this.router.navigate(['/project-manager-list']);
  }
}