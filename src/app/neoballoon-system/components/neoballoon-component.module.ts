import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HowellModule } from 'src/app/common/howell.module';
import { MaterialModule } from 'src/app/material.module';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AccountComponent } from './account/account.component';
import { BabyAddManageComponent } from './baby-add-manage/baby-add-manage.component';
import { BabyAgeComponent } from './baby-age/baby-age.component';
import { BabyGameComponent } from './baby-game/baby-game.component';
import { BabyInfoOperateComponent } from './baby-info-operate/baby-info-operate.component';
import { BabyManageComponent } from './baby-manage/baby-manage.component';
import { BabySettingComponent } from './baby-setting/baby-setting.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { NeoballoonManageComponent } from './neoballoon-manage/neoballoon-manage.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SurveyLicenseComponent } from './survey-license/survey-license.component';
import { BabyInfoComponent } from './baby-info/baby-info.component';
import { SurveyManageComponent } from './survey-manage/survey-manage.component';
import { BabyInfoManageComponent } from './baby-info-manage/baby-info-manage.component';
import { SwiperModule } from 'swiper/angular';



@NgModule({
  declarations: [
    NeoballoonManageComponent,
    SideNavComponent,
    HeaderNavComponent,
    BabySettingComponent,
    BabyGameComponent,
    BabyAgeComponent,
    AccountComponent,
    AccountInfoComponent,
    BabyAddManageComponent,
    BabyManageComponent,
    BabyInfoOperateComponent,
    SurveyLicenseComponent,
    BabyInfoComponent,
    SurveyManageComponent,
    BabyInfoManageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HowellModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SwiperModule
  ]
})
export class NeoballoonComponentModule { }
