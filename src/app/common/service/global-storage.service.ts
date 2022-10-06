import { EventEmitter, Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { Baby } from 'src/app/network/model/baby.model';
import { Doctor } from 'src/app/network/model/doctor.model';
import { User } from 'src/app/network/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class GlobalStorageService {





  private _doctor: Doctor | null = null;
  set doctor(doctor: Doctor | null) {
    this._doctor = doctor;
  }
  get doctor() {
    return this._doctor;
  }

  // private _babys: Baby[] = [];
  // set babys(babys: Baby[]) {
  //   this._babys = babys;
  // }
  // get babys() {
  //   return this._babys;
  // }


  constructor() {
  }
}
