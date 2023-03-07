import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'print-se2',
  templateUrl: './print-se2.component.html',
  styleUrls: ['./print-se2.component.less']
})
export class  PrintSe2Component implements OnInit {

  @Output() closeEvent2 = new EventEmitter();
  @Output() navigateEvent = new EventEmitter();
  
  showStatus = 0;
  allReport = 0;
  studyReport = 0;

  closeEvent() {
    this.closeEvent2.emit(false);
  }

  setShow(e:any){
    console.log('setShow',e);
    this.showStatus = e;
  }

  constructor(private _router: Router) {
    //console.log('this.getfloat2',this.getfloat);
  }

  ngOnInit(): void {
    //console.log('this.getfloat',this.getfloat);
  }

  chooseReport(e:Event,num:any){
    console.log('num',num,(e.target as HTMLInputElement).checked);
    if(num == 1){
      if((e.target as HTMLInputElement).checked){
        this.allReport = 1;
      }else{
        this.allReport = 0;
      }
    }
    if(num == 2){
      if((e.target as HTMLInputElement).checked){
        this.allReport = 2;
      }else{
        this.allReport = 0;
      }
    }

    if(num == 3){
      if((e.target as HTMLInputElement).checked){
        this.studyReport = 1;
      }else{
        this.studyReport = 0;
      }
    }

  }

  submit(){
    if(this.allReport==0 && this.studyReport==0){
      alert("请选择报告！");
    }else{
      if(this.allReport==0 && this.studyReport==1){
        this.navigateEvent.emit(3);
      }
      if(this.allReport==1 && this.studyReport==0){
        this.navigateEvent.emit(1);
      }
      if(this.allReport==2 && this.studyReport==0){
        this.navigateEvent.emit(2);
      }
      if(this.allReport==1 && this.studyReport==1){
        this.navigateEvent.emit(4);
      }
      if(this.allReport==2 && this.studyReport==1){
        this.navigateEvent.emit(5);
      }
      this.closeEvent2.emit(false);
      
    }
  }

  
}
