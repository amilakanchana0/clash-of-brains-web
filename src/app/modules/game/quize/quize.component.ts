import { Game } from '../../../models/game.model';
import { GameService } from './../../../services/game.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SmailAPIService } from '../../../services/smilte-api.service';
import { WaitingDialogComponent } from '../waiting-dialog/waiting-dialog.component';

@Component( {
  selector: 'app-quize',
  templateUrl: './quize.component.html',
  styleUrls: [ './quize.component.scss' ]
} )
export class QuizeComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  imgeUrl!: string;
  isBothJoined: boolean;
  game: Game;
  ticks: number[] = [];
  constructor (
    private router: Router,
    private smaileApi: SmailAPIService,
    private matDialog: MatDialog,
    private gameService: GameService,
    private activatedRouter: ActivatedRoute
  ) { }


  ngOnInit (): void {
    this.getQuize();
    this.waitingForOtherPlayer();
    this.startGame();
  }

  startGame (): void {
    this.activatedRouter.params.subscribe( ( params: Params ) => {
      if ( params.id ) {
        this.subscriptions.add( this.gameService.startGame( { GameId: params.id } as Game ).subscribe( ( res: any ) => {
          this.game = res.Content;
          this.ticks = Array.from( Array( this.game.NoOfQuestions ).keys() )
        } ) );
      }
    } )

  }

  waitingForOtherPlayer (): void {
    const ref: MatDialogRef<WaitingDialogComponent> = this.matDialog.open( WaitingDialogComponent, {
      width: '50vw',
      height: '60vh'
    } );
    ref.afterClosed().subscribe( () => {
      this.isBothJoined = true;
    } );
  }

  getQuize (): void {

    this.subscriptions.add( this.smaileApi.getQueize().subscribe( ( res: any ) => {
      this.imgeUrl = res.question;
    } ) );
  }

  onSubmit (): void {
    this.router.navigate( [ '/result' ] )
  }

  ngOnDestroy (): void {

  }

}
