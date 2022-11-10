import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
} )
export class HomeComponent implements OnInit {
  players: any[] = [
    {
      name: 'Abel Tesfye',
      points: 12890,
    },
    {
      name: 'Sam Smith',
      points: 2300,
    },
    {
      name: 'Zyan Malik',
      points: 1232,
    },
  ];

  constructor (
    private router: Router
  ) { }

  ngOnInit (): void {
  }

  onStartGame (): void {
    this.router.navigate( [ '/init-game' ] )
  }

}
