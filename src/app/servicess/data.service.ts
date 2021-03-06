import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  
  defaultSubLength=3;
  minSubLength=2;
  maxSubLength=6;
  subLength:number;
  length:number;
  allData:number[][][];

  constructor() { }

  setSubLength(subLength:number):boolean{
    if (subLength > this.maxSubLength || subLength<this.minSubLength || !subLength) {      
      return false;
    }
    else{
      this.subLength=subLength;
      return true;
    }    
  }

  constArrProper():void{
    this.length=Math.pow(this.subLength,2);
    this.allData=new Array(this.length);
    for (let a=0; a<this.length; a++) {
      this.allData[a]=new Array(this.length);
      for (let b=0; b<this.length; b++) {
        this.allData[a][b]=new Array(this.length+1);
        for (let c=0; c<this.length+1; c++) {
          this.allData[a][b][c]= c==0 ? null : c;
        }
      }
    }
    console.log(`length: ${this.length}`);
  }

  newGame():void {
    for (let a=0; a<this.length; a++) {
      for (let b=0; b<this.length; b++) {
        for (let c=0; c<this.length+1; c++) {
          this.allData[a][b][c]= c==0 ? null : c;
        }
      }
    }
    console.log('new game');
  }

  testimgValueCell(row:number,col:number,value:number):boolean{
    return this.allData[row][col][value]==value;
  }

  UserSendNumber(row:number,col:number,value:number):void{
    console.log('user send number:',row,col,value);
    this.NewDiscovery(row,col,value);
  }

  private NewDiscovery(row:number,col:number,value:number):void{
    this.SetNumber(row,col,value);
    this.DeletePerimeters(row,col,value);
    setTimeout(() => {
      setTimeout(() => {
        this.OneNumberOption();
        this.testingReducingOptions();
        setTimeout(() => {
          this.testingLockedCells();
          setTimeout(() => {
            this.testingLockedNumbers();
          });
        });
      });
    });
  }

  private SetNumber(row:number,col:number,value:number):void{
    this.allData[row][col][0]=value;

    for (let i = 1; i < this.length+1; i++) {
      if(i==value){
        continue;
      }
      this.allData[row][col][i]=0;
    }    
  }

  private DeletePerimeters(row:number,col:number,value:number):void{
   for (let i = 0; i < this.length; i++) {
      if(i!=col){

        this.allData[row][i][value]=0; //delete row

        setTimeout(() => {
          this.OneCellOption(row,i);          
        });
      }

      if(i!=row){

        this.allData[i][col][value]=0; //delete col

        setTimeout(() => {
          this.OneCellOption(i,col);         
        });
      }  
   }

   let BorderDice =this.DiceAsRowAndCol(row,col);
   for (let a=BorderDice[0]; a<BorderDice[1]; a++) {
      for (let b=BorderDice[2]; b<BorderDice[3]; b++) {

        if(a!=row && b!=col){

          this.allData[a][b][value]=0;  //delete dice

          setTimeout(() => {
            this.OneCellOption(a,b);
          });

        }
      }
    }
  }

  private OneCellOption(row:number,col:number):void{
    if(this.allData[row][col][0]){
      return;
    }

    let counter=0,
        ICounter:number;

    for (let i=1; i <= this.length && counter<2; i++) {
      if(this.allData[row][col][i]>0){
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

          if(this.allData[a][b][0]==c){
            break;
          }

          if(this.allData[a][b][c]==c){
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

          if(this.allData[b][a][0]==c){
            break;
          }

          if(this.allData[b][a][c]==c){
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
         
            if(this.allData[b1][b2][0]==c){
              break l;
            }

            if(this.allData[b1][b2][c]==c){
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
                    if(this.allData[row][_col][0]==numberForTesting){
                      break numberExistsInTheDice;
                    }
                  }
                }
                break;
              }

              if(this.allData[row][col][0]==numberForTesting){
                break numberExistsInTheDice;
              }

              if(this.allData[row][col][numberForTesting]){
                break notEverythingIsEmpty;
              }

              counterRow++;
              if(counterRow==this.length-this.subLength){
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
              
              if(this.allData[row][col][numberForTesting]){
                break notEverythingIsEmpty;
              }
              
              CounterCol++;
              
              if(CounterCol==this.length-this.subLength){
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

            if(this.allData[row][col][numberForTesting]){
              break;
            }           
            counter++;
          }
          if(counter==this.length-this.subLength){
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

            if(this.allData[row][col][numberForTesting]){
              break;
            }           
            counter++;
          }
          if(counter==this.length-this.subLength){
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
       if( this.allData[row][_col][num]){
          this.allData[row][_col][num]=0; 
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
       if( this.allData[_row][col][num]){
          this.allData[_row][col][num]=0;
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
          if(this.allData[_row][_col][num]){
            this.allData[_row][_col][num]=0;
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
          if(this.allData[_row][_col][num]){
            this.allData[_row][_col][num]=0;
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
  
  private testingLockedCells():void{
    
    let testingHome:number[][];
    let lockedCells:number[][];
    
    for (let index = 0; index <this.length; index++) {

      {   //testing locked cells to row

        testingHome = undefined; 
        lockedCells = undefined;
        
        testingHome=new Array(this.length);
        
        for (let col = 0; col < this.length; col++) { 
          
          if(!this.allData[index][col][0]){
            testingHome[col]=[...this.allData[index][col].filter(num => num)];
          }
        }
        lockedCells = [...this.testingHome([...testingHome])];

        if(lockedCells.length){
          for (let i = 0; i < lockedCells.length; i+=2) {
            this.deletingNeighborsOfLockedCells('row',index,[...lockedCells[i]],[...lockedCells[i+1]]);
          }
        }
      }

      { //testing locked cells to col

        testingHome = undefined;
        lockedCells = undefined;

        testingHome = new Array(this.length);
        
        for(let row = 0; row<this.length; row++){
          
          if(!this.allData[row][index][0]){
            testingHome[row]=[...this.allData[row][index].filter(num => num)];
          }
        }
        lockedCells = [...this.testingHome([...testingHome])];

        if(lockedCells.length){
          for (let i = 0; i < lockedCells.length; i+=2) {
            this.deletingNeighborsOfLockedCells('col',index,[...lockedCells[i]],[...lockedCells[i+1]]);
          }
        }
      }

      {  //testing locked cells to dice

       testingHome = undefined;
       lockedCells = undefined;

       testingHome = new Array(this.length);

       let borderDice = [...this.DiceAsIndex(index)];
       
       for(let row = borderDice[0],i=0; row<borderDice[1]; row++){
         for (let col = borderDice[2]; col < borderDice[3]; col++,i++) {

           if(!this.allData[row][col][0]){
             testingHome[i] = [...this.allData[row][col].filter(num => num)];
            }
          }
        }
        lockedCells = [... this.testingHome([...testingHome])];
        
        if(lockedCells.length){
          for (let i = 0; i < lockedCells.length; i+=2) {
            this.deletingNeighborsOfLockedCells('dice',index,[...lockedCells[i]],[...lockedCells[i+1]]);
          }
        }
      }
    }
  }
  
  private testingLockedNumbers():void{
    
    let testingHome:number[][];
    for(let index = 0; index < this.length; index++){

      testingHome=undefined;
      testingHome=new Array(this.length);

      for(let i=0; i< testingHome.length; i++){
        testingHome[i]=new Array();
      }

      for(let col = 0; col < this.length; col++){

        if(!this.allData[index][col][0]){

          for(let num=1; num<=this.length; num++){

            if(this.allData[index][col][num]){

              testingHome[num-1].push(col);
            }
          }
        }
      }
      let lockedNumbers = [...this.testingHome([...testingHome])];

      if(lockedNumbers.length){
        for(let i=0; i<lockedNumbers.length; i+=2){
          this.deletingOptionsOfLockedNumbers('row',index,lockedNumbers[i],lockedNumbers[i+1]);
        }
      }

      testingHome=undefined;
      testingHome=new Array(this.length);

      for(let i=0; i< testingHome.length; i++){
        testingHome[i]=new Array();
      }

      for(let row = 0; row < this.length; row++){

        if(!this.allData[row][index][0]){

          for(let num=1; num<=this.length; num++){

            if(this.allData[row][index][num]){

              testingHome[num-1].push(row);
            }
          }
        }
      }

      lockedNumbers = [...this.testingHome([...testingHome])];

      if(lockedNumbers.length){
        for(let i=0; i<lockedNumbers.length; i+=2){
          this.deletingOptionsOfLockedNumbers('col',index,lockedNumbers[i],lockedNumbers[i+1]);
        }
      }
      /**/
      testingHome=undefined;
      testingHome=new Array(this.length);

      for(let i=0; i< testingHome.length; i++){
        testingHome[i]=new Array();
      }
      let borderDice =this.DiceAsIndex(index);

      for(let row =borderDice[0],i=0; row < borderDice[1]; row++){
        for(let col =borderDice[2]; col <borderDice[3]; col++,i++){

          
          if(!this.allData[row][col][0]){
            
            for(let num=1; num<=this.length; num++){
              
              if(this.allData[row][col][num]){
                
                testingHome[num-1].push(i);
              }
            }
          }
        }
      }
        
      lockedNumbers = [...this.testingHome([...testingHome])];

      if(lockedNumbers.length){
        for(let i=0; i<lockedNumbers.length; i+=2){
          this.deletingOptionsOfLockedNumbers('dice',index,lockedNumbers[i],lockedNumbers[i+1]);
        }
      }
    }
  }

  private testingHome(home:number[][]):number[][]{

    let allSame:number[][]=new Array();

    for(let i=0; i<home.length; i++){

      if (home[i] && home[i].length<=this.length/2) {

        let same=[i];

        for(let j=i+1; j<home.length; j++){

          if( home[j] && this.areTheArraysTheSame([...home[i]],[...home[j]])){
            same.push(j);
          }
        }
        if(same.length==home[i].length){
          allSame.push([...same]);  //index cells
          allSame.push([...home[i]]);  //numbers
        }
      }
    }
    return [...allSame];
  }

  private deletingNeighborsOfLockedCells(home:string,index:number,exceptForCells:number[],numbers:number[]):void{
     switch (home) {
       case 'row':
         let changRow:boolean;

         for (let col = 0; col < this.length; col++) {

           if(exceptForCells.indexOf(col)==-1 && !this.allData[index][col][0]){

             for (let num = 0; num < numbers.length; num++) {

               if (this.allData[index][col][numbers[num]]) {

                 this.allData[index][col][numbers[num]]=0;
                 changRow=true;

                 setTimeout(() => {
                   this.OneCellOption(index,col);
                 });
               }
             }
           }
         }
         if(changRow){
           console.log(`delete the whole numbers ${numbers} from row ${index} except for cells ${exceptForCells}`);
         }
        break;

       case 'col':
         let changCol:Boolean;

         for (let row = 0; row < this.length; row++) {

            if(exceptForCells.indexOf(row)==-1 && !this.allData[row][index][0]){

              for (let num = 0; num < numbers.length; num++) {

                if (this.allData[row][index][numbers[num]]) {
                
                  this.allData[row][index][numbers[num]]=0;
                  changCol=true;

                  setTimeout(() => {
                    this.OneCellOption(row,index);
                  });
                }
              }
            }
          }
          if(changCol){
            console.log(`delete the whole numbers ${numbers} from col ${index} except for cells ${exceptForCells}`);
          }
        break;

       case 'dice':

         let changDice:Boolean;
         let borderDice=this.DiceAsIndex(index); 

          for (let row = borderDice[0],i=0; row < borderDice[1]; row++) {
            for (let col = borderDice[2]; col < borderDice[3]; col++,i++) {
              
              if(exceptForCells.indexOf(i)==-1 && !this.allData[row][col][0]){

                for (let num = 0; num < numbers.length; num++) {

                  if (this.allData[row][col][numbers[num]]) {

                    this.allData[row][col][numbers[num]]=0;
                    changDice=true;

                    setTimeout(() => {
                      this.OneCellOption(row,col);
                    });
                  }
                }
              }
            }
           }
           if(changDice){
             console.log(`delete the whole numbers ${numbers} from dice ${index} except for cells ${exceptForCells}`);
           }
         break;
     }
     
  }

  private deletingOptionsOfLockedNumbers(home:string,index:number,exceptForNumbers:number[],cells:number[]){

    for(let i=0;i<exceptForNumbers.length; i++){
      exceptForNumbers[i]++;
    }

    switch (home) {
      case 'row': //delete options of Locked numbers at row
        let cacheRow:Boolean; 
        for (let col = 0; col < cells.length; col++) {
          for (let num = 1; num <= this.length; num++) {
            if(exceptForNumbers.indexOf(num)==-1 && this.allData[index][cells[col]][num]){
              this.allData[index][cells[col]][num]=0;
              cacheRow=true;

              setTimeout(() => {
                this.OneCellOption(index,cells[col]);
              });
            }
          }
        }
        if (cacheRow) {
          console.log(`in row ${index} at cells ${cells} delete whole numbers except For ${exceptForNumbers}`);
        }
      break;

      case 'col': //delete options of Locked numbers at col
        let cacheCol:Boolean; 
        for (let row = 0; row < cells.length; row++) {
          for (let num = 1; num <= this.length; num++) {
            if(exceptForNumbers.indexOf(num)==-1 && this.allData[cells[row]][index][num]){
              this.allData[cells[row]][index][num]=0;
              cacheCol=true;

              setTimeout(() => {
                this.OneCellOption(cells[row],index);
              });
            }
          }
        }
        if (cacheCol) {
          console.log(`in col ${index} at cells ${cells} delete whole numbers except For ${exceptForNumbers}`);
        }
      break;

      case 'dice'://delete options of Locked numbers at dice

      let borderDice=this.DiceAsIndex(index),
         cacheDice:Boolean; 

      for (let row = borderDice[0],i=0; row < borderDice[1]; row++) {
        for(let col=borderDice[2];col<borderDice[3]; col++,i++){

          if(cells.indexOf(i)!=-1){

            for (let num = 1; num <= this.length; num++) {
              if(exceptForNumbers.indexOf(num)==-1 && this.allData[row][col][num]){
                this.allData[row][col][num]=0;
                cacheDice=true;
                setTimeout(() => {
                  this.OneCellOption(cells[row],index);
                });   
              }
            }
          }
        }
      }
      if (cacheDice) {
        console.log(`in dice ${index} at cells ${cells} delete whole numbers except For ${exceptForNumbers}`);
      }
    break;
    }
    
  }

  //functions auxiliary
  
  private  DiceAsRowAndCol(row:number,col:number):any {

    let FirstRow = row - row%this.subLength;
    let LestRow = FirstRow +this.subLength;
 
    let FirstCol = col - col%this.subLength;
    let LestCol = FirstCol +this.subLength;
 
    return [FirstRow,LestRow,FirstCol,LestCol];
 
  }

  private DiceAsIndex(b:number):any{

   let FirstRow = b - b%this.subLength;
   let LestRow = FirstRow+this.subLength;

   let FirstCol = b%this.subLength*this.subLength;
   let LestCol = FirstCol+this.subLength;
   
   return [FirstRow, LestRow , FirstCol , LestCol];
  }

  private areTheArraysTheSame(arr1:number[],arr2:number[]):boolean{

    if (!arr2 || arr1.length!=arr2.length) {
      return false;      
    }

    for (let i = 0; i < arr1.length; i++) {
      if(arr1[i]!=arr2[i]){
        return false;
      }
    }
    return true;
  }
}