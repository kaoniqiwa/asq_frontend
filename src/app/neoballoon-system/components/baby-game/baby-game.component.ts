import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
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

  selectItems: BabyGameModel[] = [];

  selection: SelectionModel<BabyGameModel> = new SelectionModel(true)

  


  constructor(private _business: BabyGameBusiness) { }

  ngOnInit(): void {
    this.asq3Data = this._business.getAsq3Data();
    this.asqSe2Data = this._business.getAsqSe2Data();
  }

  clickItem(model: BabyGameModel) {
    this.selection.toggle(model)
  }
  closeEvent() {
    this.showToast = false;
  }
  viewModel() {
    console.log(this.selection.selected)
  }
  selectChange(e: Event, model: BabyGameModel) {
    console.log('select ', model)
    e.stopPropagation();
    console.log(model)
    if (model.operation == '0') {
      this.showToast = true;
      this.toastModels = [model];
    } else if (model.operation == '1') {
      window.open(model.pdfBaseUrl + model.index + ".pdf");

    }
  }
}
