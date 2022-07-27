import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BabyAddComponent } from "./components/baby-add/baby-add.component";
import { BabyInfoComponent } from "./components/baby-info/baby-info.component";
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
        path: 'baby-info',
        component: BabyInfoComponent
      },
      {
        path: 'baby-add',
        component: BabyAddComponent
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