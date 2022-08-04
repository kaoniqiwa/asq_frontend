import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-neoballoon-manage',
  templateUrl: './neoballoon-manage.component.html',
  styleUrls: ['./neoballoon-manage.component.less']
})
export class NeoballoonManageComponent implements OnInit {

  constructor(private _title: Title,) {
    this._title.setTitle('ASQ儿童发育筛查系统')
  }

  ngOnInit(): void {
  }

}
