import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-delete-confirm-dialog',
  templateUrl: './user-delete-confirm-dialog.component.html',
  styleUrls: ['./user-delete-confirm-dialog.component.css']
})
export class UserDeleteConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UserDeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
