import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { Doctor } from 'src/app/network/model/doctor.model';
import { User } from 'src/app/network/model/user.model';
import { AccountBusiness } from './account.business';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less'],
  providers: [
    AccountBusiness
  ]
})
export class AccountComponent implements OnInit {

  showInfo = false;

  user: User | null = null;
  doctors: Doctor[] = [];


  constructor(private _localStorage: LocalStorageService, private _sessionStorage: SessionStorageService, private _g: GlobalStorageService, private _business: AccountBusiness, private _router: Router) {
    //this.user = this._localStorage.user;
    this.user = this._sessionStorage.user;
  }

  async ngOnInit() {
    if (this.user) {
      let { Data: doctors } = await this._business.listDoctors([this.user.Id]);
      this.doctors = doctors;
      this._sessionStorage.doctors = doctors;
    }
  }
  selectAccount(doctor: Doctor) {
    this._sessionStorage.doctor = doctor;
    this._router.navigate(["/neoballoon/neoballoon-manage/baby-lib"])
  }

}
