import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pointer-box',
  templateUrl: './pointer-box.component.html',
  styleUrls: ['./pointer-box.component.less']
})
export class PointerBoxComponent implements OnInit {

  @Input() getfloat:any;
  @Output() getparent = new EventEmitter<string>();
  
  showStatus = 0;
  birthDay = '';

  onSubmit(str:any) {
    this.getparent.emit(str);
  }

  setShow(e:any){
    console.log('setShow',e);
    this.showStatus = e;
  }

  setBirthDay(b:any){
    //console.log('setBirthDay',b);
    this.birthDay = b.split('-')[0]+'年'+b.split('-')[1]+'月'+b.split('-')[2]+'日';
  }

  constructor(private _router: Router) {
    //console.log('this.getfloat2',this.getfloat);
  }

  ngOnInit(): void {
    //console.log('this.getfloat',this.getfloat);
  }

  
}
