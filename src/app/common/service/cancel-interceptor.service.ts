import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, takeUntil, timer, tap, of } from 'rxjs';
import { CancelHttpService } from './cancel-http.service';

@Injectable({
  providedIn: 'root',
})
export class CancelInterceptor implements HttpInterceptor {
  constructor(private cancelHttpService: CancelHttpService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('切换路由取消:CancelInterceptorService');
    // 当切换路由时，cancelPenddingRequest$会抛出数据,takeUntil()会终止 Observable
    return next.handle(req).pipe(
      // tap((e) => console.log(e)),
      takeUntil(this.cancelHttpService.onCancelPendingRequests())
    );
  }
}
