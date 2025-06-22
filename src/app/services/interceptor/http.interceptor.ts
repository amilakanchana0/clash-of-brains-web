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
import { NotificationService } from '../layout/notification.service';
import { ApiErrorHandlingService } from './api-error-handling.service';

@Injectable()
export class COBHttpInterceptor implements HttpInterceptor {

  constructor (
    private notificationService: NotificationService,
    private apiErrorHandlingService: ApiErrorHandlingService
  ) { }

  intercept ( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {

    return next.handle( request ).pipe(
      map( ( event: HttpEvent<any> ) => {
        if ( event instanceof HttpResponse ) {
          console.log( 'event--->>>', event );
        }
        return event;
      } ),
      catchError( ( err: HttpErrorResponse ) => {
        console.log( 'errr--->>>', err );
        this.notificationService.openSnackBar( err.error.Message );
        this.apiErrorHandlingService.setError( err.error );
        return throwError( err );
      } )

    );
  }
}
