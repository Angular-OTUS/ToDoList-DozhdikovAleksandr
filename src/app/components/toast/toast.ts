import {
  ChangeDetectionStrategy,
  Component, inject,
} from '@angular/core';
import {ToastService} from '../../services/toasts/toast';
import {TOAST_TYPE_CRITICAL, TOAST_TYPE_INFO, TOAST_TYPE_NOTICE} from '../../data/toast';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
  ],
})
export class Toast {

  readonly TOAST_TYPE_CRITICAL = TOAST_TYPE_CRITICAL;
  readonly TOAST_TYPE_INFO = TOAST_TYPE_INFO;
  readonly TOAST_TYPE_NOTICE = TOAST_TYPE_NOTICE;

  public toastService = inject(ToastService);
}
