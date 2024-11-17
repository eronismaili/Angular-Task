import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-my-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `<h1 mat-dialog-title>Dialog</h1>
             <div mat-dialog-content>{{ data.name }}</div>
             <div mat-dialog-actions>
               <button mat-button mat-dialog-close>Close</button>
             </div>`
})
export class MyDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

export class DialogComponent {
}
