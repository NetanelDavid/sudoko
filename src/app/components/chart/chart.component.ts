import { Component, Input, OnInit} from '@angular/core';
import { DataService } from 'src/app/servicess/data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {
  
  arr:any[];
  IsSolution:boolean; 
  IsNewPlay:boolean;
  TextSolution:string;
  length:number;
 
  constructor(public dataService :DataService) { 
    this.length=this.dataService.length;
    this.dataService.difflength();
    this.arr = new Array(this.dataService.length);
    this.TextSolution='פתור';
  }

  solution():void{
    this.IsSolution=!this.IsSolution;
    this.TextSolution=this.TextSolution=='פתור'?'הסר פתרון':'פתור';
  }

  NewPlay():void{

    this.dataService.NewPlay();

    this.IsNewPlay=true;
    setTimeout(() => {
      this.IsNewPlay=false;
    }, 0);

    if(this.IsSolution){
      this.solution();
    }
  }
  
  ngOnInit(): void {}
}
