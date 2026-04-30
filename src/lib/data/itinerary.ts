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

export function getTransportType(activity: {
	title?: string;
	description?: string;
}): 'plane' | 'train' | 'bus' | null {
	const text = `${activity.title || ''} ${activity.description || ''}`.toLowerCase();
	if (text.match(/\b(pesawat|penerbangan|bandara|airport|flight|terbang|take-off|landing)\b/))
		return 'plane';
	if (text.match(/\b(kereta|train|stasiun|haramain)\b/)) return 'train';
	if (text.match(/\b(bus|bis)\b/)) return 'bus';
	return null;
}

export function stripMovementKeywords(text: string | undefined): string {
	if (!text) return '';
	return text
		.replace(/\b(berangkat|perjalanan|menuju|transfer)\b/gi, '')
		.replace(/^[\s,:-]+|[\s,:-]+$/g, '')
		.trim();
}
