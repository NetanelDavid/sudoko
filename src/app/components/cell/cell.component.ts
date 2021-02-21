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
    this.subscription = this.commandsservice.get().subscribe(
      (c:string) => {
        if(c=='new game'){
          this.newGane();
        } else if (c=='solution'){
          this.solution();
        } else if(c=='hide solution'){
          this.hideSolution();
        }
      }
    );
  }

  newGane():void{
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
      error:false,
      accepted :false,
    }
  }

  validation() {

    if(!this.value || this.accepted || this.isSolution){
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
    this.classes.accepted=true;
    this.full=true;
    this.dataService.UserSendNumber(this.row,this.col,this.value);
  }

  Postponed():void {

    this.value=null;

    this.classes.error=true;

    setTimeout(() => {
      this.classes.error=false;  
    }, 0.125 * 1000);
  }

  focusUpdate(id:string):void{
    environment.updatingFocus(id);
  }

}
