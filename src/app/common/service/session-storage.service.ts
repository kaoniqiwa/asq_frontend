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

  private _source: any | null = null;
  set source(source:any) {
    sessionStorage.setItem('source', source);
  }
  get source() {
    let source = sessionStorage.getItem('source');
    return source;
  }

  private _mid: any | null = null;
  set mid(mid:any) {
    sessionStorage.setItem('mid', mid);
  }
  get mid() {
    let mid = sessionStorage.getItem('mid');
    return mid;
  }

  private _questscore: any | null = null;
  set questscore(questscore: any | null) {
    sessionStorage.setItem('questscore', JSON.stringify(questscore));
  }
  get questscore() {
    let questscore = sessionStorage.getItem('questscore');
    return questscore ? JSON.parse(questscore) : null;
  }

  private _zonghe: any | null = null;
  set zonghe(zonghe: any | null) {
    sessionStorage.setItem('zonghe', JSON.stringify(zonghe));
  }
  get zonghe() {
    let zonghe = sessionStorage.getItem('zonghe');
    return zonghe ? JSON.parse(zonghe) : null;
  }

  private _doctor: Doctor | null = null;
  set doctor(doctor: Doctor | null) {
    sessionStorage.setItem('doctor', JSON.stringify(doctor));
  }
  get doctor() {
    let doctor = sessionStorage.getItem('doctor');
    return doctor ? JSON.parse(doctor) : null;
  }

  private _doctors: Doctor[] | null = null;
  set doctors(doctors: Doctor[] | null) {
    sessionStorage.setItem('doctors', JSON.stringify(doctors));
  }
  get doctors() {
    let doctors = sessionStorage.getItem('doctors');
    return doctors ? JSON.parse(doctors) : null;
  }

  private _user: Company | null = null;
  set user(user: Company | null) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }
  get user() {
    let user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  private _baby: Baby | null = null;
  set baby(baby: Baby | null) {
    sessionStorage.setItem('baby', JSON.stringify(baby));
  }
  get baby() {
    let baby = sessionStorage.getItem('baby');
    return baby ? JSON.parse(baby) : null;
  }

  private _member: Member | null = null;
  set member(member: Member | null) {
    sessionStorage.setItem('member', JSON.stringify(member));
  }
  get member() {
    let member = sessionStorage.getItem('member');
    return member ? JSON.parse(member) : null;
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
