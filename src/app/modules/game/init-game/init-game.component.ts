import { NotificationService } from './../../../services/layout/notification.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { GameService } from '../../../services/game.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Game } from '../../../models/game.model';
import { ApiErrorHandlingService } from '../../../services/interceptor/api-error-handling.service';

@Component( {
  selector: 'app-init-game',
  templateUrl: './init-game.component.html',
  styleUrls: [ './init-game.component.scss' ]
} )
export class InitGameComponent implements OnInit, OnDestroy {
  url: FormControl = new FormControl();
  noOfQuestions: FormControl = new FormControl( null, Validators.required );
  subscriptions: Subscription = new Subscription();
  loading$: Observable<boolean>;
  loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( false );
  newGameId: number;
  constructor (
    private router: Router,
    private gameService: GameService,
    private apiErrorHandlingService: ApiErrorHandlingService,
    private notificationService: NotificationService
  ) { }

  ngOnInit (): void {
    this.loading$ = this.loadingSubject.asObservable();
    this.handlleApiError();
  }

  onGenerateGame (): void {
    if ( this.noOfQuestions.valid ) {
      this.loadingSubject.next( true );
      this.subscriptions.add( this.gameService.createGame( new Game( this.noOfQuestions.value ) ).subscribe( ( res: any ) => {
        this.newGameId = res.Content.GameId;
        this.url.setValue( `http://localhost:4200/game/${ res.Content.GameId }` );
        this.loadingSubject.next( false );
      } ) );
    }

  }

  onClipboardCopy ( isSuccessful: boolean ): void {
    if ( isSuccessful ) {

      this.notificationService.openSnackBar( 'URL coppied to clipboard' );
    } else {

      this.notificationService.openSnackBar( 'Failed to copy URL, try again' );
    }
  }

  handlleApiError (): void {
    this.subscriptions.add( this.apiErrorHandlingService.getError().subscribe( ( res: any ) => {
      this.loadingSubject.next( false );
    } ) );
  }

  onStartGame (): void {

    this.router.navigate( [ '/game', this.newGameId ] );
  }

  ngOnDestroy (): void {
    this.subscriptions.unsubscribe();
  }

}
