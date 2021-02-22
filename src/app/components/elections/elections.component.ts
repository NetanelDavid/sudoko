import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/servicess/data.service';

@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.css']
})
export class ElectionsComponent implements OnInit {
  
  subLength:number;
  typeGame:string;
  difficulty:string;
  focus:number;
  HeightBackground = window.innerHeight;
  
  constructor(public dataservice:DataService,private router :Router) {
    this.focus=1;
  }
  
  ngOnInit(): void {
    document.getElementById(this.focus+'1').focus();
  }

  move():void{
    this.router.navigate([this.typeGame,this.subLength+'']);
  }

  @HostListener('document:keyup', ['$event'])
  KayDown(e:KeyboardEvent):void{
    switch (e.key) {
      case 'Control':
        this.focusing(); 
      break;     
    }
  }

  focusing():void{
    this.focus++;
    let max = this.typeGame ? 3 : 2 ;
    if(this.focus>max){
      this.focus =1;
    }
    if(this.focus==1){
      document.getElementById(this.focus+(this.typeGame=='solution'?'2':'1')).focus();
    }
    else{
      document.getElementById(this.focus+'').focus();
    }
  }

  selectType(v:string):void{
    this.typeGame=v;
  }

}
