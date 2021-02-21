import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandsService } from 'src/app/servicess/commands.service';
import { DataService } from 'src/app/servicess/data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit{
  
  arr:any[];

  constructor(public dataService :DataService ,  private activatedRoute: ActivatedRoute ,private router:Router,private commandsservice:CommandsService) {
    this.constArrProper();
    this.commands(); 
  }
  
  ngOnInit(): void { }

  constArrProper():void{
    this.activatedRoute.paramMap.subscribe(
      prameter => {
        let subLength = +prameter.get('subLength');
        if(this.dataService.setSubLength(subLength)){
          this.dataService.constArrProper();
          this.arr = new Array(this.dataService.length);
        } else{
          this.router.navigate(['solution',this.dataService.defaultSubLength]);
        }
      }
    );
  }

  commands():void{
    this.commandsservice.get().subscribe(
      c => { 
        if(c=='new game'){
          this.newGame();
        }
    });   
  }
  

  newGame():void{
    this.dataService.newGame();
  }

}