import { QuestType } from "../enum/quest-type.enum";
import { Member } from "../network/model/member.model";


export interface BabyLibSearchInfo {
  Name: string;
  Uid: any;
  Dids: string[];
  Mids: string[];
  Bids: string[];
  PageIndex: number;
  PageSize: number;
  QuestType: QuestType;
  QuestMonth: string;
  // Did?: string;
}

export class BabyLibModel {
  Id!: string;
  Uid?:string;
  Did?:string;
  Qid?:string;
  Name!: string;
  Birthday!: string;
  Member!: Member;
  SurveyTime!: string;
  QuestMonth?:string;
  // ParentName!: string;
  // CreateTime!: string;
  // Status!: string;
  FileId!: string;
}

export interface QuestionLibSearchInfo {
  Flow:any;
  Uid?: any;
  Dids?: any;
  Name?:any;
  BeginTime?:any;
  EndTime?:any;
  Status?:any;
  PageIndex: number;
  PageSize: number;
  QuestType: QuestType;
  QuestMonth: string;
}
export class QuestionLibModel {
  Id!: string;
  Uid?: any;
  Did?: any;
  Bid?: any;
  Mid?: any;
  Status?:any;
  Name!: string;
  Birthday!: string;
  Mname!: string;
  SurveyTime!: string;
  QuestMonth?:string;
  QuestType?:string;
  // ParentName!: string;
  // CreateTime!: string;
  // Status!: string;
  FileId!: string;
}