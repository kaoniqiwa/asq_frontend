import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Time } from 'src/app/common/tools/time';

@Component({
  selector: 'baby-info-operate',
  templateUrl: './baby-info-operate.component.html',
  styleUrls: ['./baby-info-operate.component.less']
})
export class BabyInfoOperateComponent implements OnInit {
  dateFormat: string = 'yyyy-MM-dd';
  today = new Date();


  searchInfo: any = {
    Condition: '',
    BeginTime: Time.beginTime(this.today),
    EndTime: Time.endTime(this.today),
    ModelName: '',
    Filter: false,
  }


  AGE_DATE = [
    2, 4, 6, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 27, 30, 33, 36, 42, 48, 54, 60
  ]

  constructor() { }

  ngOnInit(): void {
  }

  changeBegin(date: Date) {
    this.searchInfo.BeginTime = date;
  }
}
