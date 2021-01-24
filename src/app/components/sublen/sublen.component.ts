import { Component, OnInit, Output ,EventEmitter } from '@angular/core';
import { DataService, } from 'src/app/servicess/data.service';

@Component({
  selector: 'app-sublen',
  templateUrl: './sublen.component.html',
  styleUrls: ['./sublen.component.css']
})
export class SublenComponent implements OnInit {

  SubLength:number;
  MinSubLength=2;
  MaxSubLength=6;
  DefaultSubLength=3;
  @Output() SubLengthEvent = new EventEmitter<number>();

  constructor(public dataservice:DataService) {}

  ngOnInit(): void {
  }

  DiffLength():void{
    if(this.SubLength > this.MaxSubLength || this.SubLength < this.MinSubLength || !this.SubLength){
      this.SubLength = this.DefaultSubLength;
    }
    
    if(this.SubLength != this.dataservice.SubLen){
      this.SubLengthEvent.emit(this.SubLength);
    }

  }

}
