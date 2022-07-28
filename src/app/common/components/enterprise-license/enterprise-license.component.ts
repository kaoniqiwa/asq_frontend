import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePath } from 'src/app/enum/route-path.enum';

@Component({
  selector: 'app-enterprise-license',
  templateUrl: './enterprise-license.component.html',
  styleUrls: ['./enterprise-license.component.less']
})
export class EnterpriseLicenseComponent implements OnInit {


  @Output() closeLicense = new EventEmitter();
  constructor(private _router: Router) { }

  ngOnInit(): void {
  }
  login() {
    this._router.navigateByUrl(RoutePath.neoballoon)
  }
  close() {
    this.closeLicense.emit()
  }

}
