import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import Conf from 'src/assets/json/side-nav.json'


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.less']
})
export class SideNavComponent implements OnInit {

  models = Conf.data;
  side = '';

  constructor(private _router: Router) {
    this._router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        // http://localhost:9200/neoballoon/neoballoon-manage/baby-info
        let reg = /(?<=\/neoballoon\/neoballoon-manage\/)(?<side>[\w-]*)(?=\/?)$/;
        let mode = e.urlAfterRedirects.match(reg);
        if (mode && mode.groups) {
          this.side = mode.groups['side']
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
