/*
 * @Author: pmx
 * @Date: 2021-09-28 13:20:43
 * @Last Modified by: pmx
 * @Last Modified time: 2022-08-15 17:30:06
 */
import { Injectable } from '@angular/core';
import { DigestResponse } from 'src/app/network/auth/digest-response.class';
import { Doctor } from 'src/app/network/model/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {




  private _doctor: Doctor | null = null;
  set doctor(doctor: Doctor | null) {
    sessionStorage.setItem('doctor', JSON.stringify(doctor));
  }
  get doctor() {
    let doctor = sessionStorage.getItem('doctor');
    return doctor ? JSON.parse(doctor) : null;
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
