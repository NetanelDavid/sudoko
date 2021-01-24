import { Component } from '@angular/core';
import { DataService } from 'src/app/servicess/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  SubLength:number;

  constructor(public dataservice:DataService) {
    this.SubLength=this.dataservice.SubLen;
   }

  DiffLength(NewSubLength:number):void{
    this.dataservice.SubLen=NewSubLength;
    this.dataservice.difflength();
    this.SubLength=NewSubLength;
  }

  ngOnInit(): void {
  }

  title = 'sudoko';
}
