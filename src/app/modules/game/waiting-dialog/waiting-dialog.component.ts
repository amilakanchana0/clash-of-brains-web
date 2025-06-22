import { GamePlayerMap } from './../../../models/game.-player-map.model';
import { PlayerSocketService } from './../../../services/socket/player-socket.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'app-waiting-dialog',
  templateUrl: './waiting-dialog.component.html',
  styleUrls: [ './waiting-dialog.component.scss' ]
} )
export class WaitingDialogComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  constructor (
    private matDialogRef: MatDialogRef<WaitingDialogComponent>,
  ) { }

  ngOnInit (): void {

  }

  onClose (): void {
    this.matDialogRef.close();
  }

  ngOnDestroy (): void {
    this.subscriptions.unsubscribe();
  }
}
