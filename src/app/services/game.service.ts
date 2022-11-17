import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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

    startGame ( game: Game ): Observable<any> {
        return this.httpService.post( `${ environment.apiURL }startGame`, game );
    }
}