import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';

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

  get():Observable<string>{
    return this.commands;
  }
  
}
