import { EventEmitter, Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { Baby } from 'src/app/network/model/baby.model';
import { Doctor } from 'src/app/network/model/doctor.model';
import { Member } from 'src/app/network/model/member.model';
import { User } from 'src/app/network/model/user.model';

interface ASQMonthFilter {
  name: string;
  data: [string, string, string, string]
}
@Injectable({
  providedIn: 'root',
})
export class GlobalStorageService {


  private _baby: Baby | null = null;
  set baby(baby: Baby | null) {
    this._baby = baby
  }
  get baby() {
    return this._baby;
  }

  private _member: Member | null = null;
  set member(member: Member | null) {
    this._member = member
  }
  get member() {
    return this._member;
  }

  constructor() {
  }
}
