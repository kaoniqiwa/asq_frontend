import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NeoballoonManageComponent } from "./components/neoballoon-manage/neoballoon-manage.component";
import { NeoballoonComponent } from "./neoballoon.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: "neoballoon",
    pathMatch: 'full'
  },
  {
    path: "neoballoon",
    component: NeoballoonManageComponent
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NeoballoonRoutingModule {

}