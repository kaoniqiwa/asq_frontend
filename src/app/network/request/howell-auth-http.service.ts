import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Digest } from './digest';
import { AuthorizationService } from '../auth/auth-request.service';
import { HowellResponse } from '../model/howell-response.model';

@Injectable({
  providedIn: 'root',
})
export class HowellAuthHttpService {
  nc = 0;
  constructor(
    private _http: HttpClient,
    private _authorizationService: AuthorizationService
  ) {}

  public postBase64String(
    url: string,
    base64: string,
    params?: HttpParams
  ): Observable<Blob> {
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'text/plain',
    });
    return this._http.post(url, base64, {
      headers: head,
      params: params,
      responseType: 'blob',
    });
  }

  public putBase64String<T>(
    url: string,
    base64: string,
    params?: HttpParams
  ): Observable<T> {
    const head = new HttpHeaders({
      'Content-Type': 'text/plain',
      Accept: 'text/plain',
    });
    return this._http.put<T>(url, base64, {
      headers: head,
      params: params,
      responseType: 'json',
    });
  }

  public getStream(url: string, params?: HttpParams): Observable<Blob> {
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'text/plain',
    });
    return this._http.get(url, {
      headers: head,
      params: params,
      responseType: 'blob',
    });
  }

  public get<T = any, R = HowellResponse<T>>(
    url: string,
    params?: HttpParams
  ): Observable<R> {
    const httpOptions = {
      params: params,
    };
    return this._http.get<R>(url, httpOptions);
  }

  public getBase64String(url: string, params?: HttpParams): Observable<string> {
    const httpOptions = {
      params: params,
    };
    return this._http.get<string>(url, httpOptions);
  }

  public getCache<T = any, R = T>(url: string, params?: HttpParams) {
    const httpOptions = {
      'Cache-Control': 'max-age=' + 60 * 30,
      params: params,
    };
    return this._http.get<R>(url, httpOptions);
  }

  public post<T = any, R = HowellResponse<T>>(
    url: string,
    model?: T,
    params?: HttpParams
  ): Observable<R> {
    const httpOptions = {
      params: params,
    };
    return this._http.post<R>(url, model, httpOptions);
  }

  public postReturnString<T = any>(
    url: string,
    model?: T,
    params?: HttpParams
  ): Observable<string> {
    const httpOptions = {
      params: params,
    };
    return this._http.post<string>(url, model, httpOptions);
  }

  public postString<T = any, R = HowellResponse<T>>(
    url: string,
    base64: string,
    params?: HttpParams
  ): Observable<R> {
    const httpOptions = {
      params: params,
      'Content-Type': 'text/plain',
    };
    return this._http.post<R>(url, base64, httpOptions);
  }

  public put<T = any, R = HowellResponse<T>>(
    url: string,
    model: T,
    params?: HttpParams
  ): Observable<R> {
    const httpOptions = {
      params: params,
    };
    return this._http.put<R>(url, model, httpOptions);
  }

  public delete<T = any, R = HowellResponse<T>>(url: string): Observable<R> {
    const httpOptions = {};
    return this._http.delete<R>(url, httpOptions);
  }

  public auth(
    url: string,
    httpHeaders: HttpHeaders
  ): Observable<HowellResponse<any>> {
    const httpOptions = {
      headers: httpHeaders,
    };
    return this._http.get<any>(url, httpOptions);
  }

  downloadFile(
    url: string,
    percent: (percent: number) => void,
    completely: (completely: boolean) => void
  ) {
    const req = new HttpRequest('GET', url, {
      reportProgress: true,
    });

    this._http.request(req).subscribe((event: any) => {
      // Via this API, you get access to the raw event stream.
      // Look for download progress events.
      if (event.type === HttpEventType.DownloadProgress) {
        // This is an download progress event. Compute and show the % done:
        const percentDone = Math.round((100 * event.loaded) / event.total);
        percent(percentDone);
        // console.log(`File is ${percentDone}% downloaded.`);
      } else if (event instanceof HttpResponse) {
        completely(true);
        // console.log('File is completely downloaded!');
      }
    });
  }

  //获取已授权的头部
  getHttpHeaders(method: string, uri: string) {
    let digest = new Digest();
    // user = new SessionUser();
    var challenge = digest.parseServerChallenge();
    this.nc += 1;
    return digest.generateRequestHeader(
      this.nc,
      challenge,
      '1',
      '1',
      method,
      uri
    );
  }
}
