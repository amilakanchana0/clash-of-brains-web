import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from "socket.io-client";
import { environment } from 'src/environments/environment';

@Injectable( {
    providedIn: 'root'
} )
export class PlayerSocketService {
    socket: Socket = io( environment.apiURL );

    public sendMessage ( message: any ) {
        this.socket.emit( 'message', { message, id: 29 } );
    }

    public getNewMessage () {
        this.socket.on( 'message', ( message ) => {
            console.log( message );
        } );


    };
}