import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-view-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {

  client: any;

  constructor(
    private route: ActivatedRoute,
    private service: ClientService,
    private router: Router
  ) {}

  ngOnInit() {
    
  this.client = this.route.snapshot.data['client'];
  }

  back() {
    this.router.navigate(['/client-list']);
  }
}