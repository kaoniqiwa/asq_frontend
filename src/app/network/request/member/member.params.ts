export class GetMemberParams {
  pageIndex?: number;
  pageSize?: number;
  id?: string;
  name?: string;
  beginTime?: Date;
  endTime?: Date;
  flow!: string;
}