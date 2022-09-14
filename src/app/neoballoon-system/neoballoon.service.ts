import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { GlobalStorageService } from "../common/service/global-storage.service";

@Injectable({
  providedIn: "root"
})
export class NeoballoonService implements CanActivate {
  constructor(private _globalStorage: GlobalStorageService, private _toastrService: ToastrService) {

  }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let doctor = this._globalStorage.doctor
    if (doctor) {
      return true;
    }
    this._toastrService.warning('请选择子账号')
    return false;
  }
}