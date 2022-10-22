import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { PageType } from 'src/app/enum/page-type.enum';
import { QuestType } from 'src/app/enum/quest-type.enum';

@Component({
  selector: 'asq-entry',
  templateUrl: './asq-entry.component.html',
  styleUrls: ['./asq-entry.component.less']
})
export class Asq3EntryComponent implements OnInit {

  pageType: PageType = PageType.dati;
  questType: QuestType = QuestType.ASQ3;
  questMonth: number = 0;
  bid:number = 0;
  mouthArr: any = [2, 4, 6, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 27, 30, 33, 36, 42, 48, 54.60];
  monthWorkBook :any = null;
  
  constructor(private _sessionStorage: SessionStorageService,private _activeRoute: ActivatedRoute,private _router: Router) { 
    this.monthWorkBook = this._sessionStorage.monthWorkBook;
    this._activeRoute.queryParams.subscribe(params => {
      this.pageType = params['pageType'];
      this.questType = params['questType'];
      this.questMonth = params['questMonth'];
      this.bid = params['bid'];
    })
  }

  ngOnInit(): void {
  }

  gotoQuest(e: Event) {
    e.stopPropagation();
    this._router.navigate(["/neoballoon/neoballoon-manage/asq3-question"], {
      queryParams: {
        pageType: this.pageType,
        questType: this.questType,
        questMonth: this.questMonth,
        bid:this.bid
      }
    })
  }

}
