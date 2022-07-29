import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePath } from 'src/app/enum/route-path.enum';
import { LoginModel } from 'src/app/view-model/login.model';
import axios from 'axios';

@Component({
  selector: 'app-enterprise-license',
  templateUrl: './enterprise-license.component.html',
  styleUrls: ['./enterprise-license.component.less']
})
export class EnterpriseLicenseComponent implements OnInit {

  agree = false;

  @Input() loginModel: LoginModel | null = null

  @Output() closeLicense = new EventEmitter();
  constructor(private _router: Router) { }

  ngOnInit(): void {
  }
  async login() {
    if (this.agree && this.loginModel) {
      let res = await axios.get("/api/login.php");
      // console.log(res)

      if (res) {
        this._router.navigateByUrl(RoutePath.neoballoon)
      }
    }

  }
  close() {
    this.closeLicense.emit()
  }

}
