import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableColumnModel, TableOperateModel } from 'src/app/view-model/table.model';
import { BabyManageBusiness as BabyInfoBusiness } from './baby-lib.business';
import { PageEvent } from '@angular/material/paginator';
import { Page } from 'src/app/network/model/page-list.model';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestType } from 'src/app/enum/quest-type.enum';
import { BabyLibModel, BabyLibSearchInfo } from 'src/app/view-model/baby-lib.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';

@Component({
  selector: 'app-baby-lib',
  templateUrl: './baby-lib.component.html',
  styleUrls: ['./baby-lib.component.less'],
  providers: [BabyInfoBusiness]
})
export class BabyLibComponent implements OnInit {


  dataSource: BabyLibModel[] = [];


  questType: QuestType = QuestType.ASQ3;

  fileType = 'personal';
  searchInfo: BabyLibSearchInfo = {
    Name: "",
    PageIndex: 1,
    PageSize: 9,
    Dids: [],
    Mids: [],
    Bids: [],
    QuestMonth: "",
    QuestType: QuestType.ASQ3
  }

  // Paginator
  page: Page | null = null;
  pageIndex = 1;
  pageSize = 9;


  showToast = false;

  constructor(private _business: BabyInfoBusiness, private _router: Router, private sessionStorage: SessionStorageService) { }

  async ngOnInit() {
    let doctor = this.sessionStorage.doctor;

    if (doctor) {

      this.searchInfo.Dids = [doctor.Id];


      let res = await this._business.init(this.searchInfo)
      console.log(res)
      this.page = res.Page;
      this.dataSource = res.Data;

    }

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
    this._router.navigateByUrl('/neoballoon/neoballoon-manage/baby-add-manage')
  }
}

