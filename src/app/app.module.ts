import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app/app.component';
import { CellComponent } from './components/cell/cell.component';
import { ChartComponent } from './components/chart/chart.component';
import { SublenComponent } from './components/subLength/subLength.component';
import { ButtonsSolvingComponent } from './components/buttons-solving/buttons-solving.component';
import { GameBoardComponent } from './components/game-board/game-board.component';

const routes: Routes =[
  {path: '', component:SublenComponent},
  {path:'solution/:subLength',component:GameBoardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    ChartComponent,
    SublenComponent,
    ButtonsSolvingComponent,
    GameBoardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
