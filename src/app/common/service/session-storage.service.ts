/*
 * @Author: pmx
 * @Date: 2021-09-28 13:20:43
 * @Last Modified by: pmx
 * @Last Modified time: 2022-08-15 17:30:06
 */
import { Injectable } from '@angular/core';
import { DigestResponse } from 'src/app/network/auth/digest-response.class';
import { Baby } from 'src/app/network/model/baby.model';
import { Doctor } from 'src/app/network/model/doctor.model';
import { Member } from 'src/app/network/model/member.model';
import { Company } from 'src/app/network/model/company.model';


import monthWorkBook from "src/assets/files/asq_month.xlsx";



monthWorkBook.forEach((sheet: ASQMonthFilter) => {
  // 去掉标题
  sheet.data.shift();

  // 去掉列名
  sheet.data.shift();

})



@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {

  monthWorkBook = monthWorkBook;

  set source(source) {
    sessionStorage.setItem('source', JSON.stringify(source));
  }
  get source() {
    let source = sessionStorage.getItem('source');
    return source ? JSON.parse(source) : null;
  }

  private _doctor: Doctor | null = null;
  set doctor(doctor: Doctor | null) {
    sessionStorage.setItem('doctor', JSON.stringify(doctor));
  }
  get doctor() {
    let doctor = sessionStorage.getItem('doctor');
    return doctor ? JSON.parse(doctor) : null;
  }

  private _user: Company | null = null;
  set user(user: Company | null) {
    sessionStorage.setItem('doctor', JSON.stringify(user));
  }
  get user() {
    let user = sessionStorage.getItem('doctor');
    return user ? JSON.parse(user) : null;
  }

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

  set challenge(challenge: DigestResponse) {
    sessionStorage.setItem('challenge', JSON.stringify(challenge));
  }
  get challenge() {
    let challenge_str = sessionStorage.getItem('challenge');

    return challenge_str == null ? null : JSON.parse(challenge_str);
  }

  clear(name?: string) {
    if (name) {
      sessionStorage.removeItem(name);
    } else {
      sessionStorage.clear();
    }
  }
}



interface ASQMonthFilter {
  name: string;
  data: [string, string, string, string]
}
