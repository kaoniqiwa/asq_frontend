import { Injectable } from "@angular/core";
import { SessionStorageService } from "src/app/common/service/session-storage.service";
import { Company } from "../../model/company.model";
import { CompanyUrl } from "../../url/company.url";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { GetCompanyParams } from "./company.params";

@Injectable({
  providedIn: 'root'
})
export class CompanyRequestService {

  private basic: BaseRequestService;
  private type: BaseTypeRequestService<Company>;

  constructor(_http: HowellAuthHttpService,private _sessionStorage: SessionStorageService) {
    //if(this._sessionStorage.source != 1)return;
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(Company);
    
    
  }
  getCode(){
    //let params:any = {};
    //params.Flow = 'getCode';
    return this.type.post(CompanyUrl.getCode(Math.random()))
  }
  updateLeft(params:any){
    params.Flow = 'updateLeft';
    return this.type.post(CompanyUrl.create(), params)
  }
  checkLeft(params:any){
    params.Flow = 'checkLeft';
    return this.type.post(CompanyUrl.create(), params)
  }
  getUuid(params:any){
    params.Flow = 'getUuid';
    return this.type.post(CompanyUrl.getUuid(), params)
  }

  list(params: GetCompanyParams = new GetCompanyParams()) {
    params.Flow = 'listCompany';
    return this.type.paged(CompanyUrl.list(), params)
  }
  create(model: Company) {
    model.Flow = 'addCompany'
    return this.type.post(CompanyUrl.create(), model);
  }
  get(id: string) {
    return this.type.get(CompanyUrl.get(id));
  }
  getUserBySeq(params:any) {
    params.Flow = 'getUserBySeq';
    return this.type.post(CompanyUrl.create(),params);
  }
  checkUuid(params:any) {
    params.Flow = 'checkUuid';
    return this.type.post(CompanyUrl.sendSms(),params);
  }
  sendSms(params:any) {
    params.Flow = 'sendSms';
    return this.type.post(CompanyUrl.sendSms(),params);
  }
  getStatus(params:any) {
    params.Flow = 'getStatus';
    return this.type.post(CompanyUrl.sendSms(),params);
  }
  sendUrl(params:any) {
    params.Flow = 'sendUrl';
    return this.type.post(CompanyUrl.sendSms(),params);
  }
  getUser(id: string) {
    return this.type.get(CompanyUrl.get(id));
  }
  delete(params: GetCompanyParams = new GetCompanyParams()) {
    params.Flow = 'deleteCompany';
    return this.type.post(CompanyUrl.delete(), params)

  }
  update(model: Company) {
    model.Flow = 'editCompany'
    return this.type.post(CompanyUrl.update(), model)
  }
  export(params: GetCompanyParams = new GetCompanyParams()) {
    params.Flow = 'exportCompany';
    return this.type.postArray(CompanyUrl.export(), params)
  }




}