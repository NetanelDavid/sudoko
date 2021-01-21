import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './components/main/app.component';
import { CellComponent } from './components/cell/cell.component';
import { ChartComponent } from './components/chart/chart.component';
import { SublenComponent } from './components/sublen/sublen.component';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    ChartComponent,
    SublenComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
