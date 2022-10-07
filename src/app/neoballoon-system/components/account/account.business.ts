import { Injectable } from "@angular/core";
import { GetDoctorParams } from "src/app/network/request/doctor/doctor.params";
import { DoctorRequestService } from "src/app/network/request/doctor/doctor.service";

@Injectable()
export class AccountBusiness {
  constructor(private _doctorRequest: DoctorRequestService) {

  }
  listDoctors(cids: string[]) {
    let params = new GetDoctorParams();
    params.Cids = cids;
    return this._doctorRequest.list(params)
  }
}