import type { Day, Itinerary } from '$lib/types/itinerary';
import raw from './itinerary.json';

export const itinerary: Itinerary = raw as Day[];

export function getDay(dayNumber: number): Day | undefined {
	return itinerary.find((d) => d.dayNumber === dayNumber);
}

export function getDayByDate(isoDate: string): Day | undefined {
	return itinerary.find((d) => d.gregorianDate === isoDate);
}

export function getTodayNumber(): number | undefined {
	const today = new Date().toISOString().slice(0, 10);
	return itinerary.find((d) => d.gregorianDate === today)?.dayNumber;
}
