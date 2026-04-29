import type { RitualGuide } from '$lib/types/ritual';
import raw from './ritual.json';

export const ritualGuides = raw as RitualGuide[];

export function getGuide(id: string): RitualGuide | undefined {
	return ritualGuides.find((g) => g.id === id);
}

export function getGuidesByPhase(phase: string): RitualGuide[] {
	return ritualGuides.filter((g) => g.phase === phase);
}

export function getGuidesByDay(dayNumber: number): RitualGuide[] {
	return ritualGuides.filter((g) => g.dayNumbers.includes(dayNumber));
}
