import { Player } from './../../models/player.model';
import { PlayerConfigService } from './../../services/auth/player-config.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: [ './game.component.scss' ]
} )
export class GameComponent implements OnInit, OnDestroy {

  currntPlayer: Player;
  constructor (
    private authService: AuthService,
    private router: Router,
    private playerConfigService: PlayerConfigService
  ) { }

  ngOnInit (): void {
    this.getCurrentPlayer();
  }

  getCurrentPlayer (): void {
    this.currntPlayer = this.playerConfigService.getCurrentPlayer();
  }

  onLogout (): void {
    this.authService.signOut();
    this.router.navigate( [ '/autheticate' ] )
  }

  ngOnDestroy (): void {

  }


}
