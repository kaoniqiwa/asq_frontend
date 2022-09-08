import { EventEmitter, Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { DoctorModel } from 'src/app/network/model/doctor.model';
import { User } from 'src/app/network/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class GlobalStorageService {
  statusChange = new EventEmitter();

  password?: string;


  private _user: User | null = null;
  set user(user: User | null) {
    this._user = user;
  }
  get user(): User | null {
    return this._user
  }


  private _doctor: DoctorModel | null = null;
  set doctor(doctor: DoctorModel | null) {
    this._doctor = doctor;
  }
  get doctor() {
    return this._doctor;
  }



  constructor() {
  }
}
