import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { CookieService } from "ngx-cookie-service";
import { LocalStorageService } from "src/app/common/service/local-storage.service";
import { SessionStorageService } from "src/app/common/service/session-storage.service";
import { StoreService } from "src/app/common/service/store.service";
import { RoutePath } from "src/app/enum/route-path.enum";
import { User } from "../model/user.model";
import { UserUrl } from "../url/user.url";
import { DigestResponse } from "./digest-response.class";

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService implements CanActivate {
  private _username: string = '';
  private _password: string = '';
  private _nc: number = 0;
  private _config: AxiosRequestConfig = {};

  constructor(
    private _localStorageService: LocalStorageService,
    private _sessionStorageService: SessionStorageService,

    private _cookieService: CookieService,
    private _router: Router,
    private _store: StoreService
  ) {
    if (this._cookieService.check('userName')) {
      let userName = this._cookieService.get('userName');
      userName = atob(userName);
      let res = userName.match(
        /[a-zA-Z0-9+/=]{32}(?<userName>[\w.]+)[a-zA-Z0-9+/=]{32}/
      )!;
      userName = res.groups!['userName'];

      this._username = userName;
    }

    if (this._cookieService.check('passWord')) {
      let passWord = this._cookieService.get('passWord');
      passWord = atob(passWord);
      let res2 = passWord.match(
        /[a-zA-Z0-9+/=]{32}(?<passWord>[\w.]+)[a-zA-Z0-9+/=]{32}/
      )!;
      passWord = res2.groups!['passWord'];

      this._password = passWord;
    }
  }



  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this._router.parseUrl('/login');
  }
  login(username: string, password: string): Promise<User | AxiosResponse<any> | null> {
    return this.loginByUsername(username, password)
  }
  async loginByUsername(username: string, password: string) {
    return axios.get('/api/login.php')
  }

}
