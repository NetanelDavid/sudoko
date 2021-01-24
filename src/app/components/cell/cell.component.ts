import { style } from '@angular/animations';
import { Component, Input, OnInit,OnChanges, Output ,EventEmitter, SimpleChanges} from '@angular/core';
import { DataService } from 'src/app/servicess/data.service';


@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})

export class CellComponent implements OnInit ,OnChanges{

  @Input()row:number;
  @Input()col:number;
  
  @Input()solution:boolean;
  @Input()fresh:boolean;

  value:number; 
  full:boolean;
  accepted:boolean;

  constructor(public dataService:DataService) { }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes.fresh && changes.fresh.currentValue){
      this.accepted=false;
      this.solution=false;
      this.value=null;
      this.full=false;
      this.ngOnInit();
    }

    else if (changes.solution && changes.solution.currentValue && !this.accepted) {
      this.value=this.dataService.AllData[this.row][this.col][0];
      this.full=true;
    }

    else  if (changes.solution && !changes.solution.currentValue && !this.accepted) {
      this.value=null;
      this.full=false;
  }
    
  }

  validation() {

    if(this.value==undefined || this.accepted || this.solution){
      return;
    }

    else if(this.dataService.AllData[this.row][this.col][this.value]==this.value){
      this.Accepted();
    }

    else{
      this.Postponed();
    }
  }

  Accepted():void{
    this.accepted=true;
    this.full=true;
    this.dataService.UserSendNumber(this.row,this.col,this.value);
  }

  Postponed():void{
    this.value=null;
    this.Error=true;
    setTimeout(() => {
      this.Error=false;          
   }, 0.125 * 1000);
  }

  Left:boolean;
  Right:boolean;
  Top:boolean;
  Bottom:boolean;
  Error:boolean;

  ngOnInit(): void {

    this.Left=this.col%this.dataService.SubLen==0;
    this.Right=this.col==this.dataService.len-1;
    this.Top=this.row%this.dataService.SubLen==0;
    this.Bottom=this.row==this.dataService.len-1;
  }

}