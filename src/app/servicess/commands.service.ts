import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  private commands:BehaviorSubject<string>;
  private typeGame:BehaviorSubject<string>;
  private levevl:BehaviorSubject<string>;

  constructor() {
    this.commands = new BehaviorSubject<string>('');
    this.typeGame = new BehaviorSubject<string>('');
    this.levevl =  new BehaviorSubject<string>('');
  }

  set(key:string,value:string):void{

    switch (key){
      case 'commands':this.commands.next(value);
      break;

      case 'typeGame':this.typeGame.next(value);
      break;

      case 'level':this.levevl.next(value);
      break;
    }

    if(key=="commands" && value){
      this.set(key,null);
    }

  }

  get(key:string):Observable<string>{

    switch (key){
      case 'commands':return this.commands;

      case 'typeGame': return this.typeGame;

      case 'level':return this.levevl;
    }
    
  }
  
}
