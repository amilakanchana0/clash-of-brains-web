import { environment } from './../../../environments/environment';
import { Player } from './../../models/player.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayerConfigService } from './player-config.service';

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  constructor (
    private http: HttpClient,
    private playerConfigService: PlayerConfigService
  ) { }

  signUp ( player: Player ): Observable<any> {
    return this.http.post( `${ environment.apiURL }signUp`, player );
  }

  signIn ( player: Player ): Observable<any> {
    return this.http.post( `${ environment.apiURL }signIn`, player );
  }

  getAccessToken (): string {
    return this.playerConfigService.getAccessToken();
  }

  signOut (): void {
    localStorage.clear();
  }

  isLoggedIn (): boolean {
    return !!localStorage.getItem( 'playerConfig' );
  }
}
