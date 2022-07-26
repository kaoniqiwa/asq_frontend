import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoutePath } from './enum/route-path.enum';
import { LoginComponent } from './login/login/login.component';
import { Asq3printComponent } from './print/asq3print/asq3print.component';
import { MloginComponent } from './mlogin/mlogin.component';
import { AuthorizationService } from './network/auth/auth-request.service';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';

let _sessionStorage = new SessionStorageService;

const routes: Routes = [
  {
    path: "",
    redirectTo: _sessionStorage.source!=1?RoutePath.mlogin:RoutePath.login,
    pathMatch: 'full'
  },
  {
    path: RoutePath.login,
    component: LoginComponent
  },
  {
    path: RoutePath.mlogin,
    component: MloginComponent,
    canActivate: [AuthorizationService],
  },
  {
    path: RoutePath.asq3print,
    component: Asq3printComponent
  },
  {
    path: RoutePath.neoballoon,
    loadChildren: () =>
      import('./neoballoon-system/neoballoon.module').then((mod) => mod.NeoballoonModule),
    canActivate: [AuthorizationService],
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
