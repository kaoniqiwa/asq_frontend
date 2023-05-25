import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import qs from 'qs';

@Injectable({
  providedIn: 'root',
})
export class RouterUrlService {
  breadcrumbs$ = new BehaviorSubject<any[]>([]);

  constructor(private _router: Router) {
    this._router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        const routeSnapshot = this._router.routerState.snapshot.root;
        const routerUrls: string[] = [];

        this._addRouterUrl(routeSnapshot, [], routerUrls);

        // console.log(routeSnapshot);

        if (routerUrls.length) {
          // let last = breadcrumbs.at(breadcrumbs.length - 1)!;
          // if (routeSnapshot.queryParams) {
          //   last.url += '?' + qs.stringify(routeSnapshot.queryParams);
          // }
          // if (routeSnapshot.fragment) {
          //   last.url += '#' + routeSnapshot.fragment;
          // }
        }

        // this.breadcrumbs$.next(breadcrumbs);
      });
  }

  private _addRouterUrl(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    parentUrl: string[],
    urls: string[]
  ) {
    if (activatedRouteSnapshot) {
      const currrentUrl = parentUrl.concat(
        activatedRouteSnapshot.url.map((url) => url.path)
      );
      if (activatedRouteSnapshot.data['breadcrumb']) {
        urls.push('/' + currrentUrl.join('/'));
      }
      if (activatedRouteSnapshot.firstChild) {
        this._addRouterUrl(
          activatedRouteSnapshot.firstChild,
          currrentUrl,
          urls
        );
      }
    }
  }
}
