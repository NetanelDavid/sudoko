import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, } from 'src/app/servicess/data.service';

@Component({
  selector: 'app-sublength',
  templateUrl: './sublength.component.html',
  styleUrls: ['./sublength.component.css']
})
export class SublenComponent implements OnInit {
  
  subLength:number;
  focus:number;
  HeightBackground = window.innerHeight;
  
  constructor(public dataservice:DataService,private router :Router) {
    this.focus=0;
  }
  
  ngOnInit(): void {
    document.getElementById(this.focus+'').focus();
  }

  move(e?:KeyboardEvent):void{
    if(!e || e.key=='Enter'){
      this.router.navigate(['/solution',this.subLength+'']);
    }
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
    if(this.focus){
      this.focus--;
    } else {
      this.focus++;
    }
    document.getElementById(this.focus+'').focus();
  }
}
