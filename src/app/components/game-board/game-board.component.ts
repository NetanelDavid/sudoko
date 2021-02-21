import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/focus.environments';
import { DataService } from 'src/app/servicess/data.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  commands:string;
    
  constructor(private dataservice:DataService) {
    this.resetFocus();
  }
  
  ngOnInit(): void {}

  commandsEvent(command:string):void{
    this.commands=command;
  }
    
  @HostListener('document:keyup', ['$event'])
  keyDown(e:KeyboardEvent):void{
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
      if(environment.typeFocus=='b'){
        environment.typeFocus='c';
        if(environment.focusC==-1){
          environment.focusC++;
        }
        this.focusing(environment.focusC);
      } else {
        environment.typeFocus='b';
        environment.focusB=0;
        this.focusing(environment.focusB);
      }
      return;
    } else if(environment.typeFocus=='c'){
      
      let max=Math.pow(this.dataservice.length,2)-1;
      
      if(environment.focusC==-1 && chang>0){
        environment.focusC=0;
      } else if (environment.focusC==-1 && chang<0) {
        environment.focusC=max;      
      } else if(environment.focusC==max && chang>0 ){
        environment.focusC=0;
      } else if(environment.focusC==0 && chang<0 ){
        environment.focusC=max;
      } else{
        environment.focusC+=chang;
      }
      
      if(environment.focusC<0){
        environment.focusC += max;
      }  else if(environment.focusC > max){
        environment.focusC -= max;
      }
      this.focusing(environment.focusC);
    } else if(environment.typeFocus=='b'){
      
      let max = 2;
      
      if (chang>0) {
        environment.focusB++;
      } else if(chang<0){
        environment.focusB--;
      }
      
      if(environment.focusB>max){
        environment.focusB = 0;
      } else if(environment.focusB<0){
        environment.focusB=max;
      }
      this.focusing(environment.focusB);
    }
  }

  focusing(i:number){
    document.getElementById(environment.typeFocus+i).focus();
  } 

  resetFocus():void{
    environment.resetFocus();
  }
}