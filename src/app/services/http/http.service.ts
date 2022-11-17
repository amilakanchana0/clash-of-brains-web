import { AuthService } from './../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class HttpService {
  constructor (
    private http: HttpClient,
    private authService: AuthService
  ) { }

  get ( url: string ): Observable<any> {
    return this.http.get( url, {
      headers: new HttpHeaders( {
        Authorization: `Bearer ${ this.authService.getAccessToken() }`
      } )
    } );
  }

  post ( url: string, data: any ): Observable<any> {
    return this.http.post( url, data, {
      headers: new HttpHeaders( {
        Authorization: `Bearer ${ this.authService.getAccessToken() }`
      } )
    } );
  }

}
