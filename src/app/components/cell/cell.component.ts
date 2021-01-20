import { style } from '@angular/animations';
import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';
import { DataService } from 'src/app/servicess/data.service';


@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})

export class CellComponent implements OnInit {

  @Input()row:number;
  @Input()col:number;
  @Input()FirstValue:number; 
  @Input()IsSolution:boolean;
  @Input()
  public set IsNewPlay(val: boolean) {
    this.NewPlay();
  }

  IsLeft:boolean;
  IsRight:boolean;
  IsTop:boolean;
  IsBottom:boolean;
  IsNow:boolean;
  IsAccepted:boolean;
  IsError:boolean;
  


  constructor(public dataService:DataService) {
   
  }

  validation() {

    if(this.FirstValue==undefined || this.IsSolution){
      return;
    }

    else if(this.dataService.AllData[this.row][this.col][this.FirstValue]==this.FirstValue){
      this.Accepted();
    }

    else{
      this.Postponed();
    }
  }

  Accepted():void{

    this.IsAccepted=true;
    if(this.dataService.AllData[this.row][this.col][0]==null){

      this.dataService.UserSendNumber(this.row,this.col,this.FirstValue);
    }

  }

  Postponed():void{
    this.FirstValue=undefined;
    this.IsError=true;
    setTimeout(() => {
      this.IsError=false;          
   }, 0.125 * 1000);
  }

  NewPlay():void{
    this.IsAccepted=false;
    this.FirstValue=null; 
  }

  ngOnInit(): void {

    if(this.IsNewPlay){
      this.NewPlay();
    }
    this.IsLeft=this.col%this.dataService.SubLen==0;
    this.IsRight=this.col==this.dataService.len-1;
    this.IsTop=this.row%this.dataService.SubLen==0;
    this.IsBottom=this.row==this.dataService.len-1;
  }

}