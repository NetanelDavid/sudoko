import { Component, OnInit, Output ,EventEmitter, HostListener } from '@angular/core';
import { DataService, } from 'src/app/servicess/data.service';

@Component({
  selector: 'app-sublen',
  templateUrl: './sublen.component.html',
  styleUrls: ['./sublen.component.css']
})
export class SublenComponent implements OnInit {
  
  SubLength:number;
  MaxSubLength:number;
  MinSubLength:number;
  focus:number;
  
  HeightBackground = window.innerHeight;
  
  constructor(private dataservice:DataService) {
    this.focus=0;
    this.MaxSubLength=dataservice.MaxSubLength;
    this.MinSubLength=dataservice.MinSubLength;
  }
  
  ngOnInit(): void {
    document.getElementById(this.focus+'').focus();
  }
  
  DiffLength():void{
    if(this.SubLength > this.dataservice.MaxSubLength || this.SubLength < this.dataservice.MinSubLength || !this.SubLength){
      this.SubLength = this.dataservice.DefaultSubLength;
    }
    
    this.dataservice.SubLen=this.SubLength;
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
