import { Byte } from '@angular/compiler/src/util';
import { Component, Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  MaxSubLen=6;
  MinSubLen=2;
  DefaultSubLen=3;
  SubLen:number;
  len:number;
  AllData:number[][][];

  constructor() {
    this.NewPlay();
  }
  
  NewPlay(){
   if(this.SubLen>this.MaxSubLen || this.SubLen <this.MinSubLen ||!this.SubLen){
      this.SubLen=this.DefaultSubLen;
    }
    this.len=Math.pow(this.SubLen,2);
    this.AllData=new Array(this.len);
    for (let a=0; a<this.len; a++) {
      this.AllData[a]=new Array(this.len);
      for (let b=0; b<this.len; b++) {
        this.AllData[a][b]=new Array(this.len+1);
        for (let c=0; c<this.len+1; c++) {
          this.AllData[a][b][c]= c==0 ? null : c;
        }
      }
    }
    console.log(this.AllData);
  }

  UserSendNumber(row:number,col:number,value:number):void{
    console.log('user send number:',row,col,value);
    this.NewDiscovery(row,col,value);
  }

  NewDiscovery(row:number,col:number,value:number):void{
    this.SetNumber(row,col,value);
    this.DeletePerimeters(row,col,value);
    this.OneNumberOption();
  }

  SetNumber(row:number,col:number,value:number):void{

    this.AllData[row][col][0]=value;

    for (let i = 1; i < this.len+1; i++) {
      if(i!=value){
        this.AllData[row][col][i]=0;
      }
    }
    
  }

  DeletePerimeters(row:number,col:number,value:number):void{

   for (let i = 0; i < this.len; i++) {
      if(i!=col){

        this.AllData[row][i][value]=0; //delete row

        setTimeout(() => {
          this.OneCellOption(row,i);          
        }, 1);
      }

      if(i!=row){

        this.AllData[i][col][value]=0; //delete col

        setTimeout(() => {
          this.OneCellOption(i,col);         
        }, 1);
      }  
   }

   let BorderDice =this.DiceAsRowAndCol(row,col);
   for (let a=BorderDice[0]; a<BorderDice[1]; a++) {
      for (let b=BorderDice[2]; b<BorderDice[3]; b++) {

        if(a!=row && b!=col){

          this.AllData[a][b][value]=0;  //delete dice

          setTimeout(() => {
            this.OneCellOption(a,b);
          }, 1);

        }
      }
    }
  }

 OneCellOption(row:number,col:number):void{
    if( this.AllData[row][col][0]>0){
      return;
    }

    let counter=0,
        ICounter:number;

    for (let i=1; i <= this.len && counter<2; i++) {
      if(this.AllData[row][col][i]>0){
        counter++;
        ICounter=i;
      }   
    }

    if (counter==1) {
      console.log('one cell option:',row,col,ICounter);
      this.NewDiscovery(row,col,ICounter);
    }
  }

  OneNumberOption():void{
    for(let a = 0; a < this.len; a++){

      for(let c = 1; c <= this.len; c++){  // One Number Option of row?

        let CounterRow=0,
            ICounterRow:number;

        for (let b = 0; b < this.len && CounterRow<2; b++) {

          if(this.AllData[a][b][0]==c){
            break;
          }

          if(this.AllData[a][b][c]==c){
            CounterRow++;
            ICounterRow=b;
          }
        }

        if(CounterRow==1){
          console.log('one number option row:',a,ICounterRow,c);
          this.NewDiscovery(a,ICounterRow,c);
          return;
        }
      }

      for(let c = 1; c <= this.len; c++){  // One Number Option of col?

        let CounterCol=0,
            ICounterCol:number;

        for (let b = 0; b < this.len && CounterCol<2; b++) {

          if(this.AllData[b][a][0]==c){
            break;
          }

          if(this.AllData[b][a][c]==c){
            CounterCol++;
            ICounterCol=b;
          }
        }

        if(CounterCol==1){
          console.log('one number option col:',ICounterCol,a,c);
          this.NewDiscovery(ICounterCol,a,c);
          return;
        }
      }

      for(let c = 1; c <= this.len; c++){  // One Number Option of Dice?

        let BorderDice = this.DiceAsIndex(a),
            CounterDice=0,
            ICounterDice:number[];

        l:
        for (let b1 = BorderDice[0]; b1 < BorderDice[1] && CounterDice<2; b1++) {
          for (let b2 = BorderDice[2]; b2 < BorderDice[3] && CounterDice<2; b2++) {
         
            if(this.AllData[b1][b2][0]==c){
              break l;
            }

            if(this.AllData[b1][b2][c]==c){
              CounterDice++;
              ICounterDice=[b1,b2];
            }
          }
        }

        if(CounterDice==1){
          console.log('one number option dice:',ICounterDice[0],ICounterDice[1],c);
          this.NewDiscovery(ICounterDice[0],ICounterDice[1],c);
          return;
        }
      }

    }
  }






  private  DiceAsRowAndCol(row:number,col:number):any {

    let FirstRow = row - row%this.SubLen;
    let LestRow = FirstRow +this.SubLen;
 
    let FirstCol = col - col%this.SubLen;
    let LestCol = FirstCol +this.SubLen;
 
    return [FirstRow,LestRow,FirstCol,LestCol];
 
   }

   private DiceAsIndex(b:number):any{

   let FirstRow = b - b%this.SubLen;
   let LestRow = FirstRow+this.SubLen;

   let FirstCol = b%this.SubLen*this.SubLen;
   let LestCol = FirstCol+this.SubLen;
   
   return [FirstRow, LestRow , FirstCol , LestCol];
  }
}

  







  





