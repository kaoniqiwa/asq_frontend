import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import axios from 'axios'
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

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
  }

  login() {
    console.log('pppp', axios)
    axios.get('login.php').then((data) => console.log(data))
  }
}
