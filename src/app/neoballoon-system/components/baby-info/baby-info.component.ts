import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EncodeDeviceManageModel } from 'src/app/view-model/encode-device-manage.model';
import { TableColumnModel, TableOperateModel } from 'src/app/view-model/table.model';
import { BabyInfoManageBusiness as BabyInfoBusiness } from './baby-info.business';
import { BybyInfoManageConf } from './baby-info.config';
import { BabyInfoModel } from 'src/app/view-model/baby-info.model';
import { PageEvent } from '@angular/material/paginator';
import { Page } from 'src/app/network/model/page_list.model';

@Component({
  selector: 'app-baby-info',
  templateUrl: './baby-info.component.html',
  styleUrls: ['./baby-info.component.less'],
  providers: [BabyInfoBusiness]
})
export class BabyInfoComponent implements OnInit {

  questionType = '1'
  fileType = 'personal';
  searchInfo: any = {
    Age: '2',
    Filter: false
  }

  // Table
  dataSubject = new BehaviorSubject<BabyInfoModel[]>([]);
  columnModel: TableColumnModel[] = [...BybyInfoManageConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id
  tableOperates: TableOperateModel[] = []
  selectedRows: EncodeDeviceManageModel[] = [];//table选中项
  willBeDeleted: EncodeDeviceManageModel[] = [];


  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;


  constructor(private _business: BabyInfoBusiness) { }

  ngOnInit(): void {
    let res = this._business.init()
    this.dataSubject.next(res.Data)
    this.page = res.Page
  }

  pageEvent(pageInfo: PageEvent) {
    // if (this.pageIndex == pageInfo.pageIndex + 1) return;
    // this.pageIndex = pageInfo.pageIndex + 1;
    // this._init();
    console.log(pageInfo)
  }

}

