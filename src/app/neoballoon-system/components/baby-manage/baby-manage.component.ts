import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableColumnModel, TableOperateModel } from 'src/app/view-model/table.model';
import { BabyManageBusiness as BabyInfoBusiness } from './baby-manage.business';
import { BabyManageModel } from 'src/app/view-model/baby-info.model';
import { PageEvent } from '@angular/material/paginator';
import { Page } from 'src/app/network/model/page_list.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-baby-manage',
  templateUrl: './baby-manage.component.html',
  styleUrls: ['./baby-manage.component.less'],
  providers: [BabyInfoBusiness]
})
export class BabyManageComponent implements OnInit {

  questionType = '1'
  fileType = 'personal';
  searchInfo: any = {
    Age: '2',
    Filter: false
  }

  // Table
  dataSubject = new BehaviorSubject<BabyManageModel[]>([]);
  tableOperates: TableOperateModel[] = []


  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;
  

  showToast = false;

  constructor(private _business: BabyInfoBusiness, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    let res = this._business.init()
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

