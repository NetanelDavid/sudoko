import { Component, HostListener, Input, OnInit} from '@angular/core';
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
  fokus:number;
 
  constructor(public dataService :DataService) {
    this.fokus=-1; 
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
  
  ngOnInit(): void {
  }
  
  @HostListener('document:keyup', ['$event'])
  onKayUp(e:KeyboardEvent):void{
    switch (e.key) {
      
      case 'Up':
      case 'ArrowUp': 
        this.focusing(-this.dataService.length);
      break;
        
      case 'Down':
      case 'ArrowDown': 
      case 'Enter':
        this.focusing(this.dataService.length);
      break;
          
      case 'Left':
      case 'ArrowLeft':
        this.focusing(-1);
      break;
            
      case 'Right':
      case 'ArrowRight':
        this.focusing(1);
      break;
    }
  }
            
  focusing(chang:number):void{
    
    let max=Math.pow(this.dataService.length,2)-1;
    
    if(this.fokus==max && chang>0 ){
      this.fokus=0;
    }
    else if(this.fokus==0 && chang<0 ){
      this.fokus=max;
    }
    else{
      this.fokus+=chang;
    }

    if(this.fokus<0){
      this.fokus += max;
    }  else if(this.fokus > max){
      this.fokus -= max;
    }
    document.getElementById(this.fokus+'').focus();
  }

  clickFokus(f:string):void{
    this.fokus=parseInt(f);
  }
            
}
          