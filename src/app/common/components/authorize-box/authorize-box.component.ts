import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'authorize-box',
  templateUrl: './authorize-box.component.html',
  styleUrls: ['./authorize-box.component.less']
})
export class AuthorizeBoxComponent implements OnInit {

  agree = true;

  constructor() { }

  ngOnInit(): void {
  }

}
