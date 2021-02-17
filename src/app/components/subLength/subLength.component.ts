import { Component, OnInit, Output ,EventEmitter, HostListener } from '@angular/core';
import { DataService, } from 'src/app/servicess/data.service';

@Component({
  selector: 'app-sublength',
  templateUrl: './sublength.component.html',
  styleUrls: ['./sublength.component.css']
})
export class SublenComponent implements OnInit {
  
  subLength:number;
  maxSubLength:number;
  minSubLength:number;
  focus:number;
  
  HeightBackground = window.innerHeight;
  
  constructor(private dataservice:DataService) {
    this.focus=0;
  }
  
  ngOnInit(): void {
    document.getElementById(this.focus+'').focus();
  }
  
  change():void{
    const deef = this.dataservice.setSubLength(this.subLength)
    if(!deef){
      this.subLength=this.dataservice.defaultSubLength;
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
