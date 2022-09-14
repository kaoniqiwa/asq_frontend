import { NgModule } from "@angular/core";
import { NeoballoonComponentModule } from "./components/neoballoon-component.module";
import { NeoballoonRoutingModule } from "./neoballoon-routing.module";
import { NeoballoonComponent } from "./neoballoon.component";

import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [
    NeoballoonComponent,

  ],
  imports: [
    NeoballoonComponentModule,
    NeoballoonRoutingModule,
    SwiperModule
  ]
})
export class NeoballoonModule {

}