import { INJECTOR, Inject, Injectable, Injector } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, endWith, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResolverService implements Resolve<any> {
  constructor() {}
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return EMPTY.pipe(endWith('success'));
  }
}
