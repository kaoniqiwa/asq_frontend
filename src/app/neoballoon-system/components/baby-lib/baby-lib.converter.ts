import { Inject, Injectable } from "@angular/core";
import { CommonModelConverter, CommonModelSource } from "src/app/converter/common-model.converter";
import { Baby } from "src/app/network/model/baby.model";
import { BabyLibModel } from "src/app/view-model/baby-lib.model";

@Injectable({
  providedIn: 'root'
})
export class BabyLibConverter extends CommonModelConverter<BabyLibModel> {
  Convert(source: CommonModelSource) {
    if (source instanceof Baby) {
      return this._fromBabyModel(source)
    }
    throw new Error('Error');
  }

  private _fromBabyModel(item: Baby) {
    let model = new BabyLibModel();
    model.Id = item.Id;
    model.Name = item.Name;
    model.SurveyTime = item.SurveyTime;
    // model.id = item.id;
    // model.mid = item.mid;
    // model.m_name = item.m_name;
    // model.m_relate = item.m_relate;
    // model.name = item.name;
    // model.gender = item.gender;

    // model.birthday = formatDate(item.birthday, 'yyy-MM-dd', 'zh-CN')

    // model.survey_time = item.survey_time;
    // model.premature = item.premature == 'y' ? '早产' : '足月';
    // model.create_time = formatDate(item.create_time, 'yyy-MM-dd', 'zh-CN')
    // model.update_time = item.update_time;

    return model;
  }
}