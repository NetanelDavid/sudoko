import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { DataService } from 'src/app/servicess/data.service';
import { environment } from 'src/app/environments/focus.environments'
import { Router } from '@angular/router';
import { CommandsService } from 'src/app/servicess/commands.service';

@Component({
  selector: 'app-buttons-solving',
  templateUrl: './buttons-solving.component.html',
  styleUrls: ['./buttons-solving.component.css']
})
export class ButtonsSolvingComponent implements OnInit {

  TextSolution:string;
  isSolution:boolean;

  constructor(public dataService:DataService,private commandsservice :CommandsService , private router:Router) { 
    this.TextSolution='solution';
  }

  ngOnInit(): void {
  }

  newGame(id:string):void{
    if(this.isSolution){
      this.solution();
    }
    this.commandsservice.set('new game');
    environment.resetFocus();
    document.getElementById(id).blur();
    this.resetCommand();
  }
  
  solution(id?:string):void{
    this.isSolution=!this.isSolution;
    this.TextSolution= this.isSolution? 'hide solution':'solution';
    this.commandsservice.set(this.isSolution?'solution':'hide solution');
    if(id){
      environment.updatingFocus(id);
      this.resetCommand();
    }
  }

  move():void{
    environment.resetFocus();
    this.router.navigate(['elections']);
  }

  resetCommand():void{
    setTimeout(() => {
      this.commandsservice.set(undefined);
    });
  }

}
