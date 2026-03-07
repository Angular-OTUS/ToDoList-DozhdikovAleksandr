import {Injectable, signal} from '@angular/core';
import {Toast, TOAST_TYPE} from '../../data/toast';
import {tap, timer} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  private _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  showToast(text: string, type: TOAST_TYPE) {
    const id: number = Math.max(0,...this._toasts().map(obj => obj.id)) + 1;
    this._toasts.set([...this._toasts(), {id: id, type: type, text: text}]);

    return timer(10000).pipe(tap(() => this.hideToast(id)));
  }

  hideToast(id: number): void {
    this._toasts.update(()=> this._toasts().filter(element => element.id !== id));
  }
}
