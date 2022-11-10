import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component( {
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: [ './auth.component.scss' ]
} )
export class AuthComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  constructor (
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }


  ngOnInit (): void {
    this.createForm();
    this.redirectAfterAuthenticate();
  }

  createForm (): void {
    this.form = this.fb.group( {
      playerName: [ null, Validators.required ],
      password: [ null, Validators.required ],
    } )
  }

  redirectAfterAuthenticate (): void {
    if ( this.authService.isLoggedIn() ) {
      this.router.navigate( [ '/' ] )
    }

  }

  onSignIn (): void {
    this.authService.signIn();
    this.redirectAfterAuthenticate();
  }

  ngOnDestroy (): void {

  }

}
