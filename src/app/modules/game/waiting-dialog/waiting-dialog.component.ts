import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component( {
  selector: 'app-waiting-dialog',
  templateUrl: './waiting-dialog.component.html',
  styleUrls: [ './waiting-dialog.component.scss' ]
} )
export class WaitingDialogComponent implements OnInit {

  constructor (
    private matDialogRef: MatDialogRef<WaitingDialogComponent>
  ) { }

  ngOnInit (): void {
    setTimeout( () => {
      this.onClose();
    }, 5000 );
  }

  onClose (): void {
    this.matDialogRef.close();
  }

}
