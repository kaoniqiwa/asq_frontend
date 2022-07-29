import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import axios from 'axios';

import { ToastrService } from 'ngx-toastr'
import { EnterPriseLoginModel } from 'src/app/view-model/login.model';
@Component({
  selector: 'app-enterprise-login',
  templateUrl: './enterprise-login.component.html',
  styleUrls: ['./enterprise-login.component.less']
})
export class EnterpriseLoginComponent implements OnInit {

  myForm = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  @Output()
  validate = new EventEmitter();

  constructor(private _fb: FormBuilder,) { }

  ngOnInit(): void {
  }

  login() {
    this.validate.emit(
      new EnterPriseLoginModel(this.myForm.value.username ?? "", this.myForm.value.password ?? "")
    )
    // axios.get('/api/login.php').then((data) => console.log(data))
    // this._toastrService.success('sdfdsf')
  }
}
