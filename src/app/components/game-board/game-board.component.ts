import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from 'src/app/servicess/data.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  commands:string;
  
  focusC:number;
  focusB:number;
  typeFocus:string;
  
  constructor(private dataservice:DataService) {
    this.resetFocus();
  }
  
  ngOnInit(): void {}

  commandsEvent(command:string):void{
  this.commands=command;
    switch (command) {
      case 'new play':
        this.newPlay();
        break;
      }
    }

    focusEvent(id:string):void{
      document.getElementById(id).blur();
    }
    
    newPlay():void{
      this.dataservice.NewPlay();
      setTimeout(() => {
        this.resetFocus();
      }, 95);
    }

  @HostListener('document:keyup', ['$event'])
  KayDown(e:KeyboardEvent):void{
    switch (e.key) {

      case 'Up':
      case 'ArrowUp': 
        this.shiftFocus(-this.dataservice.length);
      break;
        
      case 'Down':
      case 'ArrowDown':
        this.shiftFocus(this.dataservice.length);
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

      let max=Math.pow(this.dataservice.length,2)-1;
      
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
