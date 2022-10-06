import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableColumnModel, TableOperateModel } from 'src/app/view-model/table.model';
import { BabyManageBusiness as BabyInfoBusiness } from './baby-lib.business';
import { BabyManageModel } from 'src/app/view-model/baby-info.model';
import { PageEvent } from '@angular/material/paginator';
import { Page } from 'src/app/network/model/page-list.model';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestType } from 'src/app/enum/quest-type.enum';
import { BabyManageSearchInfo } from 'src/app/view-model/baby-manage.model';

@Component({
  selector: 'app-baby-lib',
  templateUrl: './baby-lib.component.html',
  styleUrls: ['./baby-lib.component.less'],
  providers: [BabyInfoBusiness]
})
export class BabyLibComponent implements OnInit {

  questType: QuestType = QuestType.ASQ3;

  fileType = 'personal';
  searchInfo: BabyManageSearchInfo = {
    name: "",
    questType: QuestType.ASQ3,
  }

  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;
  pageSize = 2;


  showToast = false;

  constructor(private _business: BabyInfoBusiness, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    let res = this._business.init(this.searchInfo, this.pageIndex, this.pageSize)
    // this.dataSubject.next(res.Data)
    // this.page = res.Page
  }

  pageEvent(pageInfo: PageEvent) {
    // if (this.pageIndex == pageInfo.pageIndex + 1) return;
    // this.pageIndex = pageInfo.pageIndex + 1;
    // this._init();
    console.log(pageInfo)
  }
  closeEvent() {
    this.showToast = false;
  }
  filterHandler() {
    this.showToast = !this.showToast;
  }
  addBabyHandler() {
    this._router.navigateByUrl('/neoballoon/neoballoon-manage/baby-add')
  }
}

