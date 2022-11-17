import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable( { providedIn: 'root' } )
export class ApiErrorHandlingService {
    private apiError: Subject<any> = new Subject();
    constructor () { }

    setError ( err: any ): void {
        this.apiError.next( err );
    }

    getError (): Subject<any> {
        return this.apiError;
    }

}