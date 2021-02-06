import {Injectable} from '@angular/core';

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
    setTimeout(() => {
      setTimeout(() => {
       this.testingReducingOptions();
      });
    });
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
        });
      }

      if(i!=row){

        this.AllData[i][col][value]=0; //delete col

        setTimeout(() => {
          this.OneCellOption(i,col);         
        });
      }  
   }

   let BorderDice =this.DiceAsRowAndCol(row,col);
   for (let a=BorderDice[0]; a<BorderDice[1]; a++) {
      for (let b=BorderDice[2]; b<BorderDice[3]; b++) {

        if(a!=row && b!=col){

          this.AllData[a][b][value]=0;  //delete dice

          setTimeout(() => {
            this.OneCellOption(a,b);
          });

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
        for(let exceptForTheRow=brodersDice[0];exceptForTheRow<brodersDice[1];exceptForTheRow++){ //Is it possible to delete from row options, because of the dice?
          
          let counterRow=0;

          notEverythingIsEmpty:
          for(let row=brodersDice[0];row<brodersDice[1];row++){ 
            for(let col=brodersDice[2]; col<brodersDice[3]; col++){
              
              if(row==exceptForTheRow){
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

              counterRow++;
              if(counterRow==this.length-this.SubLen){
                this.reducingOptions(numberForTesting,exceptForTheRow,null,null,null,null,indexDice);
              }
            }
          }
        }

        for(let exceptForTheCol=brodersDice[2];exceptForTheCol<brodersDice[3];exceptForTheCol++){ //Is it possible to delete from col options, because of the dice?
          let CounterCol=0;
          
          notEverythingIsEmpty:
          for(let col=brodersDice[2]; col<brodersDice[3]; col++){
            for(let row=brodersDice[0];row<brodersDice[1];row++){
              
              if(col==exceptForTheCol){                
                break;
              }
              
              if(this.AllData[row][col][numberForTesting]){
                break notEverythingIsEmpty;
              }
              
              CounterCol++;
              
              if(CounterCol==this.length-this.SubLen){
                this.reducingOptions(numberForTesting,null,exceptForTheCol,null,null,null,indexDice);
              }
            }
          }
        }
        
        for(let row=brodersDice[0]; row<brodersDice[1]; row++){ //Is it possible to delete from dice options, because of the row?
          
          let counter=0;

          for(let col=0; col<this.length; col++){
            
            if(col==brodersDice[2]){
              col=brodersDice[3];
              if(col==this.length){
                break;
              }
            }

            if(this.AllData[row][col][numberForTesting]){
              break;
            }           
            counter++;
          }
          if(counter==this.length-this.SubLen){
            this.reducingOptions(numberForTesting,null,null,indexDice,row,null,null);
          }
        }

        for(let col=brodersDice[2]; col<brodersDice[3]; col++){ //Is it possible to delete from dice options, because of the col?
          
          let counter=0;

          for(let row=0; row<this.length; row++){
            
            if(row==brodersDice[0]){
              row=brodersDice[1];
              if(row==this.length){
                break;
              }
            }

            if(this.AllData[row][col][numberForTesting]){
              break;
            }           
            counter++;
          }
          if(counter==this.length-this.SubLen){
            this.reducingOptions(numberForTesting,null,null,indexDice,null,col,null);
          }
        }
      }
    }
  }

  private reducingOptions(num:number,row:number,col:number,dice:number,exceptForRow:number,exceptForCol:number,exceptForDice:number):void{

    if(row==0||row){ //delete from row options, because of the dice!
      let borderExceptForDice=this.DiceAsIndex(exceptForDice),
        isChange:boolean;
      for(let _col=0; _col<this.length;_col++){

       if(_col==borderExceptForDice[2]){
        _col=borderExceptForDice[3];
         if(_col==this.length){
            break;
         }
       }
       if( this.AllData[row][_col][num]){
          this.AllData[row][_col][num]=0; 
          setTimeout(() => {
            this.OneCellOption(row,_col);
          });
          isChange=true;       
       }
      }

      if(isChange){
        setTimeout(() => {
          setTimeout(() => {
            this.OneNumberOption();
          });
        });
        console.log(`deleted the whole number ${num} from the row ${row} except dice ${exceptForDice}`);
      }
    }

    if(col==0 ||col){ //delete from col options, because of the dice!
      let borderExceptForDice=this.DiceAsIndex(exceptForDice),
       isChange:boolean;
      for(let _row=0; _row<this.length;_row++){

       if(_row==borderExceptForDice[0]){
        _row=borderExceptForDice[1];
         if(_row==this.length){
            break;
         }
       }
       if( this.AllData[_row][col][num]){
          this.AllData[_row][col][num]=0;
          setTimeout(() => {
            this.OneCellOption(_row,col); 
          });
          isChange=true;       
       }
      }

      if(isChange){
        setTimeout(() => {
          setTimeout(() => {
            this.OneNumberOption();
          });
        });
        console.log(`deleted the whole number ${num} from the col ${col} except dice ${exceptForDice}`);
      }
    }

    if((dice==0||dice) && exceptForRow){ //delete from dice options, because of the row!

      let borderDice=this.DiceAsIndex(dice),
        isChange:Boolean;
      for(let _row=borderDice[0]; _row<borderDice[1]; _row++){
        for(let _col=borderDice[2]; _col<borderDice[3]; _col++){

          if(_row==exceptForRow){
            break;
          }
          if(this.AllData[_row][_col][num]){
            this.AllData[_row][_col][num]=0;
            isChange=true;
            setTimeout(() => {
              this.OneCellOption(_row,_col);
            });
          }
        }
      }
      if(isChange){
        setTimeout(() => {
          setTimeout(() => {
            this.OneNumberOption();
          });
        });
        console.log(`deleted the whole number ${num} from the dice ${dice} except row ${exceptForRow}`);
      }
    }

    if((dice==0||dice) && exceptForCol){ //delete from dice options, because of the col!

      let borderDice=this.DiceAsIndex(dice),
        isChange:Boolean;
      for(let _col=borderDice[2]; _col<borderDice[3]; _col++){
        for(let _row=borderDice[0]; _row<borderDice[1]; _row++){
        
          if(_col==exceptForCol){
            break;
          }
          if(this.AllData[_row][_col][num]){
            this.AllData[_row][_col][num]=0;
            isChange=true;
            setTimeout(() => {
              this.OneCellOption(_row,_col);
            });
          }
        }
      }
      if(isChange){
        setTimeout(() => {
          setTimeout(() => {
            this.OneNumberOption();
          });
        });
        console.log(`deleted the whole number ${num} from the dice ${dice} except col ${exceptForCol}`);
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