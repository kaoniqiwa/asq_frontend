import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-family-login',
  templateUrl: './family-login.component.html',
  styleUrls: ['./family-login.component.less']
})
export class FamilyLoginComponent implements OnInit {
  showHint = false;

  myForm = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
