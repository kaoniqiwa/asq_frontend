import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast-window',
  templateUrl: './toast-window.component.html',
  styleUrls: ['./toast-window.component.less'],
  host: {
    'class': 'pop-up'
  }
})
export class ToastWindowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
