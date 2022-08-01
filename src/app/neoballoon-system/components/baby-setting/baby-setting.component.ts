import { Component, OnInit } from '@angular/core';
import { BabySettingModel } from 'src/app/enum/baby-setting.enum';

@Component({
  selector: 'app-baby-setting',
  templateUrl: './baby-setting.component.html',
  styleUrls: ['./baby-setting.component.less']
})
export class BabySettingComponent implements OnInit {

  BabySettingModel = BabySettingModel;
  model: BabySettingModel = BabySettingModel.manualDownload;

  constructor() { }

  ngOnInit(): void {
  }

}
