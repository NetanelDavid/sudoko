import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { DataService } from 'src/app/servicess/data.service';
import { environment } from 'src/app/environments/focus.environments'
import { Router } from '@angular/router';

@Component({
  selector: 'app-buttons-solving',
  templateUrl: './buttons-solving.component.html',
  styleUrls: ['./buttons-solving.component.css']
})
export class ButtonsSolvingComponent implements OnInit {

  @Output() commandsEvent:EventEmitter<string>;

  TextSolution:string;
  isSolution:boolean;

  constructor(public dataService:DataService, private router:Router) { 
    this.commandsEvent = new EventEmitter<string>();
    this.TextSolution='solution';
  }

  ngOnInit(): void {
  }

  newGame(id:string):void{
    if(this.isSolution){
      this.solution();
    }
    this.commandsEvent.emit('new game');
    environment.resetFocus();
    document.getElementById(id).blur();
    this.resetCommand();
  }
  
  solution(id?:string):void{
    this.isSolution=!this.isSolution;
    this.TextSolution= this.isSolution? 'hide solution':'solution';
    this.commandsEvent.emit(this.isSolution?'solution':'hide solution');
    if(id){
      environment.updatingFocus(id);
      this.resetCommand();
    }
  }

  setLength():void{
    environment.resetFocus();
    this.router.navigate(['']);
  }

  resetCommand():void{
    setTimeout(() => {
      this.commandsEvent.emit(undefined);
    });
  }

}
