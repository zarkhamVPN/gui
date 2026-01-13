import { writable } from 'svelte/store';

export type AppMode = 'warden' | 'seeker';
export const activeMode = writable<AppMode>('warden'); // Default, will sync with URL/API later

export const activeTab = writable<string>('overview'); // overview, wallet, console
