import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BabyAddComponent } from "./components/baby-add/baby-add.component";
import { BabyAgeComponent } from "./components/baby-age/baby-age.component";
import { BabyGameComponent } from "./components/baby-game/baby-game.component";
import { BabyInfoComponent } from "./components/baby-info/baby-info.component";
import { BabySettingComponent } from "./components/baby-setting/baby-setting.component";
import { NeoballoonManageComponent } from "./components/neoballoon-manage/neoballoon-manage.component";

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
        path: 'baby-add',
        component: BabyAddComponent
      },
      {
        path: 'baby-info',
        component: BabyInfoComponent
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