import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { ApiErrorHandlingService } from './services/interceptor/api-error-handling.service';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent implements OnInit {
  title = 'clash-of-brains';

  constructor (
    private apiErrorHandlingService: ApiErrorHandlingService,
    private router: Router,
    private authService: AuthService
  ) {


  }
  ngOnInit (): void {
    this.apiErrorHandlingService.getError().subscribe( ( val: any ) => {
      if ( val == "Forbidden" ) {
        this.authService.signOut();
        this.router.navigate( [ '/autheticate' ] );
      }
    } );
  }
}
