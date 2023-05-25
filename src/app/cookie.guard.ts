import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieGuard implements CanActivate, CanActivateChild {
  constructor(private _cookieService: CookieService, private _router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let holdCookie = this._cookieService.check('username');

    if (!holdCookie) {
      alert('cookie 失效,请重新登录');
      this._router.navigate(['login'], {
        queryParams: { retUrl: state.url },
      });
    }
    return true;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    let holdCookie = this._cookieService.check('username');

    if (!holdCookie) {
      alert('cookie 失效,请重新登录');
      this._router.navigate(['login'], {
        queryParams: { retUrl: state.url },
      });
    }
    return true;
  }
}
