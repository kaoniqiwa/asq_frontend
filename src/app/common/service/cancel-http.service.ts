import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CancelHttpService {
  private cancelPenddingRequest$ = new Subject<void>();

  constructor() {}

  cancelPendingRequests() {
    this.cancelPenddingRequest$.next();

    return true;
  }
  onCancelPendingRequests() {
    return this.cancelPenddingRequest$;
  }
}
