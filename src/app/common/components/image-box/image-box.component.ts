import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    console.log('sdfsdf', this.models)
  }
  close() {
    this.closeEvent.emit(false);
  }

}
