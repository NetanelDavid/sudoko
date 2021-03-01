import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { environment } from 'src/app/environments/focus.environments';
import { CommandsService } from 'src/app/servicess/commands.service';
import { DataService } from 'src/app/servicess/data.service';
import { Class } from 'src/app/models/DivClaas.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})

export class CellComponent implements OnInit ,OnDestroy{

  @Input()row:number;
  @Input()col:number;

  isSolution:boolean;

  value:number; 
  full:boolean;
  accepted:boolean;

  classes:Class;
  length:number;
  subLength:number;

  subscription:Subscription;
  test:boolean;

  constructor(public dataService:DataService,private commandsservice:CommandsService) {
    this.length=dataService.length;
    this.subLength=this.dataService.subLength;
    this.commands();
  }

  ngOnInit(): void {
    this.UpdateClasses();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  commands():void{
    this.subscription = this.commandsservice.get("commands").subscribe(
      (c:string) => {
        if(c=='new game'){
          this.newGame();
        } else if (c=='solution'){
          this.solution();
        } else if(c=='hide solution'){
          this.hideSolution();
        }
      }
    );
  }

  newGame():void{
    this.accepted=false;
    this.classes.accepted=false;
    this.isSolution=false;
    this.value=null;
    this.full=false;        
  }

  solution():void{
    this.isSolution=true;
    if (!this.accepted) {
      this.value=this.dataService.allData[this.row][this.col][0];
      this.full=true;
    }
  }

  hideSolution():void{
    this.isSolution=false;
    if (!this.accepted) {
      this.value=null;
      this.full=false;
    }
  }

  UpdateClasses():void{
    this.classes={
      cell:true,
      left: this.col%this.subLength===0,
      right: this.col===this.length-1,
      top: this.row%this.subLength===0,
      bottom: this.row==this.length-1,
      accepted :false,
      error:false,
      focus:true,
    }
  }

  input():void {

    this.test = this.dataService.testimgValueCell(this.row,this.col,+this.value);

    if(!this.value){
      this.classes.focus=true;
      this.classes.accepted=false;  
      this.classes.error=false;
    } else if(this.test){
      this.classes.focus=false;
      this.classes.accepted=true;
      this.classes.error=false;
    } else {
      this.classes.focus=false;
      this.classes.accepted=false;
      this.classes.error=true;
    }
  }

  validation():void {

    if(!this.value || this.accepted || this.isSolution){
      return;
    }

    this.classes.focus=true;
    
    if(this.test){
      this.Accepted();
    }

    else{
      this.Postponed();
    }
  }

  Accepted():void{
    this.accepted=true;
    this.full=true;
    if(!this.dataService.allData[this.row][this.col][0]){
      this.dataService.UserSendNumber(this.row,this.col,+this.value);
    }
  }

  Postponed():void {
    this.classes.error=false;
    this.value=null;
  }

  focusUpdate(id:string):void{
    environment.updatingFocus(id);
  }

}
