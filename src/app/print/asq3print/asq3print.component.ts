import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';

//import { EnterPriseLoginModel, LoginModel } from 'src/app/view-model/login.model';
@Component({
  selector: 'asq3print',
  templateUrl: './asq3print.component.html',
  styleUrls: ['./asq3print.component.less']
})
export class Asq3printComponent implements OnInit {

  constructor(private _title: Title, private _fb: FormBuilder,) {
    //this._title.setTitle('用户登录')
  }

  ngOnInit(): void {
    window.print();
  }

}
