import { Injectable } from "@angular/core";
import { CompanyRequestService } from "src/app/network/request/company/company.service";
import { param } from "jquery";

@Injectable()
export class LoginBusiness {
  constructor(private _userRequest: CompanyRequestService) { }

  getCode() {
    return this._userRequest.getCode()
  }

  
}
