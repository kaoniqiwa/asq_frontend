import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'helper-box',
  templateUrl: './helper-box.component.html',
  styleUrls: ['./helper-box.component.less']
})
export class HelperBoxComponent implements OnInit {

  @Input() helperfloat:any;
  @Input() helperAudio:any;
  @Input() helperImg:any;
  @Input() helperQuestion:any;
  @Input() helperAudioStatus:any;
  @Output() getparent = new EventEmitter<string>();
  
  showStatus = 0;

  onHelper(str:any) {
    this.getparent.emit(str);
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

  changeAudio(){
    if(this.helperAudioStatus){
      this.helperAudio.pause();
    }else{
      this.helperAudio.play();
    }
  }

  
}
