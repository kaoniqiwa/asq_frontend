import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import Conf from 'src/assets/json/side-nav.json';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.less'],
})
export class SideNavComponent implements OnInit, OnDestroy {
  sub: Subscription;
  models = Conf.data;
  side = '';

  constructor(private _router: Router) {
    console.log('constructor');
    let url = this._router.url;

    let reg = /(\/neoballoon\/neoballoon-manage\/)(?<side>[\w-]*)(\/?)$/;
    let mode = url.match(reg);
    console.log(mode);

    if (mode && mode.groups) {
      this.side = mode.groups['side'];
    }

    this.sub = this._router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        console.log('NavigationEnd');
        let reg = /(\/neoballoon\/neoballoon-manage\/)(?<side>[\w-]*)(\/?)$/;
        let mode = e.urlAfterRedirects.match(reg);
        console.log(mode);
        if (mode && mode.groups) {
          this.side = mode.groups['side'];
        }
      });
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
