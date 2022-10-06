import { Injectable } from "@angular/core";
import { GetDoctorParams } from "src/app/network/request/doctor/doctor.params";
import { DoctorRequestService } from "src/app/network/request/doctor/doctor.service";

@Injectable()
export class AccountBusiness {
  constructor(private _doctorRequest: DoctorRequestService) {

  }
  listDoctors(cid: string) {
    let params = new GetDoctorParams();
    params.Cid = cid;
    return this._doctorRequest.list(params)
  }
}