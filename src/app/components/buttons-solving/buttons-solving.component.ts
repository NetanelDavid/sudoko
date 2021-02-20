import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { DataService } from 'src/app/servicess/data.service';

@Component({
  selector: 'app-buttons-solving',
  templateUrl: './buttons-solving.component.html',
  styleUrls: ['./buttons-solving.component.css']
})
export class ButtonsSolvingComponent implements OnInit {

  @Output() commandsEvent:EventEmitter<string>;
  @Output() focusEvent:EventEmitter<string>;

  TextSolution:string;
  isSolution:boolean;

  constructor(public dataService:DataService) { 
    this.commandsEvent = new EventEmitter<string>();
    this.focusEvent = new EventEmitter<string>();
    this.TextSolution='פתור';
  }

  ngOnInit(): void {
  }

  newPlay(id:string):void{
    this.commandsEvent.emit('new play');
    this.focusEvent.emit(id);
  }
  
  solution(id:string):void{
    this.isSolution=!this.isSolution;
    this.TextSolution=this.TextSolution=='פתור'?'הסתר פתרון':'פתור';
    this.commandsEvent.emit(this.isSolution?'solution':'hide solution');
    this.focusEvent.emit(id);
  }

}
