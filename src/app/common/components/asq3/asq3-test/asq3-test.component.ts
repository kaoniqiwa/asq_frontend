import { Component, OnInit } from '@angular/core';

import hello from 'src/assets/files/test.xlsx';

console.log(hello)
@Component({
  selector: 'asq3-test',
  templateUrl: './asq3-test.component.html',
  styleUrls: ['./asq3-test.component.less']
})
export class Asq3TestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
