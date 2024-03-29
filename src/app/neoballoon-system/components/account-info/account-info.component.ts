import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { LocalStorageService } from "src/app/common/service/local-storage.service";
import { Doctor } from 'src/app/network/model/doctor.model';
import { User } from 'src/app/network/model/user.model';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.less']
})
export class AccountInfoComponent implements OnInit {

  @Input() user:any;

  doctor: Doctor | null = null;
  //user: User | null = null;

  constructor(private _sessionStorage: SessionStorageService,private localStorage:LocalStorageService) {

  }

  ngOnChanges(changes: any){
    if (changes['user']) {
      //console.log('changes_user',changes['user']);
      
    }
  }

  ngOnInit(): void {
    // console.log(this._globalStorage.doctor)
    this.doctor = this._sessionStorage.doctor;
    //this.user = this._sessionStorage.user;
   
    //console.log('this.user',this._sessionStorage.user)
  }

}
