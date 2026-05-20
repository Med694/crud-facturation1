import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reject-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './reject-dialog.component.html'
})
export class RejectDialogComponent {


  comment: string = '';
  showError = false;

  constructor(private dialogRef: MatDialogRef<RejectDialogComponent>) {}

  close() {
    this.dialogRef.close();
  }
  
 
submit() {
  if (!this.comment || this.comment.trim() === '') {
    this.showError = true;
    return;
  }
    this.dialogRef.close(this.comment);
}
}