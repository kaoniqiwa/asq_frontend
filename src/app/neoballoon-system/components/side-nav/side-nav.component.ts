import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
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
        let reg = /(\/neoballoon\/neoballoon-manage\/)(?<side>[\w-]*)(\/?)$/;
        let mode = e.urlAfterRedirects.match(reg);
        //console.log(mode)
        if (mode && mode.groups) {
          this.side = mode.groups['side']
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
