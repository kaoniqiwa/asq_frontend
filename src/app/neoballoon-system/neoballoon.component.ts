import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-neoballoon',
  template: ' <router-outlet></router-outlet>',
})
export class NeoballoonComponent implements OnInit {

  constructor(private _title: Title,) {
    this._title.setTitle('ASQ儿童发育筛查系统')
  }

  ngOnInit(): void {
  }

}
