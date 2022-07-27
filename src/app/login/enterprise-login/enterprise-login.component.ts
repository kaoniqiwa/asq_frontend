import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutePath } from 'src/app/enum/route-path.enum';

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

  constructor(private _fb: FormBuilder, private _router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this._router.navigateByUrl(RoutePath.neoballoon)
  }
}
