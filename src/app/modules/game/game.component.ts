import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: [ './game.component.scss' ]
} )
export class GameComponent implements OnInit, OnDestroy {

  constructor (
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit (): void {
  }

  onLogout (): void {
    this.authService.signOut();
    this.router.navigate( [ '/autheticate' ] )
  }

  ngOnDestroy (): void {

  }


}
