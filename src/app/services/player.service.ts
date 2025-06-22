import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from './http/http.service';
import { environment } from 'src/environments/environment';

@Injectable( {
    providedIn: 'root'
} )
export class PlayerService {

    constructor (
        private httpService: HttpService
    ) { }

    getTop5Players (): Observable<any> {
        return this.httpService.get( `${ environment.apiURL }getTop5Players` );
    }

}
