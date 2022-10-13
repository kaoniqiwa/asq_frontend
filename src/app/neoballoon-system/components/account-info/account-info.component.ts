import { Component, OnInit } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { Doctor } from 'src/app/network/model/doctor.model';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.less']
})
export class AccountInfoComponent implements OnInit {

  doctor: Doctor | null = null;

  constructor(private sessionStorage: SessionStorageService) { }

  ngOnInit(): void {
    // console.log(this._globalStorage.doctor)
    this.doctor = this.sessionStorage.doctor;
  }

}
