import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app/app.component';
import { CellComponent } from './components/cell/cell.component';
import { ChartComponent } from './components/chart/chart.component'
import { ButtonsSolvingComponent } from './components/buttons-solving/buttons-solving.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { ElectionsComponent } from './components/elections/elections.component';
import { ButtonsPuzzleComponent } from './components/buttons-puzzle/buttons-puzzle.component';

const routes: Routes =[
  {path: '', component:ElectionsComponent},
  {path: 'elections', component:ElectionsComponent},
  {path:':typegame/:subLength',component:GameBoardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    ChartComponent,
    ButtonsSolvingComponent,
    GameBoardComponent,
    ElectionsComponent,
    ButtonsPuzzleComponent,
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
