import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { PlayerConfigService } from './player-config.service';

@Injectable( {
  providedIn: 'root'
} )
export class AuthGuard implements CanActivate {
  constructor (
    private router: Router,
    private authService: AuthService,
    private playerConfigService: PlayerConfigService,
  ) { }
  canActivate ( route: ActivatedRouteSnapshot ): boolean {
    if ( this.authService.isLoggedIn() ) {
      return true;
    }
    this.playerConfigService.gameId = route.params?.id;
    this.playerConfigService.setGameId();
    this.router.navigate( [ '/autheticate' ] )
    return false;
  }

}
