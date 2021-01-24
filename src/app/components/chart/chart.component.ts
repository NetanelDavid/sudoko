import { Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { DataService } from 'src/app/servicess/data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit ,OnChanges{

  @Input()SubLength:number;
  
  arr:any[];
  IsSolution:boolean; 
  IsNewPlay:boolean;
  ISFresh:boolean; 
 
  ngOnChanges(changes: SimpleChanges): void {

    if(!changes.SubLength.previousValue){
      return;
    }

    else{
      this.DeefLength();
    }
  }

  DeefLength():void{
    this.arr = new Array(this.dataService.len);
    this.fresh();
  }

  
  NewPlay():void{
    this.dataService.NewPlay();
    this.fresh();
  }

  fresh(){

    this.ISFresh=true;
    setTimeout(() => {
      this.ISFresh=false;
    }, 0);

    if(this.IsSolution){
      this.solution();
    }
  }
  
  solution():void{
    this.IsSolution=!this.IsSolution;
    this.TextSolution=this.TextSolution=='פתור'?'הסר פתרון':'פתור';
  }
  
  TextSolution:string;
  constructor(public dataService :DataService) { 
    this.arr=new Array(this.dataService.len);
    this.TextSolution='פתור';

    this.ISFresh=false;
    this.IsSolution=false;
  }

  ngOnInit(): void {

  }


}
