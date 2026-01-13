import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

export const toasts = writable<Toast[]>([]);

let idCounter = 0;

export function addToast(message: string, type: ToastType = 'info') {
    const id = idCounter++;
    toasts.update(all => [...all, { id, message, type }]);
    setTimeout(() => removeToast(id), 3000);
}

export function removeToast(id: number) {
    toasts.update(all => all.filter(t => t.id !== id));
}
