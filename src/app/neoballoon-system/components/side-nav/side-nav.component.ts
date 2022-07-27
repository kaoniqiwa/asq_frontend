import { Component, OnInit } from '@angular/core';
import Conf from 'src/assets/json/side-nav.json'


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.less']
})
export class SideNavComponent implements OnInit {

  models = Conf.data;


  constructor() { }

  ngOnInit(): void {
  }

}
