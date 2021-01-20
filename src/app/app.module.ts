import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './compo/main/app.component';
import { CellComponent } from './compo/cell/cell.component';
import { ChartComponent } from './compo/chart/chart.component';
import { LenComponent } from './compo/len/len.component';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    ChartComponent,
    LenComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
