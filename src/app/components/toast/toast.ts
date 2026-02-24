import {
  ChangeDetectionStrategy,
  Component, inject,
} from '@angular/core';
import {ToastService} from '../../services/toasts/toast';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
  ],
})
export class Toast {

/*
  TODO: Если вариант с [ngClass] в шаблоне подойдёт, - убрать.

  readonly TOAST_TYPE_CRITICAL = TOAST_TYPE_CRITICAL;
  readonly TOAST_TYPE_INFO = TOAST_TYPE_INFO;
  readonly TOAST_TYPE_NOTICE = TOAST_TYPE_NOTICE;
  */

  private toastService = inject(ToastService);

/*  constructor(
    public toastService: ToastService
  ) {
  }*/
}
