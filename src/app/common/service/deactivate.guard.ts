import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CancelHttpService } from './cancel-http.service';

@Injectable({
  providedIn: 'root',
})
export class DeactivateGuard implements CanDeactivate<boolean> {
  constructor(private cancelHttpService: CancelHttpService) {}

  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot | undefined
  ) {
    // 离开路由时，取消正在处理的http请求
    return this.cancelHttpService.cancelPendingRequests();
  }
}
