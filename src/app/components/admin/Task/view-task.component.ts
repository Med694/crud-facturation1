import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
  
})
export class ViewTaskComponent implements OnInit {

  task: any;

  constructor(
    private route: ActivatedRoute,
    private service: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    this.task = this.route.snapshot.data['task'];
  }

  cancel() {
    this.router.navigate(['/task-list']);
  }
}