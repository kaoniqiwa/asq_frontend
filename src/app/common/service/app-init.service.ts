import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig } from '../interface/app-config.interface';
import { tap } from 'rxjs';

@Injectable()
export class AppConfigService {
  static settings: IAppConfig;

  constructor(private _http: HttpClient) {}

  init() {
    const jsonFile = `assets/json/config.json`;

    // only when the observable completed,the application bootstrap process continues
    return this._http.get(jsonFile).pipe(
      tap((response) => {
        AppConfigService.settings = <IAppConfig>response;
      })
    );
  }
}
