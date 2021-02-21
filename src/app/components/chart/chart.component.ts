import { Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/servicess/data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit,OnChanges {

  @Input() commands:string;
  
  arr:any[];
  isSolution:boolean; 
  isNewPlay:boolean;

  constructor(public dataService :DataService ,  private activatedRoute: ActivatedRoute ,private router:Router) {

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
  ngOnChanges(changes: SimpleChanges): void {
    switch (changes.commands.currentValue) {

      case 'new game': 
        this.newGame();
      break;

      case 'solution' :
      case 'hide solution':
        this.solution(changes.commands.currentValue);
      break;
    }
  }

  ngOnInit(): void { }

  solution(isSolution:string):void{
    if(isSolution=='solution'){
      this.isSolution=true;
    } else {
      this.isSolution=false;
    }
  }

  newGame():void{

    this.dataService.newGame();

    this.isNewPlay=true;
    setTimeout(() => {
      this.isNewPlay=false;
    });
  }

}