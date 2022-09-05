import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-baby-add',
  templateUrl: './baby-add.component.html',
  styleUrls: ['./baby-add.component.less']
})
export class BabyAddComponent implements OnInit {

  showAuthorize = false;
  showQuick = false;

  selectUser = "";
  selectScan = "";
  selectMessage = "";

  constructor() { }

  ngOnInit(): void {
  }


  changeUser() {
    console.log(this.selectUser)
    if (this.selectUser == '0') {
      this.showAuthorize = true;
    }
  }
  changeScan() {

  }
  showQuickHandler() {
    this.showQuick = true;
  }
  closeAuthorize() {
    this.showAuthorize = false;
    this.selectUser = "";
  }
  closeQuick() {
    this.showQuick = false;
  }
}
