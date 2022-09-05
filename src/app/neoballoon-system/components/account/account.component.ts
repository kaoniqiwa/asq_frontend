import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { DoctorModel } from 'src/app/network/model/doctor.model';
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

  user: User;
  doctors: DoctorModel[] = [];


  constructor(private _localStorage: LocalStorageService, private _business: AccountBusiness) {
    this.user = this._localStorage.user;
  }

  async ngOnInit() {
    if (this.user) {
      this.doctors = await this._business.listDoctors(this.user.id);
    }
  }
  selectAccount(doctor: DoctorModel) {
    console.log('select:', doctor)

    this._localStorage.doctor = doctor;
  }

}
