import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { GlobalStorageService } from "../common/service/global-storage.service";
import { LocalStorageService } from "../common/service/local-storage.service";
import { SessionStorageService } from "../common/service/session-storage.service";

@Injectable({
  providedIn: "root"
})
export class NeoballoonService implements CanActivate {
  constructor(private _sessionStorage: SessionStorageService, private _toastrService: ToastrService, private _router: Router,
  ) {

  }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let doctor = this._sessionStorage.doctor;
    let source = this._sessionStorage.source;
    if (doctor || source == 2 || source == 3) {
      return true;
    }
    this._toastrService.warning('请选择子账号')
    return this._router.parseUrl('/neoballoon/neoballoon-manage/account');


  }
}