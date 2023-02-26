import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { _Toast } from '../models/Toast.model';
import { ToastTypeMessage } from '../constants/toast-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  
  private valueSource = new BehaviorSubject(new _Toast("", 0, ToastTypeMessage.informative));
  public value$ = this.valueSource.asObservable();
  
  constructor() { }
  
  public showAlert(message: string, time: number, type: string): void {
    this.valueSource.next(new _Toast(message, time, type));
  }

}
