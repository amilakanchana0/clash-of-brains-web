import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-quize',
  templateUrl: './quize.component.html',
  styleUrls: [ './quize.component.scss' ]
} )
export class QuizeComponent implements OnInit {

  constructor (
    private router: Router
  ) { }

  ngOnInit (): void {
  }

  onSubmit (): void {
    this.router.navigate( [ '/result' ] )
  }

}
