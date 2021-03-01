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
  level:string;
  disabledB:boolean;

  focus:number;
  HeightBackground = window.innerHeight;
  
  constructor(public dataservice:DataService,private router :Router) {
    this.focus=-1;
  }
  
  ngOnInit(): void {
    document.getElementById(this.focus+1+'').focus();
  }

  move():void{
    this.router.navigate([this.typeGame+'',this.subLength+'']);
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
    
    let max = this.typeGame=='puzzle' ? 5 : 2 ;
    let button = 6 ;
    this.disabledB = !this.typeGame || (this.typeGame=="puzzle" && !this.level);

    if(this.focus==button){
      this.focus=0;
    } else {

      this.focus++;

      if(this.focus>max){
        if(this.disabledB){
          this.focus = 0;
        } else {
          this.focus = button;
        }
      }
    }
    document.getElementById(this.focus+'').focus();
  }

  setType(v:string):void{
    this.typeGame=v;

    if(this.typeGame=="solving"){
      this.level = null;
      this.focus=1;
    } else {
      this.focus=2;
    }
    this.isDisabledB();
  }

  setLevel(v:string):void{
    this.level=v;
    switch(v){
      case 'easy':this.focus=3;
      break;

      case 'medium':this.focus=4;
      break;

      case 'hard':this.focus=5;
      break;
    }
    this.isDisabledB();
  }

  focusInput():void{
    this.focus = 0;
  }

  isDisabledB():void{
    this.disabledB = !this.typeGame || (this.typeGame=="puzzle" && !this.level);
  }

}
