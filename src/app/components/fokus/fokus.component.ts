import { Component,HostListener, OnInit } from '@angular/core';

const shifting = window.innerWidth/25;

@Component({
  selector: 'app-fokus',
  templateUrl: './fokus.component.html',
  styleUrls: ['./fokus.component.css']
})
export class FokusComponent implements OnInit {

  TopBall =5;
  LeftBall =5;
  SizeBall=100;

  WidthCourt = window.innerWidth;
  HeightCourt = window.innerHeight-50;
  
  @HostListener('document:keyup', ['$event'])
  onKayUp(e:KeyboardEvent):void{
    switch (e.key) {

      case 'Down':
      case 'ArrowDown': this.shift(shifting,0);
      break;
    
      case 'Up':
      case 'ArrowUp': this.shift(-shifting,0);
      break;
      
      case 'Left':
      case 'ArrowLeft':this.shift(0,-shifting);
      break;

      case 'Right':
      case 'ArrowRight' :this.shift(0,shifting);
      default:
      break;
    }
  }
  constructor() { }
   

  ngOnInit(): void {
  }

  shift(top:number,left:number):void{
     
    this.TopBall += top;
    this.LeftBall += left;

    if(this.TopBall<0){
      this.TopBall=0;
    }

    else if(this.LeftBall<0){
     this.LeftBall=0;
    }

    else if(this.TopBall>this.HeightCourt-this.SizeBall){
      this.TopBall=this.HeightCourt-this.SizeBall;
    }

    else if(this.LeftBall>this.WidthCourt-this.SizeBall){
      this.LeftBall=this.WidthCourt-this.SizeBall;
    }
  }


}
