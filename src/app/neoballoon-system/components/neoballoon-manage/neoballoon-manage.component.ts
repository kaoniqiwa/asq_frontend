import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';

@Component({
  selector: 'app-neoballoon-manage',
  templateUrl: './neoballoon-manage.component.html',
  styleUrls: ['./neoballoon-manage.component.less']
})
export class NeoballoonManageComponent implements OnInit {
  source = 1;
  constructor(private _title: Title,private _sessionStorage: SessionStorageService) {
    this._title.setTitle('ASQ儿童发育筛查系统');
    this.source = Number(this._sessionStorage.source.replace('"', "").replace('"', ""));
  }

  ngOnInit(): void {
  }

}
