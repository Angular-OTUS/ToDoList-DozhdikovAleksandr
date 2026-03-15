export const TOAST_TYPE_INFO = 'info';
export const TOAST_TYPE_NOTICE = 'notice';
export const TOAST_TYPE_CRITICAL = 'critical';

export type TOAST_TYPE =
  typeof TOAST_TYPE_INFO
  | typeof TOAST_TYPE_NOTICE
  | typeof TOAST_TYPE_CRITICAL;

export interface Toast {
  id: number;
  type: TOAST_TYPE;
  text: string;
}
