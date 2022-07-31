import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EncodeDeviceManageModel } from 'src/app/view-model/encode-device-manage.model';
import { TableColumnModel, TableOperateModel } from 'src/app/view-model/table.model';
import { BabyInfoManageBusiness } from './baby-info-manage.business';
import { BybyInfoManageConf } from './baby-info-manage.config';
import { BabyInfoManageModel } from 'src/app/view-model/baby-info-manage.model';
import { PageEvent } from '@angular/material/paginator';
import { Page } from 'src/app/network/model/page_list.model';

@Component({
  selector: 'app-baby-info-manage',
  templateUrl: './baby-info-manage.component.html',
  styleUrls: ['./baby-info-manage.component.less'],
  providers: [BabyInfoManageBusiness]
})
export class BabyInfoManageComponent implements OnInit {

  questionType = ''
  fileType = '';
  searchInfo: any = {
    Age: '2',
    Filter: false
  }

  // Table
  dataSubject = new BehaviorSubject<BabyInfoManageModel[]>([]);
  columnModel: TableColumnModel[] = [...BybyInfoManageConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id
  tableOperates: TableOperateModel[] = []
  selectedRows: EncodeDeviceManageModel[] = [];//table选中项
  willBeDeleted: EncodeDeviceManageModel[] = [];


  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;


  constructor(private _business: BabyInfoManageBusiness) { }

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

