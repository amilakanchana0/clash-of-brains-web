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
  ) { }

  ngOnInit (): void {
    this.activatedRouter.params.subscribe( ( params: Params ) => {
      this.isWon = params?.isWon == 'true';

    } );
  }

  onPlayAgain (): void {
    this.router.navigate( [ '/init-game' ] )
  }

  onHome (): void {
    this.router.navigate( [ '/' ] )
  }

}
