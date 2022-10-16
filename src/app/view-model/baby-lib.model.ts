import { QuestType } from "../enum/quest-type.enum";


export interface BabyLibSearchInfo {
  Name: string;
  Dids: string[];
  PageIndex: number;
  PageSize: number;
  // questType?: QuestType;
  // Did?: string;
}

export class BabyLibModel {
  Id!: string;
  Name!: string;
  Birthday!: string;
  SurveyTime!: string;
  // ParentName!: string;
  // CreateTime!: string;
  // Status!: string;
  // FileId!: string;
}