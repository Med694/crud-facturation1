import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinanceManagerService } from '../../../services/finance-manager.service';

@Component({
  selector: 'app-view-finance-manager',
  templateUrl: './view-finance-manager.component.html',
  styleUrls: ['./view-finance-manager.component.css']
})
export class ViewFinanceManagerComponent implements OnInit {

  fm: any;

  constructor(
    private route: ActivatedRoute,
    private service: FinanceManagerService
  ) {}

  ngOnInit() {
    this.fm = this.route.snapshot.data['fm'];
  }

  cancel() {
    history.back();
  }
}