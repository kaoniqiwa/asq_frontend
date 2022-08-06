import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import printJS from 'print-js'
import { ToastrService } from 'ngx-toastr';

import { BabyGameModel } from 'src/app/view-model/baby-game.model';
import { BabyGameBusiness } from './baby-game.business';



@Component({
  selector: 'app-baby-game',
  templateUrl: './baby-game.component.html',
  styleUrls: ['./baby-game.component.less'],
  providers: [
    BabyGameBusiness
  ]
})
export class BabyGameComponent implements OnInit {

  showToast = false;
  toastModels: BabyGameModel[] = [];

  asq3Data: BabyGameModel[] = [];
  asqSe2Data: BabyGameModel[] = [];
  asq3BtnSelected = false;
  asq2BtnSelected = false;

  selectItems: BabyGameModel[] = [];

  selection: SelectionModel<BabyGameModel> = new SelectionModel(true)




  constructor(private _business: BabyGameBusiness, private _toastrService: ToastrService) {

  }

  ngOnInit(): void {
    this.asq3Data = this._business.getAsq3Data();
    this.asqSe2Data = this._business.getAsqSe2Data();
  }

  clickItem(model: BabyGameModel) {
    this.selection.toggle(model);
  }
  toggleAsq3() {
    if (this.asq3BtnSelected) {
      this.selection.deselect(...this.asq3Data)
    } else {
      this.selection.select(...this.asq3Data)
    }
    this.asq3BtnSelected = !this.asq3BtnSelected;

  }
  toggleAsq2() {
    if (this.asq2BtnSelected) {
      this.selection.deselect(...this.asqSe2Data)
    } else {
      this.selection.select(...this.asqSe2Data)
    }
    this.asq2BtnSelected = !this.asq2BtnSelected;
  }
  closeEvent() {
    this.showToast = false;
  }
  viewModel() {
    let selected = this.selection.selected.sort((a, b) => a.index - b.index);
    if (selected.length) {
      this.showToast = true;
      this.toastModels = selected;
    } else {
      this._toastrService.warning('请选择项目');
    }

  }
  printModel() {
    let selected = this.selection.selected.sort((a, b) => a.index - b.index);

    if (selected.length) {
      let imageSrc = selected.map(model => model.imageBaseUrl + model.index + "_p" + "." + model.imageAppendix)
      printJS({
        printable: imageSrc,
        type: 'image',
        showModal: true
      })
    } else {
      this._toastrService.warning('请选择项目');
    }
  }


}
