import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  private commands:BehaviorSubject<string>;

  constructor() {
    this.commands = new BehaviorSubject<string>('');
  }

  set(command:string):void{
    this.commands.next(command);
  }

  get():BehaviorSubject<string>{
    return this.commands;
  }
  
}
