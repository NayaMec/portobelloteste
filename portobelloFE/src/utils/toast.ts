import EventManager from '../lib/EventManager';

export const toastEventManager = new EventManager();

export interface IToast {
  type?: 'default' | 'success' | 'danger';
  text: string;
  duration?: number;
  id?: number;
}

export function toast({ type = 'default', text, duration = 3000 }: IToast) {
  toastEventManager.emit('addtoast', { type, text, duration });
}
