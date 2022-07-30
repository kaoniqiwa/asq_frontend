import { EventEmitter, Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  statusChange = new EventEmitter();

  password?: string;




  constructor() {
  }
}
