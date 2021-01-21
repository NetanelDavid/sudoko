import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/servicess/data.service';

@Component({
  selector: 'app-sublen',
  templateUrl: './sublen.component.html',
  styleUrls: ['./sublen.component.css']
})
export class SublenComponent implements OnInit {

  constructor(public dataservice:DataService) {}

  ngOnInit(): void {
  }

}
