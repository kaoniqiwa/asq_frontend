import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HowellModule } from "../common/howell.module";
import { AccountComponent } from "./components/account/account.component";
import { BabyInfoComponent } from "./components/baby-info/baby-info.component";
import { BabyAddComponent } from "./components/baby-add/baby-add.component";
import { BabyAgeComponent } from "./components/baby-age/baby-age.component";
import { BabyGameComponent } from "./components/baby-game/baby-game.component";
import { BabyManageComponent } from "./components/baby-manage/baby-manage.component";
import { BabySettingComponent } from "./components/baby-setting/baby-setting.component";
import { NeoballoonManageComponent } from "./components/neoballoon-manage/neoballoon-manage.component";
import { SurveyManageComponent } from "./components/survey-manage/survey-manage.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: "neoballoon-manage",
    pathMatch: 'full'
  },
  {
    path: "neoballoon-manage",
    component: NeoballoonManageComponent,
    children: [
      {
        path: "",
        redirectTo: 'account',
        pathMatch: 'full'
      },
      {
        path: 'account',
        component: AccountComponent
      },
      {
        path: 'baby-add',
        component: BabyAddComponent
      },
      {
        path: 'baby-add-operate',
        component: BabyInfoComponent
      },
      {
        path: 'baby-manage',
        component: BabyManageComponent
      },
      {
        path: 'baby-game',
        component: BabyGameComponent
      },
      {
        path: 'baby-setting',
        component: BabySettingComponent
      },
      {
        path: 'baby-age',
        component: BabyAgeComponent
      },
      {
        path: "survey-manage",
        component: SurveyManageComponent
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NeoballoonRoutingModule {

}