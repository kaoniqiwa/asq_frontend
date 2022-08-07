import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toast-window',
  templateUrl: './toast-window.component.html',
  styleUrls: ['./toast-window.component.less'],
  host: {
    'class': 'pop-up'
  }
})
export class ToastWindowComponent implements OnInit {
  @Output() closeEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closeEvent.emit(false);
  }
}
