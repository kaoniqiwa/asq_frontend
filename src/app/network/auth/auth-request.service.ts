import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { CookieService } from "ngx-cookie-service";
import { SessionStorageService } from "src/app/common/service/session-storage.service";
import { GlobalStorageService } from "src/app/common/service/global-storage.service";
import { Md5 } from 'ts-md5';
import CryptoJS from 'crypto-js';

import { DigestResponse } from "./digest-response.class";
import { plainToClass } from "class-transformer";
import { User } from "../model/user.model";
import { UserUrl } from "../url/user.url";
import { LocalStorageService } from "src/app/common/service/local-storage.service";
import { BaseASQUrl } from "../url/base.url";
import { RoutePath } from 'src/app/enum/route-path.enum';
import { interval } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService implements CanActivate {
  private _username: string = '';
  private _password: string = '';
  private _nc: number = 0;
  private _config: AxiosRequestConfig = { headers: {} };
  source = 1;

  constructor(private _sessionStorage: SessionStorageService, private _localStorage: LocalStorageService, private _cookieService: CookieService, private _router: Router,) {
    if (this._cookieService.check('username')) {
      let username = this._cookieService.get('username');
      username = atob(username);
      let res = username.match(
        /[a-zA-Z0-9+/=]{32}(?<username>[\w.]+)[a-zA-Z0-9+/=]{32}/
      )!;
      username = res.groups!['username'];

      this._username = username;
    }

    if (this._cookieService.check('password')) {
      let password = this._cookieService.get('password');
      password = atob(password);
      let res2 = password.match(
        /[a-zA-Z0-9+/=]{32}(?<password>[\w.]+)[a-zA-Z0-9+/=]{32}/
      )!;
      password = res2.groups!['password'];

      this._password = password;
    }
  }


  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log(route, state);
    let challenge = this._sessionStorage.challenge;
    //let user = this._localStorage.user;
    let user = this._sessionStorage.user;
    let holdCookie = this._cookieService.check('username');
    this.source = this._sessionStorage.source;
    console.log('this.source_canActivate',this.source);

    let url: string = state.url;
    if (url && url.indexOf('username') != -1) {
      try {
        let result = await this.login(url);
        if (result instanceof User) {
          return true;
        }
      } catch (error) {
        return this._router.parseUrl('/mlogin');
      }
    }else{
      if (challenge && user && user.Id && holdCookie) {
        return true;
      }
    }



    /* if(this.source){
      console.log('this.source_canActivate2',  Number(this.source));
      if ((challenge && user && user.Id && holdCookie && Number(this.source) == 1) || Number(this.source) == 2 || Number(this.source) == 3) {
        console.log('this.source_canActivate3', +this.source);
        return true;
      }
    }else{
      console.log('移动端登录');
      let url: string = state.url;
      if (url) {
        try {
          let result = await this.login(url);
          if (result instanceof User) {
            return true;
          }
        } catch (error) {
          return this._router.parseUrl('/mlogin');
        }
      }
    } */

    return this._router.parseUrl('/login');
  }

  login(username: string): Promise<User | AxiosResponse<any> | null>
  login(username: string, password: string): Promise<User | AxiosResponse<any> | null>
  login(username: string, password?: string): Promise<User | AxiosResponse<any> | null> {
    if (password) {
      return this.loginByUsername(username.trim(), password.trim())
    }else {
      return this.loginByUrl(username);
    }
  }
  loginByUrl(url: string): Promise<AxiosResponse<any> | User | null> {
    console.log('loginByUrl1',url);
    let params:any = new URLSearchParams('#'+url);
    let username = base64decode(decodeURIComponent(params.get('username')));
    let password = base64decode(decodeURIComponent(params.get('password')));

    return  this.login(username,password);

  }
  async loginByUsername(username: string, password: string) {
    // return axios.get('/api/login.php')
    
    this._username = username;
    this._password = password;
    this._config.url = `${BaseASQUrl}/front_end.login.php`

    this._config.headers = {
      'X-Webbrowser-Authentication': 'Forbidden',
    };

    return axios(this._config).catch((error: AxiosError) => {
      if (error.response?.status == 403) {
        let headers = error.response.headers;
        let authenticateHeader = Reflect.get(headers, 'www-authenticate');

        // 将 header字符串转成对象
        let challenge = this._parseAuthenticateHeader(authenticateHeader);

        // console.log('challenge', challenge);


        this._config.headers = {
          'X-Webbrowser-Authentication': 'Forbidden',
          'Authorization': this._generateChallengeHeader(
            challenge,
            'GET',
            UserUrl.login(username)
          )
        }

        this._sessionStorage.challenge = challenge;
        return axios(this._config).then((res: AxiosResponse<{ Data: User }>) => {
          let result = plainToClass(User, res.data.Data)
          this._storeUserInfo(result, password,);
          return result;
        }
        );
      }
      return null;
    });
  }
  
  private _storeUserInfo(
    user: User,
    password: string,
  ) {
    let options = {
      expires: new Date(Date.now() + 60 * 60 * 1000),
      path: '/',
      secure: false,

    };
    // username
    let prefix = CryptoJS.MD5(
      ((Math.random() * 1e9) | 0).toString(16).padStart(8, '0')
    ).toString();
    let suffix = CryptoJS.MD5(
      ((Math.random() * 1e9) | 0).toString(16).padStart(8, '0')
    ).toString();

    let userName = window.btoa(
      prefix + user.Username + suffix
    );
    this._cookieService.set('username', userName, options);

    //password
    prefix = CryptoJS.MD5(
      ((Math.random() * 1e9) | 0).toString(16).padStart(8, '0')
    ).toString();
    suffix = CryptoJS.MD5(
      ((Math.random() * 1e9) | 0).toString(16).padStart(8, '0')
    ).toString();
    let passWord = window.btoa(
      prefix + password + suffix
    );
    this._cookieService.set('password', passWord, options);

    this._sessionStorage.user = user;
  }


  /**
   *  自成一体的函数，可单独提出去使用
   * @param authenticate
   * @returns
   */
  private _parseAuthenticateHeader(authenticate: string): DigestResponse {
    let fields_str = authenticate.replace(/Digest\s/i, '');
    let fields_arr = fields_str.split(',');

    let challenge = new DigestResponse();

    let len = fields_arr.length;
    for (let i = 0; i < len; i++) {
      var values = /([a-zA-Z]+)=\"?([a-zA-Z0-9.@\/\s]+)\"?/.exec(fields_arr[i]);
      if (values) challenge[values[1]] = values[2];
    }
    // console.log(challenge);
    return challenge;
  }
  private _generateChallengeHeader(
    challenge: DigestResponse,
    method: string,
    uri: string
  ) {
    const realm = challenge.realm;
    const nonce = challenge.nonce;

    // 范围:[00000000,ffffffff]
    this._nc++;
    const nc = this._nc.toString(16).padStart(8, '0');

    // 16位随机数
    const cnonce = Md5.hashStr(
      ((Math.random() * 1e9) | 0).toString(16).padStart(8, '0')
    );

    const qop = challenge.qop;

    const opaque = challenge.opaque;

    const hash1 = Md5.hashStr(`${this._username}:${realm}:${this._password}`);

    const hash2 = Md5.hashStr(`${method}:${uri}`);
    const response = Md5.hashStr(
      `${hash1}:${nonce}:${nc}:${cnonce}:${qop}:${hash2}`
    );

    const authHeaders = `Digest username="${this._username}",realm="${realm}",nonce="${nonce}",uri="${uri}",algorithm="MD5",response="${response}",opaque="${opaque}",qop="${qop}",nc="${nc}",cnonce="${cnonce}"`;
    // console.log('authHeaders', authHeaders);
    return authHeaders;
  }
  public generateHttpHeader(method: string, uri: string) {
    let chanllenge = this._sessionStorage.challenge;
    // console.log(chanllenge);
    const authHeader = this._generateChallengeHeader(chanllenge, method, uri);
    return new HttpHeaders({
      Authorization: authHeader,
      'X-WebBrowser-Authentication': 'Forbidden',
    });
  }

}
