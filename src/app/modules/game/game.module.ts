import { MaterialModule } from './../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { HomeComponent } from './home/home.component';
import { QuizeComponent } from './quize/quize.component';
import { InitGameComponent } from './init-game/init-game.component';
import { ResultComponent } from './result/result.component';


@NgModule( {
  declarations: [
    GameComponent,
    HomeComponent,
    QuizeComponent,
    InitGameComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    MaterialModule
  ]
} )
export class GameModule { }
