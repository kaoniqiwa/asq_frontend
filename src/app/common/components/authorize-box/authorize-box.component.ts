import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'authorize-box',
  templateUrl: './authorize-box.component.html',
  styleUrls: ['./authorize-box.component.less']
})
export class AuthorizeBoxComponent implements OnInit {

  @Output() gotoSearch = new EventEmitter();

  agree = true;

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  navigateToBabyInfo() {
    console.log('navigateToBabyInfo');
    this.gotoSearch.emit();
    /* if (this.agree)
      this._router.navigate(["/neoballoon/neoballoon-manage/baby-info-manage"],{
        queryParams: {
          source: 1,
        }
      }) */
  }
}
