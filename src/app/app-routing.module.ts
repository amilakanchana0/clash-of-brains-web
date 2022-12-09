import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import( './modules/game/game.module' ).then( ( m: any ) => m.GameModule )

  },
  {
    path: 'autheticate',
    loadChildren: () => import( '../app/modules/auth/auth.module' ).then( ( m: any ) => m.AuthModule ),
  }
];

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule { }
