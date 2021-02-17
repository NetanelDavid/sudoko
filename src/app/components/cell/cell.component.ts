import { Component, Input, OnInit,OnChanges, Output ,EventEmitter, SimpleChanges} from '@angular/core';
import { Class } from 'src/app/models/DivClaas.model';
import { DataService } from 'src/app/servicess/data.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})

export class CellComponent implements OnInit ,OnChanges{

  @Output() focus:EventEmitter<string>;

  @Input()row:number;
  @Input()col:number;
  
  @Input() solution:boolean;
  @Input() NewPlay:boolean;

  value:number; 
  full:boolean;
  accepted:boolean;

  DivClasses:Class;
  length:number;
  subLength:number;

  constructor(public dataService:DataService) {
    this.focus = new EventEmitter();
    this.length=dataService.length;
    this.subLength=this.dataService.subLength;
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes.NewPlay && changes.NewPlay.currentValue){
      this.accepted=false;
      this.DivClasses.accepted=false;
      this.DivClasses.focus=true;
      this.solution=false;
      this.value=null;
      this.full=false;
    }

    else if (changes.solution && changes.solution.currentValue && !this.accepted) {
      this.value=this.dataService.allData[this.row][this.col][0];
      this.full=true;
      this.DivClasses.focus=false;
    }

    else  if (changes.solution && !changes.solution.currentValue && !this.accepted) {
      this.value=null;
      this.full=false;
      if(this.DivClasses){
        this.DivClasses.focus=true;
      }
    }

  }

  ngOnInit(): void {
    this.UpdateClasses();
  }

  validation() {

    if(this.value==undefined || this.accepted || this.solution){
      return;
    }

    else if(this.dataService.allData[this.row][this.col][this.value]==this.value){
      this.Accepted();
    }

    else{
      this.Postponed();
    }
  }

  Accepted():void{
    this.accepted=true;
    this.DivClasses.accepted=true;
    this.DivClasses.focus=false;
    this.full=true;
    this.dataService.UserSendNumber(this.row,this.col,this.value);
  }

  Postponed():void {
    this.value=null;

    this.DivClasses.error=true;

    setTimeout(() => {
      this.DivClasses.error=false;  
   }, 0.125 * 1000);
  }


  UpdateClasses():void{
    this.DivClasses={
      cell:true,
      left: this.col%this.subLength===0,
      right: this.col===this.length-1,
      top: this.row%this.subLength===0,
      bottom: this.row==this.length-1,
      error:false,
      accepted :false,
      focus:true,
    }
  }

  focusUpdate(f:string):void{
    this.focus.emit(f);
  }

}
