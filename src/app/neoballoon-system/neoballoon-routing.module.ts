import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HowellModule } from '../common/howell.module';
import { AccountComponent } from './components/account/account.component';
import { BabyAddManageComponent } from './components/baby-add-manage/baby-add-manage.component';
import { BabyQrcodeManageComponent } from './components/baby-qrcode-manage/baby-qrcode-manage.component';
import { BabyMessageManageComponent } from './components/baby-message-manage/baby-message-manage.component';
import { BabyAgeComponent } from './components/baby-age/baby-age.component';
import { BabyGameComponent } from './components/baby-game/baby-game.component';
import { BabyLibComponent } from './components/baby-lib/baby-lib.component';
import { BabySettingComponent } from './components/baby-setting/baby-setting.component';
import { NeoballoonManageComponent } from './components/neoballoon-manage/neoballoon-manage.component';
import { SurveyManageComponent } from './components/survey-manage/survey-manage.component';
import { BabyInfoManageComponent } from './components/baby-info-manage/baby-info-manage.component';
import { NeoballoonService } from './neoballoon.service';
import { Asq3QuestionComponent } from '../common/components/asq-question/asq3-question/asq3-question.component';
import { Asqse2QuestionComponent } from '../common/components/asq-question/asqse2-question/asqse2-question.component';
import { Asq3EntryComponent } from '../common/components/asq-question/asq-entry/asq-entry.component';
import { BabyReportComponent } from './components/baby-report/baby-report.component';
import { AuthGuard } from '../auth.guard';
import { CookieGuard } from '../cookie.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'neoballoon-manage',
    pathMatch: 'full',
  },
  {
    path: 'neoballoon-manage',
    component: NeoballoonManageComponent,
    canActivate: [AuthGuard, CookieGuard],
    canActivateChild: [AuthGuard, CookieGuard],
    children: [
      {
        path: '',
        redirectTo: 'account',
        pathMatch: 'full',
      },
      {
        path: 'account',
        component: AccountComponent,
      },
      {
        path: 'baby-add-manage',
        component: BabyAddManageComponent,
        canActivate: [NeoballoonService],
      },
      {
        path: 'baby-qrcode-manage',
        component: BabyQrcodeManageComponent,
        canActivate: [NeoballoonService],
      },
      {
        path: 'baby-message-manage',
        component: BabyMessageManageComponent,
        canActivate: [NeoballoonService],
      },
      {
        path: 'baby-info-manage',
        component: BabyInfoManageComponent,
        canActivate: [NeoballoonService],
      },
      {
        path: 'baby-lib',
        component: BabyLibComponent,
        canActivate: [NeoballoonService],
      },
      {
        path: 'baby-report',
        component: BabyReportComponent,
        canActivate: [NeoballoonService],
      },
      {
        path: 'baby-game',
        component: BabyGameComponent,
        canActivate: [NeoballoonService],
      },
      {
        path: 'baby-setting',
        component: BabySettingComponent,
        canActivate: [NeoballoonService],
      },
      {
        path: 'baby-age',
        component: BabyAgeComponent,
        canActivate: [NeoballoonService],
      },
      {
        path: 'survey-manage/:mid',
        component: SurveyManageComponent,
        canActivate: [NeoballoonService],
      },
      {
        path: 'asq3-question/:bid',
        component: Asq3QuestionComponent,
        canActivate: [NeoballoonService],
      },
      {
        path: 'asqse2-question/:bid',
        component: Asqse2QuestionComponent,
        canActivate: [NeoballoonService],
      },
      {
        path: 'asq-entry/:bid',
        component: Asq3EntryComponent,
        canActivate: [NeoballoonService],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NeoballoonRoutingModule {}
