import { GameService } from './../../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component( {
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: [ './result.component.scss' ]
} )
export class ResultComponent implements OnInit {
  isWon: boolean;

  constructor (
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private gameSerice: GameService
  ) { }

  ngOnInit (): void {
    this.activatedRouter.params.subscribe( ( params: Params ) => {
      if ( params?.isWon ) {
        this.isWon = params.isWon == 'true';
        if ( this.isWon && params?.gameId ) {
          this.updateWinner( params.gameId );
        }
      }

    } );
  }

  updateWinner ( gameId: number ): void {
    this.gameSerice.updateWinner( gameId ).subscribe();
  }

  onPlayAgain (): void {
    this.router.navigate( [ '/init-game' ] )
  }

  onHome (): void {
    this.router.navigate( [ '/' ] )
  }

}
