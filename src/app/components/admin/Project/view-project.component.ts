import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/projet.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  project: any;

  constructor(
    private route: ActivatedRoute,
    private service: ProjectService,
    private router: Router
  ) {}

  ngOnInit() {
  this.project = this.route.snapshot.data['project'];
}
cancel() {
  this.router.navigate(['/project-list']);
}

}