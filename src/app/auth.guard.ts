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
import { AuthorizationService } from './network/auth/auth-request.service';
import { User } from './network/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private _sessionStorage: SessionStorageService,
    private _auth: AuthorizationService,
    private _router: Router
  ) {}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let challenge = this._sessionStorage.challenge;
    let user = this._sessionStorage.user;

    if (challenge && user && user.Id) {
      return true;
    }

    let url: string = state.url;
    if (url) {
      try {
        let result = await this._auth.login(url);
        if (result instanceof User) {
          // return this._router.parseUrl(`/${RoutePath.garbage_system}`);
          return this._router.navigateByUrl(url);
        }
      } catch (error) {
        return this._router.parseUrl('/login');
      }
    }
    return this._router.parseUrl('/login');

    // if (!challenge || !user || !user.Id) {
    //   alert('认证失效,请重新登录');

    //   this._router.navigate(['login'], {
    //     queryParams: { retUrl: state.url },
    //   });
    // }
    // return true;
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
