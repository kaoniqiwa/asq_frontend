import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-baby-age',
  templateUrl: './baby-age.component.html',
  styleUrls: ['./baby-age.component.less']
})
export class BabyAgeComponent implements OnInit {

  dateFormat: string = 'yyyy-MM-dd';


  constructor() { }

  ngOnInit(): void {
  }

}
