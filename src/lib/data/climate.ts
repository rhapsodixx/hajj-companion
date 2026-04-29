import type { ClimateNorm, ClimateLibrary } from '$lib/types/climate';
import raw from './climate.json';

export const climateLibrary: ClimateLibrary = raw as ClimateNorm[];

export function getClimate(id: string): ClimateNorm | undefined {
	return climateLibrary.find((c) => c.id === id);
}
