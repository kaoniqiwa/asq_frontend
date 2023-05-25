
export interface LoginModel {
  username: string;
  password: string;
  code: string;
}
export class EnterPriseLoginModel implements LoginModel {

  constructor(
    public username: string = '',
    public password: string = '',
    public code: string = ''
  ) {

  }
}