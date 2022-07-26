import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: ['./simple-search.component.less']
})
export class SimpleSearchComponent implements OnInit {

  @Input() placeHolder = '请输入宝宝姓名';

  @Output() searchEvent = new EventEmitter<string>();
  @Output() changeEvent = new EventEmitter<string>();

  @Input() value = '';

  constructor() { }

  ngOnInit(): void {
  }
  search() {
    this.searchEvent.emit(this.value);
  }
  getValue() {
    return this.value;
  }

}
