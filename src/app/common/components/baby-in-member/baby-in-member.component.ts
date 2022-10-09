import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'baby-in-member',
  templateUrl: './baby-in-member.component.html',
  styleUrls: ['./baby-in-member.component.less']
})
export class BabyInMemberComponent implements OnInit {

  myForm = this._fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required]
  })

  constructor(private _fb: FormBuilder,) {
  }

  ngOnInit(): void {
  }

}
