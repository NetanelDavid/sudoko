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
    this.maxSubLength=dataservice.maxSubLength;
    this.minSubLength=dataservice.minSubLength;
  }
  
  ngOnInit(): void {
    document.getElementById(this.focus+'').focus();
  }
  
  diffLength():void{
    if(this.subLength > this.dataservice.maxSubLength || this.subLength < this.dataservice.minSubLength || !this.subLength){
      this.subLength = this.dataservice.defaultSubLength;
    }
    
    this.dataservice.subLength=this.subLength;
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
