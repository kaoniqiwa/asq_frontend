import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import printJS from 'print-js'



import { BabyGameModel } from 'src/app/view-model/baby-game.model';

@Component({
  selector: 'image-box',
  templateUrl: './image-box.component.html',
  styleUrls: ['./image-box.component.less']
})
export class ImageBoxComponent implements OnInit {

  @Input() models: BabyGameModel[] = [];

  @Output() closeEvent = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }
  close() {
    this.closeEvent.emit(false);
  }
  printModel() {

    let imageSrc = this.models.map(model => model.imageBaseUrl + model.index + "_p" + "." + model.imageAppendix)
    printJS({
      printable: imageSrc,
      type: 'image',
      showModal: true
    })
  }

}
