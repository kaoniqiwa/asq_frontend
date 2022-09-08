import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'authorize-box',
  templateUrl: './authorize-box.component.html',
  styleUrls: ['./authorize-box.component.less']
})
export class AuthorizeBoxComponent implements OnInit {

  agree = true;

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  navigateToBabyInfo() {
    this._router.navigate(["/neoballoon/neoballoon-manage/baby-info-manage"])
  }
}
