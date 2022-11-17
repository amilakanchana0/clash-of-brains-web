import { Player } from './../../../models/player.model';
import { PlayerService } from './../../../services/player.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerSocketService } from '../../../services/socket/player-socket.service';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
} )
export class HomeComponent implements OnInit, OnDestroy {
  top5Players: Player[] = [];
  subscriptions: Subscription = new Subscription();
  constructor (
    private router: Router,
    private playerService: PlayerService,
    private playerSocketService: PlayerSocketService
  ) { }

  ngOnInit (): void {
    this.playerSocketService.getNewMessage();
    this.getTop5Players();
  }

  getTop5Players (): void {
    this.subscriptions.add( this.playerService.getTop5Players().subscribe( ( res: any ) => {
      this.top5Players = res.Content;
    } ) );
  }

  onStartGame (): void {
    // this.playerSocketService.sendMessage( 'testsocket' );
    this.router.navigate( [ '/init-game' ] )
  }

  ngOnDestroy (): void {
    this.subscriptions.unsubscribe();
  }

}
