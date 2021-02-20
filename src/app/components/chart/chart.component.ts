import { Component, HostListener, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  focusC:number;
  focusB:number;
  typeFocus:string;
 
  constructor(public dataService :DataService ,  private activatedRoute: ActivatedRoute ,private router:Router) {
    this.resetFocus();
    this.TextSolution='פתור';

    this.activatedRoute.paramMap.subscribe(
      prameter => {
        let subLength = +prameter.get('subLength');
        if(this.dataService.setSubLength(subLength)){
          this.dataService.constArrProper();
          this.arr = new Array(this.dataService.length);
        } else{
          this.router.navigate(['play',this.dataService.defaultSubLength]);
        }
      }
    );
    
  }

  ngOnInit(): void { }

  solution(id?:string):void{
    this.IsSolution=!this.IsSolution;
    this.TextSolution=this.TextSolution=='פתור'?'הסר פתרון':'פתור';
    if(id){
      this.clickFocus(id);
    }
  }

  NewPlay(id:string):void{

    this.dataService.NewPlay();
    document.getElementById(id).blur();
    setTimeout(() => {
      this.resetFocus();
    }, 95);

    this.IsNewPlay=true;
    setTimeout(() => {
      this.IsNewPlay=false;
    });

    if(this.IsSolution){
      this.solution();
    }
  }
  
  @HostListener('document:keyup', ['$event'])
  KayDown(e:KeyboardEvent):void{
    switch (e.key) {

      case 'Up':
      case 'ArrowUp': 
        this.shiftFocus(-this.dataService.length);
      break;
        
      case 'Down':
      case 'ArrowDown':
        this.shiftFocus(this.dataService.length);
      break;
          
      case 'Left':
      case 'ArrowLeft':  
        this.shiftFocus(-1);
      break;
            
      case 'Right':
      case 'ArrowRight':
        this.shiftFocus(1);
      break;

      case 'Control':
        this.shiftFocus(0); 
      break; 
      
     case 'Enter':
        this.enter();
      break;
    }
  }

  enter():void{
    if(this.typeFocus=='c'){
      this.shiftFocus(this.dataService.length);
    }
  }
            
  shiftFocus(chang:number):void{

    if(chang==0){
      if(this.typeFocus=='b'){
        this.typeFocus='c';
        if(this.focusC==-1){
          this.focusC++;
        }
        this.focusing(this.focusC);
      } else {
        this.typeFocus='b';
        this.focusB=0;
        this.focusing(this.focusB);
      }
      return;
    }

    if(this.typeFocus=='c'){

      if(this.IsSolution){
        return;
      }

      let max=Math.pow(this.dataService.length,2)-1;
      
      if(this.focusC==-1 && chang>0){
        this.focusC=0;
      } else if (this.focusC==-1 && chang<0) {
        this.focusC=max;      
      } else if(this.focusC==max && chang>0 ){
        this.focusC=0;
      } else if(this.focusC==0 && chang<0 ){
        this.focusC=max;
      } else{
        this.focusC+=chang;
      }
      
      if(this.focusC<0){
        this.focusC += max;
      }  else if(this.focusC > max){
        this.focusC -= max;
      }
     this.focusing(this.focusC);
    }
    
    if(this.typeFocus=='b'){
      
      let max = 2;
      
      if (chang>0) {
        this.focusB++;
      } else if(chang<0){
        this.focusB--;
      }
      
      if(this.focusB>max){
        this.focusB = 0;
      } else if(this.focusB<0){
        this.focusB=max;
      }
      this.focusing(this.focusB);
    }
  }

  focusing(i:number){
    document.getElementById(this.typeFocus+i).focus();
  }  

  clickFocus(id:string):void{

    this.typeFocus=id.substring(0,1);

    if(this.typeFocus=='c'){
      this.focusC=parseInt(id.substring(1));
    } else if(this.typeFocus=='b'){
      this.focusB=parseInt(id.substring(1));
    }
  }

  resetFocus():void{
    this.typeFocus='c';
    this.focusC=-1;
    this.focusB=0;
  }
}
          