import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../components/Pop Up/info-dialog.component';

@Injectable({ providedIn: 'root' })
export class DialogService {

  constructor(private dialog: MatDialog) {}

  openInfo(title: string, message: string) {
    this.dialog.open(InfoDialogComponent, {
      width: '400px',
      data: { title, message }
    });
  }
}