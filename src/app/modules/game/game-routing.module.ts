import { ResultComponent } from './result/result.component';
import { InitGameComponent } from './init-game/init-game.component';
import { QuizeComponent } from './quize/quize.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: GameComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'init-game',
        component: InitGameComponent,
      },
      {
        path: 'game/:id',
        component: QuizeComponent,
      },
      {
        path: 'result/:isWon',
        component: ResultComponent,
      }
    ]
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class GameRoutingModule { }
