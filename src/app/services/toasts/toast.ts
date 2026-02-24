import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {Toast, TOAST_TYPE} from '../../data/toast';
import {timer} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  private destroyRef = inject(DestroyRef);

  toasts = signal<Toast[]>([]);

  showToast(text: string, type: TOAST_TYPE): void {
    const id: number = Math.max(0,...this.toasts().map(obj => obj.id)) + 1;
    this.toasts.set([...this.toasts(), {id: id, type: type, text: text}]);

    timer(10000).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.hideToast(id);
    });
  }

  hideToast(id: number): void {
    this.toasts.update(()=> this.toasts().filter(element => element.id !== id));
  }
}
