import { Injectable } from '@angular/core';
import { Doctor } from 'src/app/network/model/doctor.model';
import { Member } from 'src/app/network/model/member.model';
import { User } from 'src/app/network/model/user.model';

/*
 * @Author: pmx
 * @Date: 2021-09-14 14:59:21
 * @Last Modified by: pmx
 * @Last Modified time: 2022-07-30 21:36:57
 */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() { }

  set user(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  get user(): User {
    let user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }


  private _member: Member | null = null;
  set member(member: Member | null) {
    this._member = member
  }
  get member() {
    return this.member;
  }



  clear(name?: string) {
    if (name) {
      localStorage.removeItem(name);
    } else {
      localStorage.clear();
    }
  }
}
