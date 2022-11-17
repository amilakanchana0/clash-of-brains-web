import { Player } from './../../models/player.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { PlayerConfigService } from '../../services/auth/player-config.service';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { ApiErrorHandlingService } from '../../services/interceptor/api-error-handling.service';

@Component( {
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: [ './auth.component.scss' ]
} )
export class AuthComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  loading$: Observable<boolean>;
  loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( false );
  subscriptions: Subscription = new Subscription();
  constructor (
    private router: Router,
    private authService: AuthService,
    private playerConfigService: PlayerConfigService,
    private fb: FormBuilder,
    private apiErrorHandlingService: ApiErrorHandlingService
  ) { }


  ngOnInit (): void {
    this.loading$ = this.loadingSubject.asObservable();
    this.createForm();
    this.redirectAfterAuthenticate();
    this.handlleApiError();
  }

  createForm (): void {
    this.form = this.fb.group( {
      playerName: [ null, Validators.required ],
      password: [ null, Validators.required ],
    } )
  }

  handlleApiError (): void {
    this.subscriptions.add( this.apiErrorHandlingService.getError().subscribe( ( res: any ) => {
      this.loadingSubject.next( false );
      this.form.reset();
    } ) );
  }

  redirectAfterAuthenticate (): void {
    if ( this.authService.isLoggedIn() ) {
      this.router.navigate( [ '/' ] )
    }

  }

  onSignIn (): void {
    if ( this.form.invalid ) {
      this.form.markAllAsTouched();
      return;
    }
    this.loadingSubject.next( true );
    const player: Player = new Player( this.form.value.playerName, this.form.value.password );
    this.subscriptions.add( this.authService.signIn( player ).subscribe( ( res: any ) => {
      this.onSuccessfullAuth( res );
    } ) );
  }

  onSignUp (): void {
    if ( this.form.invalid ) {
      this.form.markAllAsTouched();
      return;
    }
    const player: Player = new Player( this.form.value.playerName, this.form.value.password );
    this.loadingSubject.next( true );
    this.subscriptions.add( this.authService.signUp( player ).subscribe( ( res: any ) => {
      this.onSuccessfullAuth( res );
    } ) );

  }

  onSuccessfullAuth ( res: any ): void {
    this.playerConfigService.setAuthToken( res.Content );
    this.loadingSubject.next( false );
    this.redirectAfterAuthenticate();
  }

  ngOnDestroy (): void {
    this.subscriptions.unsubscribe();
  }

}
