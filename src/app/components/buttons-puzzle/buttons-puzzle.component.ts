import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/focus.environments';
import { CommandsService } from 'src/app/servicess/commands.service';

@Component({
  selector: 'app-buttons-puzzle',
  templateUrl: './buttons-puzzle.component.html',
  styleUrls: ['./buttons-puzzle.component.css']
})
export class ButtonsPuzzleComponent implements OnInit {

  constructor(private commandsservice:CommandsService,private router :Router) { }

  ngOnInit(): void {
  }

  newGame(id:string):void{
    this.commandsservice.set('commands','new game');
    document.getElementById(id).blur();
    environment.resetFocus();
  }

  move():void{
    this.router.navigate(['elections']);
  }

}
