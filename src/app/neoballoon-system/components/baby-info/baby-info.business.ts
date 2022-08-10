import { Injectable } from "@angular/core";
import { Page, PagedList } from "src/app/network/model/page_list.model";
import { BabyInfoModel } from "src/app/view-model/baby-info.model";

@Injectable()
export class BabyInfoManageBusiness {

  constructor() {

  }
  init() {
    let data: BabyInfoModel[] = []
    for (let i = 0; i < 9; i++) {
      let model = new BabyInfoModel();
      model.Id = (i + 1).toString();
      model.Name = "栲霓杞蛙";
      model.Birthday = '2022-7-1';
      model.ParentName = '';
      model.CreateTime = "2022-07-31 16:19:36-2";
      model.Status = '未归档';
      model.FileId = "E20220731161936945232";

      data.push(model)
    }

    let page: Page = {
      PageIndex: 1,
      PageSize: 9,
      PageCount: 367,
      RecordCount: 9,
      TotalRecordCount: 3398
    }
    let res: PagedList<BabyInfoModel> = {
      Page: page,
      Data: data,
    };
    return res;

  }

}

