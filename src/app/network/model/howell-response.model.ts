/** 应答信息 */
interface HowellResponse<T> {
  /**	Int32	错误码间附录3.3	M */
  faultCode: number;
  /**	String 	错误原因	M */
  faultReason: string;
  /**	ExceptionData	内部异常	O */
  innerException?: ExceptionData;
  /**	T	应答实体数据	O */
  data?: T;
}

/** 内部异常 */
interface ExceptionData {
  /**	String	异常消息	M */
  message: string;
  /**	String	异常类型	M */
  exceptionType: string;
  /**	ExceptionData	内部异常	O */
  innerException?: ExceptionData;
}

interface HttpResponse<T> {
  data: HowellResponse<T>;
  status: number;
  statusText: string;
}

class Fault {
  faultCode!: number;
  faultReason!: string;
  exception?: ExceptionData;
  id?: string;
}

export { HowellResponse, ExceptionData, HttpResponse, Fault };
