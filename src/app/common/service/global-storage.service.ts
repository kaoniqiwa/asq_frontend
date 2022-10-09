import { EventEmitter, Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { Baby } from 'src/app/network/model/baby.model';
import { Doctor } from 'src/app/network/model/doctor.model';
import { Member } from 'src/app/network/model/member.model';
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


  private _member: Member | null = null;
  set member(member: Member | null) {
    this._member = member
  }
  get member() {
    return this.member;
  }

  constructor() {
  }
}
