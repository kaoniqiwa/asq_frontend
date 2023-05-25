import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { decode, encode } from 'js-base64';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import qs from 'qs';

import { Md5 } from 'ts-md5';
import { SessionStorageService } from './session-storage.service';
import { DigestResponse } from 'src/app/network/auth/digest-response.class';

@Injectable({
  providedIn: 'root',
})
export class AuthHeaderService {
  private _nc = 0;

  username: string = '';
  password: string = '';
  challenge: DigestResponse | null = null;

  constructor(private _cookieService: CookieService) {
    if (this._cookieService.check('username')) {
      let username = this._cookieService.get('username');
      username = decode(username);
      let res = username.match(
        /[a-zA-Z0-9+/=]{32}(?<username>\w*)[a-zA-Z0-9+/=]{32}/
      )!;

      this.username = res.groups!['username'];
    }

    if (this._cookieService.check('password')) {
      let password = this._cookieService.get('password');
      password = decode(password);
      let res = password.match(
        /[a-zA-Z0-9+/=]{32}(?<password>\w*)[a-zA-Z0-9+/=]{32}/
      )!;

      this.password = res.groups!['password'];
    }
  }

  parseAuthenticateHeader(authenticate: string): DigestResponse {
    let fields_str = authenticate
      .replace(/Digest\s/i, '')
      .replace(/\s/g, '')
      .replace(/\"/g, '');
    let plain = qs.parse(fields_str, { delimiter: ',' });
    let challenge = plainToInstance(DigestResponse, plain);
    return challenge;
  }
  generateAuthorization(
    challenge: DigestResponse,
    method: string,
    uri: string
  ) {
    const realm = challenge.realm;
    const nonce = challenge.nonce;

    // 范围:[00000000,ffffffff]
    this._nc++;
    const nc = this._nc.toString(16).padStart(8, '0');

    var cnonce = ('00000000' + Math.random().toString(36).slice(2)).slice(-8);
    const qop = challenge.qop;

    const opaque = challenge.opaque;

    const hash1 = Md5.hashStr(`${this.username}:${realm}:${this.password}`);

    const hash2 = Md5.hashStr(`${method}:${uri}`);
    const response = Md5.hashStr(
      `${hash1}:${nonce}:${nc}:${cnonce}:${qop}:${hash2}`
    );

    const authorization = `Digest username="${this.username}",realm="${realm}",nonce="${nonce}",uri="${uri}",algorithm="MD5",response="${response}",opaque="${opaque}",qop="${qop}",nc="${nc}",cnonce="${cnonce}"`;
    // console.log('authHeaders', authHeaders);
    return authorization;
  }
}
