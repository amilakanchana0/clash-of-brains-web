import { GameStatus } from './../../../constants/game-status.type';
import { GamePlayerQuestionMap } from './../../../models/game-player-question-map.model';
import { Player } from './../../../models/player.model';
import { PlayerConfigService } from './../../../services/auth/player-config.service';
import { PlayerSocketService } from './../../../services/socket/player-socket.service';
import { GamePlayerMap } from './../../../models/game.-player-map.model';
import { Game } from '../../../models/game.model';
import { GameService } from './../../../services/game.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SmailAPIService } from '../../../services/smilte-api.service';
import { WaitingDialogComponent } from '../waiting-dialog/waiting-dialog.component';
import { FormControl } from '@angular/forms';

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
  gamePlayers: GamePlayerMap[] = [];
  currentPlayerGame: GamePlayerMap;
  opponentGame: GamePlayerMap;
  currntPlayer: Player;
  currentQuestionIndex: number;
  currentAnswer: number;
  answerCtrl: FormControl = new FormControl();
  isInvalidAnswer: boolean;
  constructor (
    private router: Router,
    private smaileApi: SmailAPIService,
    private matDialog: MatDialog,
    private gameService: GameService,
    private activatedRouter: ActivatedRoute,
    private playerSocketService: PlayerSocketService,
    private playerConfigService: PlayerConfigService
  ) { }


  ngOnInit (): void {
    this.currentQuestionIndex = 0;
    this.getCurrentPlayer();
    this.getQuize();
    this.getGame();
    this.playerSocketService.onPlayerJoined();
    this.playerSocketService.onAnswerSubmit();
    this.setOpponentGameState();
  }

  getCurrentPlayer (): void {
    this.currntPlayer = this.playerConfigService.getCurrentPlayer();
    this.playerConfigService.gameId = null;
  }

  setOpponentGameState (): void {
    this.subscriptions.add( this.playerSocketService.oppoenentGame.subscribe( ( oppoenentGame: GamePlayerMap ) => {
      if ( oppoenentGame && oppoenentGame.GameId == this.game.GameId && oppoenentGame.PlayerId == this.opponentGame.PlayerId ) {
        this.opponentGame = oppoenentGame;
        if ( this.opponentGame.Questions.every( ( question: GamePlayerQuestionMap ) => question.IsCompleted ) ) {
          this.router.navigate( [ '/result', false, this.game.GameId ] );
        }
      }
    } ) );
  }


  joinGame ( gameId: number ): void {
    this.subscriptions.add( this.gameService.joinGame( gameId ).subscribe( ( res: any ) => {
      if ( res.Content.length < 2 ) {
        this.waitingForOtherPlayer();
      } else {
        this.gamePlayers = res.Content;
        this.setPlayers();
        this.isBothJoined = true;
      }
    } ) );
  }

  getGame (): void {
    this.activatedRouter.params.subscribe( ( params: Params ) => {
      if ( params.id ) {
        this.subscriptions.add( this.gameService.getGameById( params.id ).subscribe( ( res: any ) => {
          this.game = res.Content;
          if ( this.game.Status != GameStatus.Completed ) {
            this.joinGame( params.id );
          } else {
            this.router.navigate( [ '/' ] );
          }

        } ) );

      }
    } );
  }

  waitingForOtherPlayer (): void {
    const ref: MatDialogRef<WaitingDialogComponent> = this.matDialog.open( WaitingDialogComponent, {
      width: '70vw',
      height: '60vh',
      disableClose: true,
    } );
    ref.afterClosed().subscribe( () => {
      this.isBothJoined = true;
      this.setPlayers();
    } );

    this.subscriptions.add( this.playerSocketService.players.subscribe( ( players: GamePlayerMap[] ) => {
      this.gamePlayers = players;
      console.log( this.gamePlayers );
      if ( players.length > 1 ) ref.close();
    } ) );
  }


  setPlayers (): void {
    this.currentPlayerGame = this.gamePlayers.find( ( p: GamePlayerMap ) => p.PlayerId == this.currntPlayer.PlayerId );
    this.opponentGame = this.gamePlayers.find( ( p: GamePlayerMap ) => p.PlayerId != this.currntPlayer.PlayerId );
  }

  getQuize (): void {
    this.subscriptions.add( this.smaileApi.getQueize().subscribe( ( res: any ) => {
      this.imgeUrl = res.question;
      this.currentAnswer = res.solution;
      this.answerCtrl.reset();
    } ) );
  }

  onSubmit (): void {
    if ( this.answerCtrl.value == this.currentAnswer ) {
      this.currentPlayerGame.Questions[ this.currentQuestionIndex ].IsCompleted = true;
      this.currentQuestionIndex++;
      this.gameService.onAnswerSubmit( this.currentPlayerGame ).subscribe();
      this.getQuize();
    } else {
      this.isInvalidAnswer = true;
    }
    if ( this.currentQuestionIndex >= this.currentPlayerGame.Questions.length ) {
      this.router.navigate( [ '/result', true, this.game.GameId ] );
    }

  }

  onAnswerFocused (): void {
    this.isInvalidAnswer = false;
  }

  ngOnDestroy (): void {
    this.playerSocketService.disconnect();
  }

}
