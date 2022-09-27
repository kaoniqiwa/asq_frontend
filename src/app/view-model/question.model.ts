import { QuestType } from "../enum/quest-type.enum";

export class QuestionModel {
  id!: string;
  bid!: string;
  questType!: QuestType;
  questMonth!: string;
  questResult!: Array<any>;
  create_time?: string;
  update_time?: string;
  flow?: string;
}