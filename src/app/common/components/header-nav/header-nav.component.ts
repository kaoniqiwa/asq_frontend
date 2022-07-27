import { Component, OnInit } from '@angular/core';
import Conf from 'src/assets/json/header-nav.json'

console.log(Conf)
@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.less']
})
export class HeaderNavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
