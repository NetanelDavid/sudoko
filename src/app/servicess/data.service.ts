import { Byte } from '@angular/compiler/src/util';
import { Component, Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  
  DefaultSubLength=3;
  MinSubLength=2;
  MaxSubLength=6;
  SubLen:number;
  length:number;
  AllData:number[][][];

  constructor() {
    this.SubLen=this.DefaultSubLength;
  }
  
  NewPlay():void {
    for (let a=0; a<this.length; a++) {
      for (let b=0; b<this.length; b++) {
        for (let c=0; c<this.length+1; c++) {
          this.AllData[a][b][c]= c==0 ? null : c;
        }
      }
    }
    console.log('new play');
  }

  difflength():void{

    this.length=Math.pow(this.SubLen,2);
    this.AllData=new Array(this.length);
    for (let a=0; a<this.length; a++) {
      this.AllData[a]=new Array(this.length);
      for (let b=0; b<this.length; b++) {
        this.AllData[a][b]=new Array(this.length+1);
        for (let c=0; c<this.length+1; c++) {
          this.AllData[a][b][c]= c==0 ? null : c;
        }
      }
    }
    console.log(`length: ${this.length}`);
  }

  UserSendNumber(row:number,col:number,value:number):void{
    console.log('user send number:',row,col,value);
    this.NewDiscovery(row,col,value);
  }

  private NewDiscovery(row:number,col:number,value:number):void{
    this.SetNumber(row,col,value);
    this.DeletePerimeters(row,col,value);
    this.OneNumberOption();
    this.testingReducingOptions();
  }

  private SetNumber(row:number,col:number,value:number):void{

    this.AllData[row][col][0]=value;

    for (let i = 1; i < this.length+1; i++) {
      if(i!=value){
        this.AllData[row][col][i]=0;
      }
    }
    
  }

  private DeletePerimeters(row:number,col:number,value:number):void{

   for (let i = 0; i < this.length; i++) {
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

  private OneCellOption(row:number,col:number):void{
    if( this.AllData[row][col][0]>0){
      return;
    }

    let counter=0,
        ICounter:number;

    for (let i=1; i <= this.length && counter<2; i++) {
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

  private OneNumberOption():void{
    for(let a = 0; a < this.length; a++){

      for(let c = 1; c <= this.length; c++){  // One Number Option of row?

        let CounterRow=0,
            ICounterRow:number;

        for (let b = 0; b < this.length && CounterRow<2; b++) {

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

      for(let c = 1; c <= this.length; c++){  // One Number Option of col?

        let CounterCol=0,
            ICounterCol:number;

        for (let b = 0; b < this.length && CounterCol<2; b++) {

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

      for(let c = 1; c <= this.length; c++){  // One Number Option of Dice?

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

  private testingReducingOptions():void{
    for(let indexDice=0;indexDice<this.length;indexDice++){

      let brodersDice=this.DiceAsIndex(indexDice);

      for(let numberForTesting=1;numberForTesting<=this.length;numberForTesting++){
        
        numberExistsInTheDice:
        for(let exceptFor=brodersDice[0];exceptFor<brodersDice[1];exceptFor++){
          
          let counter=0;

          notEverythingIsEmpty:
          for(let row=brodersDice[0];row<brodersDice[1];row++){
            for(let col=brodersDice[2]; col<brodersDice[3]; col++){
              
              if(row==exceptFor){
                if(row==brodersDice[0]){
                  for(let _col=brodersDice[2];_col<brodersDice[3];_col++){
                    if(this.AllData[row][_col][0]==numberForTesting){
                      break numberExistsInTheDice;
                    }
                  }
                }
                break;
              }

              if(this.AllData[row][col][0]==numberForTesting){
                break numberExistsInTheDice;
              }

              if(this.AllData[row][col][numberForTesting]){
                break notEverythingIsEmpty;
              }

              counter++;

              if(counter==this.length-this.SubLen){
                this.ReducingOptions(exceptFor,indexDice,numberForTesting);
              }
            }
          }
        }
      }
    }
  }

  ReducingOptions(row:number,exceptForDice:number,num:number):void{

    let counter=0,
      borderDice=this.DiceAsIndex(exceptForDice);
    for(let i=0; i<this.length;i++){

      if(i==borderDice[2]){
        i=borderDice[3];
        if(i==this.length){
          break;
        }
      }
      if( this.AllData[row][i][num]){
        this.AllData[row][i][num]=0; 
        counter++;       
      }
    }
   if(counter){
     console.log(`in row ${row} number ${num} must be in dice ${exceptForDice}`);
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

  







  





