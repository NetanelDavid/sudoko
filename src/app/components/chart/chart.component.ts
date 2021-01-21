import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/servicess/data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  ShowSolution:boolean;
  TextSolution:string;
  IsSolution:boolean; 
  
  constructor(public dataService :DataService) { 
   this.TextSolution='פתור';
  }

  ngOnInit(): void {
  }

  NewPlay():void{
    this.dataService.NewPlay();
    if(this.IsSolution){
      this.solution();
    }
  }

  solution():void{
    this.IsSolution=!this.IsSolution;
    this.TextSolution=this.TextSolution=='פתור'?'הסר פתרון':'פתור';
  }

}
