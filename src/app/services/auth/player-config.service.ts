import { Player } from './../../models/player.model';
import { Injectable } from '@angular/core';
import { PlayerConfig } from '../../models/playe-config.model';


@Injectable( {
    providedIn: 'root'
} )
export class PlayerConfigService {

    constructor () { }

    setAuthToken ( playerConfig: PlayerConfig ): void {
        localStorage.setItem( 'playerConfig', JSON.stringify( playerConfig ) );
    }

    getAccessToken (): string {
        return ( JSON.parse( localStorage.getItem( 'playerConfig' ) ) as PlayerConfig ).AccessToken;
    }

}
