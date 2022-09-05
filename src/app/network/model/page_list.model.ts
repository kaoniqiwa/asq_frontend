
/** 分页信息 */
export interface Page {
  /**	Int32	页码 1.2.3 …..	M */
  pageIndex: number;
  /**	Int32	分页大小	M */
  pageSize: number;
  /**	Int32	总页数	M */
  pageCount: number;
  /**	Int32	当前页的记录数目	M */
  recordCount: number;
  /**	Int32	总记录数目	M */
  totalRecordCount: number;
  /** */
}
/** 分页数据 */
export class PagedList<T> {
  /**	Page	分页信息	M */
  page!: Page;
  /**	T[]	数据内容，T为任何需要的类型	M */
  data!: T[];
}
