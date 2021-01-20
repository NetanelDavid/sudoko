import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/servicess/data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  ShowSolution:boolean;
  CellToChart:number[];
  TextSolution:string;
  IsSolution:boolean; 
  IsNewPlay:boolean;
  
  constructor(public dataService :DataService) { 
   this.TextSolution='פתור';
   
   this.CellToChart=new Array(this.dataService.len);
   for (let i=0; i < this.CellToChart.length; i++) {
      this.CellToChart[i]=i;
   }
  }

  ngOnInit(): void {
  }

  NewPlay():void{
    this.dataService.NewPlay();
    this.IsNewPlay=!this.IsNewPlay;
    if(this.IsSolution){
      this.solution();
    }
  }

  solution():void{
    this.IsSolution=!this.IsSolution;
    this.TextSolution=this.TextSolution=='פתור'?'הסר פתרון':'פתור';
  }

}
