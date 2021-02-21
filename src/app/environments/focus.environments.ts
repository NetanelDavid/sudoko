export const environment = {

    typeFocus:'c',
    focusC:-1,
    focusB:0,

    updatingFocus(id:string):void{
      this.typeFocus=id.substring(0,1);
      if(this.typeFocus=='c'){
          this.focusC=parseInt(id.substring(1));
      } else {
          this.focusB=parseInt(id.substring(1));
      }
    },

    resetFocus():void{
        this.typeFocus='c';
        this.focusC=-1;
        this.focusB=0;
    }
};