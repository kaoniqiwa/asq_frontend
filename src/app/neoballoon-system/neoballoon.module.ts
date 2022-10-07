import { NgModule } from "@angular/core";
import { NeoballoonComponentModule } from "./components/neoballoon-component.module";
import { NeoballoonRoutingModule } from "./neoballoon-routing.module";
import { NeoballoonComponent } from "./neoballoon.component";

import { SwiperModule } from 'swiper/angular';
import { LocationStrategy, HashLocationStrategy } from "@angular/common";


@NgModule({
  declarations: [
    NeoballoonComponent,

  ],
  imports: [
    NeoballoonComponentModule,
    NeoballoonRoutingModule,
    SwiperModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ]
})
export class NeoballoonModule {

}