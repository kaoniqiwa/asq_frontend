import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mutex-box',
  templateUrl: './mutex-box.component.html',
  styleUrls: ['./mutex-box.component.less']
})
export class MutexBoxComponent implements OnInit {

  @Input() mutexfloat:any;
  @Input() showStr:any;
  @Output() getparent = new EventEmitter<string>();

  onMutex(str:any) {
    this.getparent.emit(str);
  }

  constructor(private _router: Router) {
    //console.log('this.getfloat2',this.getfloat);
  }

  ngOnInit(): void {
    //console.log('this.getfloat',this.getfloat);
  }

  
}
