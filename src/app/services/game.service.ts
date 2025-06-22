import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GamePlayerMap } from '../models/game.-player-map.model';
import { Game } from '../models/game.model';
import { HttpService } from './http/http.service';

@Injectable( { providedIn: 'root' } )
export class GameService {
    constructor (
        private httpService: HttpService
    ) { }

    createGame ( game: Game ): Observable<any> {
        return this.httpService.post( `${ environment.apiURL }createGame`, game );
    }

    joinGame ( id: number ): Observable<any> {
        return this.httpService.get( `${ environment.apiURL }joinGame?gameId=${ id }` );
    }

    getGameById ( id: number ): Observable<any> {
        return this.httpService.get( `${ environment.apiURL }getGameById?gameId=${ id }` );
    }

    onAnswerSubmit ( gamePlayerMap: GamePlayerMap ): Observable<any> {
        return this.httpService.post( `${ environment.apiURL }onAnswerSubmit`, gamePlayerMap );
    }

    updateWinner ( id: number ): Observable<any> {
        return this.httpService.get( `${ environment.apiURL }updateWinner?gameId=${ id }` );
    }
}