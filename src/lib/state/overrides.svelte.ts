import { browser } from '$app/environment';
import { supabase } from '$lib/data/supabase';
import type { DailyOverride } from '$lib/types/override';

type OverrideMap = Map<string, DailyOverride>;

let overrides = $state<OverrideMap>(new Map());
let lastFetched = $state<string>('');
let loading = $state(false);

function overrideKey(dayNumber: number, field: string, bus: string): string {
	return `${dayNumber}:${field}:${bus}`;
}

export function getOverrides() {
	return overrides;
}

export function getLastFetched() {
	return lastFetched;
}

export function isLoading() {
	return loading;
}

export function getOverrideForDay(dayNumber: number, bus: string): DailyOverride[] {
	const results: DailyOverride[] = [];
	const buses = ['all', bus === 'all' ? 'all' : `B-${bus}`];
	for (const o of overrides.values()) {
		if (o.dayNumber === dayNumber && buses.includes(o.bus)) {
			results.push(o);
		}
	}
	return results;
}

export function applyOverrideToText(
	bundledText: string | null | undefined,
	override: DailyOverride | undefined
): { text: string; isOverridden: boolean } {
	if (!override) return { text: bundledText ?? '', isOverridden: false };
	return { text: override.value, isOverridden: true };
}

export async function fetchOverrides(): Promise<void> {
	if (!browser || !supabase) return;

	loading = true;
	try {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 3000);

		const { data, error } = await supabase
			.from('daily_overrides')
			.select('*')
			.order('published_at', { ascending: false });

		clearTimeout(timeout);

		if (error) {
			console.warn('Override fetch failed:', error.message);
			restoreFromCache();
			return;
		}

		if (data) {
			const map = new Map<string, DailyOverride>();
			for (const row of data as DailyOverride[]) {
				const key = overrideKey(row.dayNumber, row.field, row.bus);
				if (!map.has(key)) {
					map.set(key, row);
				}
			}
			overrides = map;
			lastFetched = new Date().toISOString();
			localStorage.setItem('patuna-overrides', JSON.stringify(data));
			localStorage.setItem('patuna-overrides-ts', lastFetched);
		}
	} catch {
		console.warn('Override fetch timed out or failed, using cache');
		restoreFromCache();
	} finally {
		loading = false;
	}
}

function restoreFromCache() {
	const cached = localStorage.getItem('patuna-overrides');
	const cachedTs = localStorage.getItem('patuna-overrides-ts');
	if (cached) {
		try {
			const data = JSON.parse(cached) as DailyOverride[];
			const map = new Map<string, DailyOverride>();
			for (const row of data) {
				const key = overrideKey(row.dayNumber, row.field, row.bus);
				if (!map.has(key)) {
					map.set(key, row);
				}
			}
			overrides = map;
			lastFetched = cachedTs ?? '';
		} catch {
			// Corrupted cache, ignore
		}
	}
}

if (browser) {
	restoreFromCache();
	fetchOverrides();
}
