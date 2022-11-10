import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-init-game',
  templateUrl: './init-game.component.html',
  styleUrls: [ './init-game.component.scss' ]
} )
export class InitGameComponent implements OnInit {

  constructor (
    private router: Router
  ) { }

  ngOnInit (): void {
  }

  onStartGame (): void {
    this.router.navigate( [ '/game' ] )
  }

}
