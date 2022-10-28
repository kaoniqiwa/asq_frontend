import { QuestType } from "../enum/quest-type.enum";
import { Member } from "../network/model/member.model";


export interface BabyLibSearchInfo {
  Name: string;
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