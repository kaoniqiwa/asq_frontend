import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HowellResponse } from "./model/howell-response.model";

@Injectable({
  providedIn: 'root',
})
export class HowellAuthHttpService {
  constructor(private _http: HttpClient) {

  }

  get<T = any, R = HowellResponse<T>>(url: string, params?: HttpParams): Observable<R> {
    const myHeaders = new HttpHeaders();
    const httpOptions = {
      headers: myHeaders,
      params: params,
    };
    return this._http.get<R>(url, httpOptions)
  }
}