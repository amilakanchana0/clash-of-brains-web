import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class COBHttpInterceptor implements HttpInterceptor {

  constructor () { }

  intercept ( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    const modified: HttpRequest<any> = request.clone(
      {
        setHeaders: { Authorization: 'bearer xx.yy.zz' }
      }
    );
    return next.handle( modified ).pipe(
      map( ( event: HttpEvent<any> ) => {
        if ( event instanceof HttpResponse ) {
          console.log( 'event--->>>', event );
        }
        return event;
      } ),
      catchError( ( err: HttpErrorResponse ) => {
        console.log( 'errr--->>>', err );
        return throwError( err );
      } )

    );
  }
}
