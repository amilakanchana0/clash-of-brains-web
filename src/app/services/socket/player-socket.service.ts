import { GamePlayerMap } from './../../models/game.-player-map.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from "socket.io-client";
import { environment } from 'src/environments/environment';

@Injectable( {
    providedIn: 'root'
} )
export class PlayerSocketService {
    players: BehaviorSubject<GamePlayerMap[]> = new BehaviorSubject<GamePlayerMap[]>( [] );
    oppoenentGame: BehaviorSubject<GamePlayerMap> = new BehaviorSubject<GamePlayerMap>( null );
    socket: Socket = io( environment.apiURL );

    public getNewMessage () {
        this.socket.on( 'message', ( message ) => {
            console.log( message );
        } );

    };

    public onPlayerJoined () {
        this.socket.on( 'playerJoined', ( message ) => {
            this.players.next( message );
        } );
    };

    public onAnswerSubmit () {
        this.socket.on( 'onAnswerSubmit', ( message ) => {
            console.log( 'message', message )
            this.oppoenentGame.next( message );
        } );
    };

    public disconnect () {
        // this.players.complete();
        // this.socket.disconnect();
    }

}