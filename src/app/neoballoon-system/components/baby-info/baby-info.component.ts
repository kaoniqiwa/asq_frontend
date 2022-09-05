import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'baby-info',
  templateUrl: './baby-info.component.html',
  styleUrls: ['./baby-info.component.less']
})
export class BabyInfoComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }
  submit() {
    this._router.navigate(["/neoballoon/neoballoon-manage/survey-manage"])
  }

}
