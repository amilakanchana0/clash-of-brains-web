import { Player } from './../../models/player.model';
import { Injectable } from '@angular/core';
import { PlayerConfig } from '../../models/playe-config.model';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Injectable( {
    providedIn: 'root'
} )
export class PlayerConfigService {
    gameId: number;
    constructor (
        private activatedRouter: ActivatedRoute,
        private router: Router,
    ) { }

    setGameId (): void {
        console.log( this.router.url )
        if ( this.activatedRouter.snapshot.params?.id ) {
            this.gameId = this.activatedRouter.snapshot.params?.id;
        }

    }

    setAuthToken ( playerConfig: PlayerConfig ): void {
        localStorage.setItem( 'playerConfig', JSON.stringify( playerConfig ) );
    }

    getAccessToken (): string {
        return ( JSON.parse( localStorage.getItem( 'playerConfig' ) ) as PlayerConfig ).AccessToken;
    }

    getCurrentPlayer (): Player {
        const playerConfig = JSON.parse( localStorage.getItem( 'playerConfig' ) ) as PlayerConfig;
        return { PlayerName: playerConfig.PlayerName, PlayerId: playerConfig.PlayerId } as Player;
    }

}
