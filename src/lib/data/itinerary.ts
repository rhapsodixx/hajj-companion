import { browser } from '$app/environment';
import type { Day, Itinerary } from '$lib/types/itinerary';
import raw from './itinerary.json';

export const itinerary: Itinerary = raw as Day[];

export function getDay(dayNumber: number): Day | undefined {
	return itinerary.find((d) => d.dayNumber === dayNumber);
}

export function getDayByDate(isoDate: string): Day | undefined {
	return itinerary.find((d) => d.gregorianDate === isoDate);
}

export function getTodayISO(): string {
	return new Date().toISOString().slice(0, 10);
}

export function getEffectiveToday(): string {
	return (browser && localStorage.getItem('patuna-date-override')) || getTodayISO();
}

export function getTodayNumber(): number | undefined {
	const today = getEffectiveToday();
	return itinerary.find((d) => d.gregorianDate === today)?.dayNumber;
}

export const PHASE_LABELS: Record<string, string> = {
	manasik: 'Manasik',
	arrival: 'Kedatangan',
	madinah: 'Madinah',
	'madinah-to-makkah': 'Madinah → Makkah',
	makkah: 'Makkah',
	'ash-shishah': 'Ash Shishah',
	rukun: 'Rukun Haji',
	'post-hajj': 'Setelah Haji',
	departure: 'Kepulangan'
};

export const PHASE_COLORS: Record<string, string> = {
	manasik: 'var(--color-phase-manasik)',
	arrival: 'var(--color-phase-arrival)',
	madinah: 'var(--color-phase-madinah)',
	'madinah-to-makkah': 'var(--color-phase-madinah-to-makkah)',
	makkah: 'var(--color-phase-makkah)',
	'ash-shishah': 'var(--color-phase-ash-shishah)',
	rukun: 'var(--color-phase-rukun)',
	'post-hajj': 'var(--color-phase-post-hajj)',
	departure: 'var(--color-phase-departure)'
};
