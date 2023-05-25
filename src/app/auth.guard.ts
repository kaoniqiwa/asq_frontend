import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStorageService } from './common/service/session-storage.service';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private _sessionStorage: SessionStorageService,
    private _router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let challenge = this._sessionStorage.challenge;
    let user = this._sessionStorage.user;

    if (!challenge || !user || !user.Id) {
      alert('认证失效,请重新登录');

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
    let challenge = this._sessionStorage.challenge;
    let user = this._sessionStorage.user;

    if (!challenge || !user || !user.Id) {
      alert('认证失效,请重新登录');
      this._router.navigate(['login'], {
        queryParams: { retUrl: state.url },
      });
    }
    return true;
  }
}
