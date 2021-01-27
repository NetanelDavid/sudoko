import { Component, OnInit, Output ,EventEmitter } from '@angular/core';
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

  HeightBackground = window.innerHeight-50;
  
  constructor(private dataservice:DataService) {
    this.MaxSubLength=dataservice.MaxSubLength;
    this.MinSubLength=dataservice.MinSubLength;
  }

  ngOnInit(): void {
  }

  DiffLength():void{
    if(this.SubLength > this.dataservice.MaxSubLength || this.SubLength < this.dataservice.MinSubLength || !this.SubLength){
      this.SubLength = this.dataservice.DefaultSubLength;
    }

    this.dataservice.SubLen=this.SubLength;
  }

}
