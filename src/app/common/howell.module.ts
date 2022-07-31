import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";
import { CUSTOM_COMPONENTS } from "./components";
import { CUSTOM_DIRECTIVES } from "./directive";

@NgModule({
  declarations: [
    ...CUSTOM_COMPONENTS,
    ...CUSTOM_DIRECTIVES
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [...CUSTOM_COMPONENTS, ...CUSTOM_DIRECTIVES]
})
export class HowellModule {

}